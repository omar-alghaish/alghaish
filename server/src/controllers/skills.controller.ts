import { Request, Response } from "express";
import { db } from "../../drizzle/index.js";
import { skill } from "../../drizzle/schema.js";
import { eq, asc } from "drizzle-orm";

export async function getAllSkills(_req: Request, res: Response) {
  try {
    const rows = await db.select().from(skill).orderBy(asc(skill.order));
    res.json(rows);
  } catch (err) {
    console.error("Error fetching skills:", err);
    res.status(500).json({ error: "Failed to fetch skills" });
  }
}

export async function createSkill(req: Request, res: Response) {
  try {
    const body = req.body;
    const id = body.id || crypto.randomUUID();
    const created = await db
      .insert(skill)
      .values({
        id,
        nameEn: body.nameEn,
        nameAr: body.nameAr,
        category: body.category || "General",
        level: Number(body.level) || 50,
        icon: body.icon ?? null,
        order: Number(body.order) || 0,
      })
      .returning();
    res.status(201).json(created[0]);
  } catch (err) {
    console.error("Error creating skill:", err);
    res.status(500).json({ error: "Failed to create skill" });
  }
}

export async function updateSkill(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    const body = req.body;
    const updated = await db
      .update(skill)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(skill.id, id))
      .returning();

    if (!updated[0]) {
      return res.status(404).json({ error: "Skill not found" });
    }
    res.json(updated[0]);
  } catch (err) {
    console.error("Error updating skill:", err);
    res.status(500).json({ error: "Failed to update skill" });
  }
}

export async function deleteSkill(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    await db.delete(skill).where(eq(skill.id, id));
    res.json({ ok: true, id });
  } catch (err) {
    console.error("Error deleting skill:", err);
    res.status(500).json({ error: "Failed to delete skill" });
  }
}
