import Prando from '@paima/prando';
import type { ChainData } from '@paima/utils';
import Crypto from 'crypto';
import type pg from 'pg';

import { getRandomness } from './sql/queries.queries.js';

export function randomnessRouter(n: number): typeof getSeed1 {
  if (n) return getSeed1;
  else throw Error('wrong randomness protocol set');
}

function chooseData(chainData: ChainData, seed: string): string[] {
  const submittedData = chainData.submittedData
    .map(data => [
      //TODO: use consumer to decode the inputData
      data.inputData,
      data.inputNonce,
      data.userAddress,
    ])
    .flat();
  const relevantData = [
    chainData.timestamp.toString(),
    chainData.blockNumber.toString(),
    chainData.blockHash,
    ...submittedData,
  ];
  const prando = new Prando(seed);
  const randomSelection = (): boolean => {
    const randomValue = Math.round(prando.next());
    return randomValue === 1 ? true : false;
  };

  return relevantData.filter(randomSelection);
}

/*
 * Basic randomness generation protocol which hashes together previous seeds and randomly selected chain data
 */
async function getSeed1(latestChainData: ChainData, DBConn: pg.Pool): Promise<string> {
  const seeds = (await getRandomness.run(undefined, DBConn)).map(result => result.seed);
  const interimSeed = hashTogether([latestChainData.blockHash, ...seeds]);
  const selectedChainData = chooseData(latestChainData, interimSeed);
  const seed = hashTogether([...selectedChainData, ...seeds]);
  return seed;
}

function hashTogether(hashes: string[]): string {
  return Crypto.createHash('sha256').update(hashes.join()).digest('base64');
}
