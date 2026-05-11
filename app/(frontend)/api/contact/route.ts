import { NextResponse } from "next/server";
import { contactSubmissionSchema } from "@/lib/schemas";
import { sendContactEmail } from "@/lib/email";
import { saveContactSubmission } from "@/lib/payload-write";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Write to Payload (durable record) and send email (notification) in
  // parallel. We accept the submission as long as one of them succeeds.
  const [payloadRes, emailRes] = await Promise.allSettled([
    saveContactSubmission(parsed.data),
    sendContactEmail(parsed.data),
  ]);

  if (payloadRes.status === "rejected") {
    console.error("[contact] payload write failed:", payloadRes.reason);
  }
  if (emailRes.status === "rejected") {
    console.error("[contact] email failed:", emailRes.reason);
  }

  if (payloadRes.status === "rejected" && emailRes.status === "rejected") {
    return NextResponse.json(
      { error: "Could not record your application. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
