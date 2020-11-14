import {
  Container,
  Grid,
  GridItem,
  Heading,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

import {
  SUPPORTED_CURRENCIES,
  formatCurrency,
  getCurrencyName,
} from "../utils/currencyConverter";

interface IProps {
  currency: string;
  netWorth?: number;
  totalAssets?: number;
  totalLiabilities?: number;
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

  // callback event handlers
  handleCurrencySelect: React.ChangeEventHandler<HTMLSelectElement>;
}

const DashboardView = ({
  currency,
  netWorth,
  handleCurrencySelect,
}: IProps): JSX.Element => {
  return (
    <Container paddingY="1em">
      <Grid
        gap={"1em"}
        alignItems="center"
        gridTemplateColumns={"auto auto auto"}
        gridTemplateRows="auto"
        gridTemplateAreas={`
          ". currency currencySelect"
          "netWorth netWorth netWorth"
          "assetsHeader . ."
          "cashAndInvestments . ."
          "chequing . chequingInp"
          "savingTaxes . savingTaxesInp"
          "rainyDay . rainyDayInp"
          "savingFun . savingFunInp"
          "savingTravel . savingTravelInp"
          "savingPD . savingPDInp"
          "invest1 . invest1Inp"
          "invest2 . invest2Inp"
          "invest3 . invest3Inp"
          "longTermAssetsHeader . ."
          "primaryHome . primaryHomeInp"
          "secondHome . secondHomeInp"
          "other . otherInp"
        `}
      >
        {/* Currency selector*/}
        <GridItem gridArea="currency" justifySelf="end">
          <Heading as="h6" size="xs">
            Select Currency
          </Heading>
        </GridItem>
        <GridItem gridArea="currencySelect">
          <Select
            variant="outline"
            placeholder="Select Currency"
            value={currency}
            onChange={handleCurrencySelect}
          >
            {SUPPORTED_CURRENCIES.map((curCode) => (
              <option key={curCode} value={curCode}>
                {getCurrencyName(curCode)}
              </option>
            ))}
          </Select>
        </GridItem>

        {/* Net worth display*/}
        <GridItem gridArea="netWorth">
          <Stat>
            <StatLabel>Net Worth</StatLabel>
            <StatNumber>{formatCurrency(netWorth || 0.0, currency)}</StatNumber>
          </Stat>
        </GridItem>

        {/* Assets */}
        <GridItem gridArea="assetsHeader">
          <Heading as="h5" size="sm">
            Assets
          </Heading>
        </GridItem>
        <GridItem gridArea="cashAndInvestments">
          <Heading as="h6" size="xs">
            Cash and Investments
          </Heading>
        </GridItem>
        <GridItem gridArea="chequing">
          <Text>Chequing</Text>
        </GridItem>
        <GridItem gridArea="chequingInp">
          <NumberInput>
            <NumberInputField />
          </NumberInput>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default DashboardView;
