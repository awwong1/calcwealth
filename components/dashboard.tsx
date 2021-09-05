import { Component, FocusEventHandler } from "react";
import DashboardView from "./dashboardView";
import fetchTimeout from "../utils/fetchTimeout";
import { ratesPayload } from "../pages/api/exchange";
import { IAssets, ILiabilities } from "../types";
import { convertCurrency } from "../utils/convertCurrency";

type IProps = Record<string, unknown>;

interface IState {
  loading: boolean;
  selectedCurrency: string;
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  rates?: ratesPayload;
  assets: IAssets;
  liabilities: ILiabilities;
}

class DashboardController extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: false,
      selectedCurrency: "CAD",
      totalAssets: 0,
      totalLiabilities: 0,
      netWorth: 0,
      assets: {
        chequing: "",
        savingTaxes: "",
        rainyDay: "",
        savingFun: "",
        savingTravel: "",
        savingPD: "",
        invest1: "",
        invest2: "",
        invest3: "",
        primaryHome: "",
        secondHome: "",
        other: "",
      },
      liabilities: {
        creditCard1: "",
        creditCard2: "",
        mortgage1: "",
        mortgage2: "",
        lineCredit: "",
        investmentLoan: "",
      },
    };
  }

  componentDidMount = (): void => {
    this.retrieveRates();
  };

  /**
   * Take home specification: Call REST API to determine currency conversion rates.
   */
  retrieveRates = async (): Promise<void> => {
    try {
      this.setState(() => ({ loading: true }));
      const res = await fetchTimeout("/api/exchange");
      const rates = await res.json();
      this.setState(() => ({ rates }));
    } catch (err) {
      console.error(err);
    } finally {
      this.setState(() => ({ loading: false }));
    }
  };

  /**
   * Take home specification: Call REST API to calculate total assets, liabilities, and net worth.
   */
  calculateNetWorth = async (
    curAssets: IAssets,
    curLiabilities: ILiabilities
  ): Promise<void> => {
    try {
      this.setState(() => ({ loading: true }));
      const res = await fetchTimeout("/api/networth", {
        method: "POST",
        body: JSON.stringify({
          assets: Object.values(curAssets),
          liabilities: Object.values(curLiabilities),
        }),
      });
      const { totalAssets, totalLiabilities, netWorth } = await res.json();
      this.setState(() => ({ totalAssets, totalLiabilities, netWorth }));
    } catch (err) {
      console.error(err);
    } finally {
      this.setState(() => ({ loading: false }));
    }
  };

  handleCurrencySelect: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (this.state.rates) {
      const prevCurrency = this.state.selectedCurrency;
      const nextCurrency = e.target.value;
      const { assets, liabilities } = convertCurrency(
        prevCurrency,
        nextCurrency,
        this.state.rates,
        {
          assets: this.state.assets,
          liabilities: this.state.liabilities,
        }
      );
      this.setState({ assets, liabilities, selectedCurrency: nextCurrency });
      this.calculateNetWorth(assets, liabilities);
    }
  };

  handleOnBlur: FocusEventHandler = async () => {
    this.calculateNetWorth(this.state.assets, this.state.liabilities);
  };

  handleAssetChange = (assetKey: keyof IAssets) => {
    return (valueAsString: string): void => {
      const assetChange = { ...this.state.assets, [assetKey]: valueAsString };
      this.setState(() => ({ assets: assetChange }));
    };
  };

  handleLiabilityChange = (liabilityKey: keyof ILiabilities) => {
    return (valueAsString: string): void => {
      const liabilityChange = {
        ...this.state.liabilities,
        [liabilityKey]: valueAsString,
      };
      this.setState(() => ({ liabilities: liabilityChange }));
    };
  };

  render = (): JSX.Element => {
    const { conversion_rates } = this.state.rates || { conversion_rates: {} };
    const selectedRate = conversion_rates[this.state.selectedCurrency];
    const supportedCurrencies = Object.keys(conversion_rates) || ["CAD"];
    return <DashboardView
      loading={this.state.loading}
      selectedCurrency={this.state.selectedCurrency}
      selectedRate={selectedRate}
      supportedCurrencies={supportedCurrencies}
      totalAssets={this.state.totalAssets}
      totalLiabilities={this.state.totalLiabilities}
      netWorth={this.state.netWorth}
      assets={this.state.assets}
      liabilities={this.state.liabilities}
      handleCurrencySelect={this.handleCurrencySelect}
      handleAssetChange={this.handleAssetChange}
      handleLiabilityChange={this.handleLiabilityChange}
      handleOnBlur={this.handleOnBlur}
    />
  };
}

export default DashboardController;
