export const addTokenResponseSuccess = {
  message: 'Token successfully added',
  data: {
    tokenName: 'USDC',
    tokenAddress: '0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0',
    chainInfo: {
      chainId: 'e37a6d30-6bf5-4dea-99be-3ec5a8048f77',
      chainName: 'SepoliaTestnet',
      rpcUrl: 'https://1rpc.io/sepolia',
    },
    tokenId: 'd0eae25d-3d36-4f00-9e78-eb798d18a2b1',
  },
};

export const addAllTokens = {
  message: 'All Token Details Fetched',
  data: [
    {
      tokenId: '047255f1-4438-4c64-a3d3-ed1564a573ea',
      tokenName: 'USDT',
      tokenAddress: '0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0',
      chainInfo: {
        chainId: 'e37a6d30-6bf5-4dea-99be-3ec5a8048f77',
        chainName: 'SepoliaTestnet',
        rpcUrl: 'https://1rpc.io/sepolia',
      },
    },
    {
      tokenId: 'd0eae25d-3d36-4f00-9e78-eb798d18a2b1',
      tokenName: 'USDC',
      tokenAddress: '0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0',
      chainInfo: {
        chainId: 'e37a6d30-6bf5-4dea-99be-3ec5a8048f77',
        chainName: 'SepoliaTestnet',
        rpcUrl: 'https://1rpc.io/sepolia',
      },
    },
    {
      tokenId: '68977406-3b4c-4004-b1c5-bceb44b1ac76',
      tokenName: 'USDC',
      tokenAddress: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
      chainInfo: {
        chainId: 'cc29cc94-3cc6-4342-93a0-c950fb87baf1',
        chainName: 'SolanaTestnet',
        rpcUrl:
          'https://purple-serene-meadow.solana-testnet.quiknode.pro/9dadf337c0ea4b20d42ade81d759e384b8d36c4f',
      },
    },
  ],
};

export const getTokenDetailsById = {
  message: 'Token Details Fetched Successfully',
  data: {
    tokenId: 'd0eae25d-3d36-4f00-9e78-eb798d18a2b1',
    tokenName: 'USDC',
    tokenAddress: '0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0',
    chainInfo: {
      chainId: 'e37a6d30-6bf5-4dea-99be-3ec5a8048f77',
      chainName: 'SepoliaTestnet',
      rpcUrl: 'https://1rpc.io/sepolia',
    },
  },
};

export const fetchBalanceByTokenSuccess = {
  message: 'Token Details Fetched Successfully',
  data: '0.0',
};
