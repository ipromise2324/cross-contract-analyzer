# Cross Contract Analyzer (CCA)

In the current blockchain environment, many tools focus on single smart contract vulnerability detection, but most security issues in the rapidly evolving DeFi sector arise from complex multi-contract interactions. 

To address this, we propose the "Cross Contract Analyzer", a new method that detects security vulnerabilities in multi-contract interactions by combining fuzzing principles with new strategies and technologies, tailored for the complex DeFi ecosystem.

# Install
```shell
git clone https://github.com/ipromise2324/cross-contract-analyzer.git
cd cross-contract-analyzer
cp .envExample .env # fill .env file (URL and block number)
npm install
npx hardhat test
```
# List of Past DeFi Incidents
- 2017/11/6: [Parity - I Accidentally Killed It](test/parity_kill.ts)


Try running some of the following test to simulate the incident:

```shell
npx hardhat test test/parity_kill.ts 
```

Try running some of the following test by using CCA to detect the incident:
```shell
npx hardhat test test/cca_parity_kill.ts 
```
