import "@formatjs/intl-displaynames/polyfill";
import "@formatjs/intl-displaynames/locale-data/en"; // locale-data for en
import { createIntl, createIntlCache } from "@formatjs/intl";
import { ratesPayload } from "../pages/api/exchange";
import { currency, IAssets, ILiabilities } from "../types";

// ISO 4217 formatted 3 letter currency code
export const SUPPORTED_CURRENCIES: currency[] = [
  "CAD",
  "USD",
  "EUR",
  "JPY",
  "CNY",
  "HKD",
  "MXN",
  "GBP",
  "KRW",
  "INR",
];

const cache = createIntlCache();
const intl = createIntl(
  {
    locale: "en-US",
    messages: {},
  },
  cache
);

export const convertCurrency = (
  prevCurrency: currency,
  nextCurrency: currency,
  { rates }: ratesPayload,
  { assets, liabilities }: { assets: IAssets; liabilities: ILiabilities }
): { assets: IAssets; liabilities: ILiabilities } => {
  const base = rates[prevCurrency];
  const multiplier = rates[nextCurrency];

  const convert = ([key, value]: [string, string | number]) => {
    let numValue: number;
    if (typeof value === "string") {
      try {
        numValue = Number.parseFloat(value || "0");
      } catch {
        numValue = 0;
      }
    } else {
      numValue = value;
    }
    if (numValue === 0) {
      return [key, ""];
    }
    return [key, (numValue / base) * multiplier];
  };

  return {
    assets: Object.fromEntries(Object.entries(assets).map(convert)) as IAssets,
    liabilities: Object.fromEntries(
      Object.entries(liabilities).map(convert)
    ) as ILiabilities,
  };
};

export const formatCurrency = (
  value: number | string,
  cur: currency
): string => {
  if (typeof value === "string") {
    try {
      return intl.formatNumber(Number.parseFloat(value || "0"), {
        style: "currency",
        currency: cur,
      });
    } catch (e) {
      return intl.formatNumber(0, { style: "currency", currency: cur });
    }
  } else {
    return intl.formatNumber(value, { style: "currency", currency: cur });
  }
};

export const getCurrencyName = (value: currency): string | undefined =>
  intl.formatDisplayName(value, { type: "currency" });

export default { SUPPORTED_CURRENCIES, intl, getCurrencyName };
