 "use strict"
import apiAuth from "../../../service/api.auth.js";
import { headerComponent } from "../../components/header.js";
import { loginComponent } from "./login.container.js";

const root = document.querySelector("#root");

const render = async () => {
  console.log(root);
  root.classList.add("container");
  root.append(await headerComponent());
  root.append(await loginComponent());
};

apiAuth.authorize();

await render();
