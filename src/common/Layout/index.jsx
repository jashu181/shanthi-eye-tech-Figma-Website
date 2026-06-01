import LenisProvider from "@/common/LenisProvider";
import Header from "@/common/Header";
import Footer from "@/common/Footer";

export default function Layout({ children }) {
  return (
    <LenisProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </LenisProvider>
  );
}
