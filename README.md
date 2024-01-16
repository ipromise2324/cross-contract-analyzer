# Cross Contract Analyzer (CCA)

In the current blockchain environment, many tools focus on single smart contract vulnerability detection, but most security issues in the rapidly evolving DeFi sector arise from complex multi-contract interactions. 

To address this, we propose the "Cross Contract Analyzer", a new method that detects security vulnerabilities in multi-contract interactions by combining fuzzing principles with new strategies and technologies, tailored for the complex DeFi ecosystem.

<img src="cca_logo.png" alt="Alt text" width="700" height="auto"/>

# Install
```shell
git clone https://github.com/ipromise2324/cross-contract-analyzer.git
cd cross-contract-analyzer
cp .envExample .env # fill .env file (URL and block number)
npm install
```
# List of Past DeFi Incidents

- 2017/11/6: [Parity - I Accidentally Killed It](test/parity_kill.ts)
- 2020/10/26: [Harvest Finance Attack](test/2020_10_26_harvest.ts)
- 2020/12/29: [Cover Protocol Exploit](test/2020_12_29_cover.ts)
- 2020/06/18: [Bancor Network Vulnerability](test/2020_0618_bancor.ts)
- 2020/08/04: [Opyn Attack](test/2020_0804_opyn.ts)
- 2021/06/07: [88mph Drain](test/2021_06_07_88mph.ts)
- 2021/09/03: [DaoMaker Exploit](test/2021_09_03_dao_maker.ts)
- 2021/09/15: [NowSwap Incident](test/2021_09_15_nowswap.ts)

## Simulate the Incidents

Try running some of the following tests to simulate the incidents after you change .env to right block numer:

```shell
npx hardhat test test/2020_10_26_harvest.ts
npx hardhat test test/2020_12_29_cover.ts
npx hardhat test test/2020_0618_bancor.ts
npx hardhat test test/2020_0804_opyn.ts
npx hardhat test test/2021_06_07_88mph.ts
npx hardhat test test/2021_09_03_dao_maker.ts
npx hardhat test test/2021_09_15_nowswap.ts
npx hardhat test test/dodo_attack.ts
npx hardhat test test/module.ts
npx hardhat test test/parity_kill.ts
```
