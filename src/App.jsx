import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1];
const sectionViewport = { once: true, amount: 0.18 };

const reveal = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.05, ease }
  }
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08
    }
  }
};

const serviceCardReveal = {
  hidden: { opacity: 0, y: 40 },
  show: (rowIndex) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: rowIndex * 0.2,
      ease: "easeOut"
    }
  })
};

const docCardReveal = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  show: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay: i * 0.1, ease }
  })
};

const aboutLines = [
  "At Shanti EyeTech Eye Care & Laser Hospital, we combine",
  "world-class ophthalmic technology with a calm, patient-first",
  "environment — comprehensive treatment under one roof."
];

const stats = [
  {
    value: "10k+ Patients",
    description:
      "Providing professional EYE care helping patients restore VISION and CONFIDENCE",
    tone: "sky"
  },
  {
    value: "20+ Experience",
    description:
      "Personalized therapy programs designed to improve health and support recovery.",
    tone: "gold"
  },
  {
    value: "8 Specialized Services",
    description:
      "Effective therapy treatments focused on helping patients achieve faster recovery.",
    tone: "teal"
  }
];

const aboutWordCount = aboutLines.reduce(
  (total, line) => total + line.split(" ").length,
  0
);

const technologyFeatures = [
  {
    title: "Advanced Diagnostics",
    description: "Fast and precise eye assessments",
    icon: "diagnostics"
  },
  {
    title: "Precision Surgery",
    description: "Modern equipment for improved outcomes",
    icon: "surgery"
  },
  {
    title: "Comfortable Experience",
    description: "Support faster and safer recovery",
    icon: "comfort"
  }
];

const services = [
  {
    number: "01",
    title: "Cataract Surgery",
    description: "Advanced lens replacement procedures",
    tags: ["Clear Vision", "Lens Replacement", "Vision Correction"]
  },
  {
    number: "02",
    title: "LASIK & Vision Correction",
    description: "Reduce dependency on glasses",
    tags: ["LASIK Surgery", "Fast Recovery", "Sharper Vision"]
  },
  {
    number: "03",
    title: "Glaucoma Care",
    description: "Early detection and treatment",
    tags: ["OCT Imaging", "Precision Eye Scanning", "Intraocular Pressure Monitoring"]
  },
  {
    number: "04",
    title: "Retina Services",
    description: "Advanced retinal diagnosis and care",
    tags: ["Specialized Care", "Personalized Treatment", "High Resolution Eye Imaging"]
  },
  {
    number: "05",
    title: "Pediatric Eye Care",
    description: "Eye care for children",
    tags: ["Early Detection", "Child Focused Care", "Little Eyes, Big Care"]
  },
  {
    number: "06",
    title: "Cornea Treatment",
    description: "Treatment for corneal conditions",
    tags: ["Corneal Infection Treatment", "Precision Diagnostics", "Restore Visual Clarity"]
  }
];

const doctorCards = [
  {
    number: "01",
    title: "Credentials",
    type: "pills",
    items: ["MBBS", "DOMS", "DNB", "FAECS"]
  },
  {
    number: "02",
    title: "Specialization",
    type: "text",
    body: "Cataract Surgery, Glaucoma Care, LASIK / Refractive, Phacoemulsification"
  },
  {
    number: "03",
    title: "Recognition",
    type: "text",
    body: "9+ National & international honours"
  },
  {
    number: "03",
    title: "Affiliations",
    type: "text",
    body: "11 Professional memberships"
  }
];

function useLenis(disabled) {
  useEffect(() => {
    if (disabled) return undefined;

    const lenis = new Lenis({
      duration: 1.65,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.72,
      touchMultiplier: 0.85
    });

    let frameId;
    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [disabled]);
}

function ArrowIcon() {
  return (
    <span className="arrow-icon" aria-hidden="true">
      <span />
    </span>
  );
}

function CTAButton({ children, variant = "primary" }) {
  return (
    <motion.a
      className={`cta-button cta-button--${variant}`}
      href="#contact"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
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
      initial={{ opacity: 0, filter: "blur(6px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay, ease }}
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
      initial={{ opacity: 0, x: 38, filter: "blur(8px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, ease, delay: 0.12 }}
    >
      <svg className="clip-defs" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="hero-image-shape" clipPathUnits="objectBoundingBox">
            <path d="M0.04,0 H0.96 C0.982,0 1,0.018 1,0.04 V0.865 C1,0.888 0.982,0.906 0.96,0.906 H0.71 C0.675,0.906 0.661,0.925 0.648,0.951 L0.627,0.98 C0.616,0.994 0.596,1 0.574,1 H0.19 C0.153,1 0.131,0.978 0.115,0.948 L0.091,0.924 C0.078,0.911 0.061,0.906 0.04,0.906 H0 V0.04 C0,0.018 0.018,0 0.04,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="image-card">
        <motion.img
          src="/Home_page.webp"
          alt="Santhi Eye Tech reception"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.04 }}
          transition={{ duration: 1.2, ease }}
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
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.85, ease }}
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
            <img src="/LOGO.jpeg" alt="Santhi Eye Tech logo" />
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
      variants={reveal}
      whileHover={{ y: -7 }}
      transition={{ duration: 0.75, ease }}
    >
      <span className="tech-icon">
        <ServiceIcon type={icon} />
      </span>
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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-18px", "18px"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 1.04]);

  return (
    <section className="technology-section" ref={sectionRef}>
      <motion.div
        className="technology-inner"
        initial="hidden"
        whileInView="show"
        viewport={sectionViewport}
        variants={stagger}
      >
        <motion.div className="technology-image" variants={reveal}>
          <motion.img
            src="/Beds.jpg"
            alt="Advanced eye care technology room"
            style={reduceMotion ? undefined : { y: imageY, scale: imageScale }}
          />
        </motion.div>

        <div className="technology-content">
          <motion.div className="technology-copy" variants={stagger}>
            <motion.h2 variants={reveal}>
              Expert Eye Care with Advanced Technology
            </motion.h2>
            <motion.p variants={reveal}>
              Modern diagnostic and surgical systems improve accuracy, treatment
              quality, and patient experience.
            </motion.p>
            <motion.a
              className="learn-button"
              href="#contact"
              variants={reveal}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="learn-button-fill" />
              <span className="learn-button-text">Learn More</span>
              <span className="learn-button-arrow" aria-hidden="true">
                <span />
              </span>
            </motion.a>
          </motion.div>

          <motion.div className="technology-cards" variants={stagger}>
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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-14px", "14px"]);

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
            initial={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={sectionViewport}
            transition={{ duration: 1.1, ease }}
          >
            <motion.img
              src="/1_doctor.png"
              alt="Dr. Amit N. Solanki"
              style={reduceMotion ? undefined : { y: imageY }}
            />
            <motion.div
              className="specialist-name-overlay"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.32, ease }}
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

const benefits = [
  {
    title: "Doctor-led eye care",
    description: "Every consultation handled by an experienced ophthalmologist.",
    icon: "doctor"
  },
  {
    title: "Advanced technology",
    description: "Modern diagnostic and surgical equipment.",
    icon: "tech"
  },
  {
    title: "Patient-friendly environment",
    description: "A calm, peaceful, reassuring space.",
    icon: "patient"
  },
  {
    title: "Personalised Attention",
    description: "Treatment plans tailored to your case.",
    icon: "personalised"
  },
  {
    title: "Affordable solutions",
    description: "Quality care at accessible rates.",
    icon: "affordable"
  },
  {
    title: "Central Indore location",
    description: "Easily reachable from across the city.",
    icon: "location"
  },
  {
    title: "Trained paramedical staff",
    description: "Qualified team supporting every step.",
    icon: "staff"
  },
  {
    title: "Comprehensive services",
    description: "All major eye care under one roof.",
    icon: "comprehensive"
  }
];

function BenefitIcon({ type }) {
  const icons = {
    /* Person silhouette + small cross badge bottom-right */
    doctor: (
      <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
        <circle cx="32" cy="16" r="10" />
        <path d="M10 54c0-12.15 9.85-22 22-22s22 9.85 22 22H10z" />
        {/* cross badge */}
        <circle cx="48" cy="46" r="9" fill="currentColor" />
        <rect x="45" y="40" width="6" height="12" rx="2" fill="white" />
        <rect x="42" y="43" width="12" height="6" rx="2" fill="white" />
      </svg>
    ),
    /* Index finger pointing up with 3 curved signal arcs radiating from tip */
    tech: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        {/* hand / finger */}
        <path
          d="M28 52V28a4 4 0 0 1 8 0v12l4-2a3 3 0 0 1 4 2.8V44c0 4.4-3.6 8-8 8H28z"
          fill="currentColor"
        />
        <path
          d="M20 38v-8a4 4 0 0 1 8 0"
          stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"
        />
        {/* signal arcs above finger tip */}
        <path d="M32 22 Q32 18 36 16" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        <path d="M32 22 Q32 14 40 11" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        <path d="M32 22 Q32 10 44 6"  stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        {/* left arcs mirrored */}
        <path d="M32 22 Q32 18 28 16" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        <path d="M32 22 Q32 14 24 11" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        <path d="M32 22 Q32 10 20 6"  stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        {/* dot at fingertip */}
        <circle cx="32" cy="22" r="2.5" fill="currentColor" />
      </svg>
    ),
    /* 3 person silhouettes side-by-side with heart+pulse above the center one */
    patient: (
      <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
        {/* left person */}
        <circle cx="14" cy="20" r="7" />
        <path d="M2 48c0-6.627 5.373-12 12-12h6v12H2z" />
        {/* right person */}
        <circle cx="50" cy="20" r="7" />
        <path d="M44 36h6c6.627 0 12 5.373 12 12v0H44V36z" />
        {/* center person */}
        <circle cx="32" cy="22" r="8" />
        <path d="M18 48c0-7.732 6.268-14 14-14s14 6.268 14 14H18z" />
        {/* heart above center */}
        <path
          d="M32 14c0 0-1.5-4-5-4a4 4 0 0 0-4 4c0 4 9 10 9 10s9-6 9-10a4 4 0 0 0-4-4c-3.5 0-5 4-5 4z"
          fill="currentColor"
        />
      </svg>
    ),
    /* Person silhouette + large magnifying glass overlapping right side */
    personalised: (
      <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
        {/* person */}
        <circle cx="22" cy="16" r="9" />
        <path d="M6 48c0-8.837 7.163-16 16-16h8v16H6z" />
        {/* magnifying glass */}
        <circle cx="44" cy="34" r="13" fill="none" stroke="currentColor" strokeWidth="5" />
        <circle cx="44" cy="34" r="6" />
        <line x1="53" y1="43" x2="61" y2="51" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </svg>
    ),
    /* Lightbulb body with filament + small checkmark badge bottom-right */
    affordable: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        {/* bulb glass */}
        <path
          d="M32 6a16 16 0 0 1 10 28.4V42a2 2 0 0 1-2 2H24a2 2 0 0 1-2-2v-7.6A16 16 0 0 1 32 6z"
          fill="currentColor"
        />
        {/* base segments */}
        <rect x="24" y="46" width="16" height="3" rx="1.5" fill="currentColor" />
        <rect x="26" y="51" width="12" height="3" rx="1.5" fill="currentColor" />
        {/* rays */}
        <line x1="32" y1="2" x2="32" y2="0"  stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1="10" x2="52" y2="8"  stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="14" y1="10" x2="12" y2="8"  stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="56" y1="26" x2="58" y2="26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="8"  y1="26" x2="6"  y2="26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        {/* checkmark badge */}
        <circle cx="48" cy="48" r="10" fill="currentColor" />
        <path d="M43 48l4 4 7-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
    /* Map-pin shape with hole, plus 2 concentric ellipse ripples below */
    location: (
      <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
        {/* pin */}
        <path d="M32 4C22.06 4 14 12.06 14 22c0 13.25 18 36 18 36s18-22.75 18-36C50 12.06 41.94 4 32 4z" />
        {/* inner hole */}
        <circle cx="32" cy="22" r="6" fill="white" />
        {/* ripple rings below pin */}
        <ellipse cx="32" cy="56" rx="14" ry="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <ellipse cx="32" cy="56" rx="8"  ry="2.5" fill="currentColor" opacity="0.35" />
      </svg>
    ),
    /* Person with stethoscope around neck + small medical bag lower-right */
    staff: (
      <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
        {/* head */}
        <circle cx="32" cy="14" r="10" />
        {/* body */}
        <path d="M14 52c0-9.94 8.06-18 18-18s18 8.06 18 18H14z" />
        {/* stethoscope arc over shoulders */}
        <path
          d="M22 34 Q22 44 28 44 Q34 44 34 38"
          fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"
        />
        <circle cx="34" cy="38" r="3" fill="white" />
        {/* medical bag badge */}
        <rect x="40" y="42" width="16" height="14" rx="3" fill="currentColor" />
        <rect x="44" y="39" width="8" height="5" rx="2" fill="currentColor" />
        <rect x="43" y="46" width="10" height="2.5" rx="1" fill="white" />
        <rect x="47" y="42" width="2.5" height="10" rx="1" fill="white" />
      </svg>
    ),
    /* Person head with large eye inside + small magnifier overlapping right */
    comprehensive: (
      <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
        {/* person silhouette */}
        <circle cx="28" cy="16" r="10" />
        <path d="M10 50c0-9.94 8.06-18 18-18h6v18H10z" />
        {/* magnifying glass with eye inside */}
        <circle cx="44" cy="36" r="14" fill="none" stroke="currentColor" strokeWidth="5" />
        {/* eye shape inside lens */}
        <path
          d="M34 36c0 0 4-6 10-6s10 6 10 6-4 6-10 6-10-6-10-6z"
          fill="currentColor"
          stroke="none"
        />
        <circle cx="44" cy="36" r="3" fill="white" />
        {/* handle */}
        <line x1="53" y1="45" x2="61" y2="53" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </svg>
    )
  };
  return <span className="benefit-icon">{icons[type]}</span>;
}

function BenefitItem({ item, index }) {
  const col = index % 4;
  const row = Math.floor(index / 4);
  return (
    <motion.div
      className="benefit-item"
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={sectionViewport}
      transition={{
        duration: 0.75,
        delay: row * 0.18 + col * 0.1,
        ease
      }}
    >
      <BenefitIcon type={item.icon} />
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

const awards = [
  { id: 1, year: "2018", num: "1", side: "right", title: "Best Video Award",    description: "Shree Sadguru Seva Sansthan ‑ Managed Post LASIK Epithelial Ingrowth", accent: "cyan",  highlight: false },
  { id: 2, year: "2017", num: "2", side: "left",  title: "Memorial Award",      description: "Dr. Ramesh Krishna Agarwal Award ‑ M.P.SOS Annual Conference, Gwalior",   accent: "green", highlight: false },
  { id: 3, year: "2016", num: "3", side: "right", title: "Best Poster Award",   description: "M.P. State Ophthalmic Society Annual Conference, Bhopal",                 accent: "cyan",  highlight: false },
  { id: 4, year: "2011", num: "4", side: "left",  title: "Best Surgical Video", description: "Small vs Large Rhexis for Endocapsular Phaco ‑ IDOS, Indore",             accent: "green", highlight: false },
  { id: 5, year: "",     num: "",  side: "left",  title: "Best Glaucoma Paper", description: "Ophthalmology Tomorrow Annual Conference, IDOS, Indore",                  accent: "cyan",  highlight: true  },
];

const testimonials = [
  {
    id: 1,
    title: "Excellent Professional Eye Care",
    quote:
      "The whole LASIK experience was extremely smooth. Dr. Solanki explained every step and the team made me feel completely at ease.",
    name: "Priya S.",
    details: "LASIK patient · Indore",
    avatar: "/doctor.jpg"
  },
  {
    id: 2,
    title: "Trusted Recovery Support Experience",
    quote:
      "My father had his cataract operation here. The transparency in pricing and care, and the calm environment made all the difference.",
    name: "Rakesh M.",
    details: "Cataract surgery · Indore",
    avatar: "/doctor.jpg"
  },
  {
    id: 3,
    title: "Highly Recommended Glaucoma Service",
    quote:
      "Long-term glaucoma care here has been outstanding. The doctor explains everything clearly and the staff is genuinely caring.",
    name: "Anita V.",
    details: "Glaucoma patient · Indore",
    avatar: "/doctor.jpg"
  }
];

const faqs = [
  {
    id: 1,
    question: "How long does cataract surgery take?",
    answer:
      "Most cataract procedures take around 15 to 30 minutes, with total clinic time of about 2 to 3 hours including preparation and observation."
  },
  {
    id: 2,
    question: "Is LASIK painful?",
    answer:
      "LASIK is generally not painful. Numbing eye drops are used before treatment, and most patients feel only mild pressure for a few seconds during the procedure."
  },
  {
    id: 3,
    question: "When should I schedule an eye exam?",
    answer:
      "Adults should usually get a comprehensive eye exam every 1 to 2 years, or sooner if vision changes, diabetes, glaucoma risk, or persistent eye discomfort occurs."
  },
  {
    id: 4,
    question: "Do I need follow-up appointments?",
    answer:
      "Yes, follow-up visits are important after treatments like LASIK or cataract surgery. They help us monitor healing, adjust medications, and protect long-term vision outcomes."
  }
];

function TimelineRow({ item, index }) {
  const cardOnRight = item.side === "right";   // true → card right, year left
  const isTail      = !item.year && !item.num; // item 5 — no dot, no year
  const delay       = index * 0.15;

  /* Year label — slides in from its side */
  const yearEl = item.year && (
    <motion.div
      className={`tl-year tl-year--${item.accent}`}
      initial={{ opacity: 0, x: cardOnRight ? -60 : 60, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {item.year}
    </motion.div>
  );

  /* Award card — slides in from its side */
  const cardEl = (
    <motion.div
      className={`award-card${item.highlight ? " award-card--highlight" : ""}`}
      initial={{ opacity: 0, x: isTail ? -40 : cardOnRight ? 60 : -60, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
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
          initial="rest"
          animate="rest"
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
          variants={{
            rest: {
              backgroundColor: "rgba(255,255,255,0)",
              color: "#171311",
              borderColor: "rgba(36,197,232,0.78)"
            },
            hover: {
              backgroundColor: "#24c5e8",
              color: "#ffffff",
              borderColor: "#24c5e8"
            }
          }}
          transition={{ duration: 0.32, ease: "easeOut" }}
        >
          <span>View all</span>
          <motion.span
            className="testimonials-view-all-arrow"
            variants={{
              rest: {
                x: 0,
                backgroundColor: "rgba(36,197,232,0.08)",
                borderColor: "rgba(36,197,232,0.45)",
                color: "#0d93b2"
              },
              hover: {
                x: 5,
                backgroundColor: "rgba(255,255,255,0.22)",
                borderColor: "rgba(255,255,255,0.64)",
                color: "#ffffff"
              }
            }}
            transition={{ duration: 0.28, ease: "easeOut" }}
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
          src="/1_doctor.png"
          alt="Eye specialist"
          className="cta-banner-photo cta-banner-photo--left"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />

        <motion.img
          src="/1_doctor.png"
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
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <span className="cta-banner-heading-soft">Start Your </span>
            <span className="cta-banner-heading-accent">Vision Journey</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <motion.a
              href="#contact"
              className="cta-banner-button"
              whileTap={{ scale: 0.98 }}
              initial="rest"
              animate="rest"
              whileHover="hover"
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.04 }
              }}
            >
              <span>Book a Consultation</span>
              <motion.span
                className="cta-banner-button-arrow"
                variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                transition={{ duration: 0.24, ease: "easeOut" }}
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

const WaveLine = () => (
  <svg
    className="footer-wave"
    viewBox="0 0 1440 16"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M0,8 C300,8 400,0 720,0 C1040,0 1140,8 1440,8"
      fill="none"
      stroke="#8ab5a8"
      strokeWidth="1.5"
    />
  </svg>
);

function FooterSection() {
  return (
    <footer className="footer-section">
      {/* top wave */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      >
        <WaveLine />
      </motion.div>

      {/* 4-column grid */}
      <div className="footer-grid">
        {/* Col 1 — Brand Bio */}
        <motion.div
          className="footer-col footer-col--bio"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <p>
            Where peace meets world-class technology —
            comprehensive eye care, advanced cataract,
            glaucoma and refractive surgery led by Dr. Amit N.
            Solanki in the heart of Indore.
          </p>
        </motion.div>

        {/* Col 2 — Main Pages */}
        <motion.div
          className="footer-col"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          <h3>Main Pages</h3>
          <nav>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#blog">Blog</a>
          </nav>
        </motion.div>

        {/* Col 3 — Logo + Social */}
        <motion.div
          className="footer-col footer-col--center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <img src="/LOGO.jpeg" alt="Shanti EyeTech logo" className="footer-logo" />
          <div className="footer-socials">
            {[
              { label: "Facebook", symbol: "f" },
              { label: "Twitter", symbol: "𝕏" },
              { label: "Instagram", symbol: "◎" },
              { label: "LinkedIn", symbol: "in" },
            ].map((s) => (
              <motion.a
                key={s.label}
                href="#"
                className="footer-social-icon"
                aria-label={s.label}
                whileHover={{ scale: 1.12 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {s.symbol}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Col 4 — Support + Visit Us */}
        <motion.div
          className="footer-col"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
        >
          <h3>Support</h3>
          <nav>
            <a href="#faq">FAQ</a>
            <a href="#privacy">Privacy Policy</a>
          </nav>

          <h3 className="footer-h3--spaced">Visit us</h3>
          <address>
            Shekhar Central, M1 &amp; M2,<br />
            Palasia Square, Manorama Ganj,<br />
            Indore, MP 452001
            <br /><br />
            9179191939 · 0731-4291939<br />
            info@shantieyetech.com
          </address>
        </motion.div>
      </div>

      {/* bottom wave above copyright */}
      <WaveLine />

      {/* copyright */}
      <div className="footer-copy">
        <p>© 2026 Shanti EyeTech Eye Care &amp; Laser Hospital · All rights reserved</p>
      </div>
    </footer>
  );
}

export default function App() {
  const reduceMotion = useReducedMotion();
  useLenis(reduceMotion);

  return (
    <main>
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
      <FooterSection />
    </main>
  );
}
