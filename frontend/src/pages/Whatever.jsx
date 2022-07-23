import Navbar from "@components/Navbar";
import { useState, useEffect } from "react";
import "./kanye.scss";

export default function Whatever() {
  const [quote, setQuote] = useState();
  const getQuote = async () => {
    const data = await fetch("https://api.kanye.rest").then((rsp) =>
      rsp.json()
    );

    setQuote(data.quote);
  };

  const getNewQuote = () => {
    getQuote();
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <>
      <Navbar />
      <div className="kanye-container">
        <h1 className="kanye-title">Kanye Quotes</h1>
        <p className="kanye-text">{quote}</p>

        <button type="button" className="Kanye-button" onClick={getNewQuote}>
          New Quote
        </button>
      </div>
    </>
  );
}
