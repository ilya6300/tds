export const rowUser = async () => {
  if (JSON.parse(localStorage.getItem("User")) === null) return;
  const user = document.createElement("li");
  user.innerHTML = `Пользователь: ${
    JSON.parse(localStorage.getItem("User"))["user"]
  }`;
  user.classList.add('setting_user')
  return user;
};
