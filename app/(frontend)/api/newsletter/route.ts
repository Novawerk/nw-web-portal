import { NextResponse } from "next/server";
import { newsletterSignupSchema } from "@/lib/schemas";
import { sendNewsletterNotification } from "@/lib/email";
import { saveNewsletterSubscriber } from "@/lib/payload-write";

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

  const [payloadRes, emailRes] = await Promise.allSettled([
    saveNewsletterSubscriber(parsed.data),
    sendNewsletterNotification(parsed.data),
  ]);

  if (payloadRes.status === "rejected") {
    console.error("[newsletter] payload write failed:", payloadRes.reason);
  }
  if (emailRes.status === "rejected") {
    console.error("[newsletter] email failed:", emailRes.reason);
  }

  if (payloadRes.status === "rejected" && emailRes.status === "rejected") {
    return NextResponse.json(
      { error: "Could not subscribe. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
