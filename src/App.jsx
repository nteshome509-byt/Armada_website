import { useEffect, useRef, useState } from "react";
import pattern from "../assets/pattern.svg";
import headerLogo from "../assets/Logo for hed.svg";
import heroImage from "../assets/heroimage.webp";
import imgProcessingPlant from "../assets/image_2026-04-16_16-13-03.png";
import imgMiningWorkers from "../assets/image_2026-04-16_19-36-44.png";
import imgGoldFlakes from "../assets/image_2026-04-16_16-14-43.png";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Opportunity", href: "#opportunity" },
  { label: "Project", href: "#snapshot" },
  { label: "ESG", href: "#esg" },
  { label: "Investment", href: "#capital" },
  { label: "Contact", href: "#contact" },
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
  const [copiedType, setCopiedType] = useState(null);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    });
  };
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
        className={`site-header scrolled`}
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

          <div className="header-right">
            <a href="mailto:invest@armadaeth.com" className="header-cta">
              Request Investor Brief
            </a>
          </div>

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
            <a
              href="mailto:invest@armadaeth.com"
              className="mobile-menu-cta"
              onClick={() => setMenuOpen(false)}
            >
              Request Investor Brief
            </a>
          </nav>
        )}
      </header>

      <main>
        <section id="top" ref={heroRef} className="hero-v2">
          <div className="shell hero-layout-v2">

            {/* ── LEFT COLUMN ── */}
            <div className="hero-text-v2">
              <span className="hero-top-label-v2">STRUCTURED. AUDITABLE. REVENUE-FOCUSED.</span>
              <h1 className="hero-title-v2">
                Turn Untapped{" "}
                <span className="hero-title-gold">Gold Deposits</span>{" "}
                into Bankable Production
              </h1>
              <p className="lead-copy-v2">
                Armada Mining transforms geological potential into auditable, industrial gold output—bridging the gap between field data and profitable production.
              </p>

              <div className="hero-actions-v2">
                <a className="btn-gold-primary" href="mailto:invest@armadaeth.com">
                  Request Investor Brief <span aria-hidden="true">→</span>
                </a>
                <a className="btn-outline-dark" href="#snapshot">
                  View Project Overview
                </a>
              </div>

              <div className="hero-trust-row">
                <div className="trust-item-v2">
                  <span className="trust-icon-v2">📍</span>
                  <span>Sherkole Gold Belt, Ethiopia</span>
                </div>
                <div className="trust-item-v2">
                  <span className="trust-icon-v2">📋</span>
                  <span>Phase 1: Tailings Recovery (Low CapEx, Fast ROI)</span>
                </div>
                <div className="trust-item-v2">
                  <span className="trust-icon-v2">👥</span>
                  <span>11–50 Technical Team, Ethiopia-Based Operations</span>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN — contained image + card ── */}
            <div className="hero-image-col">
              <img
                src={imgProcessingPlant}
                alt="Armada Mining processing plant, Benishangul-Gumuz, Ethiopia"
                className="hero-right-img"
              />
              <div className="boc-card">
                <div className="boc-header">
                  <span className="boc-icon">📈</span>
                  <span className="boc-title">Gold Market Benchmark</span>
                </div>
                <div className="boc-row">
                  <span className="boc-label">USD / gram</span>
                  <span className="boc-value boc-usd">
                    {goldPrices.find(p => p.currency === 'USD')?.value || '$85.45'}
                  </span>
                </div>
                <div className="boc-row">
                  <span className="boc-label">ETB / gram</span>
                  <span className="boc-value boc-etb">
                    {goldPrices.find(p => p.currency === 'ETB')?.value
                      ? `ETB ${goldPrices.find(p => p.currency === 'ETB').value}`
                      : 'ETB 11,200'}
                  </span>
                </div>
                <div className="boc-footer">
                  <span className="boc-live-dot" />
                  Live pricing for investor reference
                </div>
              </div>
            </div>

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
            <div className="opportunity-split reveal">
              <div className="opportunity-text">
                <p className="eyebrow">The Opportunity</p>
                <h2>Tailings as a Recoverable Asset</h2>
                <p className="description-text">
                  Ethiopia hosts one of the region's largest artisanal gold economies, yet most of its
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
              <div className="opportunity-img-col">
                <img
                  src={imgMiningWorkers}
                  alt="Artisanal gold miners at Sherkole, Ethiopia"
                  className="opportunity-img"
                />
                <div className="opportunity-img-caption">
                  Artisanal miners at the Sherkole Gold Belt — the untapped opportunity Armada is structuring.
                </div>
              </div>
            </div>
          </div>
        </section>


        <section id="model" className="section shell">
          <div className="section-intro reveal">
            <p className="eyebrow">The Armada Model</p>
            <h2>Two Phases. One Platform.</h2>
          </div>
          <div className="model-grid reveal reveal-stagger">
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
              <div className="card-visual">
                <img src={imgGoldFlakes} alt="Recovered gold flakes" className="card-img" />
                <span className="card-img-label">Proven Recovery Output</span>
              </div>
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
            <div className="snapshot-grid reveal reveal-stagger">
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

          <div className="production-split reveal reveal-stagger">
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
            <div className="card-grid reveal reveal-stagger">
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
          <div className="card-grid reveal reveal-stagger">
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
              <div className="allocation-grid reveal reveal-stagger">
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
        <section id="contact" className="section section-soft">
          <div className="shell">
            <div className="cta-wrap reveal">
              <div className="cta-text">
                <p className="eyebrow">Get in Touch</p>
                <h2>Contact Our Operations Team</h2>
                <p className="description-text">
                  Reach out to discuss infrastructure partnerships, technical inquiries, or institutional investment opportunities.
                </p>
                <ul className="contact-list">
                  <li>
                    🌐 <a href="https://armadaeth.com" target="_blank" rel="noopener noreferrer">armadaeth.com</a>
                  </li>
                  <li>
                    📞 <a href="tel:+251911967525">+251 911 967 525</a>
                  </li>
                  <li>
                    ✉️ <a href="mailto:admin@armadaeth.com">admin@armadaeth.com</a>
                  </li>
                  <li>
                    📍 <span>Addis Ababa, Ethiopia</span>
                  </li>
                </ul>
              </div>
              <div className="contact-actions" style={{ position: "relative", zIndex: 1000, pointerEvents: "auto", display: "flex", gap: "16px", marginTop: "32px" }}>
                <button 
                  type="button"
                  className="button button-accent" 
                  onClick={() => handleCopy("admin@armadaeth.com", "email")}
                  style={{ cursor: "pointer", pointerEvents: "auto", position: "relative", zIndex: 1001 }}
                >
                  {copiedType === "email" ? "✓ Email Copied!" : "Copy Email Address"}
                </button>
                <button 
                  type="button"
                  className="button button-outline" 
                  onClick={() => handleCopy("+251911967525", "phone")}
                  style={{ cursor: "pointer", pointerEvents: "auto", position: "relative", zIndex: 1001 }}
                >
                  {copiedType === "phone" ? "✓ Phone Copied!" : "Copy Phone Number"}
                </button>
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
