const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;

// CORS middleware to allow frontend to access backend
app.use(cors());
app.use(express.json());

// ========================================================================================================
//This turns a JSON file into a tiny database :)
//for persistence: we use a plain file db.json, read it into memory, modify it, write it back

const DB_PATH = path.join(__dirname, "db.json");

// reads the file to string (raw), then converts string into a JavaScript object
function readDb() {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

//first converts JS object to JSON string, then overwrites db.json.
function writeDb(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}
// ========================================================================================================

// This just to make sure server is running and works in browser
app.get("/", (req, res) => {
  res.send("Pomodoro backend running!");
});

// Reward mapping helper
function rewardForFocusMinutes(minutes) {
  const map = {
    30: "mango",
    45: "orange",
    60: "strawberry",
  };
  return map[minutes] || null;
}

// ========================================================================================================
// ENDPOINT: Complete a focus session → earn reward
app.post("/api/complete-focus", (req, res) => {
  const { focusMinutes } = req.body || {};

  if (typeof focusMinutes !== "number") {
    return res.status(400).json({ error: "Expected { focusMinutes: number }" });
  }

  const reward = rewardForFocusMinutes(focusMinutes);
  if (!reward) {
    return res.status(400).json({
      error: "Invalid focusMinutes. Use 30, 45, or 60.",
    });
  }

  const db = readDb();
  db.rewards.push({
    reward, // "banana" | "orange" | "strawberry"
    earnedAt: Date.now(), // timestamp for ordering
  });
  writeDb(db);

  res.json({ reward });
});

// ========================================================================================================
// ENDPOINT: View your gallery of rewards
app.get("/api/gallery", (req, res) => {
  const db = readDb();
  res.json({ rewards: db.rewards });
});

// ========================================================================================================
// ENDPOINT: Reset for demo purposes
app.post("/api/reset", (req, res) => {
  const db = readDb();
  db.rewards = [];
  writeDb(db);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
