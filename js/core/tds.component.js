import apiData from "../../service/api.data.js";
import { selectedLanguage } from "../components/language/language.component.js";
import { createinptFile } from "../components/productions/pdf_input.component.js";
import state_manager from "../state_manager.js";
import { addBtn } from "../ui/btn_add.js";
import { cardComponent, createTdsCollection } from "./card.component.js";

export let tds = [];

export const tdsContainer = document.createElement("div");

const styleTdsContainer = async () => {
  tdsContainer.classList.add("add-tds-container");
};

const createBtnAddTDS = async () => {
  const btn = await addBtn();
  btn.onclick = async () => {
    addTDSBlock();
  };
  return btn;
};

export const createImgIconSearchPdf = async (id, dom) => {
  if (document.querySelector(`#pdfScale${id}`) !== null) return;
  const viewPdf = document.createElement("img");
  viewPdf.src = "img/icons/viewpdf.png";
  viewPdf.classList.add("img_pdf_btn_viewer");
  viewPdf.id = "pdfScale" + id;
  viewPdf.onclick = async () => {
    const showPdf = dom.querySelector(".viewer_modal_container");
    showPdf.classList.remove("hidden");
  };
  dom.append(viewPdf);
};

export const removeBtnPdf = async (id, dom) => {
  if (document.querySelector(`#pdfScale${id}`) !== null) return;
  const removeIcon = document.createElement("div");
  removeIcon.classList.add("img_pdf_btn_remove");
  removeIcon.onclick = async () => {
    dom.style.display = "none";
    return (tds = tds.filter((t) => t.id !== id));
  };
  return removeIcon;
};

const postTDSFunc = async (id) => {
  const tdsID = tds.find((t) => t.id == id);
  if (tdsID) {
    if (state_manager.card_id === null)
      return alert("Сперва сохраните новую продукцию");
    if (tdsID.language === "") return alert("Не выбран язык ТДС");
    if (tdsID.file === null) return alert("Не выбран файл ТДС-pdf");
    apiData.postTDS(tdsID);
    await tdsComponent();
    setTimeout(async () => {
      await createTdsCollection();
    }, 3000);
  }
};

const sendTDSFunc = async (id) => {
  const sendBtn = document.createElement("img");
  sendBtn.src = "img/icons/send.png";
  sendBtn.classList.add("send_btn");
  sendBtn.onclick = async () => {
    postTDSFunc(id);
  };
  return sendBtn;
};



const addTDSBlock = async () => {
  let id_file;
  if (tds.length === 0) {
    id_file = 1;
  } else {
    id_file = tds.length + 1;
  }

  tds.push({ language: "", file: null, fileB64: "", id: id_file, name: "" });
  const itemTDSContainer = document.createElement("form");

  itemTDSContainer.type = "submit";
  itemTDSContainer.onsubmit = async (e) => {
    e.preventDefault();
  };
  const containerBtn = document.createElement("div");

  containerBtn.classList.add("item_tds_btn_container");
  itemTDSContainer.classList.add("item_tds_new_container");
  itemTDSContainer.append(await selectedLanguage(id_file));

  const sendBtn = document.createElement("button");
  sendBtn.classList.add("send_btn");
  sendBtn.type = "submit";

  itemTDSContainer.append(await createinptFile(id_file, containerBtn));
  containerBtn.append(await removeBtnPdf(id_file, itemTDSContainer));
  containerBtn.append(await sendTDSFunc(id_file));

  itemTDSContainer.append(containerBtn);
  tdsContainer.append(itemTDSContainer);
};

export const tdsComponent = async () => {
  tdsContainer.innerHTML = "";
  styleTdsContainer();
  const headerTdsContainer = document.createElement("div");
  headerTdsContainer.classList.add("tds_container_header");
  // const spanTds = document.createElement("span");
  // spanTds.textContent = "Добавить новую ТДС";
  headerTdsContainer.append(
    // spanTds,
    await createBtnAddTDS()
  );
  tdsContainer.append(headerTdsContainer);
  return tdsContainer;
};
