export interface usecase<Input,Output> {
  handle(request: Input): Promise<Output>
}