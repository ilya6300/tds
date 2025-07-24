import { request } from "../../../service/api.config.js";
import { createImgIconSearchPdf, tds } from "../../core/tds.component.js";
import { pdfViewer } from "../utilite/pdf_viewer.component.js";

export const createinptFile = async (id, dom) => {
  // Создание input
  const file = document.createElement("input");
  const labelFile = document.createElement("label");
  labelFile.classList.add("file_input_btn_container");
  // const labelBtn = document.createElement("span");
  // labelBtn.textContent = "Загрузить файл";
  // labelBtn.classList.add("file_input_btn");
  labelFile.append(file);
  const fileName = document.createElement("span");

  file.classList.add("hidden");
  file.type = "file";
  file.id = id;
  file.accept = "application/pdf";

  // Обработчик change вынесен отдельно
  const handleFileChange = async (e) => {
    try {
      if (e.target.files[0].type !== "application/pdf") {
        return alert("Необходимо загрузить файл в формате pdf");
      }
      fileName.textContent = e.target.files[0].name;
      await sendFile(e.target.files[0], id, dom);
    } catch (e) {
      console.error(e);
    }
  };

  file.addEventListener("change", handleFileChange);

  // Создание drag and drop
  const dragAndDropInputComponent = async () => {
    const dropComponent = document.createElement("div");
    dropComponent.ondragover = (e) => {
      e.preventDefault();
      dropComponent.classList.remove("drag_tds");
      dropComponent.classList.add("dragover_tds");
    };

    dropComponent.ondrop = (e) => {
      e.preventDefault();
      dropComponent.classList.remove("dragover_tds");

      // Получаем перетащенные файлы
      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) {
        // Создаем новый DataTransfer и добавляем файл
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(droppedFiles[0]);

        // Устанавливаем файлы для input
        file.files = dataTransfer.files;
        dropComponent.textContent = "";
        // Триггерим событие change вручную
        const event = new Event("change");
        file.dispatchEvent(event);
      }
    };

    dropComponent.ondragleave = (e) => {
      e.preventDefault();
      dropComponent.classList.add("drag_tds");
      dropComponent.classList.remove("dragover_tds");
    };

    dropComponent.classList.add("drag_tds");
    dropComponent.textContent = "Загрузить ТДС";
    return dropComponent;
  };

  labelFile.append(fileName, await dragAndDropInputComponent());
  return labelFile;
};


export const sendFile = async (file, id, dom) => {
  try {
    tds.forEach(async (t) => {
      if (t.id == id) {
        t.file = file;
        t.name = file.name;

        const reader = new FileReader();
        reader.onload = async () => {
          dom.append(
            await pdfViewer(
              reader.result.replace(/data:application\/pdf;base64,/g, ""),
              id
            )
          );
        };
        reader.readAsDataURL(file);
      }
    });
  } catch (e) {
    console.error(e);
  } finally {
    await createImgIconSearchPdf(id, dom);
  }
};
