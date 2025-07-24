import apiData from "../../service/api.data.js";
import { pdfViewer } from "../components/utilite/pdf_viewer.component.js";
import state_manager from "../state_manager.js";
import { btnV1 } from "../ui/btn_v1.js";
import { tdsComponent } from "./tds.component.js";

const update = {
  flag: false,
  btnUpdate: false,
  production: {},
};

const cardBody = async () => {
  const card = document.createElement("div");
  card.classList.add("my_card");
  return card;
};
const card = await cardBody();

export const cardComponent = async (item) => {
  update.production.name = item.name;
  update.production.description = item.description;
  update.production.ean = item.ean;
  const barId = document.querySelector("#bar-search");
  barId.style.display = "none";
  const createBackBtn = async () => {
    const btnContainerCard = document.createElement("div");
    btnContainerCard.classList.add("btn_container_card");

    const btnBack = await btnV1();
    const btnEdit = await btnV1();
    const imgArrow = document.createElement("img");
    imgArrow.src = "img/icons/Arrow1.png";

    btnContainerCard.append(btnBack, btnEdit);
    btnEdit.textContent = "Редактировать";
    btnBack.append(imgArrow);
    btnBack.innerHTML += "  Назад";
    cardContainer.append(btnContainerCard);
    btnBack.onclick = async () => {
      barId.style.display = "flex";
      const list = document.querySelector("#list");
      list.classList.remove("hidden");
      cardContainer.classList.remove("card_container");
      cardContainer.innerHTML = "";
    };
    btnEdit.onclick = async () => {
      if (!update.flag) {
        await updateCard();
        update.flag = true;
      } else {
        await createCard();
        update.flag = false;
      }
    };
  };

  const createCard = async () => {
    card.innerHTML = "";
    card.append(
      await createTitleCard()
      // await createBodyCard(),
      // await tdsComponent()
      //
    );
    await createTdsCollection();
    cardContainer.append(card);
    return card;
  };
  const updateCard = async () => {
    card.innerHTML = "";

    // const card = document.createElement("div");
    // card.classList.add("my_card");
    card.append(
      await updateTitleCard()
      // await updateBodyCard()
    );
    await updateTdsComponent();
    cardContainer.append(card);
    return card;
  };

  const updateTitleCard = async () => {
    const titleContainer = document.createElement("div");
    titleContainer.classList.add("card_title_container");
    const title = document.createElement("input");
    title.value = update.production.name;
    title.style.width = title.value.length * 18 + "px";
    title.oninput = async (e) => {
      title.style.width = e.target.value.length * 18 + "px";
      update.production.name = e.target.value;
      await createUpdateBtn();
    };
    title.classList.add("card_barcode_text_title_update");
    titleContainer.append(title);
    const barcodeTitle = document.createElement("ul");
    const barcodeTitleContainer = document.createElement("div");
    barcodeTitleContainer.classList.add("card_barcode_container");
    const barcodeText = document.createElement("li");
    barcodeText.textContent = "штрихкод:";
    barcodeText.classList.add("card_barcode_text", "align_end");
    barcodeTitleContainer.append(barcodeText);
    barcodeTitle.append(barcodeTitleContainer);
    const barcode = document.createElement("input");
    barcode.value = update.production.ean;
    barcode.classList.add("card_barcode_text_title_update", "align_end");
    barcode.oninput = async (e) => {
      update.production.ean = e.target.value;
      await createUpdateBtn();
    };
    barcodeTitle.append(barcode);
    titleContainer.append(barcodeTitle);
    return titleContainer;
  };

  // const updateBodyCard = async () => {
  //   const body = document.createElement("textarea");
  //   body.innerHTML = update.production.description;
  //   body.classList.add("body_card_update");
  //   body.oninput = async (e) => {
  //     update.production.description = e.target.value;
  //     await createUpdateBtn();
  //   };
  //   return body;
  // };

  const createTitleCard = async () => {
    const titleContainer = document.createElement("div");
    titleContainer.classList.add("card_title_container");
    const title = document.createElement("span");
    title.innerText = update.production.name;
    title.classList.add("card_barcode_text_title");
    titleContainer.append(title);
    const barcodeTitle = document.createElement("ul");
    const barcodeTitleContainer = document.createElement("div");
    barcodeTitleContainer.classList.add("card_barcode_container");
    const barcodeText = document.createElement("span");
    barcodeText.textContent = "штрихкод:";
    barcodeText.classList.add("card_barcode_text");
    const btnCopy = document.createElement("img");
    btnCopy.src = "img/icons/icon_copy.png";
    btnCopy.classList.add("btn_copy");
    btnCopy.onclick = async () => {
      // navigator.clipboard.writeText(update.production.ean);
    };
    barcodeTitleContainer.append(
      barcodeText
      // , btnCopy
    );
    barcodeTitle.append(barcodeTitleContainer);
    const barcode = document.createElement("li");
    barcode.textContent = update.production.ean;
    barcode.classList.add("card_barcode");
    barcodeTitle.append(barcode);
    titleContainer.append(barcodeTitle);
    return titleContainer;
  };

  const createUpdateBtn = async () => {
    if (update.btnUpdate) return;
    const btn = await btnV1();
    btn.textContent = "Сохранить";
    btn.style.width = "150px";
    btn.style.margin = "3vh 0";
    btn.onclick = async () => {
      apiData.patchProduction(update.production);
      await createCard();
      update.flag = false;
    };
    card.append(btn);
    update.btnUpdate = true;
  };

  // const createBodyCard = async () => {
  //   const body = document.createElement("p");
  //   body.innerText = update.production.description;
  //   body.classList.add("body_card");
  //   return body;
  // };

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card_container");
  await createBackBtn();

  await createCard();
  return cardContainer;
};

export const createTdsCollection = async () => {
  let myTds;
  if (document.querySelector("#myTds") === null) {
    myTds = document.createElement("ul");
    myTds.classList.add("card_tds_list");
    myTds.id = "myTds";
  } else {
    myTds = document.querySelector("#myTds");
  }
  myTds.innerHTML = "";
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
    imgPdf.src = "img/icons/viewpdf.png";
    imgPdf.classList.add("img_pdf_btn_viewer");
    imgPdf.onclick = async () => {
      const domVPdf = vPdf.querySelector(".viewer_modal_container");
      domVPdf.classList.remove("hidden");
    };
    textContainer.append(spanLang, imgPdf, spanName);
    itemTds.append(textContainer, vPdf);
    myTds.append(itemTds);
  });
  card.append(myTds, await tdsComponent());
  return myTds;
};



export const updateTdsComponent = async () => {
  let myTds;
  if (document.querySelector("#myTds") === null) {
    myTds = document.createElement("ul");
    myTds.classList.add("card_tds_list");
    myTds.id = "myTds";
  } else {
    myTds = document.querySelector("#myTds");
  }
  myTds.innerHTML = "";
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
    imgPdf.src = "img/icons/viewpdf.png";
    imgPdf.classList.add("img_pdf_btn_viewer");
    imgPdf.onclick = async () => {
      const domVPdf = vPdf.querySelector(".viewer_modal_container");
      domVPdf.classList.remove("hidden");
    };
    const btnRemove = document.createElement("span");
    btnRemove.textContent = "[ в архив ]";
    btnRemove.classList.add("remove-btn-tds-card");
    btnRemove.onclick = async () => {
      const res = await apiData.deleteTDS(tds.tds.id);
      if (res) {
        await updateTdsComponent();
      }
    };
    textContainer.append(spanLang, imgPdf, spanName, btnRemove);
    itemTds.append(textContainer, vPdf);
    myTds.append(itemTds);
  });
  card.append(myTds, await tdsComponent());
  return myTds;
};
