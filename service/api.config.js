export const url = "http://10.76.10.122:8083/";

export const request = axios.create({
  baseURL: url,
});
request.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${
    JSON.parse(localStorage.getItem("User"))["token"]
  }`;
  return config;
});
request.interceptors.response.use(
  (config) => {
    return config;
  },
  (e) => {
    if (JSON.parse(localStorage.getItem("User")) === null) {
      console.log("нет токена");
      if (window.location.pathname !== "/login.html") {
        return (window.location.href = "../login.html");
      }
    }
    if (e.response.status === 401) {
      localStorage.removeItem("User");
      alert(e.response.data.detail);
      return (window.location.href = "../login.html");
    }
    console.log(e.response);
    throw e;
  }
);
