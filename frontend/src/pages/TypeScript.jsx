import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import TextTypeScriptFirst from "./AllTypescript/TextTypeScriptFirst";
import ImageTypeScriptFirst from "./AllTypescript/ImageTypeScriptFirst";

export default function TypeScript() {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <ImageTypeScriptFirst />
        <TextTypeScriptFirst />
      </div>
      <Footer />
    </>
  );
}
