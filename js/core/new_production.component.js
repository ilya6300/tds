import apiData from "../../service/api.data.js";
import { closedNewCard } from "../app.js";
import { logoPage } from "../components/logo_page.js";
import state_manager from "../state_manager.js";
import { btnV1 } from "../ui/btn_v1.js";
import { listProduction } from "./list.production.js";
import { tds, tdsComponent } from "./tds.component.js";

const production = {
  name: "",
  description: "",
  ean: "",
};
const addContainer = await tdsComponent();
const cardContainer = document.createElement("div");
cardContainer.classList.add("card_container", "hidden");

const createCard = async () => {
  const card = document.createElement("div");
  card.classList.add("my_card");
  cardContainer.append(card);
  return card;
};

// const createBackBtn = async () => {
//   const btnBack = await btnV1();
//   const imgArrow = document.createElement("img");
//   imgArrow.src = "../../img/icons/Arrow1.png";
//   btnBack.append(imgArrow);
//   btnBack.innerHTML += "  Назад";

//   cardContainer.append(btnBack);
//   btnBack.onclick = async () => {
//     await closedNewCard();
//   };
//   container.innerHTML = "";
//   await createBody();
//   production.name = "";
//   production.description = "";
//   production.ean = "";
// };

const container = document.createElement("ul");

const postProduction = async () => {
  const postBtn = await btnV1();
  postBtn.textContent = "Сохранить";
  postBtn.classList.add("btn_save_card");
  postBtn.style.marginBottom = "18vh";
  postBtn.onclick = async () => {
    if (production.name.length < 3) {
      return alert("Название не должно быть менее 3 символов");
    }
    if (production.ean.length < 13) {
      return alert("ШК EAN13 должен состоять из 13 символов");
    }
    try {
      if (tds.length === 0) {
        await apiData.postProduction(production);
        await closedNewCard();
        container.innerHTML = "";
        await createBody();
        production.name = "";
        production.description = "";
        production.ean = "";
      } else {
        const validFormTDS = () => {
          let result = true;
          tds.forEach(async (t) => {
            if (t.file === null && result) {
              result = false;
              return alert("Не выбран файл. ТДС не сохранена");
            }
            if (t.language === "" && result) {
              result = false;
              return alert("Не выбран язык. ТДС не сохранена");
            }
          });
          return result;
        };
        try {
          await apiData.postProduction(production);
        } catch (e) {
          return console.error(e);
        } finally {
          const tdsFormResult = validFormTDS();
          if (tdsFormResult) {
            tds.forEach(async (t) => {
              await apiData.postTDS(t);
            });
          }
        }
        // postBtn.classList.add("hidden");
      }
      setTimeout(async () => {
        // await state_manager.getProductionFunc();
        // await closedNewCard();
        location.reload();
      }, 300);
    } catch (e) {
      console.error(e);
    }
  };
  return postBtn;
};

const createBody = async () => {
  container.innerHTML = "";
  const nameText = document.createElement("li");
  const nameInpt = document.createElement("li");
  const barcodeText = document.createElement("li");
  const barcodeInpt = document.createElement("li");
  const nameContainer = document.createElement("div");
  const barcodeContainer = document.createElement("div");
  nameContainer.classList.add("input_new_container");
  barcodeContainer.classList.add("input_new_container");
  // const descriptionText = document.createElement("li");
  // const descriptionInpt = document.createElement("li");
  container.append(nameContainer);
  nameContainer.append(nameText, nameInpt);
  container.append(barcodeContainer);
  barcodeContainer.append(barcodeText, barcodeInpt);
  // container.append(descriptionText);
  // container.append(descriptionInpt);

  nameText.textContent = "Введите имя новой продукции";
  nameText.classList.add("card_item");
  const inpt = document.createElement("input");
  inpt.classList.add("card_item_input");
  nameInpt.append(inpt);
  nameInpt.onchange = async (e) => {
    production.name = e.target.value;
  };
  barcodeText.textContent = "Введите ШК продукции";
  barcodeText.classList.add("card_item");
  const barcode = document.createElement("input");
  barcode.classList.add("card_item_input", "card_item_input-barcode");
  barcodeInpt.append(barcode);
  barcode.setAttribute("type", "number");
  barcode.addEventListener("keydown", function (e) {
    if (e.key === "-" || e.key === "+" || e.key === "." || e.key === ",") {
      e.preventDefault();
    }
  });
  barcode.onchange = async (e) => {
    barcode.addEventListener("keydown", function (e) {});

    production.ean = e.target.value;
  };
  return container;
};

export const newProductionComponent = async () => {
  const btnBack = await btnV1();
  const imgArrow = document.createElement("img");
  imgArrow.src = "img/icons/Arrow1.png";
  btnBack.append(imgArrow);
  btnBack.innerHTML += "  Назад";
  btnBack.onclick = async () => {
    await closedNewCard();
  };
  const titleHeader = document.createElement("div");
  titleHeader.classList.add("titleHeader");
  container.innerHTML = "";
  await createBody();
  production.name = "";
  production.description = "";
  production.ean = "";
  const cardNew = await createCard();
  const titleH4 = document.createElement("h4");
  titleHeader.append(btnBack, titleH4);
  titleH4.textContent = "Создание новой карточки";
  titleH4.classList.add("title_new_card");
  cardNew.append(await logoPage(), titleHeader);
  cardNew.append(await createBody());
  cardNew.append(addContainer);
  cardNew.append(await postProduction());

  return cardContainer;
};
