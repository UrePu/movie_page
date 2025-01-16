import { getDataFromApi, pageConstruct } from "./script.js";

async function bookMarkedList(params) {
  let word = document.querySelector(".main_text");
  document
    .querySelector(".header_bookmark")
    .addEventListener("click", async () => {
      word.innerHTML = "북마크 보기";
      const value = JSON.parse(localStorage.getItem("bookMarkedID"));
      let arr;
      if (value !== null) {
        arr = await Promise.all(
          value.map((e) => getDataFromApi("bookmarkData", e))
        );
      }
      pageConstruct({ results: arr }, true);
    });
  document
    .querySelector(".header_bookmark_main")
    .addEventListener("click", () => {
      getDataFromApi("main", null, 1, null, true);
    });
}

export default bookMarkedList;
