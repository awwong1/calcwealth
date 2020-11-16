import { NextApiRequest, NextApiResponse } from "next";

interface IPayload {
  assets: Array<number | string>;
  liabilities: Array<number | string>;
}

const _parseFloatZero = (val: number | string): number => {
  if (typeof val === "string") {
    const parsedNumber = Number.parseFloat(val);
    if (Number.isFinite(parsedNumber)) {
      return parsedNumber;
    }
    return 0;
  }
  return val;
};

/**
 * Endpoint for calculating net worth, total assets, and total liabilities.
 * Total assets are the sum of provided assets;
 * total liabilities are the sum of provided liabilities; and
 * net worth is the total assets minus the total liabilities.
 */
export default (req: NextApiRequest, res: NextApiResponse): void => {
  const {
    method,
    body,
  }: { method?: string; body: string | Record<string, unknown> } = req;
  if (method != "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }
  const add = (a: number | string, b: number | string): number =>
    _parseFloatZero(a) + _parseFloatZero(b);

  let payload: IPayload;
  try {
    payload = JSON.parse(body as string);
  } catch {
    payload = (body as unknown) as IPayload;
  }
  const totalAssets = payload.assets.reduce(add, 0) as number;
  const totalLiabilities = payload.liabilities.reduce(add, 0) as number;
  const netWorth = totalAssets - totalLiabilities;

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ totalAssets, totalLiabilities, netWorth }));
};
