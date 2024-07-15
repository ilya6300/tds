const loaders = async () => {
  const myLoader = document.createElement("div");
  myLoader.classList.add("loader_container");
  const loader = document.createElement("div");
  loader.classList.add("loader");
  myLoader.append(loader);
  return myLoader;
};

export const myLoader = await loaders();
