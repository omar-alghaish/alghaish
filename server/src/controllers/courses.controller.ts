import { Request, Response } from "express";
import { db } from "../../drizzle/index.js";
import { course } from "../../drizzle/schema.js";
import { eq, asc, desc } from "drizzle-orm";

export async function getAllCourses(_req: Request, res: Response) {
  try {
    const rows = await db
      .select()
      .from(course)
      .orderBy(asc(course.order), desc(course.createdAt));
    res.json(rows);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
}

export async function getCourseById(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    const rows = await db
      .select()
      .from(course)
      .where(eq(course.id, id))
      .limit(1);
    if (!rows[0]) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({ error: "Failed to fetch course" });
  }
}

export async function createCourse(req: Request, res: Response) {
  try {
    const body = req.body;
    const id = body.id || crypto.randomUUID();
    const created = await db
      .insert(course)
      .values({
        id,
        titleEn: body.titleEn,
        titleAr: body.titleAr,
        provider: body.provider || "Self-Paced",
        descriptionEn: body.descriptionEn || "",
        descriptionAr: body.descriptionAr || "",
        certificateUrl: body.certificateUrl ?? null,
        courseUrl: body.courseUrl ?? null,
        skills: body.skills ?? [],
        status: body.status || "completed",
        issuedAt: body.issuedAt ?? null,
        order: Number(body.order) || 0,
      })
      .returning();
    res.status(201).json(created[0]);
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ error: "Failed to create course" });
  }
}

export async function updateCourse(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    const body = req.body;
    const updated = await db
      .update(course)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(course.id, id))
      .returning();

    if (!updated[0]) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(updated[0]);
  } catch (err) {
    console.error("Error updating course:", err);
    res.status(500).json({ error: "Failed to update course" });
  }
}

export async function deleteCourse(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    await db.delete(course).where(eq(course.id, id));
    res.json({ ok: true, id });
  } catch (err) {
    console.error("Error deleting course:", err);
    res.status(500).json({ error: "Failed to delete course" });
  }
}
