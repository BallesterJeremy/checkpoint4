import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import TextPythonFirst from "./AllPython/TextPythonFirst";
import ImagePythonFirst from "./AllPython/ImagePythonFirst";

export default function Python() {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <TextPythonFirst />
        <ImagePythonFirst />
      </div>
      <Footer />
    </>
  );
}
