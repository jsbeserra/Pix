
import axios, { AxiosInstance } from 'axios'
import HttpClient from '@infra/http/http-client'
import { HttpClientECONNREFUSED, HttpClientError } from '@main/errors/http/http-error'

export default class AxiosAdapter implements HttpClient {
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
			if (err.code === 'ECONNREFUSED') return new HttpClientECONNREFUSED()
			return new HttpClientError(err.response.data, err.statusCode)
		}
	}

	async post(url: string, body: any): Promise<any> {
		try {
			const response = await this.apiAxios.post(url, body)
			return response.data
		} catch (err: any) {
			if (err.code === 'ECONNREFUSED') return new HttpClientECONNREFUSED()
			return new HttpClientError(err.response.data, err.statusCode)
		}
	}

	async put(url: string, body: any): Promise<any> {
		try {
			const response = await this.apiAxios.put(url, body)
			return response.data
		} catch (err: any) {
			if (err.code === 'ECONNREFUSED') return new HttpClientECONNREFUSED()
			return new HttpClientError(err.response.data, err.statusCode)
		}
	}

	async delete(url: string): Promise<any> {
		try {
			const response = await this.apiAxios.delete(url)
			return response.data
		} catch (err: any) {
			if (err.code === 'ECONNREFUSED') return new HttpClientECONNREFUSED()
			return new HttpClientError(err.response.data, err.statusCode)
		}
	}
}