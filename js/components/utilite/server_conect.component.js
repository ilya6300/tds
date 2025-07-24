export const serverConnect = async () => {
  const connectContainer = document.createElement("ul");
  connectContainer.classList.add("server_connect_container", "hidden");
  const connectTitle = document.createElement("li");
  connectTitle.classList.add("server_connect_title");
  connectTitle.textContent = "Обмен с сервером";
  const connectBody = document.createElement("li");
  connectBody.classList.add("server_connect_body");

  setInterval(() => {
    connectBody.textContent = "Идёт обмен с сервером, пожалуйста, подождите";
    setTimeout(() => {
      connectBody.textContent = "Идёт обмен с сервером, пожалуйста, подождите.";
      setTimeout(() => {
        connectBody.textContent =
          "Идёт обмен с сервером, пожалуйста, подождите..";
        setTimeout(() => {
          connectBody.textContent =
            "Идёт обмен с сервером, пожалуйста, подождите...";
        }, 500);
      }, 500);
    }, 500);
  }, 2000);
  connectContainer.append(connectTitle, connectBody);
  return connectContainer;
};
