export const transactionSuccess = {
  message: 'Transaction Success',
  data: {
    txHash:
      '0x245931149399b603ddc650e705d5a781fd5d047b0ad319ae93bab9e59912e69c',
    wallet: {
      walletAddress: '0xA1b283F97b59A5D22066C95179669b761CFa4663',
      keyHash: '$2b$10$ajIefLh82PBl2BUcylmjruPibvQ.DYZdeSCmNyckb6rV8bOy.IBCS',
      chainInfo: {
        chainId: 'e37a6d30-6bf5-4dea-99be-3ec5a8048f77',
        chainName: 'SepoliaTestnet',
        rpcUrl: 'https://1rpc.io/sepolia',
      },
      org: null,
      user: {
        userId: 'd8416172-a4ae-4724-af7f-0500320f5b04',
        userName: 'newUser12@123',
      },
    },
  },
};

export const insufficientFunds = {
  code: 'INSUFFICIENT_FUNDS',
  transaction: {
    nonce: '0x3',
    value: '0x6f05b59d3b20000',
    from: '0xa1b283f97b59a5d22066c95179669b761cfa4663',
    to: '0xde91efe7f3a50acebc09954d818f4ed40e68a2f1',
  },
  info: {
    payload: {
      method: 'eth_estimateGas',
      params: [
        {
          nonce: '0x3',
          value: '0x6f05b59d3b20000',
          from: '0xa1b283f97b59a5d22066c95179669b761cfa4663',
          to: '0xde91efe7f3a50acebc09954d818f4ed40e68a2f1',
        },
      ],
      id: 3,
      jsonrpc: '2.0',
    },
    error: {
      code: -32000,
      message:
        'failed with 36000000 gas: insufficient funds for gas * price + value: address 0xA1b283F97b59A5D22066C95179669b761CFa4663 have 399999824812645000 want 500000000000000000',
    },
  },
  shortMessage: 'insufficient funds',
};
