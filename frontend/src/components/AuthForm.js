import React from 'react';

function AuthForm(props) {
  const [values, setValues] = React.useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAuth({
      email: values[props.firstInputName],
      password: values[props.secondInputName],
    });
  }

  return (
    <div className="auth">
      <h2 className="auth__title">{props.title}</h2>

      <form
        className="auth__form"
        name={`form_${props.formName}`}
        onSubmit={handleSubmit}
        action="#"
      >
        <input
          className="auth__input"
          type="email"
          name={props.firstInputName}
          value={values[props.firstInputName] ?? ''}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          className="auth__input"
          type="password"
          name={props.secondInputName}
          value={values[props.secondInputName] ?? ''}
          onChange={handleChange}
          placeholder="Пароль"
          required
        />
        <button className="auth__submit-button" type="submit">
          {props.submitButtonName}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
