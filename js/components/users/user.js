import { btnV1 } from "../../ui/btn_v1.js";

export const rowUser = async () => {
  if (JSON.parse(localStorage.getItem("User")) === null) return;
  const userContainer = document.createElement("li");
  const user = document.createElement("span");
  user.innerHTML = `Пользователь: ${
    JSON.parse(localStorage.getItem("User"))["user"]
  }`;
  const logOutContainer = document.createElement("div");
  logOutContainer.classList.add("log_out_container");
  const logOutInfo = document.createElement("p");
  logOutInfo.classList.add("log_out_text");
  logOutInfo.textContent = "Выйти из учётной записи";
  const exitBtn = await btnV1();
  exitBtn.style.margin = 0;
  exitBtn.textContent = "Выйти из учётной записи";
  exitBtn.onclick = () => {
    localStorage.removeItem("User");
    window.location.href = "login.html";
  };
  userContainer.classList.add("setting_user");
  logOutContainer.append(logOutInfo, exitBtn);
  userContainer.append(user, logOutContainer);
  return userContainer;
};
