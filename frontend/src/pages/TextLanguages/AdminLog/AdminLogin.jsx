/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../services/axios";
import "./admin.scss";

export default function AdminLogin({ setAdm }) {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [info, setInfo] = useState(false);

  const [admData, setAdmData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setAdmData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  // eslint-disable-next-line consistent-return
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!admData.email || !admData.password) {
      setInfo(true);
    }

    try {
      const { data } = await axios.post("admins/login", admData, {
        withCredentials: true,
      });
      // console.log(data);
      setAdmData({ email: "", password: "" });
      setAdm({ email: data.email });
      navigate("/admin/home");
      // dispatch({ type: "LOGIN", payload: data });
    } catch (err) {
      // eslint-disable-next-line
      return alert(err.message);
    }
  };

  // const handlePasswordForgotten = async () => {
  //   if (admData.email) {
  //     try {
  //       const { data } = await axios.post(
  //         "admins/password-forgotten",
  //         {
  //           email: admData.email,
  //         },
  //         { withCredentials: true }
  //       );
  //       // eslint-disable-next-line

  //       const timer = setTimeout(() => {
  //         return navigate("/reset");
  //       }, 9000);
  //     } catch (err) {
  //       // eslint-disable-next-line
  //       return alert(err.message);
  //     }
  //   }
  // };

  return (
    <section className="background">
      <div className="container">
        <div className="introduction">
          <h1>Admin</h1>
          <p>Rentrez vos identifiants afin de vous connecter</p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email:{" "}
            <input
              id="email"
              placeholder="monemail@gmail.com"
              type="email"
              value={admData.email}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="password">
            Mot de passe *{" "}
            {/* <p className="lostpassword" onClick={handlePasswordForgotten}>
              Mot de passe oublié ?
            </p> */}
            <input
              id="password"
              placeholder="Tapez ici votre mot de passe"
              type={passwordShown ? "text" : "password"}
              value={admData.password}
              onChange={handleInputChange}
            />
          </label>
          <button className="login-btn" type="submit">
            SE CONNECTER
          </button>
        </form>
      </div>
    </section>
  );
}
