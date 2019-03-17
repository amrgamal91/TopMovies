import { apiKey, movieInfo, moviesURL } from "../config.json";
import http from "./httpService";

export function getYearMovies(year) {
  return http.get(moviesURL + year);
}

/**
 * 1- get num of pages
 * 2-loop over this num of pages
 * 3- append movies of each page to the current movies list
 * 4- return this list
 */
export function getPageMovies(pageNum, year) {
  return http.get(moviesURL + year + "&page=" + pageNum);
}

export function getMovieInfo(id) {
  return http.get(movieInfo + id + "?" + apiKey);
}

export function getMovieCast(id) {
  return http.get(movieInfo + id + "/casts?" + apiKey);
}
