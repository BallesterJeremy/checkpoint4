import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import TextReactFirst from "./AllReact/TextReactFirst";
import ImageReactFirst from "./AllReact/ImageReactFirst";
import ImageReactSec from "./AllReact/ImageReactSec";
import TextReactSec from "./AllReact/TextReactSec";
import ImageReactThird from "./AllReact/ImageReactThird";
import TextReactThird from "./AllReact/TextReactThird";
import "./AllReact/react.scss";

export default function React() {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <ImageReactFirst />
        <TextReactFirst />
        <ImageReactSec />
        <TextReactSec />
        <ImageReactThird />
        <TextReactThird />
        <Footer />
      </div>
    </>
  );
}
