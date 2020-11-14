import { NextApiRequest, NextApiResponse } from "next";

type payload = {
  assets?: [number];
  liabilities?: [number];
};

/**
 * Endpoint for calculating net worth, total assets, and total liabilities.
 * Total assets are the sum of provided assets;
 * total liabilities are the sum of provided liabilities; and
 * net worth is the total assets minus the total liabilities.
 */
export default (req: NextApiRequest, res: NextApiResponse): void => {
  const { method, body }: { method?: string; body: payload } = req;
  if (method != "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const add = (a: number, b: number) => a + b;
  const totalAssets = (body.assets || [0]).reduce(add, 0);
  const totalLiabilities = (body.liabilities || [0]).reduce(add, 0);
  const netWorth = totalAssets - totalLiabilities;

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ totalAssets, totalLiabilities, netWorth }));
};
