import getData from "./tmdbApi.js";
import makeModal from "./modal.js";
//img Url 의 기본형
const imgUrlMain = "https://image.tmdb.org/t/p/w1280";
//데이터 받아오기
let getDataFromApi = async (urlDetail, urlNum, word, clearPage) => {
  if (!urlDetail) {
    urlDetail = "top_rated";
  }
  if (!urlNum) {
    urlNum = 1;
  }
  if (!clearPage) {
    clearPage = false;
  }
  let url;
  // 'https://api.themoviedb.org/3/movie/278?language=en-US'
  if (urlDetail !== "top_rated") {
    url = `https://api.themoviedb.org/3/movie/${urlDetail}?language=ko-KR`;
  } else if (!word) {
    url = `https://api.themoviedb.org/3/movie/${urlDetail}?language=ko-KR&page=${urlNum}`;
  } else {
    let encodedText = encodeURIComponent(word);
    let adult = false;
    // console.log(encodedText);

    url = `https://api.themoviedb.org/3/search/movie?query=${encodedText}&include_adult=${adult}&language=ko-KR&page=${urlNum}`;
  }
  // console.log(url);

  let data = await getData(url);

  if (urlDetail !== "top_rated") {
    return data;
  }
  pageConstruct(data, clearPage);

  // console.log(data);
};
//페이지 형성
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
  // console.log(htmlData);

  htmlData.forEach((e) => {
    const newContent = document.createElement("div");
    newContent.id = e[0];
    newContent.className = "content";
    newContent.innerHTML = `
      <img id ="${e[0]}" src="${imgUrlMain + e[1]}">
    `;
    contentContainer.appendChild(newContent);
  });
};
makeModal();
//더 받아오기 부분
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
      getDataFromApi(null, 1, e.target.value.toLowerCase(), true);
      word.innerHTML = "검색 결과";
    }, 500)
  );
};

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

export default getDataFromApi;
