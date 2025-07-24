import { headerComponent } from "./components/header.js";
import { logoPage } from "./components/logo_page.js";
import { settingComponent } from "./components/setting/setting.component.js";
import { serverConnect } from "./components/utilite/server_conect.component.js";
import { createSearch, listProduction } from "./core/list.production.js";
import { newProductionComponent } from "./core/new_production.component.js";
import state_manager from "./state_manager.js";
import { myLoader } from "./ui/loader.component.js";

const root = document.querySelector("#root");
export const serverConnectComponent = await serverConnect();
const addLoader = async () => {
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
  body.classList.remove("hidden");
  newCard.classList.add("hidden");
};

const createBody = async () => {
  // const background = document.createElement("div");
  // background.classList.add("background");
  const body = document.createElement("div");
  // background.append(body);
  body.classList.add("body_container");
  const logo = await logoPage();
  const list = await listProduction(await state_manager.getProductionFunc());
  body.append(logo, search, list);
  body.append(newCard);
  return body;
};

export const body = await createBody();

export const handlerClsBody = (icon) => {
  if (!body.classList.contains("hidden")) {
    settings.classList.remove("hidden");
    settings.classList.add("setting_container");
    icon.classList.add("logo_icon-anim");
    body.classList.add("hidden");
  } else {
    if (!newCard.classList.contains("hidden")) {
      newCard.classList.add("hidden");
      settings.classList.remove("hidden");
      settings.classList.add("setting_container");
      icon.classList.add("logo_icon-anim");
    } else {
      body.classList.remove("hidden");
      settings.classList.add("hidden");
      settings.classList.remove("setting_container");
      icon.classList.remove("logo_icon-anim");
    }
  }
};

const render = async () => {
  if (JSON.parse(localStorage.getItem("User")) === null) return;
  if (
    window.location.pathname === "/tdc-paints/index.html" ||
    window.location.pathname === "/index.html" ||
    window.location.pathname === "/"
  ) {
    const background = document.createElement("div");
    background.classList.add("background");
    root.append(background);
    root.classList.add("container", "posi_rel");
    background.append(
      await headerComponent(),
      body,
      settings,
      newCard,
      serverConnectComponent
    );
  }
};

await render();
