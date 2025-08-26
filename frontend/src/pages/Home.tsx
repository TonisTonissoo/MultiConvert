// src/pages/Home.tsx
import React from "react";
import UploadForm from "../components/UploadForm";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <section id="home" style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Welcome to MultiConvert</h2>
        <p>
          MultiConvert is a universal file conversion platform. Start by converting your DOCX files
          to PDF. More converters will be added soon!
        </p>
      </section>

      <section id="upload" style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Convert your DOCX to PDF</h2>
        <UploadForm />
      </section>

      <section id="about" style={{ padding: "2rem", textAlign: "center" }}>
        <h2>About MultiConvert</h2>
        <p>
          This platform allows you to convert various file types. Currently, it supports DOCX to PDF conversion.
          Future updates will add more formats and batch conversion options.
        </p>
      </section>
    </div>
  );
}
