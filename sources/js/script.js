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
pageConstruct(data);
