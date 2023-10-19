export interface Command {
  handle(request: any): Promise<any>
}