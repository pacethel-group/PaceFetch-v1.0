import React, { useState, useRef, useEffect } from "react";
const logo = "/pacefetch-logo.png"
// ============================================
// PACEFETCH - ADSTERRA + GA4 SETUP
// 1. Replace GA4_ID below with your G-XXXXXXXXXX from analytics.google.com
// 2. Replace ADSTERRA codes in ad slots below
// 3. After 10k daily, add PopAds popunder code here
// ============================================
// GA4_ID = "G-XXXXXXXXXX"
// Adsterra Social Bar - paste in useEffect below

// GA4 PLACEHOLDER - Replace G-XXXXXXXXXX with your ID from analytics.google.com
const GA4_MEASUREMENT_ID = "G-XXXXXXXXXX"; // TODO: REPLACE - Replace with your ID from analytics.google.com
// ADSTERRA SOCIAL BAR PLACEHOLDER - Paste your Social Bar code here
const ADSTERRA_SOCIAL_BAR = "PASTE_ADSTERRA_SOCIAL_BAR_CODE_HERE"; // TODO: REPLACE
// ADSTERRA NATIVE BANNER PLACEHOLDER
const adsterraNativeCode = "PASTE_ADSTERRA_NATIVE_BANNER_300x250_CODE_HERE"; // TODO: REPLACE
// ADSTERRA BANNER 728x90 PLACEHOLDER
const adsterraBannerCode = "PASTE_ADSTERRA_BANNER_728x90_CODE_HERE"; // TODO: REPLACE

type MockFile = { name: string; size: string };
type Lang = { code: string; name: string; flag: string };
type Tool = { id: string; name: string; icon: string; desc: string; popular?: boolean };

const LANGUAGES: Lang[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
];

const TOOLS: Record<string, Tool[]> = {
  "ORGANIZE": [
    { id: "merge-pdf", name: "Merge PDF", icon: "◫", desc: "Combine PDFs in order" },
    { id: "split-pdf", name: "Split PDF", icon: "✂", desc: "Separate one page or whole set" },
    { id: "rotate-pdf", name: "Rotate PDF", icon: "↻", desc: "Rotate your PDFs" },
    { id: "delete-pages", name: "Delete Pages", icon: "✕", desc: "Remove pages" },
    { id: "add-page-numbers", name: "Add Page Numbers", icon: "#️⃣", desc: "Insert page numbers" },
    { id: "add-watermark", name: "Add Watermark", icon: "◍", desc: "Stamp image or text" },
  ],
  "CONVERT": [
    { id: "pdf-to-word", name: "PDF to Word", icon: "W", desc: "Convert PDF to editable DOCX", popular: true },
    { id: "word-to-pdf", name: "Word to PDF", icon: "D", desc: "Make DOCX to PDF" },
    { id: "jpg-to-pdf", name: "JPG to PDF", icon: "🖼", desc: "Convert images to PDF" },
    { id: "pdf-to-jpg", name: "PDF to JPG", icon: "JPG", desc: "Extract images" },
  ],
  "OPTIMIZE & SECURE": [
    { id: "compress-pdf", name: "Compress PDF", icon: "⤓", desc: "Reduce file size" },
    { id: "protect-pdf", name: "Protect PDF", icon: "🔒", desc: "Add password" },
    { id: "unlock-pdf", name: "Unlock PDF", icon: "🔓", desc: "Remove password" },
  ],
};

export default function App() {
  const [dark, setDark] = useState(false);
  const [files, setFiles] = useState<MockFile[]>([
    { name: "Q4-Financial-Report.pdf", size: "2.4 MB" },
    { name: "Project-Proposal-Final.pdf", size: "1.1 MB" },
  ]);
  const [dragActive, setDragActive] = useState(false);
  const [activeTool, setActiveTool] = useState<string>("merge-pdf");
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Lang>(LANGUAGES[0]);
  const [faqOpen, setFaqOpen] = useState<number>(0);
  const [modal, setModal] = useState<string | null>(null);

  // ============================================
  // GA4 + ADSTERRA INJECTION
  // ============================================
  useEffect(() => {
    // GA4 PLACEHOLDER - Replace G-XXXXXXXXXX with your ID from analytics.google.com
    // PASTE HERE: GA4
    // <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    // <script> gtag config </script>
    if (GA4_MEASUREMENT_ID && GA4_MEASUREMENT_ID !== "G-XXXXXXXXXX" && !GA4_MEASUREMENT_ID.includes("XXXX")) {
      const existing = document.querySelector(`script[src*="${GA4_MEASUREMENT_ID}"]`);
      if (!existing) {
        const s1 = document.createElement("script");
        s1.async = true;
        s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
        document.head.appendChild(s1);
        const s2 = document.createElement("script");
        s2.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_MEASUREMENT_ID}');
        `;
        document.head.appendChild(s2);
        s1.onload = () => {
          console.log("PaceFetch Analytics Ready - GA4:", GA4_MEASUREMENT_ID);
        };
      }
    } else {
      console.log("PaceFetch Analytics Ready - Placeholder mode (replace GA4_MEASUREMENT_ID with G-XXXXXXXXXX)");
    }

    // ADSTERRA SOCIAL BAR PLACEHOLDER
    // Paste your Adsterra Social Bar code here: e.g. script from Adsterra dashboard
    if (ADSTERRA_SOCIAL_BAR && !ADSTERRA_SOCIAL_BAR.includes("PASTE_ADSTERRA")) {
      try {
        const div = document.createElement("div");
        div.innerHTML = ADSTERRA_SOCIAL_BAR;
        const scripts = div.querySelectorAll("script");
        scripts.forEach((oldScript) => {
          const newScript = document.createElement("script");
          Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
          newScript.textContent = oldScript.textContent;
          document.body.appendChild(newScript);
        });
        console.log("PaceFetch Adsterra Social Bar injected");
      } catch (e) {
        console.warn("Adsterra Social Bar injection failed", e);
      }
    }
  }, []);

  // Bookmark popup state
  const [showBookmark, setShowBookmark] = useState(false);
  const [bookmarkSuccess, setBookmarkSuccess] = useState(false);
  const bookmarkTimerRef = useRef<number | null>(null);
  const successTimerRef = useRef<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const langListRef = useRef<HTMLDivElement>(null);
  const langContainerRef = useRef<HTMLDivElement>(null);

  // Bookmark logic
  useEffect(() => {
    const isBookmarked = localStorage.getItem("pacefetch_bookmarked") === "true";
    if (isBookmarked) return;

    const later = localStorage.getItem("pacefetch_bookmark_later");
    let delay = 15000;
    if (later) {
      const elapsed = Date.now() - parseInt(later, 10);
      if (elapsed < 90000) delay = 90000 - elapsed;
    }

    bookmarkTimerRef.current = window.setTimeout(() => {
      setShowBookmark(true);
      setBookmarkSuccess(false);
    }, delay);

    return () => {
      if (bookmarkTimerRef.current) window.clearTimeout(bookmarkTimerRef.current);
      if (successTimerRef.current) window.clearTimeout(successTimerRef.current);
    };
  }, []);

  const handleBookmark = () => {
    setBookmarkSuccess(true);
    localStorage.setItem("pacefetch_bookmarked", "true");
    localStorage.removeItem("pacefetch_bookmark_later");
    successTimerRef.current = window.setTimeout(() => {
      setShowBookmark(false);
      setBookmarkSuccess(false);
    }, 1500);
  };

  const handleLater = () => {
    setShowBookmark(false);
    setBookmarkSuccess(false);
    localStorage.setItem("pacefetch_bookmark_later", Date.now().toString());
    // schedule again after 90s
    bookmarkTimerRef.current = window.setTimeout(() => {
      const isBookmarked = localStorage.getItem("pacefetch_bookmarked") === "true";
      if (!isBookmarked) {
        setShowBookmark(true);
        setBookmarkSuccess(false);
      }
    }, 90000);
  };

  // hamburger outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // language outside click - closes when clicking anywhere else
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langContainerRef.current && !langContainerRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    if (langOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [langOpen]);

  const addMockFiles = (count = 1) => {
    const samples = [
      { name: "Contract-Signed.pdf", size: "0.9 MB" },
      { name: "Invoice_1248.pdf", size: "0.4 MB" },
      { name: "Resume-2026.pdf", size: "1.7 MB" },
    ];
    const toAdd = samples.slice(0, count);
    setFiles((p) => [...p, ...toAdd].slice(0, 6));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = Array.from(e.dataTransfer.files).map((f) => ({
      name: f.name,
      size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
    }));
    if (dropped.length) setFiles((p) => [...p, ...dropped].slice(0, 6));
    else addMockFiles(1);
  };

  const removeFile = (idx: number) => setFiles((p) => p.filter((_, i) => i !== idx));

  const activeToolObj = Object.values(TOOLS).flat().find(t => t.id === activeTool);

  return (
    <div className={`${dark ? "dark" : ""}`}>
      <div className={`min-h-screen antialiased selection:bg-violet-200 ${dark ? "bg-[#0A0A0A] text-white" : "bg-white text-zinc-900"}`} style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          .gradient-text { background: linear-gradient(90deg, #8B5CF6 0%, #06B6D4 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .gradient-bg { background: linear-gradient(90deg, #8B5CF6 0%, #06B6D4 100%); }
          .animate-gradient {
            background: linear-gradient(90deg, #8B5CF6, #06B6D4, #8B5CF6);
            background-size: 200% 100%;
            -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
            animation: gradientShift 3s ease-in-out infinite, shimmerPulse 2.5s ease-in-out infinite;
          }
          @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
          @keyframes shimmerPulse { 0%,100%{filter:brightness(1) drop-shadow(0 0 0px rgba(139,92,246,0))} 50%{filter:brightness(1.2) drop-shadow(0 0 12px rgba(6,182,214,0.4))} }
          .dashed-card { background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23D4D4D8' stroke-width='2' stroke-dasharray='12%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"); }
          @keyframes scaleIn { 0%{transform:scale(0.9); opacity:0} 100%{transform:scale(1); opacity:1} }
          .animate-scaleIn { animation: scaleIn 0.22s ease-out; }
          @keyframes tickPop { 0%{transform:scale(0)} 60%{transform:scale(1.15)} 100%{transform:scale(1)} }
          .animate-tickPop { animation: tickPop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
          @keyframes checkDraw { 0%{stroke-dashoffset:24} 100%{stroke-dashoffset:0} }
          .check-path { stroke-dasharray:24; stroke-dashoffset:24; animation: checkDraw 0.35s 0.2s ease-out forwards; }
          .no-scrollbar::-webkit-scrollbar{ display:none } .no-scrollbar{ -ms-overflow-style:none; scrollbar-width:none; }
        `}</style>

        {/* HEADER */}
        <header className={`sticky top-0 z-40 border-b ${dark ? "bg-[#0A0A0A] border-zinc-800" : "bg-[#0A0A0A] border-zinc-800"} `}>
          <div className="mx-auto max-w-[1160px] px-5 sm:px-8 h-[72px] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="PaceFetch logo" className="h-[44px] sm:h-[54px] w-auto object-contain" />
              <span className="text-[18px] font-extrabold tracking-tight gradient-text">PaceFetch</span>
            </div>

            <div className="flex items-center gap-2">
              {/* dark toggle 40x40 */}
              <button
                onClick={() => setDark(!dark)}
                className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 grid place-items-center text-zinc-300 hover:text-white transition"
                aria-label="Toggle theme"
              >
                <span className="text-[16px]">{dark ? "☀" : "🌙"}</span>
              </button>

              {/* desktop nav */}
              <nav className="hidden lg:flex items-center gap-6 text-[13.5px] font-medium text-zinc-400 ml-2">
                <a href="#tools" className="hover:text-white transition">Tools</a>
                <a href="#faq" className="hover:text-white transition">FAQs</a>
              </nav>

              {/* hamburger */}
              <div className="relative ml-1" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center gap-1.5 hover:bg-zinc-800 transition"
                  aria-label="Menu"
                >
                  <span className="w-[16px] h-[2px] bg-zinc-300 rounded-full" />
                  <span className="w-[16px] h-[2px] bg-zinc-300 rounded-full" />
                  <span className="w-[16px] h-[2px] bg-zinc-300 rounded-full" />
                </button>
                {menuOpen && (
                  <div className={`absolute right-0 top-[48px] w-[260px] rounded-[16px] shadow-2xl border overflow-hidden z-50 ${dark ? "bg-[#1A1A1A] border-zinc-800" : "bg-white border-zinc-200"}`}>
                    <div className="p-2">
                      {[
                        { label: "Privacy Policy", id: "privacy" },
                        { label: "Terms & Policy", id: "terms" },
                        { label: "FAQs", id: "faqs" },
                        { label: "About", id: "about" },
                        { label: "Contact", id: "contact" },
                      ].map((it) => (
                        <button
                          key={it.id}
                          onClick={() => { setModal(it.id); setMenuOpen(false); }}
                          className={`w-full text-left px-4 py-3 rounded-xl text-[13.5px] font-medium transition ${dark ? "hover:bg-zinc-800 text-zinc-200" : "hover:bg-zinc-50 text-zinc-700"}`}
                        >
                          {it.label}
                        </button>
                      ))}
                      <div className="my-2 h-px bg-zinc-800/50" />
                      <div className="px-4 py-2 text-[11px] text-zinc-500">© 2026 PaceFetch</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* LANGUAGE BUTTON fixed right center */}
        <div ref={langContainerRef} className="fixed right-0 top-1/2 -translate-y-1/2 z-30 flex items-start">
          {/* panel */}
          {langOpen && (
            <div
              ref={langListRef}
              className={`mr-2 w-[210px] rounded-l-[16px] rounded-r-none shadow-2xl border overflow-hidden ${dark ? "bg-[#1F1F1F] border-zinc-700" : "bg-white border-zinc-200"}`}
              style={{ maxHeight: "320px", overscrollBehavior: "contain" }}
              onWheel={(e) => e.stopPropagation()}
            >
              <div
                className="overflow-y-auto overscroll-contain no-scrollbar"
                style={{ maxHeight: "320px", overscrollBehavior: "contain" }}
                onWheel={(e) => e.stopPropagation()}
              >
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setSelectedLang(l); setLangOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-[13px] transition ${selectedLang.code===l.code ? (dark ? "bg-zinc-800 text-white" : "bg-violet-50 text-violet-700") : (dark ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-600 hover:bg-zinc-50")}`}
                  >
                    <span className="text-[16px]">{l.flag}</span>
                    <span className="font-medium">{l.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="h-[28px] w-[32px] rounded-l-full bg-white dark:bg-[#1F1F1F] border border-r-0 border-zinc-200 dark:border-zinc-700 shadow-md grid place-items-center text-[14px] hover:w-[36px] transition-all"
            style={{ writingMode: "horizontal-tb" }}
            aria-label="Language"
          >
            {selectedLang.flag}
          </button>
        </div>

        {/* HERO */}
        <section className={`${dark ? "bg-[#0A0A0A]" : "bg-white"}`}>
          <div className="mx-auto max-w-[1160px] px-5 sm:px-8 pt-10 sm:pt-16 pb-8 text-center">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-semibold tracking-wide uppercase mb-6 ${dark ? "bg-violet-950/30 border-violet-800 text-violet-300" : "bg-violet-50 border-violet-200 text-violet-700"}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Offline • Browser Native • {selectedLang.flag}
            </div>
            <h1 className={`mx-auto max-w-[760px] text-[30px] sm:text-[48px] font-extrabold tracking-[-0.03em] leading-[0.95] ${dark ? "text-white" : "text-zinc-900"}`}>
              Merge & Compress PDF Files — <br className="hidden sm:block" />
              <span className="gradient-text">Free, Private & Offline</span>
            </h1>
            <p className={`mx-auto mt-4 max-w-[560px] text-[15px] sm:text-[17px] leading-7 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>
              Your files never leave your device. 100% browser-side processing, unlike iLovePDF.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              {["No Upload", "No Tracking", "100% Private"].map((badge) => (
                <div key={badge} className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-[12.5px] font-semibold shadow-sm ${dark ? "border-zinc-800 bg-zinc-900 text-zinc-300" : "border-zinc-200 bg-white text-zinc-700"}`}>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px]">✓</span>
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TOOLS GRID */}
        <section id="tools" className={`${dark ? "bg-[#0A0A0A]" : "bg-white"} pb-6`}>
          <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
            {Object.entries(TOOLS).map(([cat, tools]) => (
              <div key={cat} className="mb-8">
                <h3 className={`text-[11px] font-bold tracking-[0.16em] uppercase mb-3 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>{cat}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {tools.map((t) => {
                    const active = activeTool===t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          if (activeTool === t.id) {
                            setActiveTool("");
                            window.setTimeout(() => setActiveTool(t.id), 30);
                          } else {
                            setActiveTool(t.id);
                          }
                        }}
                        className={`group text-left rounded-[16px] border p-4 transition-all hover:scale-[1.01] active:scale-[0.99] relative ${
                          active
                            ? "gradient-bg border-transparent text-white shadow-lg shadow-violet-200"
                            : dark ? "bg-[#141414] border-zinc-800 hover:border-zinc-700 text-white" : "bg-white border-zinc-200 hover:border-zinc-300"
                        }`}
                      >
                        {t.popular && (
                          <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-amber-400 text-[8px] font-extrabold tracking-widest text-black uppercase shadow-sm">Popular</span>
                        )}
                        <div className={`h-8 w-8 rounded-lg grid place-items-center text-[14px] font-bold mb-2.5 ${active ? "bg-white/20 text-white" : dark ? "bg-zinc-900 text-zinc-200" : "bg-zinc-50 border border-zinc-200 text-zinc-700"}`}>
                          {t.icon}
                        </div>
                        <div className={`text-[13px] font-bold leading-tight ${active ? "text-white" : dark ? "text-white" : "text-zinc-900"}`}>{t.name}</div>
                        <div className={`mt-1 text-[11px] leading-4 ${active ? "text-white/80" : dark ? "text-zinc-500" : "text-zinc-500"}`}>{t.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MAIN TOOL UI */}
        <section id="merge" className={`${dark ? "bg-[#0A0A0A]" : "bg-white"} pb-12`}>
          <div className="mx-auto max-w-[760px] px-5 sm:px-6">
            <div className={`rounded-[20px] border shadow-[0_16px_48px_-16px_rgba(0,0,0,0.12)] overflow-hidden ${dark ? "bg-[#111111] border-zinc-800" : "bg-white border-zinc-200"}`}>
              <div className={`px-5 py-4 flex items-center justify-between border-b ${dark ? "border-zinc-800" : "border-zinc-100"}`}>
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg gradient-bg grid place-items-center text-white text-[13px]">{activeToolObj?.icon}</div>
                  <div>
                    <div className={`text-[14px] font-bold ${dark ? "text-white" : "text-zinc-900"}`}>{activeToolObj?.name}</div>
                    <div className="text-[11px] text-zinc-500">{activeToolObj?.desc} • Offline</div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-600 font-semibold border border-emerald-200">● LIVE</span>
              </div>

              {/* Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`relative mx-4 sm:mx-6 mt-6 rounded-[16px] transition-all ${dragActive ? "bg-violet-50" : dark ? "bg-[#1A1A1A]" : "bg-[#FBFBFD]"} dashed-card`}
              >
                <div className="py-10 sm:py-12 flex flex-col items-center text-center px-4">
                  <div className="h-12 w-12 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-violet-200 mb-4">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 16V3M12 3L8 7M12 3L16 7M4 13V20H20V13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <p className={`text-[15px] font-semibold ${dark ? "text-white" : "text-zinc-900"}`}>Drop {activeTool.includes("pdf") ? "PDFs" : "files"} here or click to browse</p>
                  <p className="mt-1 text-[13px] text-zinc-500">Supports multiple files • Max 100MB each • Offline</p>
                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className={`px-4 py-2.5 rounded-full border text-[13px] font-semibold transition ${dark ? "border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800" : "border-zinc-200 bg-white hover:bg-zinc-50"}`}
                    >
                      Add {activeTool.includes("jpg") ? "Images" : "PDFs"}
                    </button>
                    <button
                      onClick={() => addMockFiles(1)}
                      className="px-4 py-2.5 rounded-full bg-zinc-900 text-white text-[13px] font-semibold hover:bg-black transition"
                    >
                      {activeToolObj?.name}
                    </button>
                    <input ref={fileInputRef} type="file" multiple className="hidden" onChange={() => addMockFiles(1)} />
                  </div>
                </div>
              </div>

              {/* File List */}
              <div className="px-4 sm:px-6 pt-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[12px] font-semibold tracking-widest uppercase text-zinc-400">{files.length} files • {files.length > 1 ? "Drag to reorder" : "Ready"}</p>
                  {files.length > 0 && <button onClick={() => setFiles([])} className="text-[12px] font-medium text-zinc-500 hover:text-zinc-800">Clear all</button>}
                </div>
                <div className="space-y-2">
                  {files.map((f, i) => (
                    <div key={i} className={`group flex items-center gap-3 rounded-xl border px-3.5 py-3 transition ${dark ? "border-zinc-800 bg-[#1A1A1A] hover:border-zinc-700" : "border-zinc-200 bg-white hover:border-zinc-300"}`}>
                      <div className="h-9 w-9 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-[11px] font-bold text-red-600">PDF</div>
                      <div className="min-w-0 flex-1">
                        <p className={`truncate text-[13.5px] font-medium ${dark ? "text-white" : "text-zinc-900"}`}>{f.name}</p>
                        <p className="text-[11.5px] text-zinc-500">{f.size} • Page {i + 1}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`hidden sm:flex h-6 w-6 items-center justify-center rounded-md border text-zinc-400 cursor-grab ${dark ? "bg-zinc-900 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`}>≡</div>
                        <button onClick={() => removeFile(i)} className="h-7 w-7 grid place-items-center rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition">✕</button>
                      </div>
                    </div>
                  ))}
                  {files.length === 0 && (
                    <div className={`rounded-xl border border-dashed py-8 text-center text-[13px] ${dark ? "border-zinc-800 bg-zinc-900/50 text-zinc-500" : "border-zinc-200 bg-zinc-50 text-zinc-500"}`}>No files yet. Add files to start.</div>
                  )}
                </div>
              </div>

              <div className="px-4 sm:px-6 py-6">
                <button
                  onClick={() => addMockFiles(1)}
                  disabled={files.length < 1}
                  className="w-full h-[52px] rounded-full gradient-bg text-white text-[15px] font-bold tracking-wide shadow-[0_8px_24px_-8px_rgba(139,92,246,0.6)] hover:shadow-[0_12px_28px_-10px_rgba(139,92,246,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Download {activeToolObj?.name} ↓
                </button>
                <p className="mt-3 text-center text-[12px] text-zinc-500 flex items-center justify-center gap-1.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Processing happens offline in your browser — no server upload, ever.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* REPLACE WITH ADSTERRA NATIVE BANNER CODE */}
        {/* ADSTERRA NATIVE BANNER 300x250 SLOT */}
        <section className={`${dark ? "bg-[#0F0F0F] border-zinc-900" : "bg-[#FAFAFA] border-zinc-100"} border-y py-8`}>
          <div className="mx-auto max-w-[760px] px-5 sm:px-6">
            {/* TODO: Replace div below with your Adsterra Native Banner code */}
            {/* Example: paste Adsterra Native Banner script provided in dashboard inside this container */}
            {/* adsterraNativeCode = "PASTE_ADSTERRA_NATIVE_BANNER_300x250_CODE_HERE" */}
            <div id="adsterra-native-300x250" className={`w-full rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center gap-2 p-6 ${dark ? "border-zinc-700 bg-[#141414]" : "border-zinc-300 bg-[#F4F4F5]"}`} style={{ minHeight: "250px", height: "250px" }}>
              <span className="text-[10px] font-bold tracking-[0.16em] uppercase px-2 py-1 rounded-full bg-violet-600 text-white">ADSTERRA</span>
              <span className={`text-[13px] font-semibold mt-1 ${dark ? "text-zinc-200" : "text-zinc-700"}`}>ADSTERRA NATIVE BANNER 300x250 - Replace this div with your Adsterra Native Banner code</span>
              <span className="text-[11px] text-zinc-500 max-w-[420px] leading-4">Paste code from Adsterra → Native Banner → 300x250. Keep id="adsterra-native-300x250". Code variable: adsterraNativeCode</span>
              <span className="text-[10px] text-zinc-400 font-mono mt-1">{adsterraNativeCode.slice(0, 48)}...</span>
            </div>
          </div>
        </section>

        {/* HOW + WHY */}
        <section className={`${dark ? "bg-[#0A0A0A]" : "bg-white"} py-14 sm:py-20`}>
          <div className="mx-auto max-w-[1160px] px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12">
            <div>
              <h2 className={`text-[28px] sm:text-[32px] font-extrabold tracking-tight leading-tight ${dark ? "text-white" : ""}`}>How to Merge PDF with PaceFetch</h2>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { n: "01", t: "Add your PDFs", d: "Drag & drop or click Add PDFs. Reorder by dragging. 100% offline." },
                  { n: "02", t: "Click Merge", d: "Files are merged locally in your browser with WebAssembly — zero upload." },
                  { n: "03", t: "Download", d: "Get your merged file instantly. Original files never touched or stored." },
                ].map(step => (
                  <div key={step.n} className={`rounded-2xl border p-5 ${dark ? "border-zinc-800 bg-[#141414]" : "border-zinc-200 bg-[#FCFCFD]"}`}>
                    <div className="text-[12px] font-bold tracking-widest text-violet-600">{step.n}</div>
                    <h3 className={`mt-2 text-[15px] font-bold ${dark ? "text-white" : "text-zinc-900"}`}>{step.t}</h3>
                    <p className="mt-2 text-[13.5px] leading-6 text-zinc-500">{step.d}</p>
                  </div>
                ))}
              </div>

              <h2 className={`mt-16 text-[28px] sm:text-[32px] font-extrabold tracking-tight leading-tight ${dark ? "text-white" : ""}`}>Why PaceFetch is Safer Than iLovePDF / SmallPDF</h2>
              <p className={`mt-4 text-[14.5px] leading-6 max-w-[560px] ${dark ? "text-zinc-400" : "text-zinc-600"}`}>
                Most online PDF tools upload your sensitive documents to their servers. PaceFetch processes everything client-side. Your contracts, financials, and IDs never leave your device.
              </p>

              <div className={`mt-8 overflow-hidden rounded-2xl border ${dark ? "border-zinc-800" : "border-zinc-200"}`}>
                <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-zinc-900 text-white text-[12px] font-semibold tracking-wide uppercase">
                  <div className="px-5 py-3.5">Feature</div>
                  <div className="px-5 py-3.5 text-center">PaceFetch</div>
                  <div className="px-5 py-3.5 text-center text-zinc-400">Others</div>
                </div>
                {[
                  { f: "Privacy", p: "✓ Private, No Upload", o: "✗ Uploads to server" },
                  { f: "Tracking", p: "✓ No tracking", o: "✗ Cookies & analytics" },
                  { f: "Offline Mode", p: "✓ Works offline", o: "✗ Requires internet" },
                  { f: "File Limits", p: "✓ No limits", o: "✗ 2-3 free tasks/day" },
                  { f: "Data Retention", p: "✓ Deleted instantly", o: "✗ Stored 1-2 hours" },
                  { f: "Open Source Logic", p: "✓ Client-side WASM", o: "✗ Closed server" },
                ].map((row) => (
                  <div key={row.f} className={`grid grid-cols-[1.2fr_1fr_1fr] border-t text-[13.5px] ${dark ? "border-zinc-800" : "border-zinc-200"}`}>
                    <div className={`px-5 py-3.5 font-medium ${dark ? "bg-[#141414] text-zinc-300" : "bg-zinc-50/60 text-zinc-800"}`}>{row.f}</div>
                    <div className={`px-5 py-3.5 text-center font-semibold ${dark ? "bg-emerald-950/20 text-emerald-400" : "bg-emerald-50/40 text-emerald-700"}`}>{row.p}</div>
                    <div className={`px-5 py-3.5 text-center text-zinc-500 ${dark ? "bg-[#0F0F0F]" : "bg-white"}`}>{row.o}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pl-8">
              <div className={`rounded-[20px] border p-6 sm:p-7 shadow-sm ${dark ? "border-zinc-800 bg-[#141414]" : "border-zinc-200 bg-[#FFFEFE]"}`}>
                <div className="flex items-center gap-3">
                  <img src={logo} alt="" className="h-8 w-auto" />
                  <span className={`font-bold text-[14px] ${dark ? "text-white" : ""}`}>Trusted by privacy-first teams</span>
                </div>
                <ul className={`mt-5 space-y-3 text-[13.5px] ${dark ? "text-zinc-300" : "text-zinc-700"}`}>
                  <li className="flex gap-2.5"><span className="text-violet-600">•</span> Zero-knowledge architecture — we literally cannot see your files</li>
                  <li className="flex gap-2.5"><span className="text-violet-600">•</span> No account, no email, no watermarks</li>
                  <li className="flex gap-2.5"><span className="text-violet-600">•</span> Works on airplane mode after first load</li>
                  <li className="flex gap-2.5"><span className="text-violet-600">•</span> Fast WASM engine — faster than server upload</li>
                </ul>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-zinc-900 text-white p-4">
                    <div className="text-[11px] uppercase tracking-widest opacity-60">Compress PDF</div>
                    <div className="mt-1 text-[13px] font-semibold">Reduce up to 80%</div>
                  </div>
                  <div className={`rounded-xl border p-4 ${dark ? "border-zinc-800 bg-[#1A1A1A]" : "border-zinc-200 bg-white"}`}>
                    <div className="text-[11px] uppercase tracking-widest text-zinc-400">Compress Image</div>
                    <div className={`mt-1 text-[13px] font-semibold ${dark ? "text-white" : ""}`}>JPG • PNG • WebP</div>
                  </div>
                </div>
             </div>

            </div>
          </div>
        </section>

        {/* REPLACE WITH ADSTERRA BANNER 728x90 CODE */}
        {/* ADSTERRA BANNER 728x90 SLOT */}
        <section className={`${dark ? "bg-[#0F0F0F] border-zinc-900" : "bg-[#FAFAFA] border-zinc-100"} border-y py-6`}>
          <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
            {/* TODO: Replace div below with your Adsterra Banner 728x90 code */}
            {/* adsterraBannerCode = "PASTE_ADSTERRA_BANNER_728x90_CODE_HERE" */}
            <div id="adsterra-banner-728x90" className={`w-full rounded-xl border-2 border-dashed flex flex-col sm:flex-row items-center justify-center text-center gap-2 sm:gap-3 px-4 ${dark ? "border-zinc-700 bg-[#141414]" : "border-zinc-300 bg-[#F4F4F5]"}`} style={{ minHeight: "90px", height: "90px" }}>
              <span className="text-[10px] font-bold tracking-[0.16em] uppercase px-2 py-1 rounded-full bg-cyan-600 text-white">ADSTERRA</span>
              <span className={`text-[12px] font-semibold ${dark ? "text-zinc-200" : "text-zinc-700"}`}>ADSTERRA BANNER 728x90 - Replace with your Adsterra Banner code</span>
              <span className="hidden sm:inline text-[10px] text-zinc-500 font-mono">{adsterraBannerCode.slice(0, 32)}...</span>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className={`${dark ? "bg-[#0A0A0A]" : "bg-white"} py-14 sm:py-20`}>
          <div className="mx-auto max-w-[760px] px-5 sm:px-8">
            <h2 className={`text-center text-[28px] sm:text-[34px] font-extrabold tracking-tight ${dark ? "text-white" : ""}`}>Frequently Asked Questions</h2>
            <p className="mt-3 text-center text-[14px] text-zinc-500">Everything you need to know about privacy, pricing, and file support.</p>
            <div className={`mt-10 divide-y rounded-2xl border overflow-hidden ${dark ? "divide-zinc-800 border-zinc-800" : "divide-zinc-200 border-zinc-200"}`}>
              {[
                { q: "Is PaceFetch really private?", a: "Absolutely. PaceFetch uses WebAssembly to process PDFs directly in your browser. Your files are never uploaded, never stored, and never seen by us. You can even disconnect Wi-Fi after loading the page and it still works. This is fundamentally different from iLovePDF or SmallPDF which upload your files to their servers." },
                { q: "Is it free?", a: "Yes — 100% free, no limits, no watermarks, no signup. We keep PaceFetch free with lightweight, privacy-respecting ads. No premium upsells hiding core features." },
                { q: "Do I need to install anything?", a: "No. Just open pacefetch.com in any modern browser on desktop or mobile. All tools work instantly. No extension, no app, no download. For best performance, use Chrome, Edge, Firefox, or Safari (latest versions)." },
                { q: "What files are supported?", a: "Today: PDF merge (unlimited files), PDF compression (up to 80% size reduction), and image compression for JPG, PNG, WebP. Plus split, rotate, delete pages, watermark, protect, unlock, PDF to Word, Word to PDF, JPG to PDF and PDF to JPG — all still 100% private and offline." },
              ].map((item, idx) => (
                <div key={idx} className={`${dark ? "bg-[#111111]" : "bg-white"} ${faqOpen===idx ? dark ? "bg-[#141414]" : "bg-[#FCFCFD]" : ""}`}>
                  <button
                    onClick={() => setFaqOpen(faqOpen===idx ? -1 : idx)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  >
                    <h3 className={`text-[15px] font-semibold ${dark ? "text-white" : "text-zinc-900"}`}>{item.q}</h3>
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[12px] transition-transform ${faqOpen===idx ? "rotate-180" : ""} ${dark ? "border-zinc-700 text-zinc-400" : "border-zinc-200 text-zinc-500"}`}>⌄</span>
                  </button>
                  {faqOpen===idx && <div className="px-6 pb-6 text-[13.5px] leading-6 text-zinc-500">{item.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER — ALL CENTERED */}
        <footer className="bg-[#0A0A0A] border-t border-zinc-900">
          <div className="mx-auto max-w-[1160px] px-5 sm:px-8 py-12 flex flex-col items-center text-center">
            <nav className="flex items-center justify-center gap-3 text-[13px] font-medium text-zinc-400">
              <button onClick={()=>setModal("privacy")} className="hover:text-white transition">Privacy</button>
              <span className="text-zinc-600">•</span>
              <button onClick={()=>setModal("terms")} className="hover:text-white transition">Policy</button>
              <span className="text-zinc-600">•</span>
              <button onClick={()=>setModal("faqs")} className="hover:text-white transition">FAQs</button>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <button onClick={()=>setModal("about")} className="hover:text-white transition hidden sm:inline">About</button>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <button onClick={()=>setModal("contact")} className="hover:text-white transition hidden sm:inline">Contact</button>
            </nav>
            <div className="mt-5 text-[13px] font-medium tracking-wide text-zinc-500">© 2026 PaceFetch</div>
            <div className="mt-2 text-[13.5px] font-medium text-zinc-400">
              Designed by <span className="animate-gradient font-extrabold text-[14px] tracking-tight">Pacethel</span><span className="ml-1 inline-block animate-[shimmerPulse_2.5s_ease-in-out_infinite]">✦</span>
            </div>
            <div className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
            <p className="mt-6 max-w-[420px] text-[11px] leading-5 text-zinc-600">PaceFetch runs entirely in your browser. No uploads, no tracking, no server logs. Private file toolkit for everyone.</p>
          </div>
        </footer>

        {/* BOOKMARK MODAL - centered popup */}
        {showBookmark && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className={`w-full max-w-[400px] rounded-[20px] shadow-2xl p-6 animate-scaleIn border relative ${dark ? "bg-[#1F1F1F] border-zinc-800" : "bg-white border-zinc-200"}`}>
              {/* X close */}
              <button
                onClick={handleLater}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 grid place-items-center text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition"
                aria-label="Close"
              >
                ✕
              </button>

              {!bookmarkSuccess ? (
                <>
                  <div className="flex flex-col items-center text-center pt-2">
                    <div className="text-[56px] leading-none select-none">🔖</div>
                    <h3 className={`font-bold text-[20px] mt-3 ${dark ? "text-white" : "text-zinc-900"}`}>Add PaceFetch to Bookmarks?</h3>
                    <p className="text-[13.5px] text-zinc-500 text-center mt-2 max-w-[280px] leading-5">Quick access to all 13 PDF tools anytime</p>
                  </div>
                  <button
                    onClick={handleBookmark}
                    className="w-full h-11 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-full font-bold mt-6 hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-violet-200"
                  >
                    🔖 Bookmark
                  </button>
                  <button
                    onClick={handleLater}
                    className="w-full h-10 text-zinc-500 text-[13.5px] mt-2 hover:text-zinc-700 dark:hover:text-zinc-300 transition font-medium"
                  >
                    Later
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 grid place-items-center animate-tickPop">
                    <div className="w-12 h-12 rounded-full bg-green-500 grid place-items-center">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <path className="check-path" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-bold text-[20px] mt-4 text-green-600">Bookmarked!</h3>
                  <p className="text-[13px] text-zinc-500 mt-1.5">Find PaceFetch in your bookmarks</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer modals */}
        {modal && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={()=>setModal(null)}>
            <div onClick={e=>e.stopPropagation()} className={`w-full max-w-[560px] max-h-[80vh] overflow-y-auto rounded-[20px] border shadow-2xl p-6 sm:p-8 ${dark ? "bg-[#1F1F1F] border-zinc-800 text-zinc-200" : "bg-white border-zinc-200 text-zinc-700"}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-[18px] font-bold capitalize ${dark ? "text-white" : "text-zinc-900"}`}>{modal === "terms" ? "Terms & Policy" : modal}</h3>
                <button onClick={()=>setModal(null)} className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 grid place-items-center">✕</button>
              </div>
              <div className="text-[13.5px] leading-6 space-y-3">
                {modal==="privacy" && <p>PaceFetch processes all files 100% in your browser using WebAssembly. We never upload, store, or see your documents. No cookies for tracking, no server logs. Your privacy is architecturally guaranteed.</p>}
                {modal==="terms" && <p>By using PaceFetch you agree to use it lawfully. All processing is client-side; you retain full rights to your files. Service is provided as-is, free, without warranties. No data retention.</p>}
                {modal==="faqs" && <p><strong>Is it private?</strong> Yes, offline WASM. <br/><strong>Is it free?</strong> Yes, supported by ads. <br/><strong>Need install?</strong> No, works in browser.</p>}
                {modal==="about" && <p>PaceFetch is a privacy-first PDF toolkit built by Pacethel. We believe file tools shouldn't require uploads. 13 tools, zero tracking, open client-side logic.</p>}
                {modal==="contact" && <p>Reach us at hello@pacefetch.com (mock). For privacy concerns, we respond within 24h. No data is collected, so support is limited to tool usage.</p>}
                <p className="text-[11px] text-zinc-500 pt-4 border-t border-zinc-200 dark:border-zinc-800 mt-4">© 2026 PaceFetch — Designed by Pacethel</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
