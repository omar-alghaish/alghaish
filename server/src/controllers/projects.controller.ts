import { Request, Response } from "express";
import { db } from "../../drizzle/index.js";
import { project } from "../../drizzle/schema.js";
import { eq, asc, desc } from "drizzle-orm";

export async function getAllProjects(_req: Request, res: Response) {
  try {
    const rows = await db
      .select()
      .from(project)
      .orderBy(asc(project.order), desc(project.createdAt));
    res.json(rows);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
}

export async function getProjectById(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    const rows = await db
      .select()
      .from(project)
      .where(eq(project.id, id))
      .limit(1);
    if (!rows[0]) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(500).json({ error: "Failed to fetch project" });
  }
}

export async function createProject(req: Request, res: Response) {
  try {
    const body = req.body;
    const id = body.id || crypto.randomUUID();
    const created = await db
      .insert(project)
      .values({
        id,
        titleEn: body.titleEn,
        titleAr: body.titleAr,
        descriptionEn: body.descriptionEn,
        descriptionAr: body.descriptionAr,
        imageUrl: body.imageUrl ?? null,
        liveUrl: body.liveUrl ?? null,
        githubUrl: body.githubUrl ?? null,
        tags: body.tags ?? [],
        featured: Boolean(body.featured),
        order: Number(body.order) || 0,
      })
      .returning();
    res.status(201).json(created[0]);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ error: "Failed to create project" });
  }
}

export async function updateProject(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    const body = req.body;
    const updated = await db
      .update(project)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(project.id, id))
      .returning();

    if (!updated[0]) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(updated[0]);
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ error: "Failed to update project" });
  }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    await db.delete(project).where(eq(project.id, id));
    res.json({ ok: true, id });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ error: "Failed to delete project" });
  }
}
