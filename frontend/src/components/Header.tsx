// src/components/Header.tsx
import React from "react";

export default function Header() {
  return (
    <header style={{ padding: "1rem", backgroundColor: "#282c34", color: "white" }}>
      <h1>MultiConvert</h1>
      <nav>
        <a href="#home" style={{ margin: "0 1rem", color: "white", textDecoration: "none" }}>Home</a>
        <a href="#upload" style={{ margin: "0 1rem", color: "white", textDecoration: "none" }}>Convert</a>
        <a href="#about" style={{ margin: "0 1rem", color: "white", textDecoration: "none" }}>About</a>
      </nav>
    </header>
  );
}
