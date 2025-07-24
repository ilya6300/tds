import { btnV1 } from "../ui/btn_v1.js";

export const confurmation = async (this_body, confurmationBtn) => {
  const backgroundComponent = document.createElement("div");
  backgroundComponent.id = "my_modal";
  backgroundComponent.classList.add("background_modal");
  const modalComponent = document.createElement("ul");
  const title = document.createElement("li");
  title.textContent = "Подтвердите действие";
  const _body = document.createElement("li");
  _body.textContent = this_body;
  modalComponent.classList.add("my_modal");
  const btn_container = document.createElement("li");

  const closedBtn = await btnV1();
  closedBtn.textContent = "Отмена";
  closedBtn.onclick = async () => {
    const modal = document.querySelector("#my_modal");
    modal.remove();
  };

  btn_container.append(confurmationBtn, closedBtn);
  modalComponent.append(title, _body, btn_container);
  backgroundComponent.append(modalComponent);
  return backgroundComponent;
};
