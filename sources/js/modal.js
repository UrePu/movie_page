import getDataFromApi from "./script.js";
let makeModal = () => {
  let modalPage = document.querySelector(".modal");
  let clickEvent = async (e) => {
    if (e.target.id) {
      let data = await getDataFromApi(e.target.id, null, null, null);

      modalPage.style.display = "flex";
    }
  };

  document
    .querySelector(".content_container")
    .addEventListener("click", clickEvent);
};

export default makeModal;
