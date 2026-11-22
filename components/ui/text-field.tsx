import type { ComponentProps } from "react";

type TextFieldProps = ComponentProps<"input"> & {
  id: string;
  label: string;
  hint?: string;
};

export default function TextField({ id, label, hint, ...props }: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-ink placeholder:text-smoke/60 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
      />
      {hint && <p className="mt-1 text-xs text-smoke">{hint}</p>}
    </div>
  );
}