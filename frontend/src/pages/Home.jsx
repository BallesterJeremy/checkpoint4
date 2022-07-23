import Navbar from "@components/Navbar";
import Carousel from "@components/Carousel";
import Footer from "@components/Footer";
import "./home.scss";

export default function Home() {
  return (
    <>
      <Navbar />
      <Carousel />
      <div className="main-text-div">
        <p className="para">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
          dignissimos iste sequi adipisci, est totam ad quo libero, inventore
          laudantium illo labore veritatis tempore, velit quaerat repellendus
          illum aperiam quasi suscipit accusamus incidunt! Dolore corporis
          pariatur culpa nam nobis reiciendis in odio laudantium sequi quasi
          deserunt assumenda, nemo aspernatur officia suscipit vero. Suscipit
          corrupti blanditiis veniam exercitationem pariatur qui, eligendi
          aperiam nobis, placeat ullam quisquam unde praesentium illo alias
          fugiat quis mollitia! Atque enim soluta, sapiente suscipit
          exercitationem fugit fuga in odio, error ducimus consequatur.
        </p>
      </div>
      <Footer />
    </>
  );
}
