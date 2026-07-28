"use client";

import { useActionState, useId } from "react";
import { submitEnquiry, type ContactState } from "@/app/actions/contact";
import { Label } from "@/components/ui";

const INITIAL: ContactState = { status: "idle" };

const KINDS = ["A project", "A role", "Not sure yet"];
const BUDGETS = ["Not sure yet", "Under $2k", "$2k – $6k", "$6k – $15k", "$15k+"];

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitEnquiry, INITIAL);
  const id = useId();

  if (state.status === "ok") {
    return (
      <div className="border border-line rounded-2xl bg-surface p-6 sm:p-8 flex flex-col gap-3">
        <Label tone="accent" className="tracking-[0.14em]">
          Message sent
        </Label>
        <p className="font-serif text-[clamp(19px,2vw,24px)] leading-[1.45] text-ink text-balance">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="border border-line rounded-2xl bg-surface p-6 sm:p-8 flex flex-col gap-5"
    >
      <div className="flex flex-col gap-1.5">
        <Label tone="accent" className="tracking-[0.14em]">
          Tell me where it gets stuck
        </Label>
        <p className="text-[14px] leading-[1.6] text-muted">
          A sentence is plenty. I read every one of these myself.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id={`${id}-name`}
          name="name"
          label="Your name"
          autoComplete="name"
          required
          error={state.errors?.name}
        />
        <Field
          id={`${id}-email`}
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          required
          error={state.errors?.email}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id={`${id}-business`}
          name="business"
          label="Business or company"
          hint="Optional"
          autoComplete="organization"
          error={state.errors?.business}
        />
        <Select id={`${id}-kind`} name="kind" label="You're here about" options={KINDS} />
      </div>

      <Select
        id={`${id}-budget`}
        name="budget"
        label="Rough budget"
        hint="Optional — it only helps me scope honestly"
        options={BUDGETS}
      />

      <div className="flex flex-col gap-1.5">
        <FieldLabel htmlFor={`${id}-message`} label="What's happening?" required />
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          required
          maxLength={4000}
          aria-invalid={state.errors?.message ? true : undefined}
          placeholder="Missed calls, a form nobody owns, staff retyping things, a site that isn't pulling its weight…"
          className="border border-line-strong rounded-xl bg-canvas px-3.5 py-3 text-[15px] leading-[1.6] text-ink placeholder:text-ghost resize-y"
        />
        <FieldError error={state.errors?.message} />
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor={`${id}-company-website`}>Company website</label>
        <input
          id={`${id}-company-website`}
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className="text-[14px] leading-[1.6] text-accent-deep">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2.5 bg-ink text-canvas text-[15px] font-medium px-[22px] py-[13px] rounded-full transition-colors hover:bg-accent disabled:opacity-60"
        >
          {isPending ? "Sending…" : "Send it"}
          <span aria-hidden="true" className="font-mono text-[13px]">
            →
          </span>
        </button>
        <p className="text-[13px] text-muted">
          Goes straight to my inbox. No list, no automated follow-up sequence.
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  hint,
  error,
  type = "text",
  required = false,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  hint?: string;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <FieldLabel htmlFor={id} label={label} hint={hint} required={required} />
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        className="border border-line-strong rounded-xl bg-canvas px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ghost"
      />
      <FieldError error={error} />
    </div>
  );
}

function Select({
  id,
  name,
  label,
  hint,
  options,
}: {
  id: string;
  name: string;
  label: string;
  hint?: string;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <FieldLabel htmlFor={id} label={label} hint={hint} />
      <select
        id={id}
        name={name}
        defaultValue={options[0]}
        className="border border-line-strong rounded-xl bg-canvas px-3.5 py-2.5 text-[15px] text-ink"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function FieldLabel({
  htmlFor,
  label,
  hint,
  required,
}: {
  htmlFor: string;
  label: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-wrap items-baseline gap-2">
      <span className="text-[14px] font-medium text-ink">{label}</span>
      {required ? (
        <span className="sr-only">(required)</span>
      ) : hint ? (
        <span className="font-mono text-[10.5px] text-ghost">{hint}</span>
      ) : null}
    </label>
  );
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p role="alert" className="text-[13px] text-accent-deep">
      {error}
    </p>
  );
}
