"use client";

import { useActionState } from "react";
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/actions/contact";
import type { ContactContent } from "@/lib/content";

const initialState: ContactFormState = {
  ok: false,
  message: "",
};

type ContactFormProps = {
  content: ContactContent;
};

export function ContactForm({ content }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-10">
      <div>
        <h2 className="text-[length:var(--text-xl)] tracking-[var(--tracking-tight)]">
          {content.title}
        </h2>
        <p className="mt-4 text-muted">{content.intro}</p>
        <p className="mt-4 text-sm leading-[var(--leading-snug)] text-muted-foreground">
          {content.supporting}
        </p>
      </div>

      <form
        action={formAction}
        className="space-y-4 rounded-2xl border border-border bg-surface-elevated p-4 shadow-[var(--shadow-elevated)] sm:p-6"
      >
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            {content.fields.name}
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-base outline-none transition-[border-color] duration-[var(--duration-fast)] focus:border-foreground sm:py-3 sm:text-sm"
          />
          {state.fieldErrors?.name ? (
            <p className="mt-2 text-sm text-muted">{state.fieldErrors.name}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            {content.fields.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-base outline-none transition-[border-color] duration-[var(--duration-fast)] focus:border-foreground sm:py-3 sm:text-sm"
          />
          {state.fieldErrors?.email ? (
            <p className="mt-2 text-sm text-muted">{state.fieldErrors.email}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="role" className="mb-2 block text-sm font-medium">
            {content.fields.role}{" "}
            <span className="text-muted">{content.fields.roleOptional}</span>
          </label>
          <input
            id="role"
            name="role"
            placeholder={content.fields.rolePlaceholder}
            autoComplete="organization-title"
            className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-base outline-none transition-[border-color] duration-[var(--duration-fast)] focus:border-foreground placeholder:text-muted-foreground sm:py-3 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium">
            {content.fields.message}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder={content.fields.messagePlaceholder}
            className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-base outline-none transition-[border-color] duration-[var(--duration-fast)] focus:border-foreground placeholder:text-muted-foreground sm:py-3 sm:text-sm"
          />
          {state.fieldErrors?.message ? (
            <p className="mt-2 text-sm text-muted">{state.fieldErrors.message}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-[var(--touch-target)] w-full items-center justify-center rounded-full border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-background transition-[opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? content.submittingLabel : content.submitLabel}
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
