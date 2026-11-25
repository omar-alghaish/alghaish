import { Request, Response } from "express";
import { db } from "../../drizzle/index.js";
import { project, skill, course, contactMessage } from "../../drizzle/schema.js";
import { count, eq } from "drizzle-orm";

export async function getStats(_req: Request, res: Response) {
  try {
    const [
      projectsRes,
      skillsRes,
      coursesRes,
      totalMessagesRes,
      unreadMessagesRes,
    ] = await Promise.all([
      db.select({ count: count() }).from(project),
      db.select({ count: count() }).from(skill),
      db.select({ count: count() }).from(course),
      db.select({ count: count() }).from(contactMessage),
      db
        .select({ count: count() })
        .from(contactMessage)
        .where(eq(contactMessage.read, false)),
    ]);

    res.json({
      projectsCount: Number(projectsRes[0]?.count ?? 0),
      skillsCount: Number(skillsRes[0]?.count ?? 0),
      coursesCount: Number(coursesRes[0]?.count ?? 0),
      messagesCount: Number(totalMessagesRes[0]?.count ?? 0),
      unreadMessagesCount: Number(unreadMessagesRes[0]?.count ?? 0),
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
}
