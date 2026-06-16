import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { TypedRouteText } from "@/components/ui/typed-route-text";
import { getGitHubProfileStats } from "@/lib/github-data";

type OpenSourceSectionProps = {
  username: string;
};

function StatCard({ title, value, accentClass, type }: { title: string; value: string; accentClass: string; type?: 'followers' | 'forks' | 'stars' }) {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/5 bg-[#0a0a0a] p-6 transition-all duration-500 hover:bg-[#111] hover:border-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:-translate-y-1 group">
      {/* Subtle top shine on hover */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <p className="text-white/60 text-sm font-medium tracking-wide group-hover:text-white/90 transition-colors duration-500">{title}</p>
        <p className={`mt-2 font-bold text-4xl leading-none tracking-tight transition-all duration-500 group-hover:scale-105 origin-left drop-shadow-sm ${accentClass}`}>
          {value}
        </p>
      </div>
      
      {/* Decorative Icons matching Image 1 */}
      {type === 'followers' && (
        <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 opacity-40 pointer-events-none w-20 h-20 transition-all duration-700 group-hover:opacity-70 group-hover:scale-110 group-hover:rotate-3">
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="3" fill="#e879f9" opacity="0.3"/>
            <circle cx="50" cy="50" r="9" stroke="#e879f9" strokeWidth="1" strokeOpacity="0.2"/>
            
            <circle cx="80" cy="20" r="4" fill="#e879f9" opacity="0.4"/>
            <circle cx="80" cy="20" r="12" stroke="#e879f9" strokeWidth="1" strokeOpacity="0.3"/>
            
            <circle cx="70" cy="80" r="2.5" fill="#e879f9" opacity="0.3"/>
            <circle cx="70" cy="80" r="8" stroke="#e879f9" strokeWidth="1" strokeOpacity="0.2"/>
            
            <circle cx="20" cy="55" r="3" fill="#e879f9" opacity="0.2"/>
            <circle cx="20" cy="55" r="9" stroke="#e879f9" strokeWidth="1" strokeOpacity="0.1"/>
          </svg>
        </div>
      )}
      {type === 'forks' && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none w-20 h-20 transition-all duration-700 group-hover:opacity-70 group-hover:scale-110 group-hover:-rotate-3">
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 40 L60 30" stroke="#2dd4bf" strokeWidth="2" strokeOpacity="0.6"/>
            <path d="M50 60 L60 70" stroke="#2dd4bf" strokeWidth="2" strokeOpacity="0.6"/>
            <path d="M40 50 L50 40 M40 50 L50 60" stroke="#2dd4bf" strokeWidth="2" strokeOpacity="0.6"/>
            <circle cx="38" cy="50" r="4" fill="#2dd4bf" opacity="0.8"/>
            <circle cx="62" cy="28" r="4" fill="#2dd4bf" opacity="0.8"/>
            <circle cx="62" cy="72" r="4" fill="#2dd4bf" opacity="0.8"/>
            
            <path d="M70 10 L80 0" stroke="#2dd4bf" strokeWidth="1.5" strokeOpacity="0.4"/>
            <path d="M70 30 L80 40" stroke="#2dd4bf" strokeWidth="1.5" strokeOpacity="0.4"/>
            <path d="M60 20 L70 10 M60 20 L70 30" stroke="#2dd4bf" strokeWidth="1.5" strokeOpacity="0.4"/>
            <circle cx="58" cy="20" r="3" fill="#2dd4bf" opacity="0.5"/>
            <circle cx="82" cy="-2" r="3" fill="#2dd4bf" opacity="0.5"/>
            <circle cx="82" cy="42" r="3" fill="#2dd4bf" opacity="0.5"/>
          </svg>
        </div>
      )}
      {type === 'stars' && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none w-20 h-20 transition-all duration-700 group-hover:opacity-60 group-hover:scale-110 group-hover:rotate-6">
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 20 L 52 32 L 64 34 L 52 36 L 50 48 L 48 36 L 36 34 L 48 32 Z" fill="#fbbf24" opacity="0.8"/>
            <path d="M20 70 L 21 76 L 27 77 L 21 78 L 20 84 L 19 78 L 13 77 L 19 76 Z" fill="#fbbf24" opacity="0.6"/>
            <path d="M80 80 L 81 84 L 85 85 L 81 86 L 80 90 L 79 86 L 75 85 L 79 84 Z" fill="#fbbf24" opacity="0.4"/>
          </svg>
        </div>
      )}
    </div>
  );
}

export async function OpenSourceSection({ username }: OpenSourceSectionProps) {
  const t = await getTranslations("openSource");
  let stats;

  try {
    stats = await getGitHubProfileStats(username);
  } catch {
    stats = {
      followers: 0,
      totalStars: 0,
      totalForks: 0,
      publicRepos: 0,
      totalContributions: 0,
      contributionImageUrl: `https://ghchart.rshah.org/7c83fd/${username}`,
      profileUrl: `https://github.com/${username}`,
    };
  }

  return (
    <section className="mx-auto w-full" aria-labelledby="open-source-heading">
      <div className="text-center">
        <p className="mb-3 font-mono text-xs font-normal tracking-widest text-black/80 uppercase dark:text-white/70">{t("eyebrow")}</p>
        <h2
          id="open-source-heading"
          className="relative z-2 mx-auto max-w-lg text-balance text-center text-5xl font-medium tracking-tight max-sm:px-5 sm:text-5xl md:text-6xl"
          style={{ textShadow: "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.25)" }}
        >
          <span className="font-instrument-serif text-neutral-100">{t("titleStart")} </span>
          <TypedRouteText text={t("titleAccent")} triggerOnView className="animate-gradient-x font-instrument-serif italic tracking-tight text-colorfull" />
        </h2>
      </div>

      <div className="mt-14 w-full grid grid-cols-1 lg:grid-cols-12 gap-3 items-start group/section">
        <article className="lg:col-span-9 xl:col-span-9 flex flex-col min-w-0 overflow-hidden rounded-[24px] border border-white/5 bg-[#0a0a0a] p-6 lg:p-7 transition-all duration-500 hover:border-white/10 hover:bg-[#111] hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] group/article relative z-10">
          {/* Subtle top shine on hover */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/article:opacity-100 transition-opacity duration-500"></div>
          
          <div className="flex items-center justify-between gap-4 flex-wrap relative z-10">
            <div className="flex items-center gap-4">
              <div className="grid h-[52px] w-[52px] place-items-center rounded-full border border-white/5 bg-white/5 text-white/70 shadow-sm flex-shrink-0 transition-all duration-500 group-hover/article:scale-110 group-hover/article:bg-white/10 group-hover/article:text-white group-hover/article:border-white/20">
                <svg aria-hidden className="h-[26px] w-[26px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.42 7.88 10.95.58.1.79-.25.79-.56 0-.27-.01-1-.02-1.97-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.2 1.78 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.27-5.24-5.65 0-1.25.45-2.26 1.19-3.06-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.17A11.05 11.05 0 0 1 12 6.1a11 11 0 0 1 2.9.39c2.2-1.48 3.17-1.17 3.17-1.17.63 1.57.23 2.73.11 3.02.74.8 1.18 1.81 1.18 3.06 0 4.4-2.7 5.35-5.27 5.64.41.35.78 1.03.78 2.08 0 1.5-.02 2.7-.02 3.07 0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[22px] text-white/90 tracking-tight transition-colors duration-500 group-hover/article:text-white cursor-pointer">@{username}</p>
                <p className="text-white/40 text-[13px] font-medium mt-0.5 transition-colors duration-500 group-hover/article:text-white/60">{t("contributionGraph")}</p>
              </div>
            </div>
            <div className="text-right transition-transform duration-500 origin-right group-hover/article:scale-105">
              <p className="font-bold text-[32px] text-white leading-none tracking-tight drop-shadow-sm">{stats.totalContributions || 0}</p>
              <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.2em] mt-2 transition-colors duration-500 group-hover/article:text-white/60">{new Date().getFullYear()} {t("total")}</p>
            </div>
          </div>

          <div className="mt-8 flex-1 w-full overflow-hidden flex flex-col justify-center rounded-xl border border-white/5 bg-[#030611] p-5 shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)] group/graph relative transition-colors duration-500 group-hover/article:border-white/10 group-hover/article:bg-[#040816]">
            <div className="w-full overflow-x-auto pb-2 custom-scrollbar">
              <img alt={`${username} contribution heatmap`} className="min-w-[700px] w-full h-auto mix-blend-lighten pointer-events-none transition-transform duration-500 group-hover/graph:scale-[1.01]" src={stats.contributionImageUrl} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#7c83fd]/0 via-[#7c83fd]/5 to-[#7c83fd]/0 opacity-0 group-hover/graph:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          </div>
          
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 px-1">
            <p className="text-white/60 text-[14px] font-medium tracking-tight transition-colors duration-500 group-hover/article:text-white/90">{stats.totalContributions || 0} {t("contributionsInYear")}</p>
            <div className="flex items-center gap-2 text-white/50 text-xs font-medium transition-colors duration-500 group-hover/article:text-white/80">
              <span className="mb-[1px]">{t("less")}</span>
              <div className="flex gap-1.5">
                <div className="w-[12px] h-[12px] rounded-[3px] bg-[#EEEEEE] hover:scale-125 hover:rotate-3 transition-transform duration-300"></div>
                <div className="w-[12px] h-[12px] rounded-[3px] bg-[#c9d0ff] hover:scale-125 hover:-rotate-3 transition-transform duration-300"></div>
                <div className="w-[12px] h-[12px] rounded-[3px] bg-[#afb6ff] hover:scale-125 hover:rotate-3 transition-transform duration-300"></div>
                <div className="w-[12px] h-[12px] rounded-[3px] bg-[#7c83fd] hover:scale-125 hover:-rotate-3 transition-transform duration-300"></div>
                <div className="w-[12px] h-[12px] rounded-[3px] bg-[#6369ca] hover:scale-125 hover:rotate-3 transition-transform duration-300 shadow-[0_0_10px_rgba(99,105,202,0)] hover:shadow-[0_0_10px_rgba(99,105,202,0.8)]"></div>
              </div>
              <span className="mb-[1px]">{t("more")}</span>
            </div>
          </div>
        </article>

        <aside className="lg:col-span-3 xl:col-span-3 flex flex-col gap-3 min-w-0">
          <StatCard type="followers" title={t("followers")} value={String(stats.followers)} accentClass="text-[#ff5c8d] group-hover:text-[#ff7eb6] group-hover:drop-shadow-[0_0_15px_rgba(255,92,141,0.5)]" />
          <StatCard type="forks" title={t("forks")} value={String(stats.totalForks)} accentClass="text-[#2dd4bf] group-hover:text-[#4ee6d3] group-hover:drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]" />
          <StatCard type="stars" title={t("stars")} value={String(stats.totalStars)} accentClass="text-[#fbbf24] group-hover:text-[#fcd34d] group-hover:drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
        </aside>
      </div>
    </section>
  );
}