// ─── Animation Variants ─────────────────────────────────────────────────────

export const ease = [0.22, 1, 0.36, 1];

export const sectionViewport = { once: true, amount: 0.18 };

export const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease }
  }
};

export const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08
    }
  }
};

export const serviceCardReveal = {
  hidden: { opacity: 0, y: 40 },
  show: (rowIndex) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: rowIndex * 0.14,
      ease: "easeOut"
    }
  })
};

export const docCardReveal = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease }
  })
};

// ─── About Section ──────────────────────────────────────────────────────────

export const aboutLines = [
  "At Shanti EyeTech Eye Care & Laser Hospital, we combine",
  "world-class ophthalmic technology with a calm, patient-first",
  "environment — comprehensive treatment under one roof."
];

export const stats = [
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

export const aboutWordCount = aboutLines.reduce(
  (total, line) => total + line.split(" ").length,
  0
);

// ─── Technology Section ─────────────────────────────────────────────────────

export const technologyFeatures = [
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

// ─── Services Section ───────────────────────────────────────────────────────

export const services = [
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

// ─── Doctor Section ─────────────────────────────────────────────────────────

export const doctorCards = [
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

// ─── Benefits Section ───────────────────────────────────────────────────────

export const benefits = [
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

// ─── Awards Section ─────────────────────────────────────────────────────────

export const awards = [
  { id: 1, year: "2018", num: "1", side: "right", title: "Best Video Award",    description: "Shree Sadguru Seva Sansthan ‑ Managed Post LASIK Epithelial Ingrowth", accent: "cyan",  highlight: false },
  { id: 2, year: "2017", num: "2", side: "left",  title: "Memorial Award",      description: "Dr. Ramesh Krishna Agarwal Award ‑ M.P.SOS Annual Conference, Gwalior",   accent: "green", highlight: false },
  { id: 3, year: "2016", num: "3", side: "right", title: "Best Poster Award",   description: "M.P. State Ophthalmic Society Annual Conference, Bhopal",                 accent: "cyan",  highlight: false },
  { id: 4, year: "2011", num: "4", side: "left",  title: "Best Surgical Video", description: "Small vs Large Rhexis for Endocapsular Phaco ‑ IDOS, Indore",             accent: "green", highlight: false },
  { id: 5, year: "",     num: "",  side: "left",  title: "Best Glaucoma Paper", description: "Ophthalmology Tomorrow Annual Conference, IDOS, Indore",                  accent: "cyan",  highlight: true  }
];

// ─── Testimonials Section ────────────────────────────────────────────────────

export const testimonials = [
  {
    id: 1,
    title: "Excellent Professional Eye Care",
    quote:
      "The whole LASIK experience was extremely smooth. Dr. Solanki explained every step and the team made me feel completely at ease.",
    name: "Priya S.",
    details: "LASIK patient · Indore",
    avatar: "/assets/doctor.jpg"
  },
  {
    id: 2,
    title: "Trusted Recovery Support Experience",
    quote:
      "My father had his cataract operation here. The transparency in pricing and care, and the calm environment made all the difference.",
    name: "Rakesh M.",
    details: "Cataract surgery · Indore",
    avatar: "/assets/doctor.jpg"
  },
  {
    id: 3,
    title: "Highly Recommended Glaucoma Service",
    quote:
      "Long-term glaucoma care here has been outstanding. The doctor explains everything clearly and the staff is genuinely caring.",
    name: "Anita V.",
    details: "Glaucoma patient · Indore",
    avatar: "/assets/doctor.jpg"
  }
];

// ─── FAQ Section ─────────────────────────────────────────────────────────────

export const faqs = [
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
