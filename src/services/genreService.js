import { genresUrl } from "../config.json";
import http from "./httpService";
export function getAllGenres() {
  return http.get(genresUrl);
}
