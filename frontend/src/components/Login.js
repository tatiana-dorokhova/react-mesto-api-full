import React from 'react';
import AuthForm from './AuthForm';

function Login(props) {
  return (
    <AuthForm
      firstInputName="popup-login-email"
      secondInputName="popup-login-password"
      title="Вход"
      submitButtonName="Войти"
      formName="login"
      onAuth={props.onAuth}
    />
  );
}

export default Login;
