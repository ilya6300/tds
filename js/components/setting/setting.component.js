import apiData from "../../../service/api.data.js";
import { rowUser } from "../users/user.js";

const previewContainer = document.createElement("ul");

const getLang = async () => {
  const languages = await apiData.getLanguange();
  console.log(languages);
  const langTitle = document.createElement("li");
  langTitle.textContent = "Языки в системе";
  previewContainer.append(langTitle);
  const langAdd = document.createElement("li");
  langAdd.textContent = "Добавить язык в систему";
  previewContainer.append(langAdd);
  languages.map(async (l) => {
    const itemPrev = document.createElement("li");
    itemPrev.textContent = `${l.abbreviation} ${l.name}`;
    previewContainer.append(itemPrev);
  });
};

const languages = async () => {
  const textLanguages = document.createElement("li");
  textLanguages.textContent = "Языки документации";
  textLanguages.classList.add('setting_item')
  textLanguages.onclick = async () => {
    previewContainer.classList.remove("hidden");
    previewContainer.innerHTML = "";
    await getLang();
  };
  return textLanguages;
};

const getProductions = async () => {
  const production = await apiData.getProduction();
  //   return production;
  const productonTitle = document.createElement("li");
  productonTitle.textContent = "Продукция";
  previewContainer.append(productonTitle);
  const productionAdd = document.createElement("li");
  productionAdd.textContent = "Добавить продукцию";
  previewContainer.append(productionAdd);
  production.map(async (l) => {
    const itemPrev = document.createElement("li");
    itemPrev.textContent = l.name;
    previewContainer.append(itemPrev);
  });
};

const production = async () => {
  const textProduction = document.createElement("li");
  textProduction.textContent = "Продукция";
  textProduction.classList.add('setting_item')
  textProduction.onclick = async () => {
    previewContainer.classList.remove("hidden");
    previewContainer.innerHTML = "";
    await getProductions();
  };
  return textProduction;
};

const list = async () => {
  const listContainer = document.createElement("ul");
  listContainer.classList.add("col_50");
  listContainer.append(await rowUser());
  listContainer.append(await languages());
  listContainer.append(await production());

  return listContainer;
};

const preview = async () => {
  previewContainer.classList.add("col_50", "preview_setting", "hidden");
  return previewContainer;
};

export const settingComponent = async () => {
  const settings = document.createElement("div");
  settings.classList.add("hidden");

  settings.append(await list());
  settings.append(await preview());

  return settings;
};
