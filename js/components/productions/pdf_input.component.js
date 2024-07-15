import {
  createImgIconSearchPdf,
  tds,
  tdsContainer,
} from "../../core/tds.component.js";
import { btnV1 } from "../../ui/btn_v1.js";
import { pdfViewer } from "../utilite/pdf_viewer.component.js";

export const createinptFile = async (id, dom) => {
  const file = document.createElement("input");
  const labelFile = document.createElement("label");
  labelFile.classList.add("file_input_btn_container");
  const labelBtn = document.createElement("span");
  labelBtn.textContent = "Загрузить файл";
  labelBtn.classList.add("file_input_btn");
  labelFile.append(file);
  const fileName = document.createElement("span");
  labelFile.append(labelBtn, fileName);
  file.classList.add("hidden");
  file.type = "file";
  file.id = id;
  file.accept = "application/pdf";
  file.onchange = async (e) => {
    try {
      console.log(e.target.files[0].type);
      if (e.target.files[0].type !== "application/pdf") {
        return alert("Необходимо загрузить файл в формате pdf");
      }
      fileName.textContent = e.target.files[0].name;
      console.log(e);
      await sendFile(e.target.files[0], id, dom);
    } catch (e) {
      console.error(e);
    }
  };
  return labelFile;
};

export const sendFile = async (file, id, dom) => {
  console.log(id, file);
  try {
    const reader = new FileReader();
    reader.onload = async () => {
      //   console.log(file);
      console.log(tds.find(async (t) => t.id == id));
      tds.forEach(async (t) => {
        if (t.id == id) {
          console.log(t);
          // console.log(
          //   reader.result.replace(/data:application\/pdf;base64,/g, "")
          // );
          t.file = reader.result.replace(/data:application\/pdf;base64,/g, "");
          console.log(t);
          t.name = file.name;
          dom.append(await pdfViewer(t.file, id));
        }

        //   console.log(dom);
      });
    };
    return reader.readAsDataURL(file);
  } catch (e) {
    console.log(e);
  } finally {
    await createImgIconSearchPdf(id, dom);
  }
};
