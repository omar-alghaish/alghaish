import { Request, Response } from "express";
import { db } from "../../drizzle/index.js";
import { profile } from "../../drizzle/schema.js";
import { eq } from "drizzle-orm";

export async function getProfile(_req: Request, res: Response) {
  try {
    const rows = await db.select().from(profile).limit(1);
    res.json(rows[0] ?? null);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
}

export async function updateProfile(req: Request, res: Response) {
  try {
    const existing = await db.select().from(profile).limit(1);
    const data = req.body;

    if (existing.length > 0) {
      const updated = await db
        .update(profile)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(profile.id, existing[0].id))
        .returning();
      res.json(updated[0]);
    } else {
      const id = data.id || crypto.randomUUID();
      const created = await db
        .insert(profile)
        .values({
          id,
          fullNameEn: data.fullNameEn || "Omar Alghaish",
          fullNameAr: data.fullNameAr || "عمر الغايش",
          titleEn: data.titleEn || "Software Engineer",
          titleAr: data.titleAr || "مهندس برمجيات",
          bioEn: data.bioEn || "",
          bioAr: data.bioAr || "",
          ...data,
        })
        .returning();
      res.status(201).json(created[0]);
    }
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
}
