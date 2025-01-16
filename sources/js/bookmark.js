function bookMarkBtn(targetTagId, data) {
  let modalBookmarkBtn = document.querySelector(".modal_bookmark_btn");
  const value = JSON.parse(localStorage.getItem("bookMarkedID"));
  console.log(value);
  let inputValue = [targetTagId];
  if (value === null) {
    modalBookmarkBtn.innerHTML = "♥";
    localStorage.setItem("bookMarkedID", JSON.stringify(inputValue));
  } else if (value.includes(targetTagId)) {
    modalBookmarkBtn.innerHTML = "♡";
    const newArray = value.filter((item) => item !== targetTagId);
    localStorage.setItem("bookMarkedID", JSON.stringify(newArray));
  } else {
    modalBookmarkBtn.innerHTML = "♥";
    value.push(targetTagId);
    localStorage.setItem("bookMarkedID", JSON.stringify(value));
  }
}

export default bookMarkBtn;
