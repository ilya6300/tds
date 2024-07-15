import { tds } from "../js/core/tds.component.js";
import state_manager from "../js/state_manager.js";
import { request } from "./api.config.js";

class apiData {
  getProduction = async () => {
    if (
      JSON.parse(localStorage.getItem("User")) === null &&
      window.location.pathname !== "/login.html"
    ) {
      return (window.location.href = "../login.html");
    }
    try {
      const res = await request.get(`products/?archived=true&size=100`);
      console.log(res.data);

      return res.data["data"];
    } catch (e) {
      console.log(e);
    }
  };

  postProduction = async (obj) => {
    // console.log(state_manager.card_id);
    try {
      const res = await request.post(`products/`, obj);
      console.log(res.data);
      state_manager.card_id = res.data.id;
      console.log(state_manager.card_id);
    } catch (e) {
      console.log(e);
    }
  };

  deleteProduction = async (id) => {
    try {
      const res = await request.delete(`products/${id}`);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  getLanguange = async () => {
    try {
      const res = await request.get("languages/");
      console.log(res.data["data"]);
      state_manager.languages = res.data["data"];
      return res.data["data"];
    } catch (e) {
      console.log(e);
    }
  };

  postLanguage = async (data) => {
    try {
      const res = await request.post("languages/", data);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  postTDS = async (obj) => {
    let id;
    try {
      const resTds = await request.post(`tds/`, {
        name: obj.name,
        data: obj.file,
      });
      console.log(resTds.data.id);
      id = resTds.data.id;
    } catch (e) {
      alert(e.data.message);
    } finally {
      const resTdsProduct = await request.post(
        `products/${state_manager.card_id}/tds`,
        {
          tds_id: Number(id),
          lang_id: Number(obj.language),
        }
      );
      console.log(resTdsProduct);
    }
  };

  getProductionTds = async () => {
    const res = await request.get(`products/${state_manager.card_id}/tds`);
    console.log(res.data["data"]);
    return (this.production_tds = res.data["data"]);
  };

  patchLanguage = async () => {
    console.log(state_manager.this_language);
    const res = await request.patch(
      `languages/${state_manager.this_language.id}`,
      {
        name: state_manager.this_language.name,
        abbreviation: state_manager.this_language.abbreviation,
      }
    );

    console.log(res);
    return res.status;
  };
}

export default new apiData();
