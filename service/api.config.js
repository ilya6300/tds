import { serverConnectComponent } from "../js/app.js";
import { myLoader } from "../js/ui/loader.component.js";

// export const url = "http://10.76.10.122:8083/";
export const url = "http://89.169.180.5:8083/";

export const request = axios.create({
  baseURL: url,
});
request.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${
    JSON.parse(localStorage.getItem("User"))["token"]
  }`;
  serverConnectComponent.classList.remove("hidden");
  return config;
});

request.interceptors.response.use(
  async (config) => {
    myLoader.classList.add("hidden");
    serverConnectComponent.classList.add("hidden");
    return config;
  },

  (e) => {
    console.error(e);
    if (JSON.parse(localStorage.getItem("User")) === null) {
      console.error("нет токена");
      if (window.location.pathname !== "/login.html") {
        return (window.location.href = "login.html");
      }
    }
    if (e.code === "ERR_NETWORK") {
      alert("ERR_NETWORK");
      return (window.location.href = "server_error.html");
    }
    if (e.response.status === 401) {
      localStorage.removeItem("User");
      alert(e.response.data.message);
      return (window.location.href = "login.html");
    }
    if (e.response.status === 400) {
      alert(e.response.data.message);
    }
    throw e;
  }
);
