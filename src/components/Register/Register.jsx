import React, { useState } from "react";
import style from "./Register.module.css";
import image1 from "../../assets/Images/image1.png";
import userImg from "../../assets/Icons/user.jpg";
import emailImg from "../../assets/Icons/email.png";
import openEyeImg from "../../assets/Icons/eye.png";
import closedEyeImg from "../../assets/Icons/closedEye.png";
import passwordImg from "../../assets/Icons/password.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  const [visiblePass, setVisiblePass] = useState({
    password: { type: "password", sourceImg: closedEyeImg },
    confirmPassword: { type: "password", sourceImg: closedEyeImg },
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (!formData.name) {
      errors.name = "Name is required.";
    } else if (!/^[A-Za-z]/.test(formData.name)) {
      errors.name = "Name must be start with a letter.";
    }else{
      delete errors.name
    }

    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid.";
    }
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    } else if (!/(?=.*[0-9])/.test(formData.password)) {
      errors.password = "Password must contain at least one number.";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      errors.password = "Password must contain at least one uppercase letter.";
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      errors.confirmPassword = "Please enter correct password.";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validate();
    console.log(errors);
    
    if (Object.keys(errors).length === 0) {
      setErrors(errors);

      console.log("Form submitted successfully!", formData);
      toast.success(" User registered successfully!", {
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
    } else {
      console.log(formData);
      setErrors(errors);
      toast.error(" THere was a error!", {
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
          <h1>Welcome aboard my friend</h1>
          <p>just a couple of clicks and we start</p>
        </div>
      </div>
      <div className={`open-sans ${style.rightSide}`}>
        <h1 className={` ${style.m_auto} ${style.regheading}`}>Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <img src={userImg} alt="user png" />
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              value={formData.name}
              placeholder="Name"
            />
          </div>

          {errors.name && <p className={style.errorMsg}>{errors.name}</p>}
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

          <div>
            <img src={passwordImg} alt="confirm password png" />
            <input
              type={visiblePass.confirmPassword.type}
              placeholder="Confirm Password"
              onChange={handleInputChange}
              name="confirmPassword"
              value={formData.confirmPassword}
            />
            <img
              className="cp"
              src={visiblePass.confirmPassword.sourceImg}
              alt="toggle eye svg"
              onClick={() => handleTogglePassword("confirmPassword")}
            />
          </div>

          {errors.confirmPassword && (
            <p className={style.errorMsg}>{errors.confirmPassword}</p>
          )}
          <button
            // disabled={true}
            className={`primary-btn opacity06 mrtop2andHalfrem cp ${style.btnCss} ${style.regbtn}`}
            type="submit"
          >
            Register
          </button>
        </form>
        <div className={style.m_auto}>
          <p className={style.text}> Have an Account ?</p>
          <button
            className={`primary-btn  cp  ${style.btnCssLogin}`}
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
