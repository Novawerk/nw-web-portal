import { NextResponse } from "next/server";
import { newsletterSignupSchema } from "@/lib/schemas";
import { sendNewsletterNotification } from "@/lib/email";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = newsletterSignupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  try {
    await sendNewsletterNotification(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[newsletter] send failed:", error);
    return NextResponse.json(
      { error: "Could not subscribe. Please try again." },
      { status: 500 },
    );
  }
}
