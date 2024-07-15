import apiData from "../../service/api.data.js";
import { selectedLanguage } from "../components/language/language.component.js";
import { createinptFile } from "../components/productions/pdf_input.component.js";
import state_manager from "../state_manager.js";
import { addBtn } from "../ui/btn_add.js";

export let tds = [];
export const tdsContainer = document.createElement("div");

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
  viewPdf.src = "../../img/icons/viewpdf.png";
  viewPdf.classList.add("img_pdf_btn_viewer");
  viewPdf.id = "pdfScale" + id;
  viewPdf.onclick = async () => {
    const showPdf = dom.querySelector(".viewer_modal_container");
    console.log(showPdf);
    showPdf.classList.remove("hidden");
  };
  console.log(dom);
  dom.append(viewPdf);
};

export const removeBtnPdf = async (id, dom) => {
  if (document.querySelector(`#pdfScale${id}`) !== null) return;
  const removeIcon = document.createElement("div");
  removeIcon.classList.add("img_pdf_btn_remove");
  removeIcon.onclick = async () => {
    console.log(tds);
    dom.style.display = "none";
    return (tds = tds.filter((t) => t.id !== id));
  };
  return removeIcon;
};

const postTDSFunc = async (id) => {
  console.log(state_manager.card_id);
  const tdsID = tds.find((t) => t.id === id);
  if (tdsID) {
    if (state_manager.card_id === null)
      return alert("Сперва сохраните новую продукцию");
    if (tdsID.language === "") return alert("Не выбран язык ТДС");
    if (tdsID.file === "") return alert("Не выбран файл ТДС-pdf");
    // console.log(tdsID);
    apiData.postTDS(tdsID);
  }
};

const sendTDSFunc = async (id) => {
  const sendBtn = document.createElement("img");
  sendBtn.src = "./../../img/icons/send.png";
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
  console.log(id_file);
  tds.push({ language: "", file: "", id: id_file, name: "" });
  const itemTDSContainer = document.createElement("div");
  const containerBtn = document.createElement("div");

  containerBtn.classList.add("item_tds_btn_container");
  itemTDSContainer.classList.add("item_tds_new_container");
  itemTDSContainer.append(await selectedLanguage(id_file));

  itemTDSContainer.append(await createinptFile(id_file, containerBtn));
  containerBtn.append(await removeBtnPdf(id_file, itemTDSContainer));
  containerBtn.append(await sendTDSFunc(id_file));
  itemTDSContainer.append(containerBtn);
  tdsContainer.append(itemTDSContainer);
};

export const tdsComponent = async () => {
  tdsContainer.innerHTML = "";
  console.log("tdsComponent");
  tdsContainer.append(await createBtnAddTDS());
  return tdsContainer;
};
