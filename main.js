"use strict";

import { comments } from "./api.js";
//import { renderComments } from "./renderComments.js";
import { getComments } from "./api.js";
import { postComments } from "./api.js";


const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
const buttonElement = document.getElementById("add-button");

getComments();


export const sanitizeHtml = (htmlString) => {
    return htmlString.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};

export const initLikesButtonListeners = () => {
    const likesButtonElements = document.querySelectorAll('.like-button');
    
    for (const likesButtonElement of likesButtonElements) {
      likesButtonElement.addEventListener('click', (event) => {
      event.stopPropagation();
      const index = likesButtonElement.dataset.index;

      const comment = comments[index];
      comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
      comment.isLiked = !comment.isLiked;

      //renderComments();
      });
    };
}

export const initQuoteCommentListeners = () => {
    const quoteCommentElements = document.querySelectorAll('.comment');

    for (const quoteCommentElement of quoteCommentElements) {
      quoteCommentElement.addEventListener('click', () => {
        document.getElementById("text-input").value = quoteCommentElement.dataset.comment;

        //renderComments();
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
    //renderComments();

});