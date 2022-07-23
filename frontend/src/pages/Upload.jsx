/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
// eslint-disable-next-line import/no-unresolved

import axios from "@services/axios";
import { useState, useEffect } from "react";
import "../App.css";
import "./upload.scss";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState();
  const [fileCreated, setFileCreated] = useState();
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState("");
  const [section, setSection] = useState("");
  const [updateFile, setUpdateFile] = useState();
  const [image, setImage] = useState([]);
  const [setRidImage] = useState("");

  // on va specifier que seulement deux types de fichiers peuvent fonctionner
  const handleInput = (e) => {
    const file = e.target.files[0];
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      // eslint-disable-next-line
      return alert("Select a jpeg or a png image");
    }
    return setSelectedFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append(
      "pictureData",
      JSON.stringify({
        description,
        genres,
        picSection: section,
      })
    );
    try {
      const { data } = await axios.post("pictures/upload", formData);
      // console.log(data);
      // eslint-disable-next-line no-undef
      setImage([]);
      // eslint-disable-next-line no-undef
      return setFileCreated(data);
    } catch (err) {
      console.warn(err);
      // eslint-disable-next-line
      return alert(err.message);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append(
      "pictureData",
      JSON.stringify({
        description,
        genres,
        picSection: section,
      })
    );
    // console.log(text);
    const id = updateFile;
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}pictures/update/${id}`,
        formData
      );
      // console.log(data);
      getImage();
      // eslint-disable-next-line no-use-before-define
      return setUpdateFile(data);
    } catch (err) {
      console.warn(err);
      // eslint-disable-next-line
      return alert(err.message);
    }
  };
  const getImage = async () => {
    try {
      const data = await axios
        .get(`pictures?genres=${genres}`)
        .then((response) => response.data);
      // console.log(data);
      setImage(data);
    } catch (err) {
      if (err.response.status === 401) {
        // eslint-disable-next-line
        alert("Picture doesn't exists");
      }
    }
  };
  useEffect(() => {
    getImage();
  }, [genres]);

  const imageToDelete = async (id) => {
    const data = await axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}pictures/${id}`, {
        body: image,
      })
      .then((response) => {
        setRidImage(response.data);
        getImage(data);
      });
  };
  return (
    <form className="upload-container" onSubmit={handleSubmit}>
      <label className="label-containers" htmlFor="upload-picture">
        Select a pic :
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleInput}
        />
      </label>
      <label className="label-containers" htmlFor="picture-description">
        {" "}
        Picture Description :
        <input
          type="text"
          placeholder="picture description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label className="label-containers" htmlFor="picture-categories">
        Select a categorie :
        <select value={genres} onChange={(e) => setGenres(e.target.value)}>
          <option value="select">Select</option>
          <option value="carousel">carousel</option>
          <option value="react">react</option>
          <option value="python">python</option>
          <option value="typescript">typescript</option>
          <option value="javascript">JS</option>
          <option value="elixir">elixir</option>
          <option value="SQL">mysql</option>
        </select>
      </label>
      <label className="label-containers" htmlFor="picture-section">
        Select a section :
        <select
          className="selectors"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        >
          <option value="select">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="2">5</option>
          <option value="3">6</option>
        </select>
      </label>
      <label className="label-containers" htmlFor="picture-id">
        <select
          className="selectors"
          onChange={(e) => setUpdateFile(e.target.value)}
        >
          <option value="Select">Select</option>
          {image.length
            ? image.map((img) => (
                <option value={img.id} key={img.id}>
                  {img.file}
                </option>
              ))
            : ""}
        </select>
      </label>
      <button type="submit"> Upload Pic</button>
      {/* <Update /> */}
      {updateFile && (
        <img
          src={`${import.meta.env.VITE_IMAGES_URL}${updateFile.file}`}
          alt={updateFile.alt}
        />
      )}
      <button type="button" onClick={handleUpdate}>
        {" "}
        Update Pic
      </button>
      <button type="button" onClick={() => imageToDelete(updateFile)}>
        Delete Pic
      </button>
      {fileCreated && (
        <img
          className="upload-image"
          src={`${import.meta.env.VITE_IMAGES_URL}${fileCreated.file}`}
          alt={fileCreated.alt}
        />
      )}
    </form>
  );
}
