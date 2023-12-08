import Footer from "../Components/Footer/Footer";
import NavBar from "../Components/NavBar/page";

export default function HomeLayout({ children }) {
  return (
    <section>
      <header><NavBar /></header>
      {children}
      <Footer />
    </section>)
}