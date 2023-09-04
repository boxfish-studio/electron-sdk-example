export interface IApi {
  getNodeInfo(url?: string): Promise<unknown>
  createWallet(id, options): Promise<unknown>
}
