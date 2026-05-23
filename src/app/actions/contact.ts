"use server";

import { getContactContent } from "@/lib/content";
import { Resend } from "resend";
import { z } from "zod";

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
  const roleLine = parsed.data.role ? `\nRole/team: ${parsed.data.role}` : "";

  const { error } = await resend.emails.send({
    from: "cursorfieldcto.com <onboarding@resend.dev>",
    to,
    replyTo: parsed.data.email,
    subject: `cursorfieldcto.com: note from ${parsed.data.name}`,
    text: `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}${roleLine}\n\n${parsed.data.message}`,
  });

  if (error) {
    return {
      ok: false,
      message: contact.sendErrorMessage,
    };
  }

  return {
    ok: true,
    message: contact.successMessage,
  };
}
