"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Standard legal line shown below every form's submit button.
 * Links route to the Terms (/terms-of-service) and Privacy (/privacy-policy) pages.
 */
export function FormDisclaimer({ className }) {
  return (
    <p className={cn("text-[12px] leading-relaxed text-ink-mute", className)}>
      By submitting you agree to the{" "}
      <Link href="/terms-of-service" className="link-underline hover:text-ink">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link href="/privacy-policy" className="link-underline hover:text-ink">
        Privacy Policy
      </Link>
      .
    </p>
  );
}

/**
 * FormPanel — card shell that gives a form structure when it sits in open
 * space (e.g. the right side of a page hero). Optional mono `label` eyebrow.
 */
export function FormPanel({ label, children, className }) {
  return (
    <div
      className={cn(
        "rounded-card border border-ink/15 bg-bone-soft/50 p-6 shadow-[0_24px_60px_-34px_rgba(13,21,40,0.35)] sm:p-8",
        className
      )}
    >
      {label && (
        <div className="mb-7 flex items-center gap-2.5">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal" />
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-mute">
            {label}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

const baseField =
  "block w-full rounded-soft border border-ink/20 bg-bone/80 px-4 py-3.5 font-sans text-[15px] text-ink transition-colors duration-300 focus:border-ink focus:bg-bone focus:outline-none focus:ring-2 focus:ring-ink/20";

export function FormLabel({ htmlFor, children, optional = false, required = false }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink/80"
    >
      <span>{children}{required && <span className="text-signal"> *</span>}</span>
      {optional && (
        <span className="font-mono text-[9px] tracking-[0.22em] text-ink-mute">
          Optional
        </span>
      )}
    </label>
  );
}

export function FormField({
  id,
  name,
  label,
  type = "text",
  required = false,
  optional = false,
  placeholder,
  error,
  ...props
}) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className="flex flex-col">
      {label && <FormLabel htmlFor={id} optional={optional} required={required}>{label}</FormLabel>}
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          baseField,
          error &&
            "border-signal focus:border-signal focus:ring-signal/25"
        )}
        {...props}
      />
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-signal-deep"
        >
          {error}
        </p>
      )}
    </div>
  );
}

// US 5-digit ZIP code. Shared by every form that collects a ZIP.
export const ZIP_PATTERN = /^\d{5}$/;

/** Keep digits only, capped at 5 — used for live input restriction. */
export function sanitizeZip(value) {
  return (value || "").replace(/\D/g, "").slice(0, 5);
}

/**
 * Returns an inline error string ("" when valid).
 * Optional fields pass when empty; any non-empty value must be exactly 5 digits.
 */
export function validateZip(value, { required = false } = {}) {
  const v = (value || "").trim();
  if (!v) return required ? "Enter a 5-digit ZIP code." : "";
  return ZIP_PATTERN.test(v) ? "" : "Enter a 5-digit ZIP code.";
}

/**
 * ZIP field: restricts typing to 5 numeric digits and shows an inline error.
 * Controlled — pass `value` (string) and `onChange` (receives the digits string).
 */
export function FormZip({
  id,
  name,
  label = "ZIP code",
  required = false,
  optional = false,
  value,
  onChange,
  error,
  ...props
}) {
  return (
    <FormField
      id={id}
      name={name}
      label={label}
      type="text"
      inputMode="numeric"
      autoComplete="postal-code"
      maxLength={5}
      pattern="\d{5}"
      placeholder="12345"
      required={required}
      optional={optional}
      value={value}
      onChange={(e) => onChange(sanitizeZip(e.target.value))}
      error={error}
      {...props}
    />
  );
}

export function FormSelect({
  id,
  name,
  label,
  required = false,
  optional = false,
  options = [],
  defaultValue = "",
  ...props
}) {
  return (
    <div className="flex flex-col">
      {label && <FormLabel htmlFor={id} optional={optional} required={required}>{label}</FormLabel>}
      <div className="relative">
        <select
          id={id}
          name={name}
          required={required}
          defaultValue={defaultValue}
          className={cn(baseField, "appearance-none pr-12 cursor-pointer")}
          {...props}
        >
          <option value="" disabled hidden>
            Select…
          </option>
          {options.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink/60"
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 4l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

export function FormTextarea({
  id,
  name,
  label,
  rows = 5,
  required = false,
  optional = false,
  placeholder,
  ...props
}) {
  return (
    <div className="flex flex-col">
      {label && <FormLabel htmlFor={id} optional={optional} required={required}>{label}</FormLabel>}
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className={cn(baseField, "resize-y")}
        {...props}
      />
    </div>
  );
}

export function FormCheckbox({
  id,
  name,
  label,
  defaultChecked = false,
  checked,
  onChange,
  disabled = false,
  required = false,
  value,
}) {
  const controlled = checked !== undefined;
  return (
    <label
      htmlFor={id}
      className={cn(
        "group flex items-start gap-3 text-sm leading-relaxed",
        disabled ? "cursor-not-allowed text-ink/40" : "cursor-pointer text-ink/80"
      )}
    >
      <input
        id={id}
        name={name}
        type="checkbox"
        value={value}
        disabled={disabled}
        required={required}
        {...(controlled ? { checked, onChange } : { defaultChecked })}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-[5px] border border-ink/30 bg-bone transition-all duration-300 peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:ring-2 peer-focus-visible:ring-ink/20 peer-disabled:opacity-40"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className="scale-0 text-bone transition-transform duration-300 peer-checked:scale-100 group-has-[input:checked]:scale-100"
        >
          <path
            d="M1 5l3 3 5-7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>{label}</span>
    </label>
  );
}

export function FormFieldset({ legend, hint, children, className }) {
  return (
    <fieldset className={cn("flex flex-col gap-3", className)}>
      {legend && (
        <legend className="mb-1 font-mono text-[10px] uppercase tracking-[0.24em] text-ink/80">
          {legend}
        </legend>
      )}
      {hint && (
        <p className="-mt-1 text-sm leading-relaxed text-ink/65">{hint}</p>
      )}
      <div className="flex flex-col gap-3">{children}</div>
    </fieldset>
  );
}
