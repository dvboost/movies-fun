import hre from 'hardhat'
import Token from '../ignition/modules/Token'
import Collector from '../ignition/modules/Collector'

async function main() {
  const { token } = await hre.ignition.deploy(Token, {
    parameters: {
      Token: { name: 'TUSD' },
    },
  })
  const tokenAddress = await token.getAddress()
  console.log(`Token: ${tokenAddress}`)

  const { collector } = await hre.ignition.deploy(Collector, {
    parameters: {
      Collector: { token: tokenAddress },
    },
  })
  const collectorAddress = await collector.getAddress()
  console.log(`Collector: ${collectorAddress}`)

  console.log(`Done`)
}

main().catch(console.error)
