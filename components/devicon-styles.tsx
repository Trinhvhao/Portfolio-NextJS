"use client";

export function DeviconStyles() {
  return (
    <>
      <link
        rel="preload"
        href="/fonts/devicon.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="/fonts/devicon.min.css"
        media="print"
        onLoad={(e) => {
          e.currentTarget.media = "all";
        }}
      />
    </>
  );
}