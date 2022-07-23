import { useState, useEffect } from "react";
import axios from "axios";

export default function ImageReactSec() {
  const [imageSec, setImageSec] = useState([]);

  const getImage = async () => {
    try {
      const data = await axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }pictures?genres=react&picSection=2`
        )
        .then((response) => response.data);
      setImageSec(data);
      // console.log(data);
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
      {imageSec.map((image) => (
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
