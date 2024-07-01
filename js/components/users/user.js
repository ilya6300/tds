export const rowUser = async () => {
  const user = document.createElement("li");
  user.innerHTML = `Пользователь: ${
    JSON.parse(localStorage.getItem("User"))["user"]
  }`;
  return user;
};
