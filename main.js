"use strict";

import { getComments } from "./api.js";
import { postComments } from "./api.js";
import { initLikesButtonListeners } from "./initLikes.js";


const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
const buttonElement = document.getElementById("add-button");

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


buttonElement.addEventListener('click', () => {
    nameInputElement.classList.remove("error");
    textInputElement.classList.remove("error");
    
    if(nameInputElement.value === '') {
      nameInputElement.classList.add("error");
      return;
    }

    if(textInputElement.value === '') {
      textInputElement.classList.add("error");
      return;
    }

    buttonElement.disabled = true;
    buttonElement.textContent = "Комментарий добавляется...";

 
    postComments();
});