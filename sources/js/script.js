import getData from "./tmdbApi.js";
import makeModal from "./modal.js";
import bookMarkedList from "./bookmarkedlist.js";
//img Url 의 기본형
const imgUrlMain = "https://image.tmdb.org/t/p/w1280";
//데이터 받아오기
let getDataFromApi = async (
  type,
  urlDetail,
  urlNum = 1,
  word,
  clearPage = false
) => {
  let url;
  // if (type === "search") {
  //   clearPage = true;
  //   let encodedText = encodeURIComponent(word);
  //   let adult = false;
  //   if (urlNum == null) {
  //     urlNum = 1;
  //   }
  //   url = `https://api.themoviedb.org/3/search/movie?query=${encodedText}&include_adult=${adult}&language=ko-KR&page=${urlNum}`;

  //   let data = await getData(url);

  //   pageConstruct(data, clearPage);
  //   console.log("??");
  // } else if (type === "main") {
  //   console.log("?");
  //   if (urlNum == null) {
  //     urlNum = 1;
  //   }
  //   urlDetail = "top_rated";
  //   url = `https://api.themoviedb.org/3/movie/${urlDetail}?language=ko-KR&page=${urlNum}`;

  //   let data = await getData(url);
  //   console.log(clearPage);

  //   pageConstruct(data, clearPage);
  // } else if (type === "modal") {
  //   url = `https://api.themoviedb.org/3/movie/${urlDetail}?language=ko-KR`;
  //   let data = await getData(url);
  //   console.log("모달?");

  //   return data;
  // } else if (type === "bookmarkData") {
  //   url = `https://api.themoviedb.org/3/movie/${urlDetail}?language=ko-KR`;
  //   let data = await getData(url);
  //   return data;
  // }
  switch (type) {
    case "search": {
      clearPage = true;
      let encodedText = encodeURIComponent(word);
      let adult = false;
      if (urlNum == null) {
        urlNum = 1;
      }
      url = `https://api.themoviedb.org/3/search/movie?query=${encodedText}&include_adult=${adult}&language=ko-KR&page=${urlNum}`;
      let data = await getData(url);
      pageConstruct(data, clearPage);
      break;
    }
    case "main": {
      if (urlNum == null) {
        urlNum = 1;
      }
      urlDetail = "top_rated";
      url = `https://api.themoviedb.org/3/movie/${urlDetail}?language=ko-KR&page=${urlNum}`;
      let data = await getData(url);

      let word = document.querySelector(".main_text");
      word.innerHTML = "TOP Rated Movie";
      pageConstruct(data, clearPage);
      break;
    }
    case "modal": {
      url = `https://api.themoviedb.org/3/movie/${urlDetail}?language=ko-KR`;
      let data = await getData(url);
      return data;
    }
    case "bookmarkData": {
      url = `https://api.themoviedb.org/3/movie/${urlDetail}?language=ko-KR`;
      let data = await getData(url);
      return data;
    }
  }
};
//페이지 형성
let pageConstruct = async (data, clearPage) => {
  // console.log(data);

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
    let bookMarked = document.querySelector(".main_text").innerHTML;
    if (bookMarked === "북마크 보기") {
      return;
    } else if (!importedData.value) {
      getDataFromApi("main", null, urlNumMore);
    } else {
      getDataFromApi("search", null, urlNumMore, importedData.value);
    }
  });
};
moreData();

getDataFromApi("main", null, 1, null);

let searchData = () => {
  let word = document.querySelector(".main_text");
  document.querySelector(".header_search").addEventListener(
    "input",
    debounce((e) => {
      if (e.target.value === "") {
        getDataFromApi("main", null, 1, null);
      } else {
        getDataFromApi("search", null, 1, e.target.value.toLowerCase(), true);
        word.innerHTML = "검색 결과";
      }
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
bookMarkedList();

export { getDataFromApi, pageConstruct };
