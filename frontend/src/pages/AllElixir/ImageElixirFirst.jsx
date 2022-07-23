import { useState, useEffect } from "react";
import axios from "axios";
import "./elixir.scss";

export default function ImageElixirFirst() {
  const [imageEli, setImageEli] = useState([]);

  const getImage = async () => {
    try {
      const data = await axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }pictures?genres=elixir&picSection=1`
        )
        .then((response) => response.data);
      setImageEli(data);
      //   console.log(data);
    } catch (err) {
      if (err.response.status === 401) {
        // eslint-disable-next-line
        alert("Picture doesn't exists");
      }
    }
  };
  useEffect(() => {
    getImage();
  }, []);
  return (
    <div>
      {imageEli.map((image) => (
        <div key={image.id}>
          <img
            className="imageReact"
            src={`${import.meta.env.VITE_IMAGES_URL}${image.file}`}
            alt={image.alt}
          />
        </div>
      ))}
    </div>
  );
}
