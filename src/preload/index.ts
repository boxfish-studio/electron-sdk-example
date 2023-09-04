/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */

const { contextBridge } = require('electron')
const IotaSdk = require('@iota/sdk')

const profileManagers = {}

const methodNames = Object.getOwnPropertyNames(IotaSdk.Utils).filter(
  (m) => !['length', 'name', 'prototype'].includes(m)
)
const methods = {}

for (const name of methodNames) {
  methods[name] = (...args) => IotaSdk.Utils[name](...args)
}

IotaSdk.initLogger({
  name: './wallet.log',
  levelFilter: 'debug'
})

contextBridge.exposeInMainWorld('__WALLET__API__', {
  ...methods,
  async getNodeInfo(url) {
    const client = new IotaSdk.Client({
      nodes: [url]
    })

    const nodeInfo = await client.getNodeInfo(url)

    return {
      url: url,
      nodeInfo
    }
  },
  createWallet(id, options) {
    const manager = new IotaSdk.Wallet(options)
    manager.id = id
    profileManagers[id] = manager
    bindMethodsAcrossContextBridge(IotaSdk.Wallet.prototype, manager)
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
