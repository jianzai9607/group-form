export const capitalFirstOnly = (text) =>
  `${text[0].toUpperCase()}${text.substring(1).toLowerCase()}`;

export const capitalFirstofEach = (text) =>
  text
    .split(" ")
    .map((str) => str.capitalFirstOnly)
    .join(" ");
