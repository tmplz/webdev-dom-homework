import { comments } from "./api.js";
import { sanitizeHtml } from "./main.js";
//import { initLikesButtonListeners } from "./main.js";
//import { initQuoteCommentListeners } from "./main.js";

const listElement = document.getElementById("list-comments");

export const renderComments = () => {
    listElement.classList.remove('comments');
    
    const commentsHtml = comments.map((comment, index) => {
      return `<li class="comment" data-comment="< ${comment.text} \n ${comment.name}">
        <div class="comment-header">
          <div>
            ${sanitizeHtml(comment.name)}
          </div>
          <div>
            ${comment.date}
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
    listElement.innerHTML = commentsHtml;

    listElement.classList.add('comments');

    //initLikesButtonListeners();
    //initQuoteCommentListeners();
};


