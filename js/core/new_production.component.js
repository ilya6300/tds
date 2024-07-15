import apiData from "../../service/api.data.js";
import { closedNewCard } from "../app.js";
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

const createBackBtn = async () => {
  const btnBack = await btnV1();
  btnBack.textContent = "Назад";
  cardContainer.append(btnBack);
  btnBack.onclick = async () => {
    await closedNewCard();
  };
  container.innerHTML = "";
  await createBody();
  production.name = "";
  production.description = "";
  production.ean = "";
};

const container = document.createElement("ul");

const postProduction = async () => {
  const postBtn = await btnV1();
  postBtn.textContent = "Сохранить";
  postBtn.classList.add("btn_save_card");
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
        console.log(tds, tds.length);
        await closedNewCard();
        // setTimeout(async () => {
        //   await listProduction(await state_manager.getProductionFunc());
        // }, 200);
        container.innerHTML = "";
        await createBody();
        production.name = "";
        production.description = "";
        production.ean = "";
      } else {
        try {
          await apiData.postProduction(production);
        } catch (e) {
          return console.log(e);
        } finally {
          tds.forEach((t) => {
            if (t.file === "") {
              return alert("Не выбран файл. ТДС не сохранена");
            }
            if (t.language === "") {
              return alert("Не выбран язык. ТДС не сохранена");
            }
            apiData.postTDS(t);
          });
        }
        // postBtn.classList.add("hidden");
      }
      setTimeout(async () => {
        await listProduction(await state_manager.getProductionFunc());
      }, 200);
    } catch (e) {
      console.log(e);
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
  const descriptionText = document.createElement("li");
  const descriptionInpt = document.createElement("li");
  container.append(nameText);
  container.append(nameInpt);
  container.append(barcodeText);
  container.append(barcodeInpt);
  container.append(descriptionText);
  container.append(descriptionInpt);

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
  barcode.onchange = async (e) => {
    production.ean = e.target.value;
  };
  descriptionText.textContent = "Введите описание продукции";
  descriptionText.classList.add("card_item");
  const textarea = document.createElement("textarea");
  textarea.classList.add("card_item_input", "card_item_input-textarea");
  descriptionInpt.append(textarea);
  descriptionInpt.onchange = async (e) => {
    production.description = e.target.value;
    console.log(production);
  };
  console.log(typeof (await tdsComponent()));

  return container;
};

//   const createinptFile = async () => {
//     const file = document.createElement("input");
//     file.classList.add("file_input_btn");
//     file.type = "file";
//     file.onchange = async (e) => {
//       console.log(e);
//       await sendFile(e.target.files[0]);
//     };
//     return file;
//   };

//   const sendFile = async (file) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       console.log(file);
//       console.log(reader.result);
//       production.file = reader.result.replace(
//         /data:application\/pdf;base64,/g,
//         ""
//       );
//     };
//     return reader.readAsDataURL(file);
//   };
export const newProductionComponent = async () => {
  await createBackBtn();
  const cardNew = await createCard();
  const titleH4 = document.createElement("h4");
  titleH4.textContent = "Создание новой карточки продукции";
  titleH4.classList.add("title_new_card");
  cardNew.append(titleH4);
  cardNew.append(await createBody());
  cardNew.append(addContainer);
  console.log(addContainer);
  cardNew.append(await postProduction());

  return cardContainer;
};
