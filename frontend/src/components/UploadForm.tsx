// src/components/UploadForm.tsx
import React, { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("http://localhost:3000/convert", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        alert("Conversion failed");
        setLoading(false);
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.docx$/i, ".pdf");
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Conversion error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <input
        type="file"
        accept=".docx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload} disabled={!file || loading} style={{ marginLeft: "1rem" }}>
        {loading ? "Converting..." : "Convert to PDF"}
      </button>
    </div>
  );
}
