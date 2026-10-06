import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const PORT = Number(process.env.PORT || 80);
const DIST = path.resolve(process.env.DIST_DIR || "dist");
const DATA_DIR = process.env.DATA_DIR || "/data";
const TOKEN = process.env.ACCESS_TOKEN || "";
const SESSION_MS = Number(process.env.SESSION_MINUTES || 45) * 60 * 1000;
const COOKIE = "qadro_once";
const STATE_FILE = path.join(DATA_DIR, "used.json");

if (!TOKEN || TOKEN.length < 20) {
  console.error("ACCESS_TOKEN es obligatorio y debe ser largo.");
  process.exit(1);
}

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".txt": "text/plain; charset=utf-8",
};

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function tokensMatch(input) {
  const given = Buffer.from(input);
  const expected = Buffer.from(TOKEN);
  if (given.length !== expected.length) return false;
  return crypto.timingSafeEqual(given, expected);
}

function readState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
  } catch {
    return { used: {} };
  }
}

function consume(token) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const state = readState();
  const id = hashToken(token);
  if (state.used[id]) return false;
  state.used[id] = new Date().toISOString();
  const tmp = `${STATE_FILE}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(state));
  fs.renameSync(tmp, STATE_FILE);
  return true;
}

function alreadyUsed(token) {
  const state = readState();
  return Boolean(state.used[hashToken(token)]);
}

function sign(exp) {
  const body = String(exp);
  const sig = crypto.createHmac("sha256", TOKEN).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function sessionExpiry(cookieHeader) {
  const match = (cookieHeader || "").match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  if (!match) return 0;
  const [body, sig] = decodeURIComponent(match[1]).split(".");
  if (!body || !sig) return 0;
  const expected = crypto.createHmac("sha256", TOKEN).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return 0;
  const exp = Number(body);
  if (!Number.isFinite(exp) || exp < Date.now()) return 0;
  return exp;
}

function page(title, body) {
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>${title}</title>
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #0D141A; color: #fff; font-family: Georgia, "Times New Roman", serif; }
    main { max-width: 28rem; padding: 2rem; }
    h1 { font-size: 1.8rem; font-weight: 500; letter-spacing: -0.03em; margin: 0 0 0.8rem; }
    p { margin: 0; color: #c5cdd4; line-height: 1.5; font-family: system-ui, sans-serif; }
    button { margin-top: 1.5rem; border: 0; background: #E63946; color: #fff; font: 600 1rem/1 system-ui, sans-serif; padding: 0.9rem 1.2rem; border-radius: 999px; cursor: pointer; }
  </style>
</head>
<body><main>${body}</main></body>
</html>`;
}

function send(res, status, html, extra = {}) {
  const headers = {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "private, no-store",
    "X-Robots-Tag": "noindex, nofollow",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    ...extra,
  };
  res.writeHead(status, headers);
  res.end(html);
}

function locked() {
  return page(
    "Enlace no disponible",
    "<h1>Este enlace ya no está disponible.</h1><p>La propuesta se puede abrir una sola vez. Después, el acceso se destruye.</p>",
  );
}

function gate(token) {
  return page(
    "Propuesta de un solo uso",
    `<h1>Esta propuesta se abre una sola vez.</h1>
     <p>Al continuar, este enlace deja de funcionar. Quien lo reciba después ya no podrá verla.</p>
     <form method="post" action="/v/${encodeURIComponent(token)}/open">
       <button type="submit">Abrir propuesta</button>
     </form>`,
  );
}

function safeFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const rel = decoded.replace(/^\/+/, "");
  const file = path.resolve(DIST, rel);
  if (file !== DIST && !file.startsWith(DIST + path.sep)) return null;
  return file;
}

function serveFile(res, file) {
  const ext = path.extname(file).toLowerCase();
  res.writeHead(200, {
    "Content-Type": TYPES[ext] || "application/octet-stream",
    "Cache-Control": "private, no-store",
    "X-Robots-Tag": "noindex, nofollow",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
  });
  fs.createReadStream(file).pipe(res);
}

function serveApp(res, urlPath) {
  const candidate = safeFile(urlPath);
  if (candidate && fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
    serveFile(res, candidate);
    return;
  }
  const index = path.join(DIST, "index.html");
  if (!fs.existsSync(index)) {
    send(res, 500, page("Error", "<h1>La propuesta no está lista.</h1>"));
    return;
  }
  serveFile(res, index);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", "http://localhost");
  const open = url.pathname.match(/^\/v\/([A-Za-z0-9_-]{20,128})\/open$/);
  const view = url.pathname.match(/^\/v\/([A-Za-z0-9_-]{20,128})$/);

  if (req.method === "POST" && open) {
    const token = open[1];
    if (!tokensMatch(token) || alreadyUsed(token) || !consume(token)) {
      send(res, 410, locked());
      return;
    }
    const exp = Date.now() + SESSION_MS;
    const cookie = `${COOKIE}=${encodeURIComponent(sign(exp))}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${Math.floor(SESSION_MS / 1000)}`;
    res.writeHead(303, {
      Location: "/",
      "Set-Cookie": cookie,
      "Cache-Control": "private, no-store",
      "Referrer-Policy": "no-referrer",
    });
    res.end();
    return;
  }

  if (req.method === "GET" && view) {
    const token = view[1];
    if (!tokensMatch(token) || alreadyUsed(token)) {
      send(res, 410, locked());
      return;
    }
    send(res, 200, gate(token));
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    send(res, 405, locked());
    return;
  }

  if (!sessionExpiry(req.headers.cookie)) {
    send(res, 410, locked());
    return;
  }

  if (req.method === "HEAD") {
    res.writeHead(200, { "Cache-Control": "private, no-store" });
    res.end();
    return;
  }

  serveApp(res, url.pathname);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Propuesta de un solo uso en el puerto ${PORT}`);
});
