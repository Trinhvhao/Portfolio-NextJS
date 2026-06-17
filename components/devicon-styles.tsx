"use client";

export function DeviconStyles() {
  return (
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
      media="print"
      onLoad={(e) => {
        e.currentTarget.media = "all";
      }}
    />
  );
}
