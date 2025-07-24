import apiData from "../../../service/api.data.js";
import state_manager from "../../state_manager.js";
import { btnRemove } from "../../ui/btn_remove_v1.js";
import { btnV1 } from "../../ui/btn_v1.js";
import { confurmation } from "../modal_confurmation.component.js";
import { previewContainer } from "./setting.component.js";

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
  };
  ul.append(inpt);
  return ul;
};

const btnContainer = async () => {
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn_container_edit_abbr");
  return btnContainer;
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
  const btnContainerDiv = await btnContainer();
  const btnSave = document.createElement("img");
  btnSave.setAttribute("src", "img/icons/save.png");
  btnSave.classList.add("lang_edit_conatainer_save_btn");
  btnSave.id = `lang_${id}`;
  btnSave.onclick = async () => {
    const result = await apiData.patchLanguage();
    if (result === 200) {
      await getLang();
    }
  };
  const btnClose = document.createElement("img");
  btnClose.setAttribute("src", "img/icons/close.png");
  btnClose.classList.add("lang_edit_conatainer_save_btn");
  btnClose.onclick = async () => {
    await handlerClosedEditsLang();
  };
  blockTitle.append(titleAbbr, titleName);
  blockInput.append(inputAbbr, inputName);
  containerEditText.append(blockTitle, blockInput);
  btnContainerDiv.append(btnSave, btnClose);
  containerEditLang.append(containerEditText, btnContainerDiv);
  return containerEditLang;
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
      "пример: Беларуcский",
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
    try {
      await apiData.postLanguage(newLang);
      await getLang();
    } catch (e) {
      console.error(e);
    }
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

const handlerClosedEditsLang = async () => {
  state_manager.languages.map(async (l) => {
    const itemEditLang = previewContainer.querySelector(`#lang_${l.id}`);
    itemEditLang.classList.add("hidden");
  });
};

const getLang = async () => {
  previewContainer.innerHTML = "";
  await state_manager.getLanguageFunc();
  const langTitle = document.createElement("li");
  langTitle.textContent = "Языки в системе";
  previewContainer.append(langTitle);
  const langAdd = document.createElement("li");
  langAdd.textContent = "Добавить язык в систему";
  langAdd.classList.add("setting_item");
  langAdd.onclick = async () => {
    previewContainer.append(await addLanguage());
  };
  await getLangArhiveFalse();
  setTimeout(async () => {
    await getLangArhiveTrue();
  }, 100);

  previewContainer.append(langAdd);
};

const getLangArhiveFalse = async () => {
  state_manager.sort_languages.archivedFalse.map(async (l) => {
    const itemPrev = document.createElement("li");
    const iconEdit = document.createElement("img");
    iconEdit.setAttribute("src", "img/icons/edit.png");
    iconEdit.classList.add("edit_icon");
    itemPrev.textContent = `${l.abbreviation} ${l.name}`;
    const btnContainerDiv = await btnContainer();
    const archiveItem = await btnRemove("Архивировать");
    btnContainerDiv.append(iconEdit, archiveItem);
    archiveItem.onclick = async () => {
      const confurmBtn = await btnV1();
      confurmBtn.textContent = "Архивировать";
      confurmBtn.onclick = async () => {
        apiData.deleteLanguage(l.id);
        setTimeout(async () => {
          await getLang();
        }, 200);
      };
      previewContainer.append(
        await confurmation(
          `Вы хотите архивировать язык - ${l.name}?`,
          confurmBtn
        )
      );
    };
    itemPrev.append(
      await createEditLangContainer(l.id, l.abbreviation, l.name),
      btnContainerDiv
    );
    itemPrev.classList.add("setting_item");
    iconEdit.onclick = async (e) => {
      state_manager.this_language = l;
      const editContainerLang = itemPrev.querySelector(`#lang_${l.id}`);
      handlerClosedEditsLang();
      editContainerLang.classList.remove("hidden");
    };
    previewContainer.append(itemPrev);
  });
};

const getLangArhiveTrue = async () => {
  state_manager.sort_languages.archivedTrue.map(async (l) => {
    const itemPrev = document.createElement("li");
    itemPrev.innerHTML = `<span>${l.name}</span><span> (в архиве)</span>`;
    itemPrev.classList.add("setting_item", "archived_item");
    previewContainer.append(itemPrev);
  });
};

export const languages = async () => {
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
