import { openNewCard } from "../app.js";
import state_manager from "../state_manager.js";
import { addBtn } from "../ui/btn_add.js";
import { cardComponent } from "./card.component.js";

export const createSearch = async () => {
  const barList = document.createElement("div");
  const newProduction = await addBtn();
  newProduction.onclick = async () => {
    await openNewCard();
  };
  barList.classList.add("list_bar");
  barList.id = "bar-search";
  const searchInp = document.createElement("input");
  searchInp.placeholder = "ШК, название";
  searchInp.classList.add("list_search");
  searchInp.setAttribute("id", "search");
  searchInp.type = "text";

  searchInp.oninput = async (e) => {
    searchInp.value = e.target.value;
    await searchProduction(e.target.value);
  };

  barList.append(newProduction, searchInp);
  return barList;
};

const searchProduction = async (e) => {
  await state_manager.filterProductions(e);
  listProduction();
};

export let listContainer = document.createElement("div");
export let list = document.createElement("ul");

export const listProduction = async () => {
  // let list;
  // let listContainer;
  if (document.getElementById("list") === null) {
    // list = document.createElement("ul");
    // listContainer = document.createElement("div");
    listContainer.id = "listContainer";
  } else {
    list = document.getElementById("list");
    listContainer = document.getElementById("listContainer");
  }

  list.setAttribute("id", "list");
  list.innerHTML = "";
  list.classList.add("list-group", "posi_rel", "list_product_app");

  if (JSON.parse(localStorage.getItem("User")) === null) return;

  if (state_manager.sort_production.archivedFalse.length === 0) {
    const infoList = document.createElement("p");
    infoList.textContent = `В БД нет продукции`;
    list.append(infoList);
  } else if (state_manager.sort_production.archivedFalse.length === 0) {
    const infoList = document.createElement("p");
    infoList.textContent = `По заданным фильтрам продукция не найдена`;
    list.append(infoList);
  }

  state_manager.sort_production.archivedFalse.map(async (p) => {
    if (p.archived) return;
    const itemProduction = document.createElement("li");
    itemProduction.innerHTML = `<span>${p.name}</span><span>${p.ean}</span>`;
    itemProduction.classList.add("list-group-item", "my_list-group-item");
    list.append(itemProduction);
    itemProduction.onclick = async () => {
      state_manager.card_id = p.id;
      list.classList.add("hidden");
      const openCard = await cardComponent(p);
      listContainer.append(openCard);
    };
  });

  listContainer.append(list);
  return listContainer;
};
