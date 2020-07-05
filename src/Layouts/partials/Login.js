import React from "react";

const Login = ({ toggleFormFields }) => {
  return (
    <div className='register-container'>
      <section class='form-info-section'>
        <h3>
          Create an account today and have base access to members only features.
        </h3>
        <p>Register now and join 12,000 others.</p>
        <button onClick={toggleFormFields}>Register</button>
      </section>
      <form>
        <label htmlFor='login-email'>
          <input type='text' id='login-email' required />
          <span>username</span>
        </label>

        <label htmlFor='login-password'>
          <input type='password' id='login-password' required />
          <span>password</span>
        </label>

        <a href=''>forgot password?</a>

        <button type='submit'>login</button>
      </form>
    </div>
  );
};

export default Login;
