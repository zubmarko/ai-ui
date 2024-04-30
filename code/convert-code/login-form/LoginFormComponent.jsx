import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!this.state.email) {
      isValid = false;
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(this.state.email)) {
      isValid = false;
      errors.email = "Email is invalid";
    }

    if (!this.state.password) {
      isValid = false;
      errors.password = "Password is required";
    }

    this.setState({ errors });
    return isValid;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      console.log('Submitting', { email: this.state.email, password: this.state.password });
      // Add here your submission logic, e.g., calling an API
    }
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    const { email, password, errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={this.handleEmailChange}
          />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={this.handlePasswordChange}
          />
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        </div>
        <button type="submit">Login</button>
      </form>
    );
  }
}

export default LoginForm;
