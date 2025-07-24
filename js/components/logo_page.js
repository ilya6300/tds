export const logoPage = async () => {
  const logoImg = document.createElement("img");
  logoImg.src = "img/logo_page.png";
  logoImg.classList.add("logo_page");
  return logoImg;
};
