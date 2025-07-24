import { url } from "../service/api.config.js";

class apiAuth {
  authorize = async (data) => {
    try {
      const res = await axios.post(`${url}auth/`, data);
      if (res.status === 200) {
        localStorage.setItem(
          "User",
          JSON.stringify({
            token: res.data.data,
            user: data.username,
          })
        );
        window.location.href = "index.html";
      }
    } catch (e) {
      console.error(e);
      if (e.response.status === 401) {
        localStorage.removeItem("User");
        return alert(e.response.data.detail);
      }
    }
  };
}

export default new apiAuth();
