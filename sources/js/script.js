import getData from "./tmdbApi.js";
const imgUrlMain = "https://image.tmdb.org/t/p/w500";
let getDataFromApi = async (urlDetail, urlNum, word) => {
  if (!urlDetail) {
    urlDetail = "top_rated";
    // console.log("A");
  }
  if (!urlNum) {
    // console.log("A");

    urlNum = 1;
  }
  let url;
  if (!word) {
    url = `https://api.themoviedb.org/3/movie/${urlDetail}?language=ko-KR&page=${urlNum}`;
  } else {
    let encodedText = encodeURIComponent(word);
    let adult = true;
    console.log(encodedText);

    url = `https://api.themoviedb.org/3/search/movie?query=${encodedText}&include_adult=${adult}&language=ko-KR&page=${urlNum}`;
  }
  let data = await getData(url);

  pageConstruct(data);
};

let pageConstruct = async (data) => {
  let htmlData = data.results.map((d) => {
    return [d.id, d.poster_path];
  });
  const contentContainer = document.querySelector(".content_container");
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

let searchData = () => {};
