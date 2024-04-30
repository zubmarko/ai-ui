import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('login-form')
class LoginForm extends LitElement {
  static styles = css`
    .error { color: red; }
  `;

  @state()
  email = '';

  @state()
  password = '';

  @state()
  errors = {};

  validateForm() {
    let isValid = true;
    let errors = {};

    if (!this.email) {
      isValid = false;
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(this.email)) {
      isValid = false;
      errors.email = "Email is invalid";
    }

    if (!this.password) {
      isValid = false;
      errors.password = "Password is required";
    }

    this.errors = errors;
    return isValid;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validateForm()) {
      console.log('Submitting', { email: this.email, password: this.password });
      // Add here your submission logic, e.g., calling an API
    }
  }

  render() {
    return html`
      <form @submit="${this.handleSubmit}">
        <div>
          <label>Email:</label>
          <input type="email" .value="${this.email}" @input="${e => this.email = e.target.value}">
          ${this.errors.email ? html`<div class="error">${this.errors.email}</div>` : ''}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" .value="${this.password}" @input="${e => this.password = e.target.value}">
          ${this.errors.password ? html`<div class="error">${this.errors.password}</div>` : ''}
        </div>
        <button type="submit">Login</button>
      </form>
    `;
  }
}
