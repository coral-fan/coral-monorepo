export const getNftSmartContractAddress = (addresses: string[], matchedAddresses: string[]) => {
  let nftContractAddressIndex = -1;
  const lowercasedAddresses = addresses.map((address) => address.toLowerCase());

  for (const matchAddress of matchedAddresses) {
    const index = lowercasedAddresses.indexOf(matchAddress);
    if (index !== -1) {
      nftContractAddressIndex = index;
      break;
    }
  }

  if (nftContractAddressIndex === -1) {
    throw new Error(
      `No match was found in addresses: [${addresses}] for any addresses in matchAddresses: [${matchedAddresses}]`
    );
  }

  const nftContractAddress = addresses[nftContractAddressIndex];

  return nftContractAddress;
};
