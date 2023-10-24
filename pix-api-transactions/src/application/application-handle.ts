export interface ApplicationHandle {
  handle(request: any): Promise<any>
}