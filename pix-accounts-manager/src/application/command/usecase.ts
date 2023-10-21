export interface usecase {
  handle(request: any): Promise<any>
}