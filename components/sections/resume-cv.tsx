"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { resumeData } from "@/lib/resume-data";

function DownloadIcon() {
  return (
    <svg className="h-4 w-4" fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="16" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-4 w-4" fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" aria-hidden>
      <rect height="16" rx="2" width="20" x="2" y="4" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-4 w-4" fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="h-4 w-4" fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" aria-hidden>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg className="h-4 w-4" fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" aria-hidden>
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect height="14" rx="2" width="20" x="2" y="6" />
    </svg>
  );
}

function GraduationIcon() {
  return (
    <svg className="h-4 w-4" fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" aria-hidden>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg className="h-4 w-4" fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" aria-hidden>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg className="h-4 w-4" fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" aria-hidden>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg className="h-4 w-4" fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" aria-hidden>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function ResumeCV() {
  const t = useTranslations("resume");
  const [lang, setLang] = useState<"vi" | "en">("en");
  const data = resumeData[lang];

  return (
    <div className="mx-auto max-w-4xl px-4 pb-20">
      {/* Language Toggle & Download */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        <div className="flex gap-2">
          <button
            onClick={() => setLang("en")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${lang === "en" ? "bg-white/10 text-white" : "text-white/50 hover:text-white/70"}`}
          >
            {t("langEnglish")}
          </button>
          <button
            onClick={() => setLang("vi")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${lang === "vi" ? "bg-white/10 text-white" : "text-white/50 hover:text-white/70"}`}
          >
            {t("langVietnamese")}
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white font-noto-serif">{data.name}</h1>
        <p className="text-xl text-blue-400">{data.title}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-4 text-sm text-white/70">
          <a href={`mailto:${data.contact.email}`} className="flex items-center gap-1 hover:text-white">
            <MailIcon />
            {data.contact.email}
          </a>
          <span className="flex items-center gap-1">
            <PhoneIcon />
            {data.contact.phone}
          </span>
          <span className="flex items-center gap-1">
            <MapPinIcon />
            {data.contact.location}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-3 text-sm">
          <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white">
            GitHub
          </a>
          <a href={data.contact.tiktok} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white">
            TikTok
          </a>
        </div>
        <a
          href="/CV Trinh Van Hao.pdf"
          download
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white transition-all hover:bg-white/15"
        >
          <DownloadIcon /> {lang === "vi" ? t("taiPdf") : t("downloadPdf")}
        </a>
      </header>

      {/* Summary */}
      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2 text-xl font-semibold text-white font-noto-serif">
          <span className="h-1 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          {data.sections.summary}
        </h2>
        <p className="text-base leading-relaxed text-white/80">{data.summary}</p>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 border-b border-white/10 pb-2 text-xl font-semibold text-white font-noto-serif">
          <BriefcaseIcon /> {data.sections.experience}
        </h2>
        <div className="space-y-4">
          {data.experience.map((exp) => (
            <div key={exp.company} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold text-white">{exp.company}</h3>
                  <p className="text-base text-blue-400">{exp.role}</p>
                </div>
                <span className="font-mono text-sm text-white/50">{exp.period}</span>
              </div>
              <ul className="mt-2 space-y-1 text-base text-white/70">
                {exp.achievements.map((a, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-blue-400">•</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 border-b border-white/10 pb-2 text-xl font-semibold text-white font-noto-serif">
          <FolderIcon /> {data.sections.projects}
        </h2>
        <div className="space-y-4">
          {data.projects.map((proj) => (
            <div key={proj.name} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-base font-semibold text-white">{proj.name}</h3>
              <ul className="mt-2 space-y-1 text-base text-white/70">
                {proj.description.split("\n").map((line, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-blue-400 shrink-0">•</span>
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {proj.techs.map((t) => (
                  <span key={t} className="rounded border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 font-mono text-xs text-blue-300">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2 text-xl font-semibold text-white font-noto-serif">
          <GraduationIcon /> {data.sections.education}
        </h2>
        <div className="flex flex-wrap items-center gap-3 text-base">
          <h3 className="font-semibold text-white">{data.education.institution}</h3>
          <span className="text-white/50">•</span>
          <p className="text-white/70">{data.education.degree}</p>
          <span className="text-white/50">•</span>
          <p className="text-white/50">{data.education.period}</p>
          <span className="text-white/50">•</span>
          <p className="text-green-400">GPA: {data.education.gpa}</p>
        </div>
      </section>

      {/* Skills */}
      <section className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2 text-xl font-semibold text-white font-noto-serif">
          <CodeIcon /> {data.sections.skills}
        </h2>
        <div className="grid gap-x-8 gap-y-3 text-base sm:grid-cols-2">
          {/* Column 1 */}
          <div className="space-y-3">
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="mb-2 font-semibold text-white/70">{t("skillFrontend")}</p>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.frontend.map((s) => (
                  <span key={s} className="rounded border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 font-mono text-xs text-blue-300">{s}</span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="mb-2 font-semibold text-white/70">{t("skillBackend")}</p>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.backend.map((s) => (
                  <span key={s} className="rounded border border-green-500/30 bg-green-500/10 px-2 py-0.5 font-mono text-xs text-green-300">{s}</span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="mb-2 font-semibold text-white/70">{t("skillDatabase")}</p>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.database.map((s) => (
                  <span key={s} className="rounded border border-yellow-500/30 bg-yellow-500/10 px-2 py-0.5 font-mono text-xs text-yellow-300">{s}</span>
                ))}
              </div>
            </div>
          </div>
          {/* Column 2 */}
          <div className="space-y-3">
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="mb-2 font-semibold text-white/70">{t("skillsApi")}</p>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.api.map((s) => (
                  <span key={s} className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-xs text-cyan-300">{s}</span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="mb-2 font-semibold text-white/70">{t("skillsAi")}</p>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.ai.map((s) => (
                  <span key={s} className="rounded border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 font-mono text-xs text-purple-300">{s}</span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="mb-2 font-semibold text-white/70">{t("skillTools")}</p>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.tools.map((s) => (
                  <span key={s} className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-xs text-amber-300">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2 text-xl font-semibold text-white font-noto-serif">
          <TrophyIcon /> {data.sections.awards}
        </h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {data.awards.map((award) => (
            <div key={award.title} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-yellow-500/30 bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
                <TrophyIcon />
              </div>
              <div>
                <p className="text-base font-medium text-white">{award.title}</p>
                <p className="text-sm text-white/50">{award.issuer} • {award.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 text-center">
        <p className="mb-4 text-lg text-white/80">{lang === "vi" ? t("sanSangHopTac") : t("letsWorkTogether")}</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 font-medium text-black transition-all hover:bg-white/90"
        >
          {lang === "vi" ? t("lienHeNgay") : t("getInTouch")}
        </Link>
      </section>
    </div>
  );
}
