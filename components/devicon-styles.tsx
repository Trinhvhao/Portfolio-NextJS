"use client";

export function DeviconStyles() {
  return (
    <>
      <link
        rel="preload"
        href="/fonts/devicon.woff"
        as="font"
        type="font/woff"
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