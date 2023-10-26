interface Handler<Input,Output> {
  handle(request: Input): Promise<Output>
}
export interface CommandHandler<Input,Output> extends Handler<Input,Output>{}
export interface QueryHandler<Input,Output> extends Handler<Input,Output>{}
