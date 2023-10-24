import { usecase } from '@application/usecase'


export interface IQueue {
    connect(connectionUrl:string): Promise<void>
    publish(queueName: string, data: any): Promise<void>
    consumer(queueName: string, callback: usecase): Promise<void>
}