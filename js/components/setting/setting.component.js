import { request } from "../../../service/api.config.js";
import apiData from "../../../service/api.data.js";
import { listProduction } from "../../core/list.production.js";
import state_manager from "../../state_manager.js";
import { btnRemove } from "../../ui/btn_remove_v1.js";
import { btnV1 } from "../../ui/btn_v1.js";
import { rowUser } from "../users/user.js";

const previewContainer = document.createElement("ul");

const newLang = {
  name: "",
  abbreviation: "",
};

const createRowLanguage = async (name, placeholder, obj) => {
  const ul = document.createElement("ul");
  const text = document.createElement("li");
  text.textContent = name;
  text.classList.add("grey_info", "setting_item");
  ul.append(text);
  const inpt = document.createElement("input");
  inpt.placeholder = placeholder;
  inpt.classList.add("setting_inpt");
  inpt.onchange = async (e) => {
    newLang[`${obj}`] = e.target.value;
    console.log(newLang);
  };
  ul.append(inpt);
  return ul;
};

const addLanguage = async () => {
  previewContainer.innerHTML = "";
  const bodyContainer = document.createElement("ul");
  const title = document.createElement("li");
  title.textContent = "Добавление нового языка в систему.";
  title.classList.add("grey_info");
  bodyContainer.append(title);
  bodyContainer.append(
    await createRowLanguage(
      "Введите названия языка",
      "пример: Беларуский",
      "name"
    )
  );
  bodyContainer.append(
    await createRowLanguage(
      "Введите аббревиатуру",
      "пример: BY",
      "abbreviation"
    )
  );
  const btnContainer = document.createElement("li");
  btnContainer.classList.add("setting_btn_container");
  const save = await btnV1();
  save.textContent = "Сохранить";
  save.onclick = async () => {
    if (newLang.name.length <= 1 || newLang.abbreviation.length <= 1) {
      return alert("Минимум 2 символа");
    }
    await apiData.postLanguage(newLang);
  };
  btnContainer.append(save);

  const closed = await btnV1();
  closed.textContent = "Закрыть";
  closed.onclick = async () => {
    await getLang();
  };
  btnContainer.append(closed);
  bodyContainer.append(btnContainer);
  return bodyContainer;
};

const getProductionArchivedFalse = async () => {
  const productions = document.createElement("div");
  state_manager.sort_production.archivedFalse.map(async (p) => {
    const removeBtn = await btnRemove("архивировать");
    removeBtn.onclick = async () => {
      const deleteCheck = confirm(
        `Вы хотите архивировать продукцию "${p.name}" c штрихкодом ${p.ean}`
      );
      console.log(p);
      if (deleteCheck) {
        apiData.deleteProduction(p.id);
        setTimeout(async () => {
          await listProduction(await state_manager.getProductionFunc());
        }, 200);
        getPreviewProductions();
      }
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

const createEditLangContainer = async (id, abbr, name) => {
  const containerEditLang = document.createElement("div");
  const containerEditText = document.createElement("div");
  containerEditText.classList.add("lang_edit_container_text");
  containerEditLang.classList.add("lang_edit_container", "hidden");
  containerEditLang.id = `lang_${id}`;
  const blockTitle = document.createElement("div");
  const blockInput = document.createElement("div");
  const titleAbbr = document.createElement("div");
  const titleName = document.createElement("div");
  blockTitle.classList.add("lang_edit_conatainer_title");
  titleAbbr.textContent = "Аббр.";
  titleAbbr.classList.add("lang_edit_conatainer_title_abbr");
  titleName.textContent = "Название.";
  const inputAbbr = document.createElement("input");
  const inputName = document.createElement("input");
  inputAbbr.classList.add(
    "lang_edit_conatainer_input",
    "lang_edit_conatainer_title_abbr"
  );
  inputAbbr.value = abbr;
  inputAbbr.onchange = async (e) => {
    state_manager.this_language.abbreviation = e.target.value;
  };
  inputName.classList.add("lang_edit_conatainer_input");
  inputName.value = name;
  inputName.onchange = async (e) => {
    state_manager.this_language.name = e.target.value;
  };
  const btnSave = document.createElement("img");
  btnSave.setAttribute("src", "../../../img/icons/save.png");
  btnSave.classList.add("lang_edit_conatainer_save_btn");
  btnSave.id = `lang_${id}`;
  btnSave.onclick = async () => {
    const result = await apiData.patchLanguage();
    if (result === 200) {
      await getLang();
    }
  };
  const btnClose = document.createElement("img");
  btnClose.setAttribute("src", "../../../img/icons/close.png");
  btnClose.classList.add("lang_edit_conatainer_save_btn");
  btnClose.onclick = async () => {
    await handlerClosedEditsLang();
  };
  blockTitle.append(titleAbbr, titleName);
  blockInput.append(inputAbbr, inputName);
  containerEditText.append(blockTitle, blockInput);
  containerEditLang.append(containerEditText, btnSave, btnClose);
  return containerEditLang;
};

const handlerClosedEditsLang = async () => {
  state_manager.languages.map(async (l) => {
    const itemEditLang = previewContainer.querySelector(`#lang_${l.id}`);
    itemEditLang.classList.add("hidden");
    console.log(itemEditLang);
  });
};

const getLang = async () => {
  previewContainer.innerHTML = "";
  const languages = await apiData.getLanguange();
  console.log(languages);
  const langTitle = document.createElement("li");
  langTitle.textContent = "Языки в системе";
  previewContainer.append(langTitle);
  const langAdd = document.createElement("li");
  langAdd.textContent = "Добавить язык в систему";
  langAdd.classList.add("setting_item");
  langAdd.onclick = async () => {
    previewContainer.append(await addLanguage());
  };
  previewContainer.append(langAdd);
  languages.map(async (l) => {
    const itemPrev = document.createElement("li");
    const iconEdit = document.createElement("img");
    iconEdit.setAttribute("src", "../../../img/icons/edit.png");
    iconEdit.classList.add("edit_icon");
    itemPrev.textContent = `${l.abbreviation} ${l.name}`;
    itemPrev.append(
      iconEdit,
      await createEditLangContainer(l.id, l.abbreviation, l.name)
    );
    itemPrev.classList.add("setting_item");
    iconEdit.onclick = async (e) => {
      state_manager.this_language = l;
      console.log(l, e);
      const editContainerLang = itemPrev.querySelector(`#lang_${l.id}`);
      console.log(editContainerLang);
      handlerClosedEditsLang();
      editContainerLang.classList.remove("hidden");
    };
    previewContainer.append(itemPrev);
  });
};

const productions = async () => {
  const textProductions = document.createElement("li");
  textProductions.textContent = "Номенклатура";
  textProductions.classList.add("setting_item");
  textProductions.onclick = async () => {
    previewContainer.classList.remove("hidden");
    await getPreviewProductions();
  };
  return textProductions;
};

const languages = async () => {
  const textLanguages = document.createElement("li");
  textLanguages.textContent = "Языки документации";
  textLanguages.classList.add("setting_item");
  textLanguages.onclick = async () => {
    previewContainer.classList.remove("hidden");
    previewContainer.innerHTML = "";
    await getLang();
  };
  return textLanguages;
};

const list = async () => {
  const listContainer = document.createElement("ul");
  listContainer.classList.add("col_50");
  listContainer.append(await rowUser());
  listContainer.append(await languages());
  listContainer.append(await productions());

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
