export const chainInfoAddedSuccess = {
  message: 'New Chain Info Added',
  data: {
    chainName: 'SepoliaTestnet',
    rpcUrl: 'https://1rpc.io/sepolia',
    chainId: '1ad4e7f4-0801-40f8-983f-404947d93ba9',
  },
};

export const chainInfoAddedFailure = {
  message: [
    'chainName must be one of the following values: SepoliaTestnet, SolanaTestnet',
  ],
  error: 'Bad Request',
  statusCode: 400,
};

export const getAllChainInfosSuccess = {
  message: 'All Chain Infos Fetched Successfully',
  data: [
    {
      chainId: 'e37a6d30-6bf5-4dea-99be-3ec5a8048f77',
      chainName: 'SepoliaTestnet',
      rpcUrl: 'https://1rpc.io/sepolia',
    },
    {
      chainId: 'cc29cc94-3cc6-4342-93a0-c950fb87baf1',
      chainName: 'SolanaTestnet',
      rpcUrl:
        'https://purple-serene-meadow.solana-testnet.quiknode.pro/9dadf337c0ea4b20d42ade81d759e384b8d36c4f',
    },
  ],
};

export const getChainDetailsByName = {
  message: 'Chain Info Fetched Successfully',
  data: {
    chainId: '1ad4e7f4-0801-40f8-983f-404947d93ba9',
    chainName: 'SepoliaTestnet',
    rpcUrl: 'https://1rpc.io/sepolia',
  },
};

export const getChainDetailsError = {
  message: [
    'Invalid chain name. Allowed values are SepoliaTestnet, SolanaTestnet.',
  ],
  error: 'Bad Request',
  statusCode: 400,
};
