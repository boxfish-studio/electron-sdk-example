import { api } from './api'
import './spinner.css'

const DEFAULT_SYNC_OPTIONS = {
  account: {
    basicOutputs: true,
    aliasOutputs: true,
    nftOutputs: true,
  },
  alias: {
    aliasOutputs: true,
    basicOutputs: true,
    nftOutputs: true,
    foundryOutputs: true,
  },
  nft: {
    aliasOutputs: true,
    basicOutputs: true,
    nftOutputs: true,
  },
  syncIncomingTransactions: true,
  syncNativeTokenFoundries: true,
};

function App(): JSX.Element {
  const click = async (): Promise<undefined> => {
    // const info = await api.getNodeInfo('https://api.testnet.shimmer.network')
    // console.log(info)
    const profileManager = await api.createWallet('123', {
      storagePath: './storagePath',
      coinType: 4219,
      clientOptions: {
        nodes: ['https://api.testnet.shimmer.network'],
      },
      secretManager: {
        mnemonic: 'bla bla bla',
      }
    })
    // @ts-ignore
    let accounts = await profileManager.getAccounts();
    // @ts-ignore
    await profileManager.recoverAccounts(0, 1, 1, DEFAULT_SYNC_OPTIONS)
    // @ts-ignore
    accounts = await profileManager.getAccounts();

    for (const account of accounts) {
      console.log(account.getMetadata().alias);
    }
  }
  return (
    <div className="container">
      <h3> Node info will be logged to the console </h3>
      <button onClick={click}> node info </button>
      <h3> Spinner to check if the app stays responsive </h3>
      <div className="spinner" />
    </div>
  )
}

export default App
