"use server";

import { Resend } from "resend";
import { SITE } from "@/lib/projects";

export type ContactState = {
  status: "idle" | "ok" | "error";
  message?: string;
  /** Field-level problems, keyed by input name. */
  errors?: Record<string, string>;
};

const MAX = { name: 120, email: 200, business: 160, message: 4000 };

/**
 * The intake this site argues for: enough structure that the reply can be
 * useful, short enough that nobody abandons it.
 *
 * Everything is validated here rather than in the browser — the client-side
 * checks are a convenience, not the boundary.
 */
export async function submitEnquiry(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot. Real people never fill this in; it is hidden from them.
  if (String(formData.get("company_website") ?? "").trim() !== "") {
    return { status: "ok", message: "Thanks — I'll be in touch." };
  }

  const name = str(formData, "name");
  const email = str(formData, "email");
  const business = str(formData, "business");
  const kind = str(formData, "kind") || "A project";
  const budget = str(formData, "budget");
  const message = str(formData, "message");

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please tell me your name.";
  if (name.length > MAX.name) errors.name = "That name is unexpectedly long.";
  if (!email) errors.email = "I need an email address to reply to.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = "That email address doesn't look right.";
  if (email.length > MAX.email) errors.email = "That email address is too long.";
  if (!message) errors.message = "Tell me where it gets stuck — a sentence is plenty.";
  if (message.length > MAX.message) errors.message = "Could you trim that a little?";
  if (business.length > MAX.business) errors.business = "That's too long for this field.";

  if (Object.keys(errors).length) {
    return { status: "error", message: "Have a look at the fields below.", errors };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Never pretend a message was delivered when it wasn't.
    console.error("[contact] RESEND_API_KEY is not set — enquiry not delivered.");
    return {
      status: "error",
      message: `Sending is not configured yet, so this form can't reach me. Email ${SITE.email} directly and it will.`,
    };
  }

  const to = process.env.CONTACT_TO || SITE.email;
  const from = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";
  const resend = new Resend(apiKey);

  const summary = [
    `From:     ${name} <${email}>`,
    business ? `Business: ${business}` : null,
    `Looking:  ${kind}`,
    budget ? `Budget:   ${budget}` : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `${kind} — ${name}${business ? ` · ${business}` : ""}`,
      text: summary,
    });

    if (error) {
      console.error("[contact] Resend rejected the enquiry:", error);
      return {
        status: "error",
        message: `That didn't send. Email ${SITE.email} directly and I'll pick it up.`,
      };
    }
  } catch (cause) {
    console.error("[contact] Enquiry failed to send:", cause);
    return {
      status: "error",
      message: `That didn't send. Email ${SITE.email} directly and I'll pick it up.`,
    };
  }

  // A confirmation the sender actually receives — the whole argument of this site
  // is that the handoff shouldn't end in silence. Failing to confirm is not worth
  // failing the submission over, since the enquiry itself already landed.
  try {
    await resend.emails.send({
      from,
      to: email,
      replyTo: SITE.email,
      subject: "I got your message — Manoj Kumar",
      text: [
        `Hi ${name},`,
        "",
        "Your message reached me and I'll reply personally, usually within a day.",
        "If it's urgent, call or text me on " + SITE.phone + ".",
        "",
        "Here's what you sent, so you have a copy:",
        "",
        message,
        "",
        "— Manoj",
        SITE.email,
      ].join("\n"),
    });
  } catch (cause) {
    console.error("[contact] Enquiry delivered but confirmation failed:", cause);
  }

  return {
    status: "ok",
    message:
      "That reached me, and a copy is on its way to your inbox. I'll reply personally — usually within a day.",
  };
}

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}
