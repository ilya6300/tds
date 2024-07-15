import apiData from "../../../service/api.data.js";
import { tds } from "../../core/tds.component.js";

const onchangeLanguage = async (id) => {};

export const selectedLanguage = async (id) => {
  const lang = await apiData.getLanguange();
  const select = document.createElement("select");
  select.id = id;
  select.classList.add("option_base");
  select.onchange = async (e) => {
    console.log(e.target.value);
    const itemID = tds.find((t) => t.id == id);
    if (itemID) {
      itemID.language = e.target.value;
    }
  };
  const option_base = document.createElement("option");
  option_base.textContent = "Выберите язык";
  option_base.id = "base";
  option_base.disabled = true;
  option_base.selected = true;

  select.append(option_base);
  lang.map((l) => {
    const option = document.createElement("option");
    option.textContent = l.name;
    option.value = l.id;
    option.onclick = async (l) => {
      console.log(l);
      // await onchangeLanguage();
    };
    select.append(option);
  });
  return select;
};
