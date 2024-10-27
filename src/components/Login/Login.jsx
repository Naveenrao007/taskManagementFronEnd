import React, { useState } from "react";
import style from "./Login.module.css";
import image1 from "../../assets/Images/image1.png";
import userImg from "../../assets/Icons/user.jpg";
import emailImg from "../../assets/Icons/email.png";
import openEyeImg from "../../assets/Icons/eye.png";
import closedEyeImg from "../../assets/Icons/closedEye.png";
import passwordImg from "../../assets/Icons/password.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { login } from "../../Service/Auth";
function Login() {
  const navigate = useNavigate();
  const [visiblePass, setVisiblePass] = useState({
    password: { type: "password", sourceImg: closedEyeImg },
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleTogglePassword = (fieldName) => {
    setVisiblePass((prevState) => ({
      ...prevState,
      [fieldName]: {
        type: prevState[fieldName].type === "password" ? "text" : "password",
        sourceImg:
          prevState[fieldName].sourceImg === closedEyeImg
            ? openEyeImg
            : closedEyeImg,
      },
    }));
  };
  const handleInputChange = (event) => {
    console.log(event.target);

    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const validate = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid.";
    }
    if (!formData.password) {
      errors.password = "Password is required.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();

    if (Object.keys(errors).length === 0) {
      setErrors({});

      const response = await login(formData);
      console.log(response);
      
      if (response.status === 400) {
        toast.error(response.error.message, {
          position: "top-right",
          autoClose: 1400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        // setTimeout(() => {
        //   window.location.href = "/login";
        // }, 1900);
      } else if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => {
          localStorage.setItem("token", response.data.token);
          navigate("/dashboard/board");
        }, 600);
      } else if (response.status === 500) {
        toast.error("Internal server error", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else if (response.status === 404) {
        toast.error("Url is incorrect", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className={style.container}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <div className={`open-sans ${style.leftSide}`}>
        <div>
          <img src={image1} alt="here is a image" />
        </div>
        <div>
          <h1 className="heading">Welcome aboard my friend</h1>
          <p className="paragraph">just a couple of clicks and we start</p>
        </div>
      </div>
      <div className={`open-sans ${style.rightSide}`}>
        <h1 className={` ${style.m_auto} ${style.regheading}`}>Login</h1>
        <form className={`${style.Loginform}`} onSubmit={handleSubmit}>
          <div>
            <img src={emailImg} alt="email png" />
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              placeholder="Email"
            />
          </div>

          {errors.email && <p className={style.errorMsg}>{errors.email}</p>}
          <div>
            <img src={passwordImg} alt="password png" />
            <input
              type={visiblePass.password.type}
              name="password"
              onChange={handleInputChange}
              value={formData.password}
              placeholder="Password"
            />
            <img
              className="cp"
              src={visiblePass.password.sourceImg}
              alt=" toggle eye png"
              onClick={() => handleTogglePassword("password")}
            />
          </div>

          {errors.password && (
            <p className={style.errorMsg}>{errors.password}</p>
          )}

          <button
            className={`primary-btn  mrtop2andHalfrem cp ${style.btnCss} ${style.regbtn}`}
            type="submit"
          >
            Login
          </button>
        </form>
        <div className={style.m_auto}>
          <p className={style.text}> don't have an Account ?</p>
          <button
            className={`primary-btn  cp  ${style.btnCssLogin}`}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
