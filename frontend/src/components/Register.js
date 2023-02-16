import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register(props) {
  return (
    <>
      <AuthForm
        firstInputName="popup-register-email"
        secondInputName="popup-register-password"
        title="Регистрация"
        submitButtonName="Зарегистрироваться"
        formName="register"
        onAuth={props.onAuth}
      />
      <Link to="/sign-in" className="auth__link">
        Уже зарегистрированы? Войти
      </Link>
    </>
  );
}

export default Register;
