import { NextApiRequest, NextApiResponse } from 'next';
import { SentinelConditionRequest, SubscriberType } from 'defender-autotask-utils';
import { BigNumber, ethers } from 'ethers';

import { Handler } from '../../../types';
import { getHandler } from '../../../utils';
import { addNFTOwnership, removeNFTOwnership } from './utils';
import { CoralNftV1__factory } from '@coral/contracts/dist';

const isNotZeroAddress = (address: string) => address !== ethers.constants.AddressZero;

export const post: Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { events } = req.body as SentinelConditionRequest;
  if (events) {
    for (const sentinelTriggerEvent of events) {
      if (sentinelTriggerEvent.type === SubscriberType.BLOCK) {
        const contractInterface = new ethers.utils.Interface(CoralNftV1__factory.abi);
        try {
          const logs = sentinelTriggerEvent.transaction.logs;
          const nftContractAddress = ethers.utils.getAddress(sentinelTriggerEvent.transaction.to);
          for (const log of logs) {
            const { name, args: result } = contractInterface.parseLog(log);
            if (name === 'Transfer') {
              const { from, to, tokenId } = result;
              if (typeof from !== 'string') {
                throw 'from is not of type string';
              }
              if (typeof to !== 'string') {
                throw 'to is not of type string';
              }
              if (!(tokenId instanceof BigNumber)) {
                throw 'tokenId is not of type BigNumber';
              }

              const tokenIdInt = tokenId.toNumber();
              if (isNotZeroAddress(from)) {
                await removeNFTOwnership(from, nftContractAddress, tokenIdInt);
              }
              if (isNotZeroAddress(to)) {
                await addNFTOwnership(to, nftContractAddress, tokenIdInt);
              }
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
  return res.status(200).send('');
};

export default getHandler({ post });
