"use strict";

//План реализации входа и регистрации:
// - Заменить АПИ (+)
// - Создать форму входа (+)
// - Перенести всю разметку в рендер функцию (+)
// - Сделать форму входа динамической (+)
// - Вытащить логин компонент в отдельный модуль (+)
// - Подключить АПИ авторизации
// - Создать форму регистрации
// - GitHub Pages

import { getComments } from "./api.js";
//import { postComments } from "./api.js";
import { initLikesButtonListeners } from "./initLikes.js";






getComments();


export const sanitizeHtml = (htmlString) => {
    return htmlString.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};


initLikesButtonListeners();


export const initQuoteCommentListeners = () => {
    const quoteCommentElements = document.querySelectorAll('.comment');

    for (const quoteCommentElement of quoteCommentElements) {
      quoteCommentElement.addEventListener('click', () => {
        document.getElementById("text-input").value = quoteCommentElement.dataset.comment;

      });
    };
}



//postComments();
getComments();


