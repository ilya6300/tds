import { request } from "./api.config.js";

class apiData {
  getProduction = async () => {
    try {
      const res = await request.get(`products/`);
      console.log(res.data);
      return res.data["data"];
    } catch (e) {
      if (e.status === undefined) {
        alert("Ошибка сервера");
      }
      console.log(e);
    }
  };

  getLanguange = async () => {
    const res = await request.get("languages/");
    // console.log(res.data);
    return res.data["data"];
  };
}

export default new apiData();
