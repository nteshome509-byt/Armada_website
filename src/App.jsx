import { useEffect, useState } from "react";
import pattern from "../assets/pattern.svg";
import logo from "../assets/Logo.svg";
import heroImage from "../assets/heroimage.webp";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const fallbackPrices = [
  { currency: "USD", value: "$106.45", note: "Per gram" },
  { currency: "ETB", value: "13,924", note: "Per gram" },
];

const services = [
  {
    icon: "◈",
    title: "Mining Intelligence",
    body: "Structured data and reporting that elevate project visibility and investment evaluation.",
  },
  {
    icon: "◉",
    title: "Exploration Planning",
    body: "Field insights translated into focused, executable exploration strategies.",
  },
  {
    icon: "◆",
    title: "Production Systems",
    body: "Operational frameworks engineered for safety, consistency, and peak performance.",
  },
  {
    icon: "◎",
    title: "Ecosystem Development",
    body: "Cross-industry collaboration that strengthens Ethiopia's mining sector capacity.",
  },
];

const advantages = [
  {
    title: "Integrated Intelligence",
    body: "Field data, mapping, and reporting unified into clear, actionable intelligence.",
  },
  {
    title: "Operational Discipline",
    body: "Standardized processes that improve safety, consistency, and production output.",
  },
  {
    title: "Human Capital",
    body: "Field teams trained and organized for strong execution and long-term sustainability.",
  },
];

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

function App() {
  const [goldPrices, setGoldPrices] = useState(fallbackPrices);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled();

  useEffect(() => {
    const fetchGoldRates = async () => {
      try {
        const response = await fetch("https://api.nbe.gov.et/api/filter-gold-rates");
        if (!response.ok) return;
        const data = await response.json();
        const usdRaw = data?.usd ?? data?.USD ?? data?.price_usd ?? data?.gold_usd;
        const etbRaw = data?.etb ?? data?.ETB ?? data?.price_etb ?? data?.gold_etb;
        if (!usdRaw && !etbRaw) return;
        const usdValue = usdRaw ? `$${Number(usdRaw).toFixed(2)}` : fallbackPrices[0].value;
        const etbValue = etbRaw
          ? `${Number(etbRaw).toLocaleString("en-US", { maximumFractionDigits: 2 })}`
          : fallbackPrices[1].value;
        setGoldPrices([
          { currency: "USD", value: usdValue, note: "Per gram" },
          { currency: "ETB", value: etbValue, note: "Per gram" },
        ]);
      } catch {
        // Keep fallback values
      }
    };
    fetchGoldRates();
  }, []);

  return (
    <div className="site-shell">
      {/* ─── HEADER ─── */}
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        {/* Accent top stripe */}
        <div className="header-stripe" aria-hidden="true" />

        <div className="shell nav-wrap">
          {/* Brand */}
          <a className="brand" href="#top" aria-label="Armada Mining">
            <div className="brand-icon">
              <img src={logo} alt="Armada Mining logo" />
            </div>
            <div className="brand-text-block">
              <span className="brand-name">Armada Mining</span>
              <span className="brand-tagline">Gold · Ethiopia</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="nav-links" aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Ticker + CTA */}
          <div className="header-right">
            <div className="gold-ticker" aria-label="Live gold price">
              <div className="ticker-badge">
                <span className="live-dot" aria-hidden="true" />
                <span className="ticker-badge-text">LIVE</span>
              </div>
              <div className="ticker-sep" aria-hidden="true" />
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
            <a className="header-cta" href="#contact">Get in Touch</a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className={`ham-bar${menuOpen ? " open" : ""}`} />
            <span className={`ham-bar${menuOpen ? " open" : ""}`} />
            <span className={`ham-bar${menuOpen ? " open" : ""}`} />
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <nav className="mobile-menu" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href="#contact" className="mobile-cta" onClick={() => setMenuOpen(false)}>
              Get in Touch
            </a>
          </nav>
        )}
      </header>

      <main>
        {/* ─── HERO ─── */}
        <section id="top" className="hero">
          <div className="hero-media" aria-hidden="true">
            <img src={heroImage} alt="" />
          </div>
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-pattern" aria-hidden="true">
            <img src={pattern} alt="" />
          </div>
          <div className="shell hero-layout">
            <div className="hero-text">
              <p className="eyebrow hero-eyebrow">Ethiopian Gold Mining — Redefined</p>
              <h1 className="hero-title">
                Structured systems for responsible gold mining.
              </h1>
              <p className="lead-copy">
                Data, field intelligence, and disciplined execution — unified into one operating model that improves performance and transparency.
              </p>
              <div className="hero-actions">
                <a className="button button-accent" href="#contact">Get in Touch</a>
                <a className="button button-ghost" href="#services">Our Services</a>
              </div>
            </div>
            <figure className="hero-logo-panel" aria-hidden="true">
              <img src={logo} alt="" />
            </figure>
          </div>
        </section>

        {/* ─── ABOUT ─── */}
        <section id="about" className="section shell">
          <div className="section-intro">
            <p className="eyebrow">About Armada</p>
            <h2>Technology-first infrastructure,<br />built for execution</h2>
            <p>
              Armada Mining is a technology-driven company advancing Ethiopian gold mining through precise data, geological mapping, and disciplined field execution.
            </p>
          </div>
        </section>

        {/* ─── WHY ARMADA ─── */}
        <section className="section section-soft">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">Why Armada</p>
              <h2>Bridging data and execution</h2>
              <p>
                We unify mining intelligence, standardized systems, and trained teams into one operating model — delivering consistency, risk control, and measurable results.
              </p>
            </div>
          </div>
        </section>

        {/* ─── OUR ADVANTAGE ─── */}
        <section className="section shell">
          <p className="eyebrow">Our Advantage</p>
          <h2>Structured systems in a fragmented industry</h2>
          <div className="card-grid">
            {advantages.map((adv) => (
              <article key={adv.title} className="service-card">
                <h3>{adv.title}</h3>
                <p>{adv.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ─── MARKET OPPORTUNITY ─── */}
        <section className="section section-soft">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">Market Opportunity</p>
              <h2>Unlocking Ethiopia's gold potential</h2>
              <p>Ethiopia holds strong long-term mining potential, constrained by structural gaps:</p>
            </div>
            <ul className="feature-list">
              <li>Limited access to reliable geological and operational data</li>
              <li>Fragmented small-scale mining operations</li>
              <li>Inefficient stakeholder coordination</li>
              <li>Low adoption of modern operational systems</li>
            </ul>
            <p className="resolve-note">
              Armada addresses every gap with transparent systems and scalable execution models.
            </p>
          </div>
        </section>

        {/* ─── VISION ─── */}
        <section className="section shell">
          <div className="section-intro">
            <p className="eyebrow">Our Vision</p>
            <h2>A transparent, scalable mining industry</h2>
            <p>
              We aim to transform Ethiopia's gold sector into a data-informed, transparent industry — stronger for investors, operators, and national development alike.
            </p>
          </div>
        </section>

        {/* ─── SERVICES ─── */}
        <section id="services" className="section section-soft">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">Core Services</p>
              <h2>What we deliver</h2>
            </div>
            <div className="card-grid services-grid">
              {services.map((service) => (
                <article key={service.title} className="service-card service-card--icon">
                  <span className="service-icon" aria-hidden="true">{service.icon}</span>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section id="process" className="section shell">
          <div className="section-intro">
            <p className="eyebrow">How We Work</p>
            <h2>A disciplined operational model</h2>
          </div>
          <div className="steps">
            <article>
              <span>01</span>
              <h3>Build the Foundation</h3>
              <p>Practical field execution grounded in proven methods and strong operational discipline.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Improve Through Insight</h3>
              <p>Geological understanding and structured data applied to sharpen every decision.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Scale Responsibly</h3>
              <p>Operations expanded with safety, discipline, and long-term value creation at the core.</p>
            </article>
          </div>
        </section>

        {/* ─── SNAPSHOT ─── */}
        <section className="section section-soft">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">Company Snapshot</p>
            </div>
            <div className="snapshot-grid">
              {[
                { label: "Founded", value: "2025" },
                { label: "Team Size", value: "11–50" },
                { label: "Headquarters", value: "Addis Ababa, Ethiopia" },
                { label: "Industry", value: "Gold Mining" },
                { label: "Website", value: "armadaeth.com" },
                { label: "Phone", value: "+251 911 967 525" },
              ].map((m) => (
                <article key={m.label} className="metric-card">
                  <p>{m.label}</p>
                  <strong>{m.value}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CONTACT ─── */}
        <section id="contact" className="section section-cta">
          <div className="shell">
            <div className="cta-wrap">
              <div className="cta-text">
                <p className="eyebrow">Contact</p>
                <h2>Ready to build together?</h2>
                <p>We welcome collaboration with investors, operators, and industry partners.</p>
                <ul className="contact-list">
                  <li>
                    <span>🌐</span>
                    <a href="https://armadaeth.com">armadaeth.com</a>
                  </li>
                  <li>
                    <span>📞</span>
                    <a href="tel:+251911967525">+251 911 967 525</a>
                  </li>
                  <li>
                    <span>✉️</span>
                    <a href="mailto:admin@armadaeth.com">admin@armadaeth.com</a>
                  </li>
                  <li>
                    <span>📍</span>
                    <span>Addis Ababa, Ethiopia</span>
                  </li>
                </ul>
              </div>
              <div className="contact-actions">
                <a className="button button-accent" href="tel:+251911967525">Call Now</a>
                <a className="button button-outline" href="mailto:admin@armadaeth.com">Send Email</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="site-footer">
        <div className="shell footer-wrap">
          <div className="footer-brand">
            <img src={logo} alt="Armada Mining" className="footer-logo" />
            <p>© 2026 Armada Mining PLC. All rights reserved.</p>
          </div>
          <a href="#top" className="back-top">↑ Back to top</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
