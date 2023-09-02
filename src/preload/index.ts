/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */

const { contextBridge } = require('electron')
const IotaSdk = require('@iota/sdk')
const walletOptions = {
  storagePath: './example-walletdb',
  clientOptions: {
    nodes: ['http://localhost:14265']
  },
  coinType: IotaSdk.CoinType.Shimmer,
  secretManager: {
    stronghold: {
      snapshotPath: './example.stronghold',
      password: '24?drowssap'
    }
  }
}
const wallet = new IotaSdk.Wallet(walletOptions)

contextBridge.exposeInMainWorld('__WALLET__API__', {
  async createAccount() {
    // Create a new account
    const account = await wallet.createAccount({
      alias: makeid(10)
    })

    const accounts = await wallet.getAccounts()
    return {
      newAccount: account,
      allAccounts: accounts
    }
  }
})

// makes random Id.
function makeid(length): string {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}
