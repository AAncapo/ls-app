/* eslint-disable no-undef */
export const toCurrency = (val) => {
  const formatted = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(val);
  return formatted.split(".")[1] === "00" ? formatted.split(".")[0] : formatted;
};
