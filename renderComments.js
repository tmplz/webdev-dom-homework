import { comments } from "./api.js";
import { sanitizeHtml } from "./main.js";
import { initLikesButtonListeners } from "./initLikes.js";
import { initQuoteCommentListeners } from "./main.js";
import { postComments, setToken, token } from "./api.js";
import { renderLoginComponent } from "./components/login-component.js";
import { format } from "date-fns";


const host = "https://wedev-api.sky.pro/api/v2/dmitry-buntov/comments";



export const renderComments = () => {
  const appEl = document.getElementById("app");
  if(!token) {
    renderLoginComponent({ 
      appEl, 
      setToken,
      renderComments,
    });

    return;
  }




  const commentsHtml = comments.map((comment, index) => {
    const createDate = format(new Date(comment.date), 'yyyy-MM-dd hh.mm.ss');
    return `<li class="comment" data-comment="< ${comment.text} \n ${comment.name}">
      <div class="comment-header">
        <div>
          ${sanitizeHtml(comment.name)}
        </div>
        <div>
          ${createDate}
        </div>
      </div>
      <div class="comment-body">
        <div class="comment-text" white-space: pre-line>
          ${sanitizeHtml(comment.text)}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button data-index="${index}" class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
        </div>
      </div>
    </li>`
  }).join("");


  const appHtml = `  
  <div class="container">
    <ul class="comments" id="list-comments">
     ${commentsHtml}  
    </ul>
     ${
      token
      ? `<div class="add-form">
        <input
          type="text"
          class="add-form-name"
          id="name-input"
          placeholder="Введите ваше имя"
        />
        <textarea
          type="textarea"
          class="add-form-text"
          id="text-input"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button" id="add-button">Написать</button>
        </div>
      </div>`
      :
        `<a href="">
        Войти
        ${renderComments()}
        </a>`
      }
      </div>`;

    

    appEl.innerHTML = appHtml;



    const listElement = document.getElementById("list-comments");
    const nameInputElement = document.getElementById("name-input");
    const textInputElement = document.getElementById("text-input");
    const buttonElement = document.getElementById("add-button");

    appEl.classList.remove('comments');
    appEl.classList.add('comments');

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


    initLikesButtonListeners();
    initQuoteCommentListeners();

};

//renderComments();


