import { tds } from "../js/core/tds.component.js";
import state_manager from "../js/state_manager.js";
import { request } from "./api.config.js";

class apiData {
  getProduction = async () => {
    if (
      JSON.parse(localStorage.getItem("User")) === null &&
      window.location.pathname !== "/login.html"
    ) {
      // return (window.location.href = "login.html");
    }
    try {
      const res = await request.get(`products/?archived=true&size=100`);
      return res.data["data"];
    } catch (e) {
      console.error(e);
    }
  };

  postProduction = async (obj) => {
    try {
      const res = await request.post(`products/`, obj);
      state_manager.card_id = res.data.id;
    } catch (e) {
      console.error(e);
    }
  };

  deleteProduction = async (id) => {
    try {
      const res = await request.delete(`products/${id}`);
    } catch (e) {
      console.error(e);
    }
  };

  getLanguange = async () => {
    try {
      const res = await request.get("languages/?archived=true&size=100");
      state_manager.languages = res.data["data"];
      return res.data["data"];
    } catch (e) {
      console.error(e);
    }
  };

  postLanguage = async (data) => {
    try {
      await request.post("languages/", data);
    } catch (e) {
      console.error(e);
    }
  };

  postTDS = async (obj) => {
    const formData = new FormData();
    formData.append("name", obj.name);
    formData.append("file", obj.file, obj.name);
    let id;
    try {
      const resTds = await request.post(`tds/`, formData);
      id = resTds.data.id;
    } catch (e) {
      console.error(e);
    } finally {
      const resTdsProduct = await request.post(
        `products/${state_manager.card_id}/tds`,
        {
          tds_id: Number(id),
          lang_id: Number(obj.language),
        }
      );
    }
  };

  deleteLanguage = async (id) => {
    try {
      await request.delete(`languages/${id}`);
    } catch (e) {
      console.error(e);
    }
  };

  getProductionTds = async () => {
    const res = await request.get(`products/${state_manager.card_id}/tds`);
    return (this.production_tds = res.data["data"]);
  };
  patchProduction = async (update) => {
    try {
      await request.patch(`products/${state_manager.card_id}`, update);
    } catch (e) {
      console.error(e);
    }
  };

  patchLanguage = async () => {
    const res = await request.patch(
      `languages/${state_manager.this_language.id}`,
      {
        name: state_manager.this_language.name,
        abbreviation: state_manager.this_language.abbreviation,
      }
    );

    return res.status;
  };

  getTDSList = async (page) => {
    try {
      const res = await request.get(
        `tds/?size=${state_manager.size}&page=${page}`
      );
      state_manager.tds.tds.archivedFalse.total = res.data.total;
      state_manager.tds.tds.archivedFalse.pages = res.data.pages;
      return res.data["data"];
    } catch (e) {
      console.error(e);
    }
  };

  getTDSListArhive = async (page) => {
    try {
      const res = await request.get(
        `tds/archived/?size=${state_manager.size}&page=${page}`
      );

      state_manager.tds.tds.archivedTrue.total = res.data.total;
      state_manager.tds.tds.archivedTrue.pages = res.data.pages;
      return res.data["data"];
    } catch (e) {
      console.error(e);
    }
  };

  deleteTDS = async (id) => {
    try {
      const res = await request.delete(`tds/${id}`);
      if (res) {
        return true;
      }
    } catch (e) {
      console.error(e);
    }
  };

  getUsers = async () => {
    try {
      const res = await request.get(`users/?archived=true&size=100`);
      return res.data.data;
    } catch (e) {
      console.error(e);
    }
  };

  postUser = async (name, pass) => {
    try {
      await request.post(`users`, {
        username: name,
        password: pass,
      });
    } catch (e) {
      console.error(e);
    }
  };

  deleteUser = async (id) => {
    try {
      await request.delete(`users/${id}`);
    } catch (e) {
      console.error(e);
    }
  };
}

export default new apiData();
