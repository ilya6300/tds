import { request } from "../../../service/api.config.js";
import apiData from "../../../service/api.data.js";
import { listProduction } from "../../core/list.production.js";
import state_manager from "../../state_manager.js";
import { btnRemove } from "../../ui/btn_remove_v1.js";
import { btnV1 } from "../../ui/btn_v1.js";
import { rowUser } from "../users/user.js";
import { languages } from "./lang.component.js";
import { productions } from "./production.setting.component.js";
import { tdsSetings } from "./tds.setting.component.js";
import { userList } from "./userlist.component.js";

export const previewContainer = document.createElement("ul");

const list = async () => {
  const listContainer = document.createElement("ul");
  listContainer.classList.add("col_30");

  listContainer.append(await languages());
  listContainer.append(await productions());
  listContainer.append(await tdsSetings());
  listContainer.append(await userList());

  return listContainer;
};

const preview = async () => {
  previewContainer.classList.add("col_70", "preview_setting", "hidden");
  return previewContainer;
};

export const settingComponent = async () => {
  const settings = document.createElement("div");
  settings.classList.add("hidden");
  const listContainer = document.createElement("div");
  listContainer.classList.add("setting_list_container");
  settings.append(await rowUser());
  listContainer.append(await list());
  listContainer.append(await preview());
  settings.append(listContainer);

  return settings;
};
