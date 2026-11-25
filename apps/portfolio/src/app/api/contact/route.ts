import { NextResponse } from "next/server";
import { getServerUrl } from "@/lib/server-api";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const targetUrl = getServerUrl("api/contact");

    const res = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Failed to forward contact request to server service:", err);
    return NextResponse.json(
      { error: "Failed to deliver message to backend" },
      { status: 500 }
    );
  }
}
