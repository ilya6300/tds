import { headerComponent } from "./components/header.js";
import { settingComponent } from "./components/setting/setting.component.js";
import { getProductionFunc, listProduction } from "./core/list.production.js";

const root = document.querySelector("#root");
const list = await listProduction(await getProductionFunc());
const settings = await settingComponent();

export const handlerClsBody = (icon) => {
  if (list.classList.contains("list-group")) {
    list.classList.add("hidden");
    list.classList.remove("list-group", "posi_rel");
    settings.classList.remove("hidden");
    settings.classList.add("setting_container");
    icon.classList.add("logo_icon-anim");
  } else {
    list.classList.add("list-group", "posi_rel");
    list.classList.remove("hidden");
    settings.classList.add("hidden");
    settings.classList.remove("setting_container");
    icon.classList.remove("logo_icon-anim");
  }
};

const render = async () => {
  console.log(window.location.pathname);
  if (window.location.pathname === "/index.html") {
    root.classList.add("container");

    root.append(await headerComponent());
    root.append(list);
    root.append(settings);
  }
};

await render();
