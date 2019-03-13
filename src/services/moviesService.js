import {
  apiUrl,
  apiKey,
  currentYearMovies,
  movieInfo,
  moviesURL
} from "../config.json";
import http from "./httpService";

let allMovies = [];

export function getCurrentYearMovies() {
  return http.get(moviesURL);
}

export function getPageMovies(pageNum) {
  /**1- get num of pages
   * 2-loop over this num of pages
   * 3- append movies of each page to the current movies list
   * 4- return this list
   */
  //   const moviesUrl = apiUrl + currentYearMovies + apiKey;
  //   const moviesList = http.get(moviesUrl);
  //   const moviesCount = moviesList.total_pages;
  //   return moviesCount;
  return http.get(moviesURL + "&page=" + pageNum);
}

export function getMovieInfo(id) {
  console.log("here in get movie info : " + id);
  console.log("Request : " + movieInfo + id + "?" + apiKey);
  return http.get(movieInfo + id + "?" + apiKey);
}

export function getMovieCast(id) {
  console.log("here in get movie cast : " + id);
  console.log("Request : " + movieInfo + id + "/casts?" + apiKey);
  return http.get(movieInfo + id + "/casts?" + apiKey);
}
