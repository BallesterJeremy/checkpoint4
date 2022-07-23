import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import TextSqlFirst from "./AllSQL/TextSqlFirst";
import ImageSqlFirst from "./AllSQL/ImageSqlFirst";
import ImageSqlSec from "./AllSQL/ImageSqlSec";

export default function SQL() {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <ImageSqlFirst />
        <TextSqlFirst />
        <ImageSqlSec />
      </div>
      <Footer />
    </>
  );
}
