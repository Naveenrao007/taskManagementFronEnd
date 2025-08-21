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
import { register } from "../../Service/Auth";
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

    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const validate = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Name is required.";
    } else if (!/^[A-Za-z]/.test(formData.name)) {
      errors.name = "Name must be start with a letter.";
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
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Please enter correct password.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();

    if (Object.keys(errors).length === 0) {
      setErrors({});

      const response = await register(formData);
      if (response.status === 400) {
        toast.error(response.error.message, {
          autoClose: 1400,
        
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 1900);
      } else if (response.status === 201) {
        toast.success(response.data.message, {
          autoClose: 2000,
          
        });
        setTimeout(() => {
          navigate("/login");
        }, 2100);
      } else if (response.status === 500) {
        toast.error("Internal server error", {
          
          autoClose: 5000,
        
        });
      } else if (response.status === 404) {
        toast.error("Url is incorrect", {
          autoClose: 5000,
          
        });
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className={style.container}>
      
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
        <div className={style.heroBand}>
          <h2 className={style.heroTitle}>Pro Manage</h2>
          <p className={style.heroSubtitle}>
            Create boards, add teammates and deliver work faster.
          </p>
        </div>
        <h1 className={` ${style.m_auto} ${style.regheading}`}>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className={style.regDiv}>
            <img src={userImg} alt="user png" />
            <input className={`${style.inputField}`}
              type="text"
              name="name"
              onChange={handleInputChange}
              value={formData.name}
              placeholder="Name"
            />
          </div>

          {errors.name && <p className={style.errorMsg}>{errors.name}</p>}
          <div className={style.regDiv}>
            <img src={emailImg} alt="email png" />
            <input className={`${style.inputField}`}
              type="email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              placeholder="Email"
            />
          </div>

          {errors.email && <p className={style.errorMsg}>{errors.email}</p>}
          <div className={style.regDiv}>
            <img src={passwordImg} alt="password png" />
            <input className={`${style.inputField}`}
              type={visiblePass.password.type}
              name="password"
              autoComplete={false}
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

          <div className={style.regDiv}>
            <img src={passwordImg} alt="confirm password png" />
            <input className={`${style.inputField}`}
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
            className={`primary-btn  mrtop2andHalfrem cp ${style.btnCss} ${style.regbtn}`}
            type="submit"
          >
            Register
          </button>
        </form>
        <div className={`${style.m_auto} ${style.actionsCard}`}>
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
