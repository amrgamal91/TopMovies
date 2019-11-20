import _ from "lodash";

//pagination method : test
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
  let arr = [];
  for (let i = currentYear; i >= firstYear; i--) arr.push(i);
  return ["All Years", ...arr];
}
