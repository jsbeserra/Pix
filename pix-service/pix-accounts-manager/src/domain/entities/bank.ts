import Url from '@domain/value-objects/url'


export default class Bank {
	private constructor(readonly name:string, readonly urlForTransactions:Url, readonly webhookNotification:Url,readonly id?:string){}

	public static create(name:string, urlForTransactions:Url, webhookNotification:Url):Bank{
		return new Bank(name,urlForTransactions,webhookNotification)
	}

	public static restore(id:string, name:string, urlForTransactions:string, webhookNotification:string):Bank {
		const _urlForTransactions = Url.restore(urlForTransactions)
		const _webhookNotification = Url.restore(webhookNotification)
		return new Bank(name,_urlForTransactions,_webhookNotification,id)
	}

}