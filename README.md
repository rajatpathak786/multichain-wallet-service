<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A robust custodial Wallet Management Service designed to empower users with secure wallet creation, fund management, and transaction capabilities. The service currently supports Sepolia Testnet and Solana Testnet, with features to extend support for additional chains and tokens.

This service ensures top-tier security through encryption mechanisms implemented on both the user and server ends, safeguarding private keys against potential leaks.

# Key Features

1. **User Wallet Management**

   - Users can register and create custodial wallets securely.
   - Supports wallet-related operations:
     - Transfer funds to other wallets.
     - Fetch balances for both **native tokens** and supported **stablecoins**.
   - Current supported tokens:
     - **USDC**
     - **USDT**
   - Supports two blockchains:
     - **Sepolia Testnet** (Ethereum-based)
     - **Solana Testnet**

2. **Security-First Design**

   - Dual-ended **encryption mechanism** ensures:
     - User private keys remain confidential.
     - Secure data handling during wallet operations.

3. **Role-Based Access Control**

   - **Roles Defined**:
     - **User**:
       - Manage individual wallets.
       - Transfer funds and query balances.
     - **Admin**:
       - Add support for new chains and tokens.
       - Oversee system operations and configurations.

4. **Future-Proof Expansion**
   - Designed to allow seamless addition of:
     - New blockchains.
     - Additional tokens.
   - Customizable to accommodate evolving user requirements.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Env

Check the .env.example file

## Swagger

Check the following - `http://localhost:8080/api-doc`

## Support

- Author - [Rajat Pathak](rajatpathak786@gmail.com)
