import { ApplicationHandle } from '@application/application-handle'

export interface IQueue {
    connect(connectionUrl:string): Promise<void>
    publish(queueName: string, data: any): Promise<void>
    consumer(queueName: string, callback: ApplicationHandle): Promise<void>
}