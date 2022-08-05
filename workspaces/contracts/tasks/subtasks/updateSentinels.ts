import { subtask } from 'hardhat/config';
import { SentinelClient } from 'defender-sentinel-client';
import type { CreateBlockSubscriberResponse } from 'defender-sentinel-client/lib/models/subscriber';

import { getDeploymentConsts, Network } from '../utils/getDeploymentConsts';

subtask('updateSentinels', 'Update Sentinels')
  .addParam('newAddress', 'Deployed contract Address')
  .setAction(async ({ newAddress }, hre) => {
    const network = hre.network.name as Network;

    const { defenderTeamApiKey, defenderTeamSecretKey, sentinelIds } = getDeploymentConsts(network);

    const sentinelClient = new SentinelClient({
      apiKey: defenderTeamApiKey,
      apiSecret: defenderTeamSecretKey,
    });

    const filteredSentinelIds = sentinelIds && Object.values(sentinelIds);

    if (!filteredSentinelIds) {
      throw 'Sentinel Ids not found';
    }

    for (let i = 0; i < filteredSentinelIds.length; i++) {
      const sentinelId = filteredSentinelIds[i];

      const sentinelResponse = await sentinelClient.get(sentinelId);
      const createBlockSubscriberResponse = sentinelResponse as CreateBlockSubscriberResponse;

      if (createBlockSubscriberResponse.addressRules === undefined) {
        throw 'sentinelResponse does not match interface for CreateBlockSubscriberResponse';
      }

      const addressesByRule = createBlockSubscriberResponse.addressRules.map(
        (rule) => rule.addresses
      );

      // Assumes single rule
      // TODO: Research Sentinel rules
      const addresses = addressesByRule[0];

      addresses.push(newAddress);

      // Ensure unique addresses
      const addressesSet = new Set(addresses);
      const uniqueAddresses = [...addressesSet];

      await sentinelClient.update(sentinelId, { type: 'BLOCK', addresses: uniqueAddresses });
      console.log(`\n Added ${newAddress} to ${sentinelResponse.name}`);
    }
  });
