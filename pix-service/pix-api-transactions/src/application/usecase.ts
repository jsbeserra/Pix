export interface usecase<Input,Output> {
  handle(input: Input): Promise<Output>
}