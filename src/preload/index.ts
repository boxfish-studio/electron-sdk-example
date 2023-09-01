/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */

const { contextBridge } = require('electron')
const IotaSdk = require('@iota/sdk')

contextBridge.exposeInMainWorld('__WALLET__API__', {
  async getNodeInfo(url) {
    const client = new IotaSdk.Client({
      nodes: [url]
    })

    const nodeInfo = await client.getNodeInfo(url)

    return {
      url: url,
      nodeInfo
    }
  }
})
