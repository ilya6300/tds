import apiData from "../../../service/api.data.js";
import { listProduction } from "../../core/list.production.js";
import state_manager from "../../state_manager.js";
import { btnRemove } from "../../ui/btn_remove_v1.js";
import { btnV1 } from "../../ui/btn_v1.js";
import { confurmation } from "../modal_confurmation.component.js";
import { previewContainer } from "./setting.component.js";

const getProductionArchivedFalse = async () => {
  const productions = document.createElement("div");
  state_manager.sort_production.archivedFalse.map(async (p) => {
    const removeBtn = await btnRemove("архивировать");
    removeBtn.onclick = async () => {
      const confurmBtn = await btnV1();
      confurmBtn.textContent = "Подтвердить";
      confurmBtn.style.marginBottom = "10px";
      confurmBtn.onclick = async () => {
        apiData.deleteProduction(p.id);
        setTimeout(async () => {
          await listProduction(await state_manager.getProductionFunc());
          getPreviewProductions();
        }, 200);
      };
      productions.append(
        await confurmation(
          `Вы хотите архивировать продукцию "${p.name}" c штрихкодом ${p.ean}`,
          confurmBtn
        )
      );
    };
    const itemPrev = document.createElement("li");
    itemPrev.innerHTML = `${p.name}`;
    itemPrev.append(removeBtn);
    itemPrev.classList.add("setting_item");
    productions.append(itemPrev);
  });
  return productions;
};

const getProductionArchivedTrue = async () => {
  const productions = document.createElement("div");
  state_manager.sort_production.archivedTrue.map(async (p) => {
    const itemPrev = document.createElement("li");
    itemPrev.innerHTML = `<span>${p.name}</span><span> (в архиве)</span>`;
    itemPrev.classList.add("setting_item", "archived_item");
    productions.append(itemPrev);
  });
  return productions;
};

const getPreviewProductions = async () => {
  previewContainer.innerHTML = "";
  const prodTitle = document.createElement("li");
  prodTitle.textContent = "Номенклатура";
  previewContainer.append(prodTitle);
  previewContainer.append(await getProductionArchivedFalse());
  previewContainer.append(await getProductionArchivedTrue());
};
export const productions = async () => {
  const textProductions = document.createElement("li");
  textProductions.textContent = "Номенклатура";
  textProductions.classList.add("setting_item");
  textProductions.onclick = async () => {
    previewContainer.classList.remove("hidden");
    await getPreviewProductions();
  };
  return textProductions;
};
