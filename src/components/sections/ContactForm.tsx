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
    <form
      action={formAction}
      className="relative rounded-2xl border border-border bg-surface-elevated p-5 shadow-[var(--shadow-elevated)] sm:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent"
      />

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <p className="mb-7 font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
        New message
      </p>

      <div className="space-y-7">
        <div>
          <label
            htmlFor="name"
            className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted uppercase"
          >
            {content.fields.name}
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="field-input"
          />
          {state.fieldErrors?.name ? (
            <p className="mt-2 text-sm text-muted">{state.fieldErrors.name}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="email"
            className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted uppercase"
          >
            {content.fields.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="field-input"
          />
          {state.fieldErrors?.email ? (
            <p className="mt-2 text-sm text-muted">{state.fieldErrors.email}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="role"
            className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted uppercase"
          >
            {content.fields.role}{" "}
            <span className="text-muted-foreground normal-case tracking-normal">
              {content.fields.roleOptional}
            </span>
          </label>
          <input
            id="role"
            name="role"
            placeholder={content.fields.rolePlaceholder}
            autoComplete="organization-title"
            className="field-input"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted uppercase"
          >
            {content.fields.message}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder={content.fields.messagePlaceholder}
            className="field-input resize-none"
          />
          {state.fieldErrors?.message ? (
            <p className="mt-2 text-sm text-muted">{state.fieldErrors.message}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-8 flex justify-end sm:mt-10">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex min-h-[var(--touch-target)] items-center justify-center gap-2 rounded-full border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-background transition-[opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{pending ? content.submittingLabel : content.submitLabel}</span>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="size-3.5 stroke-current transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-0.5"
            fill="none"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {state.message ? (
        <p
          className={`mt-5 text-sm ${state.ok ? "text-foreground" : "text-muted"}`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
