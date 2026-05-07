import { Resend } from "resend";
import type { ContactSubmission, NewsletterSignup } from "./schemas";

const apiKey = process.env.RESEND_API_KEY;
const toAddress = process.env.CONTACT_TO_EMAIL ?? "hello@novawerk.io";
const fromAddress = process.env.CONTACT_FROM_EMAIL ?? "NovaWerk <hello@novawerk.io>";

const resend = apiKey ? new Resend(apiKey) : null;

function escape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendContactEmail(submission: ContactSubmission) {
  if (!resend) {
    console.log("[contact] RESEND_API_KEY not set — submission logged:", submission);
    return { ok: true, mode: "logged" as const };
  }

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px;">
      <h2 style="margin-bottom: 4px;">New community application</h2>
      <p style="color: #666; margin-top: 0;">Submitted via novawerk.io/community</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 6px 0; color: #888; width: 140px;">Name</td><td>${escape(submission.name)}</td></tr>
        <tr><td style="padding: 6px 0; color: #888;">Email</td><td><a href="mailto:${escape(submission.email)}">${escape(submission.email)}</a></td></tr>
        <tr><td style="padding: 6px 0; color: #888;">Role</td><td>${escape(submission.role)}</td></tr>
        <tr><td style="padding: 6px 0; color: #888;">Interests</td><td>${submission.interests.map(escape).join(", ")}</td></tr>
        ${submission.links ? `<tr><td style="padding: 6px 0; color: #888;">Links</td><td>${escape(submission.links)}</td></tr>` : ""}
      </table>
      <h3 style="margin-top: 24px; margin-bottom: 8px;">Why they want to join</h3>
      <p style="white-space: pre-wrap; line-height: 1.6;">${escape(submission.motivation)}</p>
    </div>
  `;

  const result = await resend.emails.send({
    from: fromAddress,
    to: toAddress,
    replyTo: submission.email,
    subject: `New community application: ${submission.name}`,
    html,
  });

  if (result.error) throw new Error(result.error.message);
  return { ok: true, mode: "sent" as const, id: result.data?.id };
}

export async function sendNewsletterNotification(signup: NewsletterSignup) {
  if (!resend) {
    console.log("[newsletter] RESEND_API_KEY not set — signup logged:", signup);
    return { ok: true, mode: "logged" as const };
  }

  const result = await resend.emails.send({
    from: fromAddress,
    to: toAddress,
    subject: `New newsletter signup: ${signup.email}`,
    html: `<p>New subscriber: <a href="mailto:${escape(signup.email)}">${escape(signup.email)}</a></p>`,
  });

  if (result.error) throw new Error(result.error.message);
  return { ok: true, mode: "sent" as const, id: result.data?.id };
}
