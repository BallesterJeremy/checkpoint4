import { useState, useEffect } from "react";
import parse from "html-react-parser";
import axios from "axios";
import "./elixir.scss";

export default function TextElixirFirst() {
  const [textEli, setTextEli] = useState([]);

  const getText = async () => {
    try {
      const data = await axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }texts?categories=elixir&textSection=1`
        )
        .then((response) => response.data);
      setTextEli(data);
    } catch (err) {
      if (err.response.status === 401) {
        // eslint-disable-next-line
        alert("text doesn't exists");
      }
    }
  };
  useEffect(() => {
    getText();
  }, []);
  return (
    <div className="body1">
      {textEli.map((text) => (
        <div key={text.id}>{parse(text.body)}</div>
      ))}
    </div>
  );
}
