import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";
import {
  ease,
  sectionViewport,
  reveal,
  stagger,
  serviceCardReveal,
  docCardReveal,
  aboutLines,
  stats,
  aboutWordCount,
  technologyFeatures,
  services,
  doctorCards,
  benefits,
  awards,
  testimonials,
  faqs
} from "./homeData";

function ArrowIcon() {
  return (
    <span className="arrow-icon" aria-hidden="true">
      <span />
    </span>
  );
}

const technologyViewport = { once: true, amount: 0.25 };

const containerVariant = {
  hidden: {},
  show: {
    transition: {
      when: "beforeChildren"
    }
  }
};

const textVariant = {
  hidden: ({ y = 40, scale = 1 } = {}) => ({
    opacity: 0,
    y,
    scale
  }),
  show: ({ delay = 0, duration = 0.7 } = {}) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration,
      delay,
      ease
    }
  })
};

const imageVariant = {
  hidden: {
    opacity: 0,
    x: -60,
    scale: 0.96,
    clipPath: "inset(0 100% 0 0 round 20px)"
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    clipPath: "inset(0 0% 0 0 round 20px)",
    transition: {
      duration: 0.9,
      delay: 0.96,
      ease
    }
  }
};

const cardContainerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 1.32
    }
  }
};

const cardVariant = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.94
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.72,
      ease,
      when: "beforeChildren",
      delayChildren: 0.14
    }
  }
};

const iconVariant = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    rotate: -8
  },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.46,
      ease
    }
  }
};

function CTAButton({ children, variant = "primary" }) {
  return (
    <motion.a
      className={`cta-button cta-button--${variant}`}
      href="#contact"
      whileTap={{ scale: 0.98 }}
    >
      <span className="cta-button-fill" aria-hidden="true" />
      <span className="cta-button-text">{children}</span>
      <ArrowIcon />
    </motion.a>
  );
}

function MenuButton() {
  return (
    <motion.button
      className="menu-button"
      aria-label="Open menu"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
    >
      <span />
      <span />
      <span />
    </motion.button>
  );
}

function MetricIcon({ type }) {
  if (type === "rating") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M9 21h6" />
        <path d="M12 17v4" />
        <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
        <path d="M7 7H4.5a2.5 2.5 0 0 0 2.5 2.5" />
        <path d="M17 7h2.5A2.5 2.5 0 0 1 17 9.5" />
        <path d="M10 8.5h4" />
      </svg>
    );
  }

  if (type === "years") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 9h16v9H4z" />
        <path d="M8 9V6h8v3" />
        <path d="M8 14h3l2-3 2 5 2-2h3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M9 7a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z" />
      <path d="M6 20a6 6 0 0 1 12 0" />
      <path d="M17 13h4" />
      <path d="M19 11v4" />
    </svg>
  );
}

function FeaturePill({ className, icon, label, delay }) {
  return (
    <motion.div
      className={`feature-pill ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay, ease }}
    >
      <span className="feature-pill-float">
        <span className="feature-icon">
          <MetricIcon type={icon} />
        </span>
        <span className="feature-label">{label}</span>
      </span>
    </motion.div>
  );
}

function HeroImage() {
  return (
    <motion.div
      className="hero-media"
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.72, ease, delay: 0.1 }}
    >
      <svg className="clip-defs" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="hero-image-shape" clipPathUnits="objectBoundingBox">
            <path d="M0.04,0 H0.96 C0.982,0 1,0.018 1,0.04 V0.855 C1,0.88 0.982,0.898 0.958,0.898 H0.82 C0.8,0.898 0.784,0.906 0.772,0.922 C0.756,0.942 0.742,0.964 0.724,0.982 C0.712,0.994 0.697,1 0.678,1 H0.04 C0.018,1 0,0.982 0,0.96 V0.04 C0,0.018 0.018,0 0.04,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="image-card">
        <motion.img
          src="/assets/Home_page.webp"
          alt="Santhi Eye Tech reception"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.04 }}
          transition={{ duration: 0.75, ease }}
        />
        <div className="image-overlay" />
      </div>

      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <MenuButton />
      </nav>

      <FeaturePill
        className="pill-rating"
        icon="rating"
        label="4.9 Google Rating"
        delay={0.42}
      />
      <FeaturePill
        className="pill-years"
        icon="years"
        label="20+ Years Experience"
        delay={0.56}
      />
      <FeaturePill
        className="pill-procedures"
        icon="procedures"
        label="1000+ Procedures"
        delay={0.7}
      />

      <div className="location-pill">
        <motion.span
          className="location-pill-inner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.62, delay: 0.65, ease }}
        >
          <span />
          INDORE - SINCE 2003
        </motion.span>
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="hero-canvas" id="home">
      <motion.article
        className="copy-card"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.a className="brand-mark" href="#home" variants={reveal}>
          <span className="logo-crop">
            <img src="/assets/LOGO.jpeg" alt="Santhi Eye Tech logo" />
          </span>
        </motion.a>

        <div className="copy-center">
          <motion.div className="section-label" variants={reveal}>
            <span />
            <b>Eye Care Experts</b>
            <span />
          </motion.div>

          <motion.h1 variants={reveal}>
            Eyecare for clearer vision & confident living
          </motion.h1>

          <motion.p variants={reveal}>
            Advanced diagnostics, precision treatment, and personalized eye care
            designed around your comfort.
          </motion.p>

          <motion.div className="button-row" variants={reveal}>
            <CTAButton>Book a Consultation</CTAButton>
            <CTAButton variant="secondary">Call Now !</CTAButton>
          </motion.div>
        </div>
      </motion.article>

      <HeroImage />

      <div className="mouse-cutout scroll-hint" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

function ScrollTextWord({ children, index, progress, reduceMotion }) {
  const start = (index / aboutWordCount) * 0.72;
  const color = useTransform(progress, [start, start + 0.2], ["#9a9a9a", "#111111"]);

  return (
    <motion.span
      className="about-word"
      style={reduceMotion ? { color: "#111111" } : { color }}
    >
      {children}{" "}
    </motion.span>
  );
}

function StatCard({ value, description, tone }) {
  return (
    <motion.article
      className={`stat-card stat-card--${tone}`}
      variants={reveal}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.75, ease }}
    >
      <span className="stat-dot" />
      <div className="stat-content">
        <h3>{value}</h3>
        <p>{description}</p>
      </div>
    </motion.article>
  );
}

function AboutStats() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 72%", "end 48%"]
  });

  return (
    <section className="about-stats" id="about" ref={sectionRef}>
      <motion.div
        className="about-inner"
        initial="hidden"
        whileInView="show"
        viewport={sectionViewport}
        variants={stagger}
      >
        <motion.div className="about-intro" variants={reveal}>
          <span className="about-badge">About Us</span>
          <p className="about-text">
            {aboutLines.map((line, lineIndex) => {
              const previousWords = aboutLines
                .slice(0, lineIndex)
                .reduce((total, item) => total + item.split(" ").length, 0);

              return (
                <span className="about-line" key={line}>
                  {line.split(" ").map((word, wordIndex) => (
                    <ScrollTextWord
                      key={`${line}-${word}-${wordIndex}`}
                      index={previousWords + wordIndex}
                      progress={scrollYProgress}
                      reduceMotion={reduceMotion}
                    >
                      {word}
                    </ScrollTextWord>
                  ))}
                </span>
              );
            })}
          </p>
        </motion.div>

        <motion.div className="stats-grid" variants={stagger}>
          {stats.map((stat) => (
            <StatCard
              key={stat.value}
              value={stat.value}
              description={stat.description}
              tone={stat.tone}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function ServiceIcon({ type }) {
  if (type === "surgery") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 4h8M12 4v4M8.5 10h7l1.5 8h-10l1.5-8Z" />
        <path d="M9 14h6M12 11.5v5" />
      </svg>
    );
  }

  if (type === "comfort") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5.5c1.5-2.3 5.5-1.4 5.5 2.2 0 3.7-5.5 7.2-5.5 7.2S6.5 11.4 6.5 7.7c0-3.6 4-4.5 5.5-2.2Z" />
        <path d="M12 15v4M8.5 19h7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 7.5a4.5 4.5 0 0 1 6.36 0l3.14 3.14a4.5 4.5 0 0 1-6.36 6.36L7 13.86a4.5 4.5 0 0 1 0-6.36Z" />
      <path d="M8.5 8.5 15.5 15.5M14 7.5l2.5-2.5M16.5 10l2.5-2.5" />
    </svg>
  );
}

function TechnologyCard({ title, description, icon }) {
  return (
    <motion.article
      className="tech-card"
      variants={cardVariant}
      whileHover={{ y: -7 }}
      transition={{ duration: 0.75, ease }}
    >
      <motion.span className="tech-icon" variants={iconVariant}>
        <ServiceIcon type={icon} />
      </motion.span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </motion.article>
  );
}

function TechnologySection() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, technologyViewport);
  return (
    <section className="technology-section" ref={sectionRef}>
      <motion.div
        className="technology-inner"
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        variants={containerVariant}
      >
        <motion.div
          className="technology-image"
          variants={imageVariant}
          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
          transition={{ duration: 0.7, ease }}
        >
          <motion.img
            src="/assets/Beds.jpg"
            alt="Advanced eye care technology room"
          />
        </motion.div>

        <div className="technology-content">
          <motion.div className="technology-copy" variants={containerVariant}>
            <motion.h2 variants={textVariant} custom={{ y: 40, delay: 0, duration: 0.7 }}>
              Expert Eye Care with Advanced Technology
            </motion.h2>
            <motion.p variants={textVariant} custom={{ y: 30, delay: 0.2, duration: 0.66 }}>
              Modern diagnostic and surgical systems improve accuracy, treatment
              quality, and patient experience.
            </motion.p>
            <motion.a
              className="learn-button"
              href="#contact"
              variants={textVariant}
              custom={{ y: 25, scale: 0.96, delay: 0.42, duration: 0.62 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="learn-button-fill" />
              <span className="learn-button-text">Learn More</span>
              <span className="learn-button-arrow" aria-hidden="true">
                <span />
              </span>
            </motion.a>
          </motion.div>

          <motion.div className="technology-cards" variants={cardContainerVariant}>
            {technologyFeatures.map((feature) => (
              <TechnologyCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <span className="service-number">{service.number}</span>
      <div className="service-card-panel">
        <span className="service-glow" />
        <div className="service-card-content">
          <div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
          <div className="service-tags">
            {service.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function ServicesSection() {
  const serviceRows = [services.slice(0, 3), services.slice(3, 6)];

  return (
    <section className="services-section" id="services">
      <motion.div
        className="services-inner"
        initial="hidden"
        whileInView="show"
        viewport={sectionViewport}
        variants={stagger}
      >
        <svg className="service-clip-defs" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="service-card-shape" clipPathUnits="objectBoundingBox">
              <path d="M0.04,0 H0.81 C0.81,0.058 0.836,0.092 0.882,0.092 H0.942 C0.978,0.092 1,0.12 1,0.156 V0.93 C1,0.97 0.975,1 0.94,1 H0.04 C0.016,1 0,0.974 0,0.93 V0.07 C0,0.026 0.016,0 0.04,0 Z" />
            </clipPath>
          </defs>
        </svg>

        <motion.div className="services-heading" variants={stagger}>
          <motion.span className="services-badge" variants={reveal}>
            Services
          </motion.span>
          <motion.h2 variants={reveal}>
            Comprehensive Eye Care Services
          </motion.h2>
          <motion.p variants={reveal}>
            From routine concerns to advanced surgical care, Shanti EyeTech
            offers specialised treatment across the major areas of ophthalmology.
          </motion.p>
        </motion.div>

        <div className="services-grid">
          {serviceRows.map((row, rowIndex) => (
            <motion.div
              className="services-row"
              key={`services-row-${rowIndex}`}
              custom={rowIndex}
              variants={serviceCardReveal}
              initial="hidden"
              whileInView="show"
              viewport={sectionViewport}
            >
              {row.map((service) => (
                <ServiceCard key={service.number} service={service} />
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function DoctorInfoCard({ card, index }) {
  return (
    <motion.article
      className="doc-card"
      custom={index}
      variants={docCardReveal}
      whileHover={{ y: -7 }}
      transition={{ duration: 0.75, ease }}
    >
      <span className="doc-card-number">{card.number}</span>
      <div className="doc-card-panel">
        <span className="doc-glow" />
        <div className="doc-card-body">
          <h3>{card.title}</h3>
          {card.type === "pills" ? (
            <div className="doc-card-pills">
              {card.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ) : (
            <p>{card.body}</p>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function DoctorSection() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  return (
    <section className="specialist-section" id="specialist" ref={sectionRef}>
      <motion.div
        className="specialist-inner"
        initial="hidden"
        whileInView="show"
        viewport={sectionViewport}
        variants={stagger}
      >
        <motion.div className="specialist-heading" variants={stagger}>
          <motion.span className="specialist-badge" variants={reveal}>
            Our Specialist
          </motion.span>
          <motion.h2 variants={reveal}>
            Cataract, Glaucoma &amp; Refractive-LASIK Surgeon
          </motion.h2>
          <motion.p variants={reveal}>
            Director of Shanti EyeTech, with more than 20 years of ophthalmology
            experience. Trained at B.J. Medical College, Ahmedabad and Aravind Eye
            Hospital, Tamil Nadu — with advanced training in phacoemulsification,
            glaucoma diagnosis &amp; management, and LASIK refractive surgery.
          </motion.p>
        </motion.div>

        <div className="specialist-layout">
          <motion.div
            className="specialist-photo"
            initial={{ opacity: 0, scale: 1.03 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={sectionViewport}
            transition={{ duration: 0.72, ease }}
          >
            <motion.img
              src="/assets/1_doctor.png"
              alt="Dr. Amit N. Solanki"
            />
            <motion.div
              className="specialist-name-overlay"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.62, delay: 0.24, ease }}
            >
              <span className="specialist-doctor-name">Dr. Amit N. Solanki</span>
              <span className="specialist-doctor-role">
                Medical Director of Shanthi Eye Care
              </span>
            </motion.div>
          </motion.div>

          <div className="specialist-cards-wrap">
            <motion.div className="specialist-cards-grid" variants={stagger}>
              {doctorCards.map((card, index) => (
                <DoctorInfoCard key={`${card.number}-${card.title}`} card={card} index={index} />
              ))}
            </motion.div>
            <motion.div className="specialist-buttons" variants={reveal}>
              <CTAButton>Book a Consultation</CTAButton>
              <CTAButton variant="secondary">Call Now !</CTAButton>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function BenefitIcon({ index }) {
  return (
    <span className="benefit-icon" aria-hidden="true">
      <img
        src={`/assets/why-patients/${index + 1}.png`}
        alt=""
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}

function BenefitItem({ item, index }) {
  const col = index % 4;
  const row = Math.floor(index / 4);
  return (
    <motion.div
      className="benefit-item"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={sectionViewport}
      transition={{
        duration: 0.62,
        delay: row * 0.18 + col * 0.1,
        ease
      }}
    >
      <BenefitIcon index={index} />
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </motion.div>
  );
}

function BenefitsSection() {
  return (
    <section className="benefits-section" id="benefits">
      <motion.div
        className="benefits-inner"
        initial="hidden"
        whileInView="show"
        viewport={sectionViewport}
        variants={stagger}
      >
        <motion.div className="benefits-heading" variants={stagger}>
          <motion.span className="benefits-badge" variants={reveal}>
            Benefits
          </motion.span>
          <motion.h2 variants={reveal}>
            Why Patients Choose Shanti EyeTech
          </motion.h2>
          <motion.p variants={reveal}>
            Eight reasons why families across Indore<br />
            choose us for their eye care.
          </motion.p>
        </motion.div>

        <div className="benefits-grid">
          {benefits.map((item, index) => (
            <BenefitItem key={item.title} item={item} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   Awards & Recognition Timeline
───────────────────────────────────────────────────── */

function TimelineRow({ item, index }) {
  const cardOnRight = item.side === "right";   // true → card right, year left
  const isTail      = !item.year && !item.num; // item 5 — no dot, no year
  const delay       = index * 0.15;

  /* Year label — slides in from its side */
  const yearEl = item.year && (
    <motion.div
      className={`tl-year tl-year--${item.accent}`}
      initial={{ opacity: 0, x: cardOnRight ? -44 : 44 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {item.year}
    </motion.div>
  );

  /* Award card — slides in from its side */
  const cardEl = (
    <motion.div
      className={`award-card${item.highlight ? " award-card--highlight" : ""}`}
      initial={{ opacity: 0, x: isTail ? -32 : cardOnRight ? 44 : -44 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </motion.div>
  );

  /* Numbered dot — scales in */
  const dotEl = item.num && (
    <motion.div
      className={`tl-circle tl-circle--${item.accent}`}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: delay + 0.1, ease: "easeOut" }}
      whileHover={{ boxShadow: "0 0 0 10px rgba(36,197,232,0.15)" }}
    >
      {item.num}
    </motion.div>
  );

  /* Tail row: no dot, no year — card aligned with the left column (same as card above) */
  if (isTail) {
    return (
      <div className="tl-row tl-row--tail">
        <div className="tl-col-left">{cardEl}</div>
        <div className="tl-col-center" />
        <div className="tl-col-right" />
      </div>
    );
  }

  return (
    <div className={`tl-row tl-row--${item.side}`}>
      {/* Left column: year when card-right, card when card-left */}
      <div className="tl-col-left">
        {cardOnRight ? yearEl : cardEl}
      </div>
      {/* Center column: always the numbered dot */}
      <div className="tl-col-center">
        {dotEl}
      </div>
      {/* Right column: card when card-right, year when card-left */}
      <div className="tl-col-right">
        {cardOnRight ? cardEl : yearEl}
      </div>
    </div>
  );
}

function AwardsSection() {
  return (
    <section className="awards-section" id="awards">
      <motion.div
        className="awards-inner"
        initial="hidden"
        whileInView="show"
        viewport={sectionViewport}
        variants={stagger}
      >
        {/* Heading */}
        <motion.div className="awards-heading" variants={stagger}>
          <motion.span className="awards-badge" variants={reveal}>
            Awards &amp; Recognition
          </motion.span>
          <motion.h2 variants={reveal}>A Legacy of Recognition</motion.h2>
          <motion.p variants={reveal}>
            Continuous excellence in ophthalmic innovation and patient service.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="tl-track">
          {/* Single continuous vertical spine line that draws downward */}
          <div className="tl-spine-outer">
            <motion.div
              className="tl-spine-inner"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ transformOrigin: "top center" }}
            />
          </div>

          {awards.map((item, i) => (
            <TimelineRow key={item.id} item={item} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function TestimonialCard({ item, index }) {
  return (
    <motion.article
      className="testimonial-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ scale: 1.02, boxShadow: "0 26px 58px rgba(20, 16, 12, 0.14)" }}
    >
      <div className="testimonial-stars" aria-label="5 out of 5 stars">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>

      <h3>{item.title}</h3>
      <p className="testimonial-quote">“{item.quote}”</p>

      <div className="testimonial-divider" />

      <div className="testimonial-patient-row">
        <img src={item.avatar} alt={item.name} className="testimonial-avatar" loading="lazy" />
        <p className="testimonial-patient-line">
          <span className="testimonial-name">{item.name}</span>
          <span className="testimonial-meta">{item.details}</span>
        </p>
      </div>
    </motion.article>
  );
}

function TestimonialsSection() {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-inner">
        <motion.span
          className="testimonials-badge"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Testimonials
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          What Our Patients Say
        </motion.h2>

        <motion.p
          className="testimonials-subtitle"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Real experiences from patients who improved their vision and confidence through our expert eye care services.
        </motion.p>

        <div className="testimonials-grid">
          {testimonials.map((item, i) => (
            <TestimonialCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <motion.a
          href="#contact"
          className="testimonials-view-all"
          whileTap={{ scale: 0.98 }}
        >
          <span className="testimonials-view-all-fill" aria-hidden="true" />
          <span className="testimonials-view-all-text">View all</span>
          <motion.span
            className="testimonials-view-all-arrow"
            aria-hidden="true"
          >
            →
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}

function FAQItem({ item, index, isOpen, onToggle }) {
  return (
    <motion.article
      className="faq-item"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: "easeOut" }}
      whileHover={{
        y: -2,
        backgroundColor: "rgba(235, 252, 255, 0.94)",
        boxShadow: "0 20px 40px rgba(23, 17, 11, 0.09)"
      }}
    >
      <button
        className="faq-question-row"
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span className="faq-question">{item.question}</span>
        <span className="faq-toggle" aria-hidden="true">
          <motion.span
            className="faq-toggle-symbol"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {isOpen ? "−" : "+"}
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${item.id}`}
            className="faq-answer-wrap"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <p className="faq-answer">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function FAQSection() {
  const [openId, setOpenId] = useState(1);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-inner">
        <motion.div
          className="faq-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="faq-badge">FAQ</span>
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know before your visit.</p>
        </motion.div>

        <div className="faq-list">
          {faqs.map((item, index) => (
            <FAQItem
              key={item.id}
              item={item}
              index={index}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABannerSection() {
  return (
    <section className="cta-banner-section" id="cta-banner">
      <div className="cta-banner-shell">
        <motion.img
          src="/assets/1_doctor.png"
          alt="Eye specialist"
          className="cta-banner-photo cta-banner-photo--left"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.58, ease: "easeOut" }}
        />

        <motion.img
          src="/assets/1_doctor.png"
          alt="Patient consultation"
          className="cta-banner-photo cta-banner-photo--right"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />

        <div className="cta-banner-card">
          <motion.span
            className="cta-banner-badge"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Let&apos;s Talk
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.62, delay: 0.14, ease: "easeOut" }}
          >
            <span className="cta-banner-heading-soft">Start Your </span>
            <span className="cta-banner-heading-accent">Vision Journey</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.28, ease: "easeOut" }}
          >
            <motion.a
              href="#contact"
              className="cta-banner-button"
              whileTap={{ scale: 0.98 }}
            >
              <span className="cta-banner-button-fill" aria-hidden="true" />
              <span className="cta-banner-button-text">Book a Consultation</span>
              <motion.span
                className="cta-banner-button-arrow"
                aria-hidden="true"
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function HomePageComponent() {
  return (
    <>
      <Hero />
      <AboutStats />
      <TechnologySection />
      <ServicesSection />
      <DoctorSection />
      <BenefitsSection />
      <AwardsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTABannerSection />
    </>
  );
}
