import Image from "next/image";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Team from "./components/Team";
export default function Home() {
  return (
    <div>
      <Nav/>
      <Team/>
      <Footer/>
    </div>
  );
}
