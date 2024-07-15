import apiData from "../../service/api.data.js";
import { pdfViewer } from "../components/utilite/pdf_viewer.component.js";
import { btnV1 } from "../ui/btn_v1.js";
import { tdsComponent } from "./tds.component.js";

export const cardComponent = async (item) => {
  const barId = document.querySelector("#bar-search");
  barId.style.display = "none";
  const createBackBtn = async () => {
    const btnBack = await btnV1();
    btnBack.textContent = "Назад";
    cardContainer.append(btnBack);
    btnBack.onclick = async () => {
      barId.style.display = "flex";
      const list = document.querySelector("#list");
      list.classList.remove("hidden");
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
    body.classList.add("body_card");
    card.append(body);
  };

  const createTdsCollection = async () => {
    const myTds = document.createElement("ul");
    myTds.classList.add("card_tds_list");
    const tdss = await apiData.getProductionTds();
    tdss.map(async (tds) => {
      const itemTds = document.createElement("li");
      itemTds.classList.add("container_card_tds");
      const textContainer = document.createElement("div");
      textContainer.classList.add("container_card_tds_text");
      const spanName = document.createElement("span");
      const spanLang = document.createElement("span");
      const imgPdf = document.createElement("img");
      const vPdf = document.createElement("div");
      spanName.textContent = tds.tds.name;
      spanLang.textContent = tds.lang.abbreviation;
      spanLang.classList.add("container_card_tds_text_lang");
      vPdf.append(await pdfViewer(tds.tds.data));
      imgPdf.src = "../../img/icons/viewpdf.png";
      imgPdf.classList.add("img_pdf_btn_viewer");
      imgPdf.onclick = async () => {
        const domVPdf = vPdf.querySelector(".viewer_modal_container");
        domVPdf.classList.remove("hidden");
        console.log(domVPdf);
      };
      textContainer.append(spanLang, spanName);
      itemTds.append(textContainer, vPdf, imgPdf);
      myTds.append(itemTds);
      console.log(imgPdf);
    });
    return myTds;
  };

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card_container");
  await createBackBtn();
  const card = await createCard();
  await createTitleCard();
  await createBodyCard();
  card.append(await tdsComponent());
  card.append(await createTdsCollection());
  return cardContainer;
};
