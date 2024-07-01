import apiAuth from "../../../service/api.auth.js";

const auth = { username: "", password: "" };

const bodyLogin = async (text, cls) => {
  const rowLogin = document.createElement("p");
  rowLogin.classList.add(cls);
  rowLogin.textContent = text;
  return rowLogin;
};
const inputLogin = async (plc, type, variable) => {
  const input = document.createElement("input");
  input.placeholder = plc;
  input.type = type;
  input.classList.add("login_input");
  input.value = "";
  input.onchange = (e) => {
    console.log(auth[`${variable}`]);
    if ("username" === variable) {
      console.log("username");
      return (auth[`${variable}`] = e.target.value);
    }
    if ("password" === variable) {
      console.log("password");
      return (auth[`${variable}`] = e.target.value);
    }
  };
  return input;
};

const btnAuth = async () => {
  const btn = document.createElement("button");
  btn.textContent = "Войти";
  btn.classList.add("btn_login");
  btn.onclick = () => {
    console.log(auth);
    apiAuth.authorize(auth);
  };
  return btn;
};

const loginModal = async () => {
  const modal = document.createElement("div");
  modal.classList.add("login_container");
  modal.append(await bodyLogin("Авторизуйтесь", "login_title"));
  modal.append(await bodyLogin("Введите пользователя:", "login_text"));
  modal.append(await inputLogin("Имя пользователя", "text", "username"));
  modal.append(await bodyLogin("Введите пароль:", "login_text"));
  modal.append(await inputLogin("Введите пароль", "password", "password"));
  modal.append(await btnAuth());
  return modal;
};

export const loginComponent = async () => {
  const loginContainer = document.createElement("div");
  loginContainer.classList.add("login_page");
  loginContainer.append(await loginModal());
  return loginContainer;
};
