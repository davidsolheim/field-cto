"use server";

import { getContactContent } from "@/lib/content";
import { Resend } from "resend";
import { z } from "zod";

const FROM_ADDRESS = "cursorfieldcto.com <notifications@cursorfieldcto.com>";
const DAVID_REPLY_TO = "dts@davidsolheim.com";
const SITE_URL = "https://cursorfieldcto.com";
const SIGNATURE_NAME = "David Solheim";
const SIGNATURE_TITLE = "Field CTO · AI Adoption Strategist";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid work email"),
  role: z.string().trim().max(120).optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(4000),
  website: z.string().max(0).optional(),
});

export type ContactFormState = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<"name" | "email" | "role" | "message", string>>;
};

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function paragraphsToHtml(text: string): string {
  return text
    .split(/\n{2,}/)
    .map(
      (para) =>
        `<p style="margin:0 0 16px 0;color:#0a0a0a;font-size:15px;line-height:1.6;">${escapeHtml(
          para,
        ).replace(/\n/g, "<br />")}</p>`,
    )
    .join("");
}

type EmailParts = { subject: string; html: string; text: string };

type EmailContext = {
  name: string;
  email: string;
  role?: string;
  message: string;
};

function layout(bodyHtml: string, preheader: string): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light only" />
    <meta name="supported-color-schemes" content="light only" />
    <title>cursorfieldcto.com</title>
  </head>
  <body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0a0a0a;-webkit-text-size-adjust:100%;">
    <span style="display:none;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;font-size:1px;line-height:1px;color:#f5f5f5;">${escapeHtml(preheader)}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f5f5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#ffffff;border:1px solid rgba(10,10,10,0.08);border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:32px 32px 0 32px;">
                <div style="font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#737373;">
                  cursorfieldcto.com
                </div>
              </td>
            </tr>
            ${bodyHtml}
            <tr>
              <td style="padding:24px 32px 32px 32px;border-top:1px solid rgba(10,10,10,0.08);">
                <p style="margin:0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#737373;">
                  <a href="${SITE_URL}" style="color:#737373;text-decoration:none;border-bottom:1px solid rgba(115,115,115,0.4);">${SITE_URL.replace(/^https?:\/\//, "")}</a>
                </p>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0 0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#a3a3a3;">
            © ${new Date().getFullYear()} David Solheim
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function metaRow(label: string, value: string, valueHref?: string): string {
  const valueHtml = valueHref
    ? `<a href="${valueHref}" style="color:#0a0a0a;text-decoration:none;border-bottom:1px solid rgba(10,10,10,0.25);">${escapeHtml(value)}</a>`
    : escapeHtml(value);
  return `<tr>
    <td style="padding:0 0 14px 0;">
      <div style="font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#737373;margin-bottom:4px;">
        ${escapeHtml(label)}
      </div>
      <div style="font-size:15px;line-height:1.5;color:#0a0a0a;">${valueHtml}</div>
    </td>
  </tr>`;
}

function buildNotificationEmail({ name, email, role, message }: EmailContext): EmailParts {
  const preheader = `New message from ${name}${role ? ` (${role})` : ""}`;

  const metaRows = [
    metaRow("From", name),
    metaRow("Email", email, `mailto:${email}`),
    role ? metaRow("Role / team", role) : "",
  ]
    .filter(Boolean)
    .join("");

  const body = `
    <tr>
      <td style="padding:16px 32px 8px 32px;">
        <h1 style="margin:0;font-size:24px;line-height:1.25;letter-spacing:-0.02em;color:#0a0a0a;font-weight:600;">
          New message from ${escapeHtml(name)}
        </h1>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 32px 0 32px;">
        <p style="margin:0;font-size:14px;line-height:1.5;color:#525252;">
          Sent via the Connect form. Reply to this email to respond directly.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 32px 0 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${metaRows}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 32px 24px 32px;">
        <div style="height:1px;background:rgba(10,10,10,0.08);margin:8px 0 24px 0;"></div>
        <div style="font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#737373;margin-bottom:12px;">
          Message
        </div>
        ${paragraphsToHtml(message)}
      </td>
    </tr>
  `;

  const roleLine = role ? `\nRole/team: ${role}` : "";
  const text = [
    `New message from ${name}`,
    "",
    `Name: ${name}`,
    `Email: ${email}${roleLine}`,
    "",
    "Message:",
    message,
    "",
    "—",
    "Reply to this email to respond directly.",
  ].join("\n");

  return {
    subject: `New message from ${name} — cursorfieldcto.com`,
    html: layout(body, preheader),
    text,
  };
}

function buildConfirmationEmail({ name, message }: EmailContext): EmailParts {
  const firstName = name.split(/\s+/)[0] || name;
  const preheader = `Thanks for reaching out — I'll reply within 48 hours.`;

  const body = `
    <tr>
      <td style="padding:16px 32px 8px 32px;">
        <h1 style="margin:0;font-size:24px;line-height:1.25;letter-spacing:-0.02em;color:#0a0a0a;font-weight:600;">
          Thanks, ${escapeHtml(firstName)} — message received.
        </h1>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 32px 0 32px;">
        <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#0a0a0a;">
          Your note made it to my inbox. I read every message personally and reply within 48 hours — usually faster.
        </p>
        <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#0a0a0a;">
          If something is time-sensitive, you can also reach me directly at
          <a href="mailto:${DAVID_REPLY_TO}" style="color:#0a0a0a;text-decoration:none;border-bottom:1px solid rgba(10,10,10,0.25);">${DAVID_REPLY_TO}</a>.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 32px 8px 32px;">
        <div style="height:1px;background:rgba(10,10,10,0.08);margin-bottom:20px;"></div>
        <div style="font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#737373;margin-bottom:12px;">
          For your records
        </div>
        ${paragraphsToHtml(message)}
      </td>
    </tr>
    <tr>
      <td style="padding:8px 32px 24px 32px;">
        <p style="margin:24px 0 4px 0;font-size:15px;line-height:1.5;color:#0a0a0a;">— ${escapeHtml(SIGNATURE_NAME)}</p>
        <p style="margin:0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#737373;">
          ${escapeHtml(SIGNATURE_TITLE)}
        </p>
      </td>
    </tr>
  `;

  const text = [
    `Thanks, ${firstName} — message received.`,
    "",
    "Your note made it to my inbox. I read every message personally and reply within 48 hours — usually faster.",
    "",
    `If something is time-sensitive, you can also reach me directly at ${DAVID_REPLY_TO}.`,
    "",
    "— For your records —",
    "",
    message,
    "",
    `— ${SIGNATURE_NAME}`,
    SIGNATURE_TITLE,
  ].join("\n");

  return {
    subject: `Thanks, ${firstName} — I got your message`,
    html: layout(body, preheader),
    text,
  };
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const contact = getContactContent();
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    role: formData.get("role") || undefined,
    message: formData.get("message"),
    website: formData.get("website") || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: ContactFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (
        field === "name" ||
        field === "email" ||
        field === "role" ||
        field === "message"
      ) {
        fieldErrors[field] = issue.message;
      }
    }

    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  if (parsed.data.website) {
    return { ok: true, message: contact.successMessage };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    return {
      ok: false,
      message: contact.configErrorMessage,
    };
  }

  const resend = new Resend(apiKey);
  const context: EmailContext = {
    name: parsed.data.name,
    email: parsed.data.email,
    role: parsed.data.role,
    message: parsed.data.message,
  };

  const notification = buildNotificationEmail(context);
  const confirmation = buildConfirmationEmail(context);

  const [notifyResult, confirmResult] = await Promise.all([
    resend.emails.send({
      from: FROM_ADDRESS,
      to,
      replyTo: parsed.data.email,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
    }),
    resend.emails.send({
      from: FROM_ADDRESS,
      to: parsed.data.email,
      replyTo: DAVID_REPLY_TO,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    }),
  ]);

  if (notifyResult.error) {
    console.error("[contact] notification email failed", notifyResult.error);
    return {
      ok: false,
      message: contact.sendErrorMessage,
    };
  }

  if (confirmResult.error) {
    console.error("[contact] confirmation email failed", confirmResult.error);
  }

  return {
    ok: true,
    message: contact.successMessage,
  };
}
