"use strict";
import { headerComponent } from "./components/header.js";
import { settingComponent } from "./components/setting/setting.component.js";
import { createSearch, listProduction } from "./core/list.production.js";
import { newProductionComponent } from "./core/new_production.component.js";
import state_manager from "./state_manager.js";
import { myLoader } from "./ui/loader.component.js";

const root = document.querySelector("#root");

const addLoader = async () => {
  root.append(await headerComponent());
  root.append(myLoader);
};
await addLoader();
const settings = await settingComponent();
let newCard = await newProductionComponent();

const search = await createSearch();

export const openNewCard = async () => {
  state_manager.card_id = null;
  newCard.innerHTML = "";
  newCard = await newProductionComponent();
  body.classList.add("hidden");
  newCard.classList.remove("hidden");
};

export const closedNewCard = async () => {
  console.log("new");
  body.classList.remove("hidden");
  newCard.classList.add("hidden");
};

const createBody = async () => {
  const body = document.createElement("div");
  body.append(search);
  const list = await listProduction(await state_manager.getProductionFunc());
  body.append(list);
  body.append(newCard);
  return body;
};

const body = await createBody();

export const handlerClsBody = (icon) => {
  console.log(body.classList);
  if (!body.classList.contains("hidden")) {
    settings.classList.remove("hidden");
    settings.classList.add("setting_container");
    icon.classList.add("logo_icon-anim");
    body.classList.add("hidden");
  } else {
    body.classList.remove("hidden");
    settings.classList.add("hidden");
    settings.classList.remove("setting_container");
    icon.classList.remove("logo_icon-anim");
  }
  console.log(search);
};

const render = async () => {
  if (JSON.parse(localStorage.getItem("User")) === null) return;
  console.log(window.location.pathname);
  if (window.location.pathname === "/index.html") {
    root.classList.add("container", "posi_rel");

    root.append(body);
    root.append(settings);
    root.append(newCard);
  }
  console.log("package-name/package.json".version);
};

await render();
