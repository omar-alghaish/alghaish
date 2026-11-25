import { Request, Response } from "express";
import { db } from "../../drizzle/index.js";
import { contactMessage } from "../../drizzle/schema.js";
import { eq, desc } from "drizzle-orm";

export async function getAllMessages(_req: Request, res: Response) {
  try {
    const rows = await db
      .select()
      .from(contactMessage)
      .orderBy(desc(contactMessage.createdAt));
    res.json(rows);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
}

export async function createMessage(req: Request, res: Response) {
  try {
    const { name, email, message } = req.body ?? {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email and message are required" });
    }
    const id = crypto.randomUUID();
    const created = await db
      .insert(contactMessage)
      .values({
        id,
        name,
        email,
        message,
        read: false,
      })
      .returning();
    res.status(201).json({ ok: true, id, message: created[0] });
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ error: "Failed to save message" });
  }
}

export async function markMessageRead(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    const read = req.body.read !== undefined ? Boolean(req.body.read) : true;
    const updated = await db
      .update(contactMessage)
      .set({ read })
      .where(eq(contactMessage.id, id))
      .returning();

    if (!updated[0]) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json(updated[0]);
  } catch (err) {
    console.error("Error updating message status:", err);
    res.status(500).json({ error: "Failed to update message" });
  }
}

export async function deleteMessage(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    await db.delete(contactMessage).where(eq(contactMessage.id, id));
    res.json({ ok: true, id });
  } catch (err) {
    console.error("Error deleting message:", err);
    res.status(500).json({ error: "Failed to delete message" });
  }
}
