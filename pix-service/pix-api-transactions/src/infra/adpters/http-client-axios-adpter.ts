
import axios, { AxiosInstance } from 'axios'
import HttpClient from '@infra/http/http-client'
import { GatewayError } from '@infra/errors/gateway/create-account'

export default class AxiosClientAdapter implements HttpClient {
	private apiAxios: AxiosInstance

	constructor(private baseurl: string) {
		const axiosInstance = axios.create({})
		axiosInstance.defaults.baseURL = baseurl
		this.apiAxios = axiosInstance
	}

	async get(url: string): Promise<any> {
		const response = await this.apiAxios.get(url).then((response)=>{
			return response.data
		}).catch(err => {
			return new GatewayError()
		})
		return response.data
	}

	async post(url: string, body: any): Promise<any> {
		const response = await this.apiAxios.post(url, body).then((response)=>{
			return response.data
		}).catch(err => {
			return new GatewayError()
		})
		return response.data

	}

	async put(url: string, body: any): Promise<any> {
		const response = await this.apiAxios.put(url, body).then((response)=>{
			return response.data
		}).catch(err => {
			return new GatewayError()
		})
		return response
	}

	async delete(url: string): Promise<any> {
		await this.apiAxios.delete(url).then((response)=>{
			return response.data
		}).catch(err => {
			return new GatewayError()
		})
	}
}