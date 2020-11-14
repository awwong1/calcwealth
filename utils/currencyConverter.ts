import '@formatjs/intl-displaynames/polyfill'
import '@formatjs/intl-displaynames/locale-data/en' // locale-data for en
import { createIntl, createIntlCache } from "@formatjs/intl";

// ISO 4217 formatted 3 letter currency code
export const SUPPORTED_CURRENCIES = [
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

export const formatCurrency = (value: number, currency: string): string =>
  intl.formatNumber(value, { style: "currency", currency });

export const getCurrencyName = (value: string): string | undefined =>
  intl.formatDisplayName(value, { type: "currency" });

export default { SUPPORTED_CURRENCIES, intl, getCurrencyName };
