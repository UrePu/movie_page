import apiKey from "./apikey.js";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: apiKey,
  },
};
let getData = async (url) => {
  let data = await fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  // console.log(data);

  return data;
};
export default getData;
