import { NextApiRequest, NextApiResponse } from "next";
import fetchTimeout from "../../utils/fetchTimeout";
import fs from "fs";

/**
 * Endpoint for retrieving the different currencies and conversion rates.
 * Relies on the exchangeratesapi, or fallback to serving the JSON file.
 *
 * https://exchangeratesapi.io
 */
export default (req: NextApiRequest, res: NextApiResponse): Promise<void> | void => {
  const { method } = req;
  if (method != "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  // Query the exchangeratesapi with the provided base, or fallback
  return fetchTimeout(`https://api.exchangeratesapi.io/latest?base=CAD`)
    .then((resp) => resp.json())
    .then((jsonResp) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(jsonResp));
    })
    .catch((err) => {
      // Robust handling of timeout or network errors
      console.error(err);
      // Serve the fallback file
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(fs.readFileSync("pages/api/rate_fallback.json").toString());
    });
};
