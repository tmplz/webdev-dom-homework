export let comments = [];

const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
const buttonElement = document.getElementById("add-button");

const getComments = () => {
    return fetch("https://webdev-hw-api.vercel.app/api/v1/dmitry-buntov/comments", {
      method: "GET"
    })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date).toLocaleString().slice(0, -3),
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        };
      });

        comments = appComments;
        //renderComments();
      })
};

const postComments = () => {
    fetch("https://webdev-hw-api.vercel.app/api/v1/dmitry-buntov/comments", {
      method: "POST",
      body: JSON.stringify({
      name: nameInputElement.value,
      text: textInputElement.value,
    }),
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
    buttonElement.disabled = false;
    buttonElement.textContent = "Написать";
    nameInputElement.value = "";
    textInputElement.value = "";
  })
  .catch((error) => {
    buttonElement.disabled = false;
    buttonElement.textContent = "Написать";
    alert(Error);
    console.warn(error);
  });
    
    //renderComments();
};

export { getComments, postComments };