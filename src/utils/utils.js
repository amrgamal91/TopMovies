import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}

export function getYears() {
  var firstYear = "1920";
  var currentYear = new Date().getFullYear();

  let arr = Array();

  for (let i = currentYear; i >= firstYear; i--) arr.push(i);
  return arr;
}
