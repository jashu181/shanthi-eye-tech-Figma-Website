import Head from "next/head";
import PrivacyPolicyPage from "@/pagecomponent/PrivacyPolicy";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Shanti EyeTech</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Privacy Policy for Shanti EyeTech Eye Care & Laser Hospital, including WhatsApp Cloud API communication and patient data handling."
        />
      </Head>
      <PrivacyPolicyPage />
    </>
  );
}
