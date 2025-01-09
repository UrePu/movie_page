import getData from "./tmdbApi.js";
const imgUrlMain = "https://image.tmdb.org/t/p/w500";
let getDataFromApi = async (urlDetail, urlNum, word, clearPage) => {
  if (!urlDetail) {
    urlDetail = "top_rated";
    // console.log("A");
  }
  if (!urlNum) {
    // console.log("A");

    urlNum = 1;
  }
  if (!clearPage) {
    clearPage = false;
  }
  let url;
  if (!word) {
    url = `https://api.themoviedb.org/3/movie/${urlDetail}?language=ko-KR&page=${urlNum}`;
  } else {
    let encodedText = encodeURIComponent(word);
    let adult = false;
    // console.log(encodedText);

    url = `https://api.themoviedb.org/3/search/movie?query=${encodedText}&include_adult=${adult}&language=ko-KR&page=${urlNum}`;
  }
  let data = await getData(url);
  console.log(data);

  pageConstruct(data, clearPage);
};

let pageConstruct = async (data, clearPage) => {
  const contentContainer = document.querySelector(".content_container");
  if (clearPage) {
    while (contentContainer.firstChild) {
      contentContainer.removeChild(contentContainer.firstChild);
    }
  }
  let htmlData = data.results.map((d) => {
    return [d.id, d.poster_path];
  });
  htmlData.forEach((e) => {
    const newContent = document.createElement("div");
    newContent.className = "content";
    newContent.innerHTML = `
    <div id ="${e[0]}" class="">
      <img src="${imgUrlMain + e[1]}">
    `;
    contentContainer.appendChild(newContent);
  });
};
let moreData = (totalPage) => {
  let urlNumMore = 1;
  let importedData = document.querySelector(".header_search");
  document.querySelector(".main_more").addEventListener("click", () => {
    urlNumMore++;
    if (!importedData) {
      getDataFromApi(null, urlNumMore);
    } else {
      getDataFromApi(null, urlNumMore, importedData.value);
    }
  });
};
moreData();
getDataFromApi(null, 1, null);

let searchData = () => {
  let word = document.querySelector(".main_text");
  document.querySelector(".header_search").addEventListener(
    "input",
    debounce((e) => {
      getDataFromApi(null, 1, e.target.value, true);
      word.innerHTML = "검색 결과";
    }, 1000)
  );
};

// let scrollDown = () => {
//   window.addEventListener(
//     "scroll",
//     debounce((e) => {
//       moreData();
//     }, 1000)
//   );
// };
function debounce(func, delay) {
  // timeoutID를 할당할 변수를 선언합니다.
  let timer = null;

  // timer 변수에 접근 가능한 클로저 함수를 반환합니다.
  return function (...args) {
    // 만약 타이머가 존재한다면 타이머를 취소시킵니다.
    if (timer) {
      clearTimeout(timer);
    }

    // 타이머를 새로 만듭니다.
    timer = setTimeout(() => func(...args), delay);
  };
}
searchData();
