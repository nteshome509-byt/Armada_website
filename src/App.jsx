import { useEffect, useRef, useState } from "react";
import pattern from "../assets/pattern.svg";
import headerLogo from "../assets/Logo for hed.svg";
import heroImage from "../assets/heroimage.webp";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Opportunity", href: "#opportunity" },
  { label: "Project", href: "#snapshot" },
  { label: "ESG", href: "#esg" },
  { label: "Investment", href: "#capital" },
  { label: "Contact", href: "mailto:admin@armadaeth.com" },
];

const fallbackPrices = [
  { currency: "USD", value: "$85.45", note: "Daily Ref" },
  { currency: "ETB", value: "11,200", note: "Daily Ref" },
];

const snapshot = [
  { label: "Location", value: "Sherkole, Ethiopia" },
  { label: "Throughput", value: "400 tonnes/day" },
  { label: "Timeline", value: "8–12 Months" },
  { label: "Strategy", value: "Tailings → Hard Rock" },
];

const recoverySteps = [
  { id: "01", title: "Feed Sourcing", description: "Tailings sourcing and QA/QC sampling." },
  { id: "02", title: "Concentration", description: "Gravity concentration and classification." },
  { id: "03", title: "Intensive Leaching", description: "Intensive leaching for high-efficiency recovery." },
  { id: "04", title: "Gold Smelting", description: "Electrowinning and smelting in controlled room." },
];

const techAdvantages = [
  {
    title: "Intelligence-Led Systems",
    description: "We convert field data and mapping into actionable operational insight, closing the information gap."
  },
  {
    title: "Operational Discipline",
    description: "Engineered processes that improve safety, consistency, and industrial-grade output."
  },
  {
    title: "Human Capital",
    description: "Deep investment in talent. We train and organize teams to execute safely and consistently."
  }
];

const corporateInfo = [
  { label: "Founded", value: "2025" },
  { label: "Headquarters", value: "Addis Ababa, ET" },
  { label: "Company Size", value: "11-50 employees" },
];

const esgPrinciples = [
  {
    category: "Environmental",
    details: "Reprocessing tailings reduces land disturbance and environmental waste legacy."
  },
  {
    category: "Social Impact",
    details: "Supporting mining communities through training and disciplined workforce organization."
  },
  {
    category: "Governance",
    details: "Structured custody and formal revenue pathways integrated with NBE systems."
  }
];

const benchmarkDetails = [
  { category: "Daily Throughput", base: "200 t", optimal: "400 t" },
  { category: "Est. Head Grade", base: "4.2 g/t", optimal: "5.5 g/t" },
  { category: "Process Recovery", base: "32%", optimal: "45%" },
  { category: "Monthly Output", base: "7.1 kg", optimal: "14.2 kg" },
];

const capitalAllocation = [
  { area: "Plant & Equipment", percent: 45 },
  { area: "Civil Works & Utilities", percent: 25 },
  { area: "Gold Room & Security", percent: 15 },
  { area: "Logistics & Ops", percent: 15 },
];

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return scrolled;
}

function App() {
  const [goldPrices, setGoldPrices] = useState(fallbackPrices);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [benchmarksOpen, setBenchmarksOpen] = useState(false);
  const heroRef = useRef(null);
  const scrolled = useScrolled(20);
  const showBackToTop = useScrolled(420);
  const showHeaderGoldPrice = !heroVisible;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const heroNode = heroRef.current;
    if (!heroNode) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      setHeroVisible(entry.isIntersecting);
    });

    observer.observe(heroNode);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchGoldRates = async () => {
      try {
        const response = await fetch("https://api.nbe.gov.et/api/filter-gold-rates");
        if (!response.ok) return;

        const json = await response.json();
        const goldData = json?.data && json.data.length > 0 ? json.data[0] : null;
        if (!goldData) return;

        const usdRaw = goldData.price_usd;
        const etbRaw = goldData.price_birr;
        if (!usdRaw && !etbRaw) return;

        const usdValue = usdRaw ? `$${Number(usdRaw).toFixed(2)}` : fallbackPrices[0].value;
        const etbValue = etbRaw
          ? `${Number(etbRaw).toLocaleString("en-US", { maximumFractionDigits: 2 })}`
          : fallbackPrices[1].value;

        setGoldPrices([
          { currency: "USD", value: usdValue, note: "indicative" },
          { currency: "ETB", value: etbValue, note: "indicative" },
        ]);
      } catch {
        // Keep fallback values.
      }
    };

    fetchGoldRates();
  }, []);

  return (
    <div className="site-shell">
      <header
        className={`site-header${scrolled ? " scrolled" : ""}${
          heroVisible ? " site-header--transparent" : ""
        }`}
      >
        <div className="shell nav-wrap">
          <a className="brand" href="#top" aria-label="Armada Mining">
            <div className="brand-icon">
              <img src={headerLogo} alt="Armada Mining logo" />
            </div>
          </a>

          <nav className="nav-links" aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          {showHeaderGoldPrice && (
            <div className="header-right">
              <div className="gold-ticker" aria-label="Live gold price">
                <span className="ticker-description">Daily Gold Price</span>
                <div className="ticker-cards">
                  {goldPrices.map((item) => (
                    <div key={item.currency} className="ticker-card">
                      <span className="ticker-currency">{item.currency}</span>
                      <strong className="ticker-value">{item.value}</strong>
                      <span className="ticker-unit">/g</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            className="hamburger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className={`ham-bar${menuOpen ? " open" : ""}`} />
            <span className={`ham-bar${menuOpen ? " open" : ""}`} />
            <span className={`ham-bar${menuOpen ? " open" : ""}`} />
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-menu" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section id="top" ref={heroRef} className="hero">
          <div className="hero-media" aria-hidden="true">
            <img src={heroImage} alt="" />
          </div>
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-pattern" aria-hidden="true">
            <img src={pattern} alt="" />
          </div>
          <div className="shell hero-layout">
            <div className="hero-text">
              <div className="hero-badges">
                <span className="badge-pill">Phase 1: Tailings Recovery</span>
                <span className="badge-pill badge-outline">Phase 2: Hard Rock Expansion</span>
              </div>
              <h1 className="hero-title">Structured Gold Recovery Infrastructure for Ethiopia</h1>
              <p className="lead-copy">
                Armada Mining bridges the gap between geological potential and industrial execution,
                converting field data into bankable, auditable gold production systems.
              </p>

              {/* Structured Project Location Block */}
              <div className="hero-project-meta">
                <div className="project-meta-item">
                  <span className="meta-label">Project Location</span>
                  <span className="meta-value">Sherkole Gold Belt, Ethiopia</span>
                </div>
                <div className="project-meta-item">
                  <span className="meta-label">Region</span>
                  <span className="meta-value">Benishangul-Gumuz</span>
                </div>
                <div className="project-meta-item">
                  <span className="meta-label">Strategy</span>
                  <span className="meta-value">Tailings Recovery + Hard Rock Expansion</span>
                </div>
              </div>

              {/* Gold Market Reference — institutional framing */}
              <div className="hero-market-ref">
                <span className="market-ref-label">Gold Benchmark (Market Reference)</span>
                <div className="market-ref-prices">
                  {goldPrices.map((p) => (
                    <span key={p.currency} className="market-ref-price">
                      <strong>{p.currency}</strong> {p.value}/g
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Hierarchy */}
              <div className="hero-actions">
                <a className="button button-accent" href="#capital">
                  Partner With Us
                </a>
                <a className="button button-ghost" href="#snapshot">
                  View Project Overview
                </a>
              </div>

              {/* Trust Signals */}
              <div className="hero-trust">
                <span className="trust-item">📋 Phase 1: USD 2.5M Structured Capital Raise</span>
                <span className="trust-divider">·</span>
                <span className="trust-item">👥 11–50 Member Technical Team</span>
                <span className="trust-divider">·</span>
                <span className="trust-item">🇪🇹 Ethiopia-Based Operations</span>
              </div>

              {/* Subtle tertiary action */}
              <a className="hero-deck-link" href="mailto:invest@armadaeth.com">
                Request Investor Brief →
              </a>

            </div>
            {/* Subtle Ticker in Hero - but only on desktop maybe? Standardizing as per user's 'subtle' advice */}
          </div>
        </section>

        <section id="about" className="section shell">
          <div className="section-intro reveal">
            <p className="eyebrow">About Armada</p>
            <h2>Closing the Information Gap</h2>
            <p className="description-text">
              Armada Mining is a technology-first platform for Ethiopian gold mining. 
              We solve the intelligence deficit that slows investors down, turning field data into 
              modern execution: from exploration planning to disciplined production.
            </p>
            <p className="description-text">
              By combining data, mapping, and standardized operating systems, we bring institutional 
              clarity to a traditionally disorganized sector.
            </p>
          </div>
        </section>

        <section id="opportunity" className="section section-soft">
          <div className="shell">
            <div className="section-intro reveal">
              <p className="eyebrow">The Opportunity</p>
              <h2>Tailings as a Recoverable Asset</h2>
              <p className="description-text">
                Ethiopia hosts one of the region’s largest artisanal gold economies, yet most of its
                recoverable gold is lost to low-efficiency processing. Tailings — the residue left behind —
                represent a large, accessible, and underutilized resource.
              </p>
              <div className="insight-box">
                <h3>Why Tailings First?</h3>
                <p>
                  Reprocessing tailings requires no new excavation, delivers faster deployment,
                  and generates early cash flow while funding Phase 2 hard-rock infrastructure.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="model" className="section shell">
          <div className="section-intro reveal">
            <p className="eyebrow">The Armada Model</p>
            <h2>Two Phases. One Platform.</h2>
          </div>
          <div className="model-grid reveal">
            <div className="model-card">
              <div className="card-header">
                <span className="phase-mark">Phase 1</span>
                <h3>Tailings Recovery</h3>
              </div>
              <ul className="accent-list">
                <li>Fast deployment (8–12 months)</li>
                <li>Lower capital requirements</li>
                <li>Early cash flow generation</li>
              </ul>
            </div>
            <div className="model-card">
              <div className="card-header">
                <span className="phase-mark secondary">Phase 2</span>
                <h3>Hard Rock Expansion</h3>
              </div>
              <ul className="accent-list">
                <li>Built on Phase 1 infrastructure</li>
                <li>No full rebuild required</li>
                <li>Scalable long-term production</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="snapshot" className="section section-soft">
          <div className="shell">
            <div className="section-intro reveal">
              <p className="eyebrow">Project Snapshot</p>
              <h2>The Sherkole Platform</h2>
            </div>
            <div className="snapshot-grid reveal">
              {snapshot.map((item) => (
                <div key={item.label} className="metric-card">
                  <p>{item.label}</p>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
            <p className="resolve-note reveal">
              This is a controlled recovery platform, not a traditional mine build.
            </p>
          </div>
        </section>

        <section id="production" className="section shell">
          <div className="section-intro reveal">
            <p className="eyebrow">Production & Commercial</p>
            <h2>The Output Framework</h2>
          </div>

          <div className="production-split reveal">
            <div className="process-block">
              <h3>Recovery Process</h3>
              <div className="process-list">
                {recoverySteps.map((step) => (
                  <div key={step.id} className="process-item">
                    <div className="process-id">{step.id}</div>
                    <div className="process-content">
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="commercial-block">
              <h3>From Gold to Revenue</h3>
              <div className="commercial-flow">
                {[
                  { icon: "🛡️", text: "Controlled gold room handling" },
                  { icon: "🚛", text: "Logged custody and dispatch" },
                  { icon: "🏦", text: "Sale through National Bank of Ethiopia" },
                  { icon: "💰", text: "Assay-based settlement" },
                ].map((item, idx) => (
                  <div key={idx} className="flow-node">
                    <span className="node-icon">{item.icon}</span>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="framework-detail reveal">
            <button
              className="details-toggle"
              onClick={() => setBenchmarksOpen(!benchmarksOpen)}
            >
              {benchmarksOpen ? "Hide Operational Benchmarks" : "View Operational Benchmarks"}
            </button>

            {benchmarksOpen && (
              <div className="benchmarks-table-wrap">
                <table className="benchmarks-table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Base Case</th>
                      <th>Optimal Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    {benchmarkDetails.map((row) => (
                      <tr key={row.category}>
                        <td>{row.category}</td>
                        <td>{row.base}</td>
                        <td>{row.optimal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        <section id="tech" className="section section-soft">
          <div className="shell">
            <div className="section-intro reveal">
              <p className="eyebrow">The Armada Advantage</p>
              <h2>Institutional Control & Execution</h2>
            </div>
            <div className="card-grid reveal">
              {techAdvantages.map((item) => (
                <div key={item.title} className="service-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="esg" className="section shell">
          <div className="section-intro reveal">
            <p className="eyebrow">Responsible Mining</p>
            <h2>Sustainable Gold Production</h2>
            <p className="description-text">
              Armada Mining is committed to transparent and sustainable operations that integrate Environmental, Social, and Governance principles into every stage.
            </p>
          </div>
          <div className="card-grid reveal">
            {esgPrinciples.map((item) => (
              <div key={item.category} className="service-card service-card--icon">
                <div className="service-icon">
                  {item.category === "Environmental" ? "🌿" : item.category === "Social Impact" ? "🤝" : "🏛️"}
                </div>
                <h3>{item.category}</h3>
                <p>{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="market" className="section section-soft">
          <div className="shell">
            <div className="section-intro reveal">
              <p className="eyebrow">Market Opportunity</p>
              <h2>Addressing the Infrastructure Gap</h2>
              <p className="description-text">
                Ethiopia’s mining sector has significant structural gaps that limit investor confidence and operational efficiency:
              </p>
              <ul className="feature-list reveal">
                <li>No standardized field data or geological reporting</li>
                <li>Fragmented small-scale operations with no formal coordination</li>
                <li>Low adoption of modern recovery and processing technology</li>
                <li>Limited formal pathways for investor-grade due diligence</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="vision" className="section shell">
          <div className="section-intro reveal text-center">
            <p className="eyebrow">Our Vision</p>
            <h2 className="vision-title">
              To transform Ethiopian gold mining into a standardized, transparent, and scalable industry.
            </h2>
            <p className="vision-sub reveal">
              Armada is active in industry coordination, expert networks, and sector advocacy — 
              because lasting value requires a stronger ecosystem, not just a single project.
            </p>
          </div>
        </section>

        <section id="capital" className="section section-investment">
          <div className="shell">
            <div className="investment-header reveal">
              <p className="eyebrow">Build With Us</p>
              <h2>Establishing a Scalable Recovery Platform</h2>
              <p className="investment-lead">
                Armada Mining is establishing a recovery platform in one of Ethiopia’s most active gold corridors.
                We welcome collaboration with investors, operators, and strategic partners.
              </p>
            </div>

            <div className="investment-content reveal">
              <div className="allocation-grid">
                {capitalAllocation.map((item) => (
                  <div key={item.area} className="allocation-item">
                    <div className="allocation-bar" style={{ width: `${item.percent}%` }} />
                    <div className="allocation-text">
                      <span>{item.area}</span>
                      <strong>{item.percent}%</strong>
                    </div>
                  </div>
                ))}
              </div>
              <div className="investment-actions">
                <a className="button button-accent button-large" href="mailto:invest@armadaeth.com">
                  Request Investment Details
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer shell">
        <div className="footer-wrap">
          <div className="footer-brand">
            <img src={headerLogo} alt="Armada" className="footer-logo" />
            <div className="corporate-meta">
              {corporateInfo.map((info) => (
                <span key={info.label}>
                  {info.label}: {info.value}
                </span>
              ))}
            </div>
          </div>
          <div className="footer-legal">
            <p>© 2025 Armada Mining. All rights reserved.</p>
            <a href="mailto:admin@armadaeth.com">admin@armadaeth.com</a>
          </div>
        </div>
      </footer>

      {showBackToTop && (
        <button
          type="button"
          className="floating-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default App;
