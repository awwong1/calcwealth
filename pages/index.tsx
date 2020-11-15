import Head from "next/head";
import Dashboard from "../components/dashboard";
import {
  Text,
  Code,
  Container,
  Divider,
  Link,
  Heading,
} from "@chakra-ui/react";

const Home = (): JSX.Element => (
  <>
    <Head>
      <title>CalcWealth</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <header>
      <Container paddingY={"1em"} maxW={"90ch"}>
        <Heading>Tracking your Net Worth</Heading>
      </Container>
    </header>

    <Dashboard />

    <footer>
      <Container maxW={"90ch"}>
        <Divider />
        <Text>
          A takehome assessment by{" "}
          <Code>
            <Link
              href="https://github.com/awwong1"
              target="_blank"
              rel="noopener noreferrer"
              isExternal
            >
              @awwong1
            </Link>
          </Code>
          . November, 2020.
        </Text>
      </Container>
    </footer>
  </>
);

export default Home;
