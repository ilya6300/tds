import { btnV1 } from "../ui/btn_v1.js";

export const cardComponent = async (item) => {
  const createBackBtn = async () => {
    const btnBack = await btnV1();
    btnBack.textContent = "Назад";
    cardContainer.append(btnBack);
    btnBack.onclick = () => {
      cardContainer.classList.remove("card_container");
      cardContainer.innerHTML = "";
    };
  };

  const createCard = async () => {
    const card = document.createElement("div");
    card.classList.add("my_card");
    cardContainer.append(card);
    return card;
  };

  const createTitleCard = async () => {
    const titleContainer = document.createElement("div");
    titleContainer.classList.add("card_title_container");
    const title = document.createElement("h3");
    title.innerText = item.name;
    titleContainer.append(title);
    const barcodeTitle = document.createElement("ul");
    const barcodeText = document.createElement("li");
    barcodeText.textContent = "штрихкод:";
    barcodeText.classList.add("card_barcode_text");
    barcodeTitle.append(barcodeText);
    const barcode = document.createElement("li");
    barcode.textContent = item.ean;
    barcode.classList.add("card_barcode");
    barcodeTitle.append(barcode);
    titleContainer.append(barcodeTitle);
    card.append(titleContainer);
  };

  const createBodyCard = async () => {
    const body = document.createElement("p");
    body.innerText = item.description;
    card.append(body);
  };

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card_container");
  await createBackBtn();
  const card = await createCard();
  await createTitleCard();
  await createBodyCard();

  return cardContainer;
};
