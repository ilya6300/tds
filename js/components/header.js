import { handlerClsBody } from "../app.js";

const logo = async () => {
  const textLogo = document.createElement("img");
  textLogo.classList.add("text_logo");
  textLogo.src = "img/logo_header.png";
  return textLogo;
};

const settings = async () => {
  const iconSetting = document.createElement("img");
  iconSetting.setAttribute("src", "img/icons/icon-settings.png");
  iconSetting.classList.add("logo_icon");
  iconSetting.onclick = async () => {
    handlerClsBody(iconSetting);
  };
  return iconSetting;
};

export const headerComponent = async () => {
  const header = document.createElement("div");
  header.classList.add("header");
  header.append(await logo());
  if (window.location.pathname !== "/login.html") {
    header.append(await settings());
  }

  return header;
};
