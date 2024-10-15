/* eslint-disable no-undef */
export const toCurrency = (val) => {
  const formatted = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(val);
  return formatted.split(".")[1] === "00" ? formatted.split(".")[0] : formatted;
};

export const ParseFloat = (num) => {
  num = num.toString();
  if (num.indexOf(".") !== -1) num = num.slice(0, num.indexOf(".") + 2 + 1);
  return Number(num);
};
