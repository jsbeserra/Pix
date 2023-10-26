import { IQueue } from '@application/interfaces/queue/queue'
import { usecase } from '@application/usecase'

export default class FakeQueueClientAdpter implements IQueue {
	private static instance: FakeQueueClientAdpter


	private constructor() {}

	public static getInstance(): FakeQueueClientAdpter {
		if (!this.instance) {
			this.instance = new FakeQueueClientAdpter()
		}
		return this.instance
	}

	public async connect(connectionUrl: string): Promise<void> {

	}

	public async publish(queueName: string, message: any): Promise<void> {

	}

	async consumer(queueName: string, callback: usecase<any,void>): Promise<void> {

	}

}

