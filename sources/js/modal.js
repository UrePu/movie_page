import getDataFromApi from "./script.js";
let makeModal = () => {
  let modalPage = document.querySelector(".modal");
  let clickEvent = async (e) => {
    let targetTagId = e.target.closest(".content").id;

    if (targetTagId) {
      let data = await getDataFromApi(targetTagId, null, null, null);
      console.log(data);

      // modalPage.style.display = "flex";
    }
  };

  document
    .querySelector(".content_container")
    .addEventListener("click", clickEvent);
};

export default makeModal;
