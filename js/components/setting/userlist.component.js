import apiData from "../../../service/api.data.js";
import state_manager from "../../state_manager.js";
import { btnRemove } from "../../ui/btn_remove_v1.js";
import { btnV1 } from "../../ui/btn_v1.js";
import { confurmation } from "../modal_confurmation.component.js";
import { previewContainer } from "./setting.component.js";

const newUser = {
  username: "",
  password: "",
  repet: "",
};

export const userList = async () => {
  const textUseruages = document.createElement("li");
  textUseruages.textContent = "Пользователи";
  textUseruages.classList.add("setting_item");
  textUseruages.onclick = async () => {
    previewContainer.classList.remove("hidden");
    previewContainer.innerHTML = "";
    await getUsers();
  };
  return textUseruages;
};

const getUsers = async () => {
  previewContainer.innerHTML = "";
  await state_manager.getUsersFunc();
  const userTitle = document.createElement("li");
  userTitle.textContent = "Пользователи в системе";
  previewContainer.append(userTitle);
  const userAdd = document.createElement("li");
  userAdd.textContent = "Добавить пользователя в систему";
  userAdd.classList.add("setting_item");
  userAdd.onclick = async () => {
    previewContainer.append(await addUser());
  };
  setTimeout(async () => {
    await getUsersArhiveFalse();
  }, 5);
  setTimeout(async () => {
    await getUserArhiveTrue();
  }, 100);

  previewContainer.append(userAdd);
};

const getUsersArhiveFalse = async () => {
  state_manager.users.sort_users.archivedFalse.map(async (u) => {
    const itemPrev = document.createElement("li");
    itemPrev.textContent = `${u.username}`;
    itemPrev.classList.add("setting_item");

    const archiveItem = await btnRemove("Архивировать");

    archiveItem.onclick = async () => {
      const confurmBtn = await btnV1();
      confurmBtn.textContent = "Архивировать";
      confurmBtn.onclick = async () => {
        apiData.deleteUser(u.id);
        setTimeout(async () => {
          await getUsers();
        }, 200);
      };
      previewContainer.append(
        await confurmation(
          `Вы хотите архивировать пользователя - ${u.username}?`,
          confurmBtn
        )
      );
    };
    itemPrev.append(archiveItem);
    previewContainer.append(itemPrev);
  });
};

const getUserArhiveTrue = async () => {
  state_manager.users.sort_users.archivedTrue.map(async (l) => {
    const itemPrev = document.createElement("li");
    itemPrev.innerHTML = `<span>${l.username}</span><span> (в архиве)</span>`;
    itemPrev.classList.add("setting_item", "archived_item");
    previewContainer.append(itemPrev);
  });
};

const addUser = async () => {
  previewContainer.innerHTML = "";
  const bodyContainer = document.createElement("ul");
  const title = document.createElement("li");
  title.textContent = "Добавление нового пользователя в систему.";
  title.classList.add("grey_info");
  bodyContainer.append(title);
  bodyContainer.append(
    await createRowUser("Введите имя", "Имя нового пользователя", "username")
  );
  bodyContainer.append(
    await createRowUser(
      "Введите пароль",
      "Пароль нового пользователя",
      "password"
    )
  );
  bodyContainer.append(
    await createRowUser(
      "Повторите пароль",
      "Пароль нового пользователя",
      "repet"
    )
  );
  const btnContainer = document.createElement("li");
  btnContainer.classList.add("setting_btn_container");
  const save = await btnV1();
  save.textContent = "Сохранить";
  save.onclick = async () => {
    if (newUser.username.length <= 2) {
      return alert("Слишком короткое имя, введите минимум 3 символа");
    }
    if (newUser.repet !== newUser.password) {
      return alert("Пароли не совпадают");
    }
    try {
      await apiData.postUser(newUser.username, newUser.password);
      await getUsers();
    } catch (e) {
      console.error(e);
    }
  };
  btnContainer.append(save);

  const closed = await btnV1();
  closed.textContent = "Закрыть";
  closed.onclick = async () => {
    // await getLang();
  };
  btnContainer.append(closed);
  bodyContainer.append(btnContainer);
  return bodyContainer;
};

const createRowUser = async (name, placeholder, obj) => {
  const ul = document.createElement("ul");
  const text = document.createElement("li");
  text.textContent = name;
  text.classList.add("grey_info", "setting_item");
  ul.append(text);
  const inpt = document.createElement("input");
  inpt.placeholder = placeholder;
  inpt.classList.add("setting_inpt");
  inpt.onchange = async (e) => {
    newUser[`${obj}`] = e.target.value;
  };
  ul.append(inpt);
  return ul;
};
