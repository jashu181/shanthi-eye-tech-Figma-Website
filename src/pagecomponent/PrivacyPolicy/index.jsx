import Image from "next/image";
import Link from "next/link";
import { privacyPolicyContent } from "@/constant/privacyPolicyContent";
import styles from "./styles.module.css";

function SectionList({ items }) {
  if (!items.length) {
    return null;
  }

  return (
    <ul className={styles.sectionList}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <article className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link className={styles.logoLink} href="/" aria-label="Go to Shanti EyeTech home">
            <Image
              src="/assets/LOGO.jpeg"
              alt="Shanti EyeTech logo"
              width={260}
              height={150}
              priority
              className={styles.logo}
            />
          </Link>

          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Privacy Policy</span>
            <h1>Privacy Policy for WhatsApp Communication</h1>
            <p>{privacyPolicyContent.intro}</p>
            <div className={styles.metaRow}>
              <span>{privacyPolicyContent.businessName}</span>
              <span>Last updated: {privacyPolicyContent.lastUpdated}</span>
            </div>
            <Link className={styles.homeLink} href="/">
              <span>Back to Home</span>
              <span className={styles.homeLinkIcon} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.highlights} aria-label="Privacy policy highlights">
        {privacyPolicyContent.highlights.map((item) => (
          <div className={styles.highlightCard} key={item.label}>
            <span>{item.label}</span>
            <p>{item.value}</p>
          </div>
        ))}
      </section>

      <div className={styles.contentShell}>
        <aside className={styles.policyIndex} aria-label="Privacy policy sections">
          <span>On this page</span>
          {privacyPolicyContent.sections.map((section) => (
            <a key={section.title} href={`#${section.title.toLowerCase().replaceAll(" ", "-")}`}>
              {section.title}
            </a>
          ))}
        </aside>

        <div className={styles.policyBody}>
          {privacyPolicyContent.sections.map((section) => (
            <section
              className={styles.policySection}
              id={section.title.toLowerCase().replaceAll(" ", "-")}
              key={section.title}
            >
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              <SectionList items={section.items} />
            </section>
          ))}

          <section className={styles.contactPanel} aria-labelledby="privacy-contact-title">
            <div>
              <span className={styles.eyebrow}>Contact</span>
              <h2 id="privacy-contact-title">Privacy Requests</h2>
              <p>
                For privacy questions, WhatsApp data requests, corrections, or deletion
                requests, contact Shanti EyeTech Eye Care & Laser Hospital using the
                details below.
              </p>
            </div>
            <address className={styles.contactDetails}>
              <a href={`mailto:${privacyPolicyContent.contact.email}`}>
                {privacyPolicyContent.contact.email}
              </a>
              <a href="tel:+919179191939">{privacyPolicyContent.contact.phone}</a>
              <span>{privacyPolicyContent.contact.address}</span>
            </address>
          </section>
        </div>
      </div>
    </article>
  );
}
