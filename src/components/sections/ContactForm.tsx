"use client";

import { useActionState } from "react";
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/actions/contact";

const initialState: ContactFormState = {
  ok: false,
  message: "",
};

type ContactFormProps = {
  title: string;
  intro: string;
};

export function ContactForm({ title, intro }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
      <div>
        <h2 className="text-[length:var(--text-xl)] tracking-[var(--tracking-tight)]">
          {title}
        </h2>
        <p className="mt-4 text-muted">{intro}</p>
      </div>

      <form action={formAction} className="space-y-4 rounded-2xl border border-border bg-surface-elevated p-6 shadow-[var(--shadow-elevated)]">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-[border-color] duration-[var(--duration-fast)] focus:border-foreground"
          />
          {state.fieldErrors?.name ? (
            <p className="mt-2 text-sm text-muted">{state.fieldErrors.name}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-[border-color] duration-[var(--duration-fast)] focus:border-foreground"
          />
          {state.fieldErrors?.email ? (
            <p className="mt-2 text-sm text-muted">{state.fieldErrors.email}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-medium">
            Company <span className="text-muted">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-[border-color] duration-[var(--duration-fast)] focus:border-foreground"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-[border-color] duration-[var(--duration-fast)] focus:border-foreground"
          />
          {state.fieldErrors?.message ? (
            <p className="mt-2 text-sm text-muted">{state.fieldErrors.message}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full items-center justify-center rounded-full border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-background transition-[opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending..." : "Send Message"}
        </button>

        {state.message ? (
          <p
            className={`text-sm ${state.ok ? "text-foreground" : "text-muted"}`}
            role="status"
          >
            {state.message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
