export let comments = [];

import { renderComments } from "./renderComments.js";


// const nameInputElement = document.getElementById("name-input");
// const textInputElement = document.getElementById("text-input");
// const buttonElement = document.getElementById("add-button");

const host = "https://wedev-api.sky.pro/api/v2/dmitry-buntov/comments";
let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

export const getComments = () => {
    return fetch(host, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        };
      });

        comments = appComments;
        renderComments();
      })
};

export const postComments = () => {
  const nameInputElement = document.getElementById("name-input");
  const textInputElement = document.getElementById("text-input");
  const buttonElement = document.getElementById("add-button");
  fetch(host, {
      method: "POST",
      body: JSON.stringify({
        name: nameInputElement.value,
        text: textInputElement.value,
      }),
      headers: {
        Authorization: token,
      },
  })
  .then((response) => {
    if (response.status === 201) {
      return response.json();
    } else if (response.status === 400) {
      throw new Error("Имя и комментарий не должны быть меньше 3х символов");
    } else {
      throw new Error("Сервер упал");
    }
  })
  .then(() => {
    return getComments();
  })
  .then(() => {
    buttonElement.disabled = true;
    buttonElement.textContent = "Написать";
    nameInputElement.value = "";
    textInputElement.value = "";
  })
  .catch((error) => {
    buttonElement.disabled = true;
    buttonElement.textContent = "Написать";
    alert(Error);
    console.warn(error);
  });

  //renderComments();
};


export function loginComments({ login, password }) {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if(response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  })
}