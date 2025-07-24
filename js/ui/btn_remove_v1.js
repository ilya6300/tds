export const btnRemove = async (text) => {
  const removeBtn = document.createElement("span");

  removeBtn.textContent = text;
  removeBtn.classList.add('btn_remove_v1')
  return removeBtn;
};
