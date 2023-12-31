import { IQueue } from '@application/interfaces/queue/queue'
import { usecase } from '@application/usecase'
import { AMQPClient } from '@cloudamqp/amqp-client'

export default class AMQPClientAdpter implements IQueue {
	private static instance: AMQPClientAdpter
	private client:AMQPClient

	private constructor() {}

	public static getInstance(): AMQPClientAdpter {
		if (!this.instance) {
			this.instance = new AMQPClientAdpter()
		}
		return this.instance
	}

	public async connect(amqpUrl: string): Promise<void> {
		this.client = new AMQPClient(amqpUrl)
		await this.client.connect()
	}

	public async publish(queueName: string, message: any): Promise<void> {
		const messageConvertedToString:string = JSON.stringify(message)
		const channel = await this.client.channel()
		const queue = await channel.queue(queueName)
		await queue.publish(messageConvertedToString)
	}

	async consumer(queueName: string, callback: usecase<any,any>): Promise<void> {
		const channel = await this.client.channel()
		const queue = await channel.queue(queueName)
		await queue.subscribe({},async (message) =>{
			const messageToString = message.bodyToString()
			if (messageToString){
				const decodeMessage = JSON.parse(messageToString)
				await callback.handle(decodeMessage)
			}
		})
	}

}

