import Image from "next/image";
import { useTranslations } from "next-intl";

function OpenToWorkSpinner({ text }: { text: string }) {
  const curveId = "contact-open-to-work-curve";

  return (
    <div
      className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-[145%] translate-x-[140px] overflow-hidden rounded-full md:-translate-y-[220%] md:translate-x-[260px]"
      draggable={false}
      style={{ userSelect: "none", touchAction: "none" }}
      tabIndex={0}
    >
      <div className="relative rounded-full bg-blue-700 p-1.5 font-medium leading-none">
        <div className="relative size-[95px] rounded-full bg-black p-2">
          <div className="absolute top-1/2 left-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full">
            <svg
              className="size-full animate-[spin_11s_linear_infinite] [transform-origin:center_center]"
              fill="black"
              overflow="visible"
              style={{ position: "absolute", inset: 0, transformOrigin: "center center" }}
              viewBox="0 0 100 100"
            >
              <path
                d="M 0 50 L 0 50 A 1 1 0 0 1 100 50 L 100 50 L 100 50 A 1 1 0 0 1 0 50 L 0 50"
                fill="transparent"
                id={curveId}
                strokeWidth="none"
              />
              <text>
                <textPath
                  dominantBaseline="hanging"
                  href={`#${curveId}`}
                  startOffset="0"
                  style={{ fontSize: "13px", fontWeight: 600, wordSpacing: "5px", letterSpacing: "2.1px", fill: "rgba(242,242,242,0.9)" }}
                >
                  {text}
                </textPath>
              </text>
            </svg>
          </div>

          <svg className="absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rotate-45 fill-white text-white opacity-80" viewBox="0 0 24 24" aria-hidden>
            <path d="M12 1C12 1 12 8 10 10C8 12 1 12 1 12C1 12 8 12 10 14C12 16 12 23 12 23C12 23 12 16 14 14C16 12 23 12 23 12C23 12 16 12 14 10C12 8 12 1 12 1Z" />
          </svg>
        </div>
        <span className="sr-only">{text}</span>
      </div>
    </div>
  );
}

export function ContactCtaSection() {
  const t = useTranslations("contactCta");
  const spinnerText = `${t("spinner")} - `;

  return (
    <section
      className="relative z-0 mt-pagebuilder flex w-full justify-center overflow-x-hidden px-4 py-20 [mask-image:linear-gradient(to_bottom,transparent,black_10rem,black_calc(100%-10rem),transparent)]"
      id="contact"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[radial-gradient(85%_130%_at_50%_0%,rgba(46,70,122,0.35),transparent_58%),radial-gradient(70%_120%_at_50%_100%,rgba(10,23,46,0.55),transparent_65%),linear-gradient(180deg,#02040a,#03070f_40%,#040814)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 h-20 bg-gradient-to-b from-black/75 via-black/35 to-transparent" />

      <div className="container relative z-10 mx-auto flex w-full flex-col items-center justify-center gap-y-2 rounded-[28px] border border-white/8 bg-[#02050d]/70 px-4 py-10 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03),0_24px_80px_rgba(0,0,0,0.55)] sm:px-6">
        <OpenToWorkSpinner text={spinnerText} />

        <div className="relative">
          <Image
            alt="wings"
            aria-hidden
            className="select-none opacity-70"
            draggable={false}
            height={116}
            src="/images/wings.svg"
            style={{ height: "auto", width: "auto" }}
            width={320}
          />
          <svg className="absolute top-1/2 left-1/2 z-10 w-8 -translate-x-1/2 -translate-y-1/2 md:w-10" viewBox="0 0 5350 5350" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path
              className="fill-white"
              d="M265 4069c-70-20-71-59-4-197 29-59 78-161 109-227 32-66 85-178 119-248 77-159 167-347 236-492 29-60 81-168 115-240 34-71 79-166 100-210 21-44 62-132 93-195 30-63 101-212 157-330 240-504 311-652 373-780 35-74 101-210 145-303 90-186 96-193 186-184 58 5 76 23 124 121 341 693 462 946 462 968 0 10 3 18 8 18 4 0 17 19 29 42 27 52 229 469 288 593 23 50 88 182 143 295 55 113 165 340 245 505 80 165 188 389 241 499 53 109 103 214 112 235 18 44 11 91-17 117-20 18-41 19-303 19-281 0-281 0-344-29-110-51-132-84-347-521-106-214-303-613-437-886-135-273-251-499-257-503-19-12-39 11-73 83-17 36-85 176-151 311-66 135-134 277-152 315-18 39-65 138-105 220-82 169-166 344-250 520-153 323-181 373-230 419-73 68-112 76-369 75-119 0-229-5-246-10z"
            />
            <path
              className="fill-white"
              d="M3922 3999c-42-21-47-29-134-208-143-293-148-310-107-347 19-17 43-20 253-24 274-7 308-16 406-107 209-193 166-551-82-696-100-58-168-67-520-67-344 0-370-3-403-53-9-14-54-107-101-206-92-200-101-237-59-269 24-19 45-20 373-24 347-4 347-4 422-39 137-65 210-175 210-317 0-176-102-308-267-348-46-10-182-13-642-14-584 0-584 0-618-38-30-32-93-155-234-460-37-80-38-124-3-151 26-21 33-21 788-21 708 0 769 1 876 20 238 40 409 119 565 262 120 109 221 278 266 443 45 169 34 388-28 557-30 81-104 197-157 247-20 19-36 43-36 52 0 10 32 40 78 72 309 217 445 544 388 927-66 435-413 770-851 820-49 5-146 10-215 10-108 0-131-3-168-21z"
            />
          </svg>
        </div>

        <div className="mt-4 text-2xl tracking-wide text-white sm:text-4xl lg:text-5xl">
          <h3 className="text-nowrap font-light">{t("title1")} <span className="font-extrabold">{t("title1Accent")}</span></h3>
          <h3 className="mt-3 text-nowrap font-light">{t("title2")} <span className="font-extrabold">{t("title2Accent")}</span></h3>
        </div>

        <div className="group my-10">
          <button className="relative inline-flex cursor-pointer items-center justify-between overflow-hidden rounded-full border border-white/15 bg-white/10 py-[3px] pr-[3px] pl-2 font-medium text-base opacity-95 backdrop-blur-xs transition-all hover:bg-white/12 md:py-1 md:pr-1 md:pl-3">
            <span className="z-10 px-3 text-white transition-colors duration-300 group-hover:text-black">{t("button")}</span>
            <span className="absolute inset-0 translate-x-[45%] scale-0 rounded-full bg-white opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100" />
            <span className="z-10 flex items-center justify-center overflow-hidden rounded-full bg-white p-2 text-black transition-colors duration-300 group-hover:bg-transparent group-hover:text-white md:p-2.5">
              <svg aria-hidden className="transition-all duration-300 group-hover:translate-x-5 group-hover:opacity-0" fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              <svg aria-hidden className="absolute -translate-x-5 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>

        <p className="text-base font-semibold text-white lg:text-2xl">{t("description1")}</p>
        <p className="my-2 text-balance text-sm font-extralight tracking-wide text-white/70 lg:text-xl">
          {t("description2")}
          <br />
          {t("description3")}
        </p>
      </div>
    </section>
  );
}