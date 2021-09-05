import { NextApiRequest, NextApiResponse } from "next";
import fetchTimeout from "../../utils/fetchTimeout";
import fs from "fs";

export interface ratesPayload {
  conversion_rates: {
    [index: string]: number
  },
  "base_code": string,
  "time_last_update_utc": string
}

/**
 * Endpoint for retrieving the different currencies and conversion rates.
 * Relies on the exchangeratesapi, or fallback to serving the local JSON file.
 *
 * https://exchangeratesapi.io
 */
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req;
  if (method != "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const EXCHANGE_RATE_API_SECRET = process.env.EXCHANGE_RATE_API_SECRET || "";
  // Query the exchangeratesapi with the provided base, or fallback
  try {
    const resp = await fetchTimeout(
      `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_SECRET}/latest/CAD`
    );
    const payload = await resp.json();

    if (!("conversion_rates" in payload) || !("CAD" in payload.conversion_rates)) {
      throw "payload missing CAD conversion rates";
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(payload));
  } catch (error) {
    // Robust handling of timeout or network errors
    console.error(error);
    // Serve the fallback file
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(fs.readFileSync("pages/api/CAD.json").toString());
  }
};
