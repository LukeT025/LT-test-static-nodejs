import express from "express";
import cors from "cors";
import { randomInt } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

/**
 * CORS allowlist for your static site
 * Set this in Azure App Settings:
 *   ALLOW_ORIGIN=https://<your-static-site>.azurestaticapps.net
 */
const allowedOrigin = process.env.ALLOW_ORIGIN || "https://your-static-site.azurestaticapps.net";
const corsOk = cors({
  origin: allowedOrigin,
  methods: ["GET"],
  optionsSuccessStatus: 204
});

/* ---------- RESTful APIs ---------- */

// Wake/health ping (CORS-enabled)
app.get("/api/wakeup", corsOk, (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Single roll (1..sides) (CORS-enabled)
app.get("/api/roll", corsOk, (req, res) => {
  const sides = clampInt(parseInt(req.query.sides, 10), 2, 1_000_000);
  const value = randomInt(0, sides) + 1; // uniform 0..sides-1 +1
  res.json({ value, sides });
});

// Multiple rolls (dice x sides) (CORS-enabled)
app.get("/api/rolls", corsOk, (req, res) => {
  const dice  = clampInt(parseInt(req.query.dice, 10), 1, 10_000);
  const sides = clampInt(parseInt(req.query.sides, 10), 2, 1_000_000);
  const values = Array.from({ length: dice }, () => randomInt(0, sides) + 1);
  const sum = values.reduce((a, b) => a + b, 0);
  res.json({ dice, sides, values, sum });
});

/**
 * INTENTIONAL CORS FAILURE:
 * This route returns JSON but is NOT wrapped in CORS middleware.
 * Calling this cross-origin from your static site will be blocked by the browser.
 */
app.get("/api/blocked", (_req, res) => {
  res.json({ ok: true, msg: "This endpoint omits CORS headers intentionally." });
});

/* ---------- Test page (no standard UI) ---------- */
// Serves ./public/index.html which only tests APIs.
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Dice Roller API listening on http://0.0.0.0:${PORT}`);
});

/* ---------- utils ---------- */
function clampInt(n, min, max){
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, Math.trunc(n)));
}
