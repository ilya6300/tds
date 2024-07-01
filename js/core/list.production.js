import api_data from "../../service/api.data.js";
import state_manager from "../state_manager.js";
import { cardComponent } from "./card.component.js";

export const getProductionFunc = async () => {
  const production = await api_data.getProduction();
  return await state_manager.setProductions(production);
};

const createSearch = async () => {
  const barList = document.createElement("div");
  barList.classList.add("list_bar");
  const searchInp = document.createElement("input");
  searchInp.placeholder = "Продукция, ШК, описание...";
  searchInp.classList.add("list_search");
  searchInp.onchange = async (e) => {
    console.log(e.target.value);
    await searchProduction(e.target.value);
  };
  barList.append(searchInp);
  return barList;
};

const searchProduction = async (e) => {
  console.log(e);
  await state_manager.filterProductions(e);
};

export const listProduction = async (productionList) => {
//   const production = await api_data.getProduction();
  //   console.log(posts);
    // const production = productionList;
  const list = document.createElement("ul");
  list.innerHTML = "";
  list.classList.add("list-group", "posi_rel");
  list.append(await createSearch());
  state_manager.all_productions.map(async (p) => {
    const itemProduction = document.createElement("li");
    itemProduction.innerText = p.name;
    itemProduction.classList.add("list-group-item", "my_list-group-item");

    list.append(itemProduction);
    itemProduction.onclick = async () => {
      list.append(await cardComponent(p));
    };
  });

  return list;
};
