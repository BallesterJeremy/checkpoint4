import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import TextElixirFirst from "./AllElixir/TextElixirFirst";
import ImageElixirFirst from "./AllElixir/ImageElixirFirst";

export default function Elixir() {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <TextElixirFirst />
        <ImageElixirFirst />
      </div>
      <Footer />
    </>
  );
}
