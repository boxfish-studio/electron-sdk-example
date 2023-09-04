/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */

const { contextBridge } = require('electron')
const WalletApi = require('@iota/wallet')

const profileManagers = {}

WalletApi.initLogger({
  name: './wallet.log',
  levelFilter: 'debug'
})

contextBridge.exposeInMainWorld('__WALLET__API__', {
  createWallet(id, options) {
    const manager = new WalletApi.AccountManager(options)
    manager.id = id
    profileManagers[id] = manager
    bindMethodsAcrossContextBridge(WalletApi.AccountManager.prototype, manager)
    return manager
  }
})

function bindMethodsAcrossContextBridge(prototype, object) {
  const prototypeProperties = Object.getOwnPropertyNames(prototype)
  prototypeProperties.forEach((key) => {
      if (key !== 'constructor') {
          object[key] = object[key].bind(object)
      }
  })
}
