import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const CollectorModule = buildModule('Collector', (m) => {
  const token = m.getParameter('token')
  const collector = m.contract('Collector', [token])
  return { collector }
})

export default CollectorModule
