export const createWalletBadReq = {
  message: [
    'chainName must be one of the following values: SepoliaTestnet, SolanaTestnet',
  ],
  error: 'Bad Request',
  statusCode: 400,
};

export const createWalletSuccess = {
  message: 'Wallet successfully created',
  data: {
    walletAddress: '0x5D02d31cEd1b34C3afAA21E307349776F87CAC50',
    keyHash: '$2b$10$9EDNS8mYRG6BU15vq0VTz.g1qgkkdVyeWQpiXJSgKtEKJ3QcWUIq2',
    chainInfo: {
      chainId: 'e37a6d30-6bf5-4dea-99be-3ec5a8048f77',
      chainName: 'SepoliaTestnet',
      rpcUrl: 'https://1rpc.io/sepolia',
    },
    user: {
      userId: 'f21051a9-4658-44a2-a10d-c9435b3da277',
      userName: 'newUser1@123',
    },
  },
};

export const getWalletDetails = {
  message: 'Wallet Details Fetched Successfully',
  data: {
    walletAddress: '0xA1b283F97b59A5D22066C95179669b761CFa4663',
    keyHash: '$2b$10$ajIefLh82PBl2BUcylmjruPibvQ.DYZdeSCmNyckb6rV8bOy.IBCS',
    user: {
      userId: 'd8416172-a4ae-4724-af7f-0500320f5b04',
      userName: 'newUser12@123',
    },
    chainInfo: {
      chainId: 'e37a6d30-6bf5-4dea-99be-3ec5a8048f77',
      chainName: 'SepoliaTestnet',
      rpcUrl: 'https://1rpc.io/sepolia',
    },
    org: null,
  },
};

export const fetchWalletBalance = {
  message: 'Wallet Balance Fetched Successfully',
  data: '1.0',
};
