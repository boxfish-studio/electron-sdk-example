export interface IApi {
  getNodeInfo(url?: string): Promise<unknown>
}
