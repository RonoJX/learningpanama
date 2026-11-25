"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

type Status = "idle" | "sending" | "success" | "error" | "invalid" | "tooMany";

export function ContactForm({ labels }: { labels: Dictionary["contact"] }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        form.reset();
        setStatus("success");
      } else if (response.status === 400) {
        setStatus("invalid");
      } else if (response.status === 429) {
        setStatus("tooMany");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const field =
    "mt-1 w-full rounded-xl border border-border bg-white px-4 py-2.5 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

  const message =
    status === "success"
      ? labels.success
      : status === "invalid"
        ? labels.invalid
        : status === "tooMany"
          ? labels.tooMany
          : status === "error"
            ? labels.error
            : null;

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      <label className="block text-sm font-medium">
        {labels.name}
        <input name="name" required maxLength={80} autoComplete="name" className={field} />
      </label>
      <label className="block text-sm font-medium">
        {labels.email}
        <input
          name="email"
          type="email"
          required
          maxLength={120}
          autoComplete="email"
          className={field}
        />
      </label>
      <label className="block text-sm font-medium">
        {labels.message}
        <textarea name="message" required minLength={10} maxLength={2000} rows={6} className={field} />
      </label>

      {/* Honeypot: hidden from people, bots tend to fill it. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
      >
        {status === "sending" ? labels.sending : labels.send}
      </button>

      {message && (
        <p
          role="status"
          className={`text-sm font-medium ${status === "success" ? "text-green-700" : "text-accent"}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
