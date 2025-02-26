import { HardhatUserConfig, vars } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'

const PRIVATE_KEY = vars.get('PRIVATE_KEY')

const config: HardhatUserConfig = {
  solidity: '0.8.20',
  networks: {
    mantle: {
      url: `https://rpc.sepolia.mantle.xyz`,
      accounts: [PRIVATE_KEY],
    },
    story: {
      url: `https://aeneid.storyrpc.io`,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      // base: BASESCAN_API_KEY,
    },
  },
}

export default config
