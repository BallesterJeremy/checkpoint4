import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import TextJavascriptFirst from "./AllJavascript/TextJavascriptFirst";
import ImageJavascriptFirst from "./AllJavascript/ImageJavascriptFirst";

export default function JavaScript() {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <TextJavascriptFirst />
        <ImageJavascriptFirst />
      </div>
      <Footer />
    </>
  );
}
