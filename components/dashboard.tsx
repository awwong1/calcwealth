import { Component, ReactEventHandler } from "react";
import DashboardView from "./dashboardView";

type IProps = Record<string, unknown>;

interface IState {
  selectedCurrency: string;
  assets: {
    chequing: number;
    savingTaxes: number;
    rainyDay: number;
    savingFun: number;
    savingTravel: number;
    savingPD: number;
    invest1: number;
    invest2: number;
    invest3: number;
    primaryHome: number;
    secondHome: number;
    other: number;
  };
  liabilities: {
    creditCard1: number;
    creditCard2: number;
    mortgage1: number;
    mortgage2: number;
    lineCredit: number;
    investmentLoan: number;
  };
}

class DashboardController extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedCurrency: "CAD",
      assets: {
        chequing: 0.0,
        savingTaxes: 0.0,
        rainyDay: 0.0,
        savingFun: 0.0,
        savingTravel: 0.0,
        savingPD: 0.0,
        invest1: 0.0,
        invest2: 0.0,
        invest3: 0.0,
        primaryHome: 0.0,
        secondHome: 0.0,
        other: 0.0,
      },
      liabilities: {
        creditCard1: 0.0,
        creditCard2: 0.0,
        mortgage1: 0.0,
        mortgage2: 0.0,
        lineCredit: 0.0,
        investmentLoan: 0.0,
      },
    };
  }

  handleCurrencySelect: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    this.setState({ selectedCurrency: e.target.value });
    // todo: update all assets and liability calculations
  };

  render = (): JSX.Element => (
    <DashboardView
      currency={this.state.selectedCurrency}
      assets={this.state.assets}
      liabilities={this.state.liabilities}

      handleCurrencySelect={this.handleCurrencySelect}
    />
  );
}

export default DashboardController;
