export type currency =
  | "CAD"
  | "USD"
  | "EUR"
  | "JPY"
  | "CNY"
  | "HKD"
  | "MXN"
  | "GBP"
  | "KRW"
  | "INR";

export interface IAssets {
  chequing: number | string;
  savingTaxes: number | string;
  rainyDay: number | string;
  savingFun: number | string;
  savingTravel: number | string;
  savingPD: number | string;
  invest1: number | string;
  invest2: number | string;
  invest3: number | string;
  primaryHome: number | string;
  secondHome: number | string;
  other: number | string;
}

export interface ILiabilities {
  creditCard1: number | string;
  creditCard2: number | string;
  mortgage1: number | string;
  mortgage2: number | string;
  lineCredit: number | string;
  investmentLoan: number | string;
}
