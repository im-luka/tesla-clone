import React, { useContext, useEffect, useRef } from "react";
import { MenuContext } from "../../contexts/menu-context";
import "./auth-form.scss";

const AuthForm = () => {
  const { isMenuShown } = useContext(MenuContext);
  const divRef = useRef();

  useEffect(() => {
    if (isMenuShown) {
      divRef.current.classList.add("darken");
    } else {
      divRef.current.classList.remove("darken");
    }
  }, [isMenuShown]);

  return (
    <div className="auth" ref={divRef}>
      <div className="auth__container">
        <div className="auth__container__title">
          <h1>Sign In</h1>
        </div>

        <div className="auth__container__inputs">
          <label htmlFor="email">Email Address</label>
          <input id="email" type="email" />

          <label htmlFor="pass">Password</label>
          <input id="pass" type="password" />
        </div>

        <div className="auth__container__btn">
          <button className="btn-sign">SIGN IN</button>
        </div>

        <div className="auth__container__questions">
          <span>Forgot email?</span> | <span>Forgot password?</span>
        </div>

        <div className="auth__container__span">
          <p>OR</p>
        </div>

        <div className="auth__container__btn">
          <button className="btn-secondary">CREATE ACCOUNT</button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
