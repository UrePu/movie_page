import getDataFromApi from "./script.js";
import bookMarkBtn from "./bookmark.js";
let makeModal = () => {
  let container = document.querySelector(".container");
  let clickEvent = async (e) => {
    let targetTagId = Number(e.target.closest(".content").id);
    if (targetTagId) {
      let data = await getDataFromApi(targetTagId, null, null, null);
      // console.log(data);

      let modalHtml = document.createElement("div");
      modalHtml.className = "modal";
      modalHtml.innerHTML = `
        <div class="modal_body">
          <div class="modal_btn">
            <div class="modal_bookmark_btn">♡</div>
            <div class="modal_close_btn">X</div>
          </div>
          <div class="modal_img" style="background : linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 10%,
          rgba(0, 0, 0, 0.3) 25%,
          rgba(0, 0, 0, 0.4) 40%,
          rgba(0, 0, 0, 0.6) 50%,
          rgba(0, 0, 0, 0.7) 75%,
          rgba(0, 0, 0, 1) 100%
        ),
        url('https://image.tmdb.org/t/p/w1280/${data.backdrop_path}');background-size:cover">
            <div class="modal_title">${data.title}</div>
          </div>
          <div class="modal_text_container">
            <div class="modal_text">
              <div class="modal_detail_when">개봉일:${data.release_date}</div>
              <div class="modal_detail_main_text">${data.overview}</div>
              <div class="modal_detail_score">평점:${data.vote_average}</div>
            </div>
          </div>
        </div>
      `;

      container.appendChild(modalHtml);
      let modalContainer = document.querySelector(".modal");
      // console.log(modalContainer);

      modalContainer.addEventListener("click", (e) => {
        // console.log(e.target.className);
        if (
          e.target.className === "modal" ||
          e.target.className === "modal_close_btn"
        ) {
          container.removeChild(modalHtml);
        }
        if (e.target.className === "modal_bookmark_btn") {
          bookMarkBtn(data.id);
        }
      });
    }
  };

  document
    .querySelector(".content_container")
    .addEventListener("click", clickEvent);
};

export default makeModal;
