import {
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  Select,
  Spinner,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { currency, IAssets, ILiabilities } from "../types";
import {
  formatCurrency,
  getCurrencyName,
  SUPPORTED_CURRENCIES,
} from "../utils/convertCurrency";
import NumberEditable from "./numberEditable";

interface IProps {
  loading: boolean;
  selectedCurrency: currency;
  netWorth?: number;
  totalAssets?: number;
  totalLiabilities?: number;
  assets: IAssets;
  liabilities: ILiabilities;

  // callback event handlers
  handleCurrencySelect: React.ChangeEventHandler<HTMLSelectElement>;
  handleAssetChange: (
    assetKey: keyof IAssets
  ) => (valueAsString: string, valueAsNumber: number) => void;
  handleLiabilityChange: (
    liabilityKey: keyof ILiabilities
  ) => (valueAsString: string, valueAsNumber: number) => void;
  handleOnBlur: React.FocusEventHandler;
}

const DashboardView = ({
  loading,
  selectedCurrency,
  netWorth,
  totalAssets,
  totalLiabilities,
  assets,
  liabilities,
  handleCurrencySelect,
  handleAssetChange,
  handleLiabilityChange,
  handleOnBlur,
}: IProps): JSX.Element => {
  return (
    <Container paddingY="1em" maxW={"90ch"}>
      <Grid
        gap={1}
        paddingY={1}
        alignItems="center"
        gridTemplateColumns={"auto auto auto"}
        gridTemplateRows="auto"
        gridTemplateAreas={`". currency currencySelect"`}
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
            value={selectedCurrency}
            onChange={handleCurrencySelect}
          >
            {SUPPORTED_CURRENCIES.map((curCode) => (
              <option key={curCode} value={curCode}>
                {getCurrencyName(curCode)}
              </option>
            ))}
          </Select>
        </GridItem>
      </Grid>

      <StatGroup
        style={{ position: "sticky", top: 0, background: "white", zIndex: 1 }}
      >
        <Stat border="1px" borderRadius="lg" p={1}>
          <StatLabel>Net Worth</StatLabel>
          {loading ? (
            <Spinner />
          ) : (
            <StatNumber>
              {formatCurrency(netWorth || 0.0, selectedCurrency)}
            </StatNumber>
          )}
        </Stat>
      </StatGroup>

      <Divider p={1} />
      {/* Layout for Assets */}
      <Grid
        gap={0}
        alignItems="center"
        gridTemplateColumns={"auto auto"}
        gridTemplateRows="auto"
        gridTemplateAreas={`
          "assetsHeader . "
          "cashAndInvestments ."
          "spacer spacer"
          "chequing chequingInp"
          "savingTaxes savingTaxesInp"
          "rainyDay rainyDayInp"
          "savingFun savingFunInp"
          "savingTravel savingTravelInp"
          "savingPD savingPDInp"
          "invest1 invest1Inp"
          "invest2 invest2Inp"
          "invest3 invest3Inp"
          "longTermAssets ."
          "primaryHome primaryHomeInp"
          "secondHome secondHomeInp"
          "other otherInp"
        `}
      >
        <GridItem gridArea="assetsHeader">
          <Heading as="h4" size="md">
            Assets
          </Heading>
        </GridItem>
        <GridItem gridArea="cashAndInvestments">
          <Heading as="h5" size="sm">
            Cash and Investments
          </Heading>
        </GridItem>
        <GridItem gridArea="spacer">
          <Divider />
        </GridItem>
        <GridItem gridArea="chequing">
          <Text>Chequing</Text>
        </GridItem>
        <GridItem gridArea="chequingInp">
          <NumberEditable
            handleOnBlur={handleOnBlur}
            numericValue={assets.chequing}
            displayValue={formatCurrency(assets.chequing, selectedCurrency)}
            handleChangeInput={handleAssetChange("chequing")}
          />
        </GridItem>
        <GridItem gridArea="savingTaxes">
          <Text>Savings for Taxes</Text>
        </GridItem>
        <GridItem gridArea="savingTaxesInp">
          <NumberEditable
            handleOnBlur={handleOnBlur}
            numericValue={assets.savingTaxes}
            displayValue={formatCurrency(assets.savingTaxes, selectedCurrency)}
            handleChangeInput={handleAssetChange("savingTaxes")}
          />
        </GridItem>
        <GridItem gridArea="rainyDay">
          <Text>Rainy Day Fund</Text>
        </GridItem>
        <GridItem gridArea="rainyDayInp">
          <NumberEditable
            handleOnBlur={handleOnBlur}
            numericValue={assets.rainyDay}
            displayValue={formatCurrency(assets.rainyDay, selectedCurrency)}
            handleChangeInput={handleAssetChange("rainyDay")}
          />
        </GridItem>
        <GridItem gridArea="savingFun">
          <Text>Savings for Fun</Text>
        </GridItem>
        <GridItem gridArea="savingFunInp">
          <NumberEditable
            handleOnBlur={handleOnBlur}
            numericValue={assets.savingFun}
            displayValue={formatCurrency(assets.savingFun, selectedCurrency)}
            handleChangeInput={handleAssetChange("savingFun")}
          />
        </GridItem>
        <GridItem gridArea="savingTravel">
          <Text>Savings for Travel</Text>
        </GridItem>
        <GridItem gridArea="savingTravelInp">
          <NumberEditable
            handleOnBlur={handleOnBlur}
            numericValue={assets.savingTravel}
            displayValue={formatCurrency(assets.savingTravel, selectedCurrency)}
            handleChangeInput={handleAssetChange("savingTravel")}
          />
        </GridItem>
        <GridItem gridArea="savingPD">
          <Text>Savings for Personal Development</Text>
        </GridItem>
        <GridItem gridArea="savingPDInp">
          <NumberEditable
            handleOnBlur={handleOnBlur}
            numericValue={assets.savingPD}
            displayValue={formatCurrency(assets.savingPD, selectedCurrency)}
            handleChangeInput={handleAssetChange("savingPD")}
          />
        </GridItem>
        <GridItem gridArea="invest1">
          <Text>Investment 1</Text>
        </GridItem>
        <GridItem gridArea="invest1Inp">
          <NumberEditable
            handleOnBlur={handleOnBlur}
            numericValue={assets.invest1}
            displayValue={formatCurrency(assets.invest1, selectedCurrency)}
            handleChangeInput={handleAssetChange("invest1")}
          />
        </GridItem>
        <GridItem gridArea="invest2">
          <Text>Investment 2</Text>
        </GridItem>
        <GridItem gridArea="invest2Inp">
          <NumberEditable
            handleOnBlur={handleOnBlur}
            numericValue={assets.invest2}
            displayValue={formatCurrency(assets.invest2, selectedCurrency)}
            handleChangeInput={handleAssetChange("invest2")}
          />
        </GridItem>
        <GridItem gridArea="invest3">
          <Text>Investment 3</Text>
        </GridItem>
        <GridItem gridArea="invest3Inp">
          <NumberEditable
            handleOnBlur={handleOnBlur}
            numericValue={assets.invest3}
            displayValue={formatCurrency(assets.invest3, selectedCurrency)}
            handleChangeInput={handleAssetChange("invest3")}
          />
        </GridItem>
        <GridItem gridArea="longTermAssets">
          <Heading as="h5" size="sm">
            Long Term Assets
          </Heading>
        </GridItem>
        <GridItem gridArea="primaryHome">
          <Text>Primary Home</Text>
        </GridItem>
        <GridItem gridArea="primaryHomeInp">
          <NumberEditable
            handleOnBlur={handleOnBlur}
            numericValue={assets.primaryHome}
            displayValue={formatCurrency(assets.primaryHome, selectedCurrency)}
            handleChangeInput={handleAssetChange("primaryHome")}
          />
        </GridItem>
        <GridItem gridArea="secondHome">
          <Text>Second Home</Text>
        </GridItem>
        <GridItem gridArea="secondHomeInp">
          <NumberEditable
            handleOnBlur={handleOnBlur}
            numericValue={assets.secondHome}
            displayValue={formatCurrency(assets.secondHome, selectedCurrency)}
            handleChangeInput={handleAssetChange("secondHome")}
          />
        </GridItem>
        <GridItem gridArea="other">
          <Text>Other</Text>
        </GridItem>
        <GridItem gridArea="otherInp">
          <NumberEditable
            handleOnBlur={handleOnBlur}
            numericValue={assets.other}
            displayValue={formatCurrency(assets.other, selectedCurrency)}
            handleChangeInput={handleAssetChange("other")}
          />
        </GridItem>
      </Grid>

      <StatGroup>
        <Stat border="1px" borderRadius="lg" p={1}>
          <StatLabel>Total Assets</StatLabel>
          {loading ? (
            <Spinner />
          ) : (
            <StatNumber>
              {formatCurrency(totalAssets || 0.0, selectedCurrency)}
            </StatNumber>
          )}
        </Stat>
      </StatGroup>

      <Divider p={1} />
      <Grid
        gap={0}
        alignItems="center"
        gridTemplateColumns={"auto auto"}
        gridTemplateRows="auto"
        gridTemplateAreas={`
          "liabilitiesHeader ."
          "shortTermLiabilities ."
          "spacer spacer"
          "creditCard1 creditCard1Inp"
          "creditCard2 creditCard2Inp"
          "longTermDebt ."
          "mortgage1 mortgage1Inp"
          "mortgage2 mortgage2Inp"
          "lineCredit lineCreditInp"
          "investmentLoan investmentLoanInp"
        `}
      >
        <GridItem gridArea="liabilitiesHeader">
          <Heading as="h4" size="md">
            Liabilities
          </Heading>
        </GridItem>
        <GridItem gridArea="shortTermLiabilities">
          <Heading as="h5" size="sm">
            Short Term Liabilities
          </Heading>
        </GridItem>
        <GridItem gridArea="spacer">
          <Divider />
        </GridItem>
        <GridItem gridArea="creditCard1">
          <Text>Credit Card 1</Text>
        </GridItem>
        <GridItem gridArea="creditCard1Inp">
          <NumberEditable
            handleOnBlur={handleOnBlur}
            numericValue={liabilities.creditCard1}
            displayValue={formatCurrency(
              liabilities.creditCard1,
              selectedCurrency
            )}
            handleChangeInput={handleLiabilityChange("creditCard1")}
          />
        </GridItem>
        <GridItem gridArea="creditCard2">
          <Text>Credit Card 2</Text>
        </GridItem>
        <GridItem gridArea="creditCard2Inp">
          <NumberEditable
            handleOnBlur={handleOnBlur}
            numericValue={liabilities.creditCard2}
            displayValue={formatCurrency(
              liabilities.creditCard2,
              selectedCurrency
            )}
            handleChangeInput={handleLiabilityChange("creditCard2")}
          />
        </GridItem>
        <GridItem gridArea="longTermDebt">
          <Heading as="h5" size="sm">
            Long Term Debt
          </Heading>
        </GridItem>
        <GridItem gridArea="mortgage1">
          <Text>Mortgage 1</Text>
        </GridItem>
        <GridItem gridArea="mortgage1Inp">
          <NumberEditable
            handleOnBlur={handleOnBlur}
            numericValue={liabilities.mortgage1}
            displayValue={formatCurrency(
              liabilities.mortgage1,
              selectedCurrency
            )}
            handleChangeInput={handleLiabilityChange("mortgage1")}
          />
        </GridItem>
        <GridItem gridArea="mortgage2">
          <Text>Mortgage 2</Text>
        </GridItem>
        <GridItem gridArea="mortgage2Inp">
          <NumberEditable
            handleOnBlur={handleOnBlur}
            numericValue={liabilities.mortgage2}
            displayValue={formatCurrency(
              liabilities.mortgage2,
              selectedCurrency
            )}
            handleChangeInput={handleLiabilityChange("mortgage2")}
          />
        </GridItem>
        <GridItem gridArea="lineCredit">
          <Text>Line of Credit</Text>
        </GridItem>
        <GridItem gridArea="lineCreditInp">
          <NumberEditable
            handleOnBlur={handleOnBlur}
            numericValue={liabilities.lineCredit}
            displayValue={formatCurrency(
              liabilities.lineCredit,
              selectedCurrency
            )}
            handleChangeInput={handleLiabilityChange("lineCredit")}
          />
        </GridItem>
        <GridItem gridArea="investmentLoan">
          <Text>Investment Loan</Text>
        </GridItem>
        <GridItem gridArea="investmentLoanInp">
          <NumberEditable
            handleOnBlur={handleOnBlur}
            numericValue={liabilities.investmentLoan}
            displayValue={formatCurrency(
              liabilities.investmentLoan,
              selectedCurrency
            )}
            handleChangeInput={handleLiabilityChange("investmentLoan")}
          />
        </GridItem>
      </Grid>
      <StatGroup>
        <Stat border="1px" borderRadius="lg" p={1}>
          <StatLabel>Total Liabilities</StatLabel>
          {loading ? (
            <Spinner />
          ) : (
            <StatNumber>
              {formatCurrency(totalLiabilities || 0.0, selectedCurrency)}
            </StatNumber>
          )}
        </Stat>
      </StatGroup>
    </Container>
  );
};

export default DashboardView;
