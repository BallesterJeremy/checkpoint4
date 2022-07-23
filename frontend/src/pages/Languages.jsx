import Navbar from "@components/Navbar";
import "./languages.scss";
import Footer from "@components/Footer";
import { Link } from "react-router-dom";

export default function Languages() {
  return (
    <>
      <Navbar />
      <p className="language-top-text">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus
        animi facilis aliquid eos excepturi iste delectus nisi ea nulla autem
        vitae id natus, dolores ex, aut beatae dolorem non quos, assumenda
        voluptas molestias dolor? Temporibus culpa tempore minus facilis quos,
        aperiam nesciunt, ullam fuga ipsum quasi officiis, est reprehenderit
        possimus.
      </p>
      <div className="main-card">
        <div className="card1">
          <Link className="link-languages" to="/react">
            <img
              className="logo-img"
              src="src/assets/images/react.png"
              alt="react"
            />
            <p className="card-name">React</p>
          </Link>
        </div>
        <div className="card2">
          <Link className="link-languages" to="/javascript">
            <img className="logo-img" src="src/assets/images/js.png" alt="" />
            <p className="card-name">Javascript</p>
          </Link>
        </div>
        <div className="card3">
          <Link className="link-languages" to="/typescript">
            <img className="logo-img" src="src/assets/images/ts.png" alt="" />
            <p className="card-name">TypeScript</p>
          </Link>
        </div>
        <div className="card4">
          <Link className="link-languages" to="/python">
            <img
              className="logo-img"
              src="src/assets/images/python.png"
              alt=""
            />
            <p className="card-name">Python</p>
          </Link>
        </div>
        <div className="card5">
          <Link className="link-languages" to="/elixir">
            <img
              className="logo-img"
              src="src/assets/images/Elixir.png"
              alt=""
            />
            <p className="card-name">Elixir</p>
          </Link>
        </div>
        <div className="card6">
          <Link className="link-languages" to="/sql">
            <img className="logo-img" src="src/assets/images/sql.png" alt="" />
            <p className="card-name">SQL</p>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
