import { loginComments } from "../api.js";

export function renderLoginComponent({ appEl, setToken, renderComments }) {
    const appHtml = ` <div class="container">
    <div class="add-form">
      <h2 class="login-title">Форма входа</h2>
      <div class="login-input-box">
        <input
        type="text"
        class="add-form-login"
        id="login-input"
        placeholder="Введите логин"
      />
      <input
      type="password"
      class="add-form-password"
      id="password-input"
      placeholder="Введите пароль"
      />
      </div>
      <div class="login-form-row">
        <button class="add-form-button" id="log-button">Войти</button>
        <button class="reg-form-button" id="reg-button">Зарегистрироваться</button>
      </div>
    </div>
  </div> 
    `;

    appEl.innerHTML = appHtml;

    document.getElementById('log-button').addEventListener('click', () => {
      loginComments({
        login: "admin",
        password: "admin",
      }).then((user) => {
        setToken(`Bearer ${user.user.token}`);
        renderComments();
      })
    });
}