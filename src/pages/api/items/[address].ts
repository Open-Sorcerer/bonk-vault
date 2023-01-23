import { NETWORK } from "@utils/endpoints";
import type { NextApiRequest, NextApiResponse } from "next";

import { ItemData } from "@components/home/item";
import { fetcher } from "@utils/use-data-fetch";

export type NftResponse = { nfts: Array<ItemData> };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<ItemData>>
) {
  const { address } = req.query;

  if (address && address.length > 0) {
    const items = await fetcher<NftResponse>(
      `https://api.helius.xyz/v0/addresses/${address}/nfts?api-key=eeaffa67-8356-42b8-b716-6529bacc049b&page-number=0`
    );

    res.status(200).json(items.nfts);
  }

  res.status(400);
}
