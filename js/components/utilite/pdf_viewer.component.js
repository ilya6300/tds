export const pdfViewer = async (b64) => {
  const viewContainer = document.createElement("div");
  viewContainer.classList.add("viewer_modal_container", "hidden");
  viewContainer.onclick = async () => {
    viewContainer.classList.add("hidden");
  };
  const iframe = document.createElement("iframe");
  iframe.src = `data:application/pdf;base64, ${b64}`;
  iframe.classList.add("viewer_modal");
  viewContainer.append(iframe);
  return viewContainer;
};
