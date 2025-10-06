import express from "express";
import cors from "cors";
import { randomInt } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

/*
 * Allow ONLY your STATIC site origin for cross-origin requests:
 * https://zealous-cliff-0dbb7041e.1.azurestaticapps.net
 */
const allowedOrigin = "https://zealous-cliff-0dbb7041e.1.azurestaticapps.net";
const corsOk = cors({
  origin: allowedOrigin,
  methods: ["GET"],
  optionsSuccessStatus: 204
});

/* ---------- RESTful APIs (CORS-enabled) ---------- */

// Health/wake
app.get("/api/wakeup", corsOk, (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Single roll (1..sides)
app.get("/api/roll", corsOk, (req, res) => {
  const sides = clampInt(parseInt(req.query.sides, 10), 2, 1_000_000);
  const value = randomInt(0, sides) + 1;
  res.json({ value, sides });
});

// Multiple rolls (dice × sides)
app.get("/api/rolls", corsOk, (req, res) => {
  const dice  = clampInt(parseInt(req.query.dice, 10), 1, 10_000);
  const sides = clampInt(parseInt(req.query.sides, 10), 2, 1_000_000);
  const values = Array.from({ length: dice }, () => randomInt(0, sides) + 1);
  const sum = values.reduce((a, b) => a + b, 0);
  res.json({ dice, sides, values, sum });
});

/*
 * Intentional CORS failure route: DO NOT add corsOk here.
 * Your static site will be blocked by the browser when calling this.
 */
app.get("/api/blocked", (_req, res) => {
  res.json({ ok: true, msg: "Intentionally missing CORS headers for demo." });
});

/* ---------- Minimal tester page (NOT the dice UI) ---------- */
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Dice Roller API listening on http://0.0.0.0:${PORT}`);
});

/* utils */
function clampInt(n, min, max){
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, Math.trunc(n)));
}
