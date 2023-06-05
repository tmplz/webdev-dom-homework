import { renderComments } from "./renderComments.js";
import { comments } from "./api.js";



export const initLikesButtonListeners = () => {
    const likesButtonElements = document.querySelectorAll('.like-button');
    
    for (const likesButtonElement of likesButtonElements) {
      likesButtonElement.addEventListener('click', (event) => {
      event.stopPropagation();
      const index = likesButtonElement.dataset.index;

      const comment = comments[index];
      comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
      comment.isLiked = !comment.isLiked;

      renderComments();
      });
    };
}