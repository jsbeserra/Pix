
import axios, { AxiosInstance } from 'axios'
import HttpClient from '@infra/http/http-client'
import { HttpClientECONNREFUSED, HttpClientErrorInfra } from '@infra/errors/http-client/http-client-error'

export default class AxiosClientAdapter implements HttpClient {
	private apiAxios: AxiosInstance

	constructor(private baseurl: string) {
		const axiosInstance = axios.create({})
		axiosInstance.defaults.baseURL = baseurl
		this.apiAxios = axiosInstance
	}

	async get(url: string): Promise<any> {
		try {
			const response = await this.apiAxios.get(url)
			return response.data
		} catch (err: any) {
			console.log(err.message)
			if (err.code === 'ECONNREFUSED') throw new HttpClientECONNREFUSED()
			throw new HttpClientErrorInfra(err.response.data.message)
		}
	}

	async post(url: string, body: any): Promise<any> {
		try {
			const response = await this.apiAxios.post(url, body)
			return response.data
		} catch (err: any) {
			console.log(err.message)
			if (err.code === 'ECONNREFUSED') throw new HttpClientECONNREFUSED()
			throw new HttpClientErrorInfra(err.response.data.message)
		}
	}

	async put(url: string, body: any): Promise<any> {
		try {
			const response = await this.apiAxios.put(url, body)
			return response.data
		} catch (err: any) {
			if (err.code === 'ECONNREFUSED') throw new HttpClientECONNREFUSED()
			throw new HttpClientErrorInfra(err.response.data)
		}
	}

	async delete(url: string): Promise<any> {
		try {
			const response = await this.apiAxios.delete(url)
			return response.data
		} catch (err: any) {
			if (err.code === 'ECONNREFUSED') return new HttpClientECONNREFUSED()
			throw new HttpClientErrorInfra(err.response.data)
		}
	}
}