import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const perks = ["Free shipping", "Easy returns", "7-day exchange"];

const Hero = () => {
  return (
    <section className="relative flex flex-col overflow-hidden border border-line sm:min-h-[80vh] sm:flex-row">
      <style>{`
        @keyframes hero-rise {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-spin { to { transform: rotate(360deg); } }
        .hero-rise { animation: hero-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .hero-spin { animation: hero-spin 20s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-rise, .hero-spin { animation: none; }
        }
      `}</style>

      {/* Hero Left */}
      <div className="flex w-full flex-col text-fg sm:w-[45%]">
        <div className="flex flex-1 items-center px-6 py-14 sm:px-10 lg:px-16">
          <div>
            <div className="hero-rise flex items-center gap-2">
              <p className="h-0.5 w-8 bg-fg md:w-11"></p>
              <p className="text-sm font-medium tracking-[0.2em] md:text-base">
                OUR BESTSELLERS
              </p>
            </div>

            <h1
              className="hero-rise prata-regular mt-4 text-4xl leading-[1.15] sm:text-5xl lg:text-7xl"
              style={{ animationDelay: "0.1s" }}
            >
              Latest
              <span className="block lg:pl-12">Arrivals</span>
            </h1>

            <p
              className="hero-rise mt-6 max-w-xs text-sm leading-relaxed text-muted"
              style={{ animationDelay: "0.2s" }}
            >
              Football-inspired pieces, cut with an editorial eye and made to
              be worn long after match day.
            </p>

            <Link
              to="/collections"
              className="hero-rise group mt-8 inline-flex items-center gap-2"
              style={{ animationDelay: "0.3s" }}
            >
              <span className="text-sm font-semibold tracking-[0.15em] md:text-base">
                SHOP NOW
              </span>
              <span className="h-0.5 w-8 bg-fg transition-all duration-300 group-hover:w-14 md:w-11"></span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="-ml-2 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Perks strip */}
        <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-line px-6 py-4 text-[11px] tracking-[0.2em] text-muted sm:px-10 lg:px-16">
          {perks.map((perk) => (
            <span key={perk} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-muted"></span>
              {perk.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Right */}
      <div className="relative aspect-4/5 w-full overflow-hidden border-t border-line sm:aspect-auto sm:w-[55%] sm:border-l sm:border-t-0">
        <img
          src={assets.pedi_hero}
          alt="Football-inspired fashion"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-1500ms ease-out hover:scale-105 dark:brightness-90"
        />

        {/* Caption tag */}
        <div className="absolute bottom-5 right-5 bg-surface/70 px-4 py-2 text-[10px] tracking-[0.25em] text-fg backdrop-blur-sm">
          THE FOOTBALL EDIT — VOL. 01
        </div>
      </div>

      {/* Rotating badge sitting on the seam between both halves */}
      <Link
        to="/collections"
        aria-label="Shop the collection"
        className="absolute left-1/2 top-[calc(100%-1rem)] hidden h-28 w-28 -translate-x-1/2 -translate-y-full items-center justify-center rounded-full border border-line bg-surface text-fg sm:left-[45%] sm:top-12 sm:flex sm:-translate-x-1/2 sm:translate-y-0"
      >
        <svg viewBox="0 0 100 100" className="hero-spin absolute inset-0 h-full w-full">
          <defs>
            <path
              id="hero-badge-circle"
              d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
            />
          </defs>
          <text fontSize="8" fill="currentColor">
            <textPath
              href="#hero-badge-circle"
              textLength="228"
              lengthAdjust="spacing"
            >
              NEW SEASON • FOOTBALL EDIT •{" "}
            </textPath>
          </text>
        </svg>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7M8 7h9v9" />
        </svg>
      </Link>
    </section>
  );
};

export default Hero;
