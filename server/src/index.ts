import "dotenv/config";
import express from "express";
import cors from "cors";
import { db } from "../drizzle/index.js";
import { project, skill, profile, contactMessage } from "../drizzle/schema.js";
import { eq, asc } from "drizzle-orm";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(",") || "*",
    credentials: true,
  })
);
app.use(express.json());

// ---------- Health ----------
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "alghaish-server", time: new Date().toISOString() });
});

// ---------- Profile ----------
app.get("/api/profile", async (_req, res) => {
  try {
    const rows = await db.select().from(profile).limit(1);
    res.json(rows[0] ?? null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// ---------- Skills ----------
app.get("/api/skills", async (_req, res) => {
  try {
    const rows = await db.select().from(skill).orderBy(asc(skill.order));
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

// ---------- Projects ----------
app.get("/api/projects", async (_req, res) => {
  try {
    const rows = await db.select().from(project).orderBy(asc(project.order));
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

app.get("/api/projects/:id", async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(project)
      .where(eq(project.id, req.params.id))
      .limit(1);
    res.json(rows[0] ?? null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// ---------- Contact ----------
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body ?? {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email and message are required" });
  }
  try {
    const id = crypto.randomUUID();
    await db.insert(contactMessage).values({ id, name, email, message });
    res.status(201).json({ ok: true, id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Alghaish server running on http://localhost:${PORT}`);
});
