"use client";

import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function FormInput({ label, error, hint, ...props }: FormInputProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-extrabold uppercase tracking-widest text-brand-espresso mb-2">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full px-4 py-3 rounded-xl bg-brand-champagne/50 border-2 text-brand-espresso placeholder-brand-espresso/40 focus:outline-none focus:ring-2 transition-all font-medium ${
          error ? "border-red-400 focus:border-red-400 focus:ring-red-200" : "border-brand-nude/30 focus:border-brand-blush focus:ring-brand-blush/20"
        }`}
      />
      {error && <p className="text-sm text-red-600 mt-1 font-medium">{error}</p>}
      {hint && <p className="text-xs text-brand-espresso/50 mt-1">{hint}</p>}
    </div>
  );
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function FormTextarea({ label, error, hint, ...props }: FormTextareaProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-extrabold uppercase tracking-widest text-brand-espresso mb-2">
          {label}
        </label>
      )}
      <textarea
        {...props}
        className={`w-full px-4 py-3 rounded-xl bg-brand-champagne/50 border-2 text-brand-espresso placeholder-brand-espresso/40 focus:outline-none focus:ring-2 transition-all font-medium resize-none ${
          error ? "border-red-400 focus:border-red-400 focus:ring-red-200" : "border-brand-nude/30 focus:border-brand-blush focus:ring-brand-blush/20"
        }`}
      />
      {error && <p className="text-sm text-red-600 mt-1 font-medium">{error}</p>}
      {hint && <p className="text-xs text-brand-espresso/50 mt-1">{hint}</p>}
    </div>
  );
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export function FormSelect({ label, error, options, ...props }: FormSelectProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-extrabold uppercase tracking-widest text-brand-espresso mb-2">
          {label}
        </label>
      )}
      <select
        {...props}
        className={`w-full px-4 py-3 rounded-xl bg-brand-champagne/50 border-2 text-brand-espresso focus:outline-none focus:ring-2 transition-all font-medium ${
          error ? "border-red-400 focus:border-red-400 focus:ring-red-200" : "border-brand-nude/30 focus:border-brand-blush focus:ring-brand-blush/20"
        }`}
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600 mt-1 font-medium">{error}</p>}
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
}

export function Button({ variant = "primary", loading = false, ...props }: ButtonProps) {
  const baseClass = "px-6 py-3 rounded-xl font-extrabold uppercase tracking-widest transition-all text-sm";
  
  const variantClass = {
    primary: "bg-gradient-to-r from-brand-cocoa to-brand-blush text-white hover:shadow-lg hover:shadow-brand-blush/40 hover:-translate-y-1 shadow-md shadow-brand-cocoa/30",
    secondary: "bg-brand-champagne/50 border-2 border-brand-nude/30 text-brand-espresso hover:bg-brand-nude/20",
    danger: "bg-red-100 text-red-700 hover:bg-red-200",
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`${baseClass} ${variantClass[variant]} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading ? "Loading..." : props.children}
    </button>
  );
}
