# calcwealth

Intuit take home assessment.
Create a net worth calculator to keep track of the business, tracking assets and liabilities.

A public facing version of this assignment is available at [https://intuit.th.udia.ca/](https://intuit.th.udia.ca/).

This is a [Node.js](https://nodejs.org/en/) & [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn
yarn dev

# Alternatively an optimized version of the application can be run with
yarn build
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Notable Project Structure

* `pages/api/exchange.ts`
    * REST endpoint for retrieving currency exchange rates
* `pages/api/networth.ts`
    * REST endpoint for calculating networth, given assets and liabilities
* `pages/index.tsx`
    * Root web page for React application
* `components/*.tsx`
    * All React components for rendering the net worth calculator, editable/swapping number fields
* `cypress/integration/*.spec.ts`
    * Integration tests for verifying end to end application functionality

### Testing

I used the [`cypress`](https://www.cypress.io/) integration test framework to verify my application and API functionality.

```bash
yarn dev 
# in a new window
yarn run cypress open
```

The test suite will open and simulate a new browser which will visit and request from our existing development site.

## License

[Apache V2.0](LICENSE)

```text
Copyright 2020 Alexander Wong

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
