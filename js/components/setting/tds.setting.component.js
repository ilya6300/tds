import apiData from "../../../service/api.data.js";
import { listProduction } from "../../core/list.production.js";
import state_manager from "../../state_manager.js";
import { btnRemove } from "../../ui/btn_remove_v1.js";
import { btnV1 } from "../../ui/btn_v1.js";
import { confurmation } from "../modal_confurmation.component.js";
import { pdfViewer } from "../utilite/pdf_viewer.component.js";
import { previewContainer } from "./setting.component.js";

export const tdsSetings = async () => {
  const textTds = document.createElement("li");
  textTds.classList.add("setting_item");
  textTds.textContent = "ТДС";
  textTds.onclick = async () => {
    previewContainer.classList.remove("hidden");
    await getPreviewTds();
  };
  return textTds;
};

let page = 1;

const getPreviewTds = async () => {
  await state_manager.getTDSFunc(page);
  previewContainer.innerHTML = "";
  const tdsTitle = document.createElement("li");
  const headerTDSSetting = document.createElement("div");
  headerTDSSetting.classList.add("header_tds_setting");
  const btnArhiveTDS = document.createElement("div");
  const arviveTrue = document.createElement("span");
  arviveTrue.textContent = "Архивные";
  arviveTrue.classList.add("hidden");
  btnArhiveTDS.append(arviveTrue);
  headerTDSSetting.append(tdsTitle, arviveTrue);
  const tdsList = document.createElement("div");
  tdsList.style.height = "100%";
  previewContainer.append(headerTDSSetting, tdsList);

  const renderTDS = async () => {
    page = 1;
    tdsList.innerHTML = "";
    if (!state_manager.tds.flagArhive) {
      arviveTrue.classList.remove("tds_setting_arhive_btn_deactive");
      arviveTrue.classList.add("tds_setting_arhive_btn_active");
      await state_manager.getTDSFuncArhive(page);
      state_manager.tds.flagArhive = true;
      tdsTitle.textContent = "ТДС в архиве";
      tdsList.append(
        await getTdsArchivedTrue(),
        await createPagination(state_manager.tds.tds.archivedTrue)
      );
    } else {
      page = 1;
      arviveTrue.classList.add("tds_setting_arhive_btn_deactive");
      arviveTrue.classList.remove("tds_setting_arhive_btn_active");
      await state_manager.getTDSFunc(page);
      state_manager.tds.flagArhive = false;
      tdsTitle.textContent = "ТДС";
      tdsList.append(
        await getTdsArchivedFalse(),
        await createPagination(state_manager.tds.tds.archivedFalse)
      );
    }
  };

  arviveTrue.onclick = async () => {
    renderTDS();
  };
  tdsTitle.textContent = "ТДС";
  tdsList.append(
    await getTdsArchivedFalse(),
    await createPagination(state_manager.tds.tds.archivedFalse)
  );
};

const createPagination = async (array) => {
  const containerPagination = document.createElement("div");
  containerPagination.classList.add("btn_pagination_container");
  let pageBtn = 1;
  while (pageBtn <= array.pages) {
    const btnPage = document.createElement("button");
    btnPage.textContent = pageBtn;
    if (btnPage.textContent == page) {
      btnPage.classList.add("btn_pagination_active");
    } else {
      btnPage.classList.add("btn_pagination_deactive");
    }
    btnPage.id = "btn_pagination";
    containerPagination.append(btnPage);
    btnPage.onclick = async () => {
      page = btnPage.textContent;
      await getPreviewTds(page);
      if (btnPage.textContent === page) {
        btnPage.classList.add("btn_pagination_active");
        btnPage.classList.remove("btn_pagination_deactive");
      }
    };
    pageBtn++;
  }
  return containerPagination;
};

const getTdsArchivedFalse = async () => {
  const tds = document.createElement("div");
  tds.classList.add("tds_list_container");

  setTimeout(() => {
    state_manager.tds.tds.archivedFalse.tds.map(async (t) => {
      const removeBtn = await btnRemove("архивировать");
      removeBtn.onclick = async () => {
        const confurmBtn = await btnV1();
        confurmBtn.textContent = "Архивировать";
        confurmBtn.onclick = async () => {
          apiData.deleteTDS(t.id);
          setTimeout(async () => {
            await apiData.getTDSList();
          }, 200);
        };
        previewContainer.append(
          await confurmation(
            `Вы хотите архивировать tds - ${t.name}?`,
            confurmBtn
          )
        );
      };
      const itemPrev = document.createElement("li");
      const vPdf = document.createElement("div");
      vPdf.append(await pdfViewer(t.data));
      const imgPdf = document.createElement("img");
      imgPdf.src = "img/icons/viewpdf.png";
      imgPdf.classList.add("img_pdf_btn_viewer");
      imgPdf.onclick = async () => {
        const domVPdf = vPdf.querySelector(".viewer_modal_container");
        domVPdf.classList.remove("hidden");
      };

      const textName = document.createElement("span");
      textName.innerHTML = `${t.name}`;
      const tdsInfoContainer = document.createElement("div");
      tdsInfoContainer.classList.add("setting_item_pdf_name");
      tdsInfoContainer.append(imgPdf, textName);
      itemPrev.append(tdsInfoContainer);
      itemPrev.append(removeBtn);
      itemPrev.classList.add("setting_item");
      tds.append(vPdf, itemPrev);
    });
  }, 100);

  return tds;
};

const getTdsArchivedTrue = async () => {
  const tds = document.createElement("div");
  tds.classList.add("tds_list_container");

  setTimeout(() => {
    state_manager.tds.tds.archivedTrue.tds.map(async (t) => {
      const itemPrev = document.createElement("li");
      const vPdf = document.createElement("div");
      vPdf.append(await pdfViewer(t.data));
      const imgPdf = document.createElement("img");
      imgPdf.src = "img/icons/viewpdf.png";
      imgPdf.classList.add("img_pdf_btn_viewer");
      imgPdf.onclick = async () => {
        const domVPdf = vPdf.querySelector(".viewer_modal_container");
        domVPdf.classList.remove("hidden");
      };

      const textName = document.createElement("span");
      textName.innerHTML = `<span>${t.name}</span><span> (в архиве)</span>`;
      const tdsInfoContainer = document.createElement("div");
      tdsInfoContainer.classList.add("setting_item_pdf_name");
      tdsInfoContainer.append(imgPdf, textName);
      itemPrev.append(tdsInfoContainer);
      itemPrev.classList.add("setting_item");
      tds.append(vPdf, itemPrev);
    });
  }, 200);

  return tds;
};
