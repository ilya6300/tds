import apiAuth from "../../../service/api.auth.js";
import { logoPage } from "../../components/logo_page.js";

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
    if ("username" === variable) {
      return (auth[`${variable}`] = e.target.value);
    }
    if ("password" === variable) {
      return (auth[`${variable}`] = e.target.value);
    }
  };
  return input;
};

const btnAuth = async () => {
  const btn = document.createElement("button");
  btn.textContent = "Войти";
  btn.classList.add("btn_login");
  btn.type = "submit";
  btn.onclick = () => {
    apiAuth.authorize(auth);
  };
  return btn;
};

const loginModal = async () => {
  const modal = document.createElement("form");

  modal.type = "submit";
  modal.onsubmit = async (e) => {
    e.preventDefault();
  };
  modal.classList.add("login_container");
  const nameContainer = document.createElement("div");
  const passContainer = document.createElement("div");
  nameContainer.classList.add("container_rel");
  passContainer.classList.add("container_rel");
  nameContainer.append(
    await bodyLogin("Введите пользователя:", "login_text"),
    await inputLogin("Имя пользователя", "text", "username")
  );
  passContainer.append(
    await bodyLogin("Введите пароль:", "login_text"),
    await inputLogin("Введите пароль", "password", "password")
  );
  modal.append(
    await bodyLogin("Авторизуйтесь", "login_title"),
    nameContainer,
    passContainer,
    await btnAuth()
  );
  return modal;
};

export const loginComponent = async () => {
  const loginContainer = document.createElement("div");
  const background = document.createElement("div");
  background.classList.add("background");
  loginContainer.classList.add("login_page");
  const logo = await logoPage();
  logo.style.margin = "0 0 75px 0";
  loginContainer.append(logo, await loginModal());
  background.append(loginContainer);
  return background;
};
