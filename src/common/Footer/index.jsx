import Link from "next/link";
import { motion } from "framer-motion";
import { footerContent } from "@/constant/footerContent";

const footerEase = [0.22, 1, 0.36, 1];
const footerViewport = { once: true, amount: 0.2 };

const footerContainerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const footerRevealVariant = {
  hidden: { opacity: 0, y: 28 },
  show: ({ delay = 0 } = {}) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: footerEase }
  })
};

const footerLogoVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: 0.36, ease: footerEase }
  }
};

const footerSocialsVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.5
    }
  }
};

const footerSocialVariant = {
  hidden: { opacity: 0, y: 18, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: footerEase }
  }
};

function FooterCurveLine({ position }) {
  const isBottom = position === "bottom";

  return (
    <motion.svg
      className={`footer-curve footer-curve--${position}`}
      viewBox="0 0 1600 92"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      variants={footerRevealVariant}
      custom={{ delay: isBottom ? 1.02 : 0 }}
    >
      <path
        d={
          isBottom
            ? "M0 58H458C508 58 532 22 584 22H1016C1068 22 1092 58 1150 58H1600"
            : "M0 36H458C508 36 532 70 584 70H1016C1068 70 1092 36 1150 36H1600"
        }
      />
    </motion.svg>
  );
}

function FooterSocialIcon({ label }) {
  if (label === "Facebook") {
    return <span aria-hidden="true">f</span>;
  }

  if (label === "X / Twitter") {
    return <span aria-hidden="true">X</span>;
  }

  if (label === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="5" y="5" width="14" height="14" rx="4" />
        <circle cx="12" cy="12" r="3.2" />
        <circle cx="16.5" cy="7.5" r="0.8" />
      </svg>
    );
  }

  return <span aria-hidden="true">in</span>;
}

function FooterNavLink({ href, children }) {
  if (href.startsWith("/")) {
    return <Link href={href}>{children}</Link>;
  }

  return <a href={href}>{children}</a>;
}

export default function Footer() {
  return (
    <footer className="footer-section">
      <motion.div
        className="footer-shell"
        initial="hidden"
        whileInView="show"
        viewport={footerViewport}
        variants={footerContainerVariant}
      >
        <img
          className="footer-bg-image"
          src="https://framerusercontent.com/images/Kw7qYWRE5oJS1vo7LgFTnJmSPZI.png?width=4800&height=2644"
          alt=""
          decoding="async"
          loading="lazy"
          aria-hidden="true"
        />
        <span className="footer-bg-overlay" aria-hidden="true" />

        <FooterCurveLine position="top" />

        <div className="footer-content">
          <motion.div className="footer-left" variants={footerContainerVariant}>
            <motion.p
              className="footer-description"
              variants={footerRevealVariant}
              custom={{ delay: 0.12 }}
            >
              {footerContent.description}
            </motion.p>

            <motion.div
              className="footer-pages"
              variants={footerRevealVariant}
              custom={{ delay: 0.24 }}
            >
              <h3>Main Pages</h3>
              <nav aria-label="Footer main pages">
                {footerContent.mainPages.map((link) => (
                  <FooterNavLink key={link.label} href={link.href}>
                    {link.label}
                  </FooterNavLink>
                ))}
              </nav>
            </motion.div>
          </motion.div>

          <motion.div className="footer-center" variants={footerContainerVariant}>
            <motion.img
              src="/assets/LOGO.jpeg"
              alt="Shanti EyeTech logo"
              className="footer-logo"
              variants={footerLogoVariant}
            />
            <motion.div className="footer-socials" variants={footerSocialsVariant}>
              {footerContent.socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label={social.label}
                  variants={footerSocialVariant}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <FooterSocialIcon label={social.label} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="footer-right" variants={footerContainerVariant}>
            <motion.div
              className="footer-support"
              variants={footerRevealVariant}
              custom={{ delay: 0.78 }}
            >
              <h3>Support</h3>
              <nav aria-label="Footer support links">
                {footerContent.support.map((link) => (
                  <FooterNavLink key={link.label} href={link.href}>
                    {link.label}
                  </FooterNavLink>
                ))}
              </nav>
            </motion.div>

            <motion.div
              className="footer-visit"
              variants={footerRevealVariant}
              custom={{ delay: 0.9 }}
            >
              <h3>Visit us</h3>
              <address>
                {footerContent.contact.address.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </address>
              <p>{footerContent.contact.phone}</p>
              <p>{footerContent.contact.email}</p>
            </motion.div>
          </motion.div>
        </div>

        <FooterCurveLine position="bottom" />

        <motion.p
          className="footer-copy"
          variants={footerRevealVariant}
          custom={{ delay: 1.14 }}
        >
          {footerContent.copyright}
        </motion.p>
      </motion.div>
    </footer>
  );
}
