"use client";

import { useField, FieldLabel, FieldDescription } from "@payloadcms/ui";
import dynamic from "next/dynamic";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((m) => m.default),
  { ssr: false },
);

interface FieldProps {
  path: string;
  field: {
    name: string;
    label?: string | (() => string);
    required?: boolean;
    admin?: { description?: string };
  };
}

export const MarkdownEditor = ({ path, field }: FieldProps) => {
  const { value, setValue, errorMessage, showError } = useField<string>({
    path,
  });

  const label =
    typeof field.label === "function" ? field.label() : field.label ?? field.name;

  return (
    <div className="field-type" style={{ marginBottom: "1.5rem" }}>
      <FieldLabel label={label} required={field.required} />
      <div data-color-mode="light">
        <MDEditor
          value={value ?? ""}
          onChange={(v) => setValue(v ?? "")}
          preview="live"
          height={420}
          textareaProps={{
            placeholder: "Write in Markdown — preview updates live.",
          }}
        />
      </div>
      {field.admin?.description && (
        <FieldDescription
          path={path}
          description={field.admin.description}
        />
      )}
      {showError && errorMessage && (
        <div className="field-error" style={{ color: "#ef4444", fontSize: "0.85rem", marginTop: "0.5rem" }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};
