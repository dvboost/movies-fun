import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'
import { ethers } from 'hardhat'

const initialSupply = ethers.parseEther('1000000')

const TokenModule = buildModule('Token', (m) => {
  const name = m.getParameter('name')
  const token = m.contract('Token', [name, name, initialSupply])
  return { token }
})

export default TokenModule
