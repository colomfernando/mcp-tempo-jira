import axios, { type AxiosInstance } from 'axios';
import { TEMPO_API_BASE_URL } from './config.js';

export default class TempoClient {
	private httpClient: AxiosInstance;

	constructor(apiToken: string) {
		this.httpClient = axios.create({
			baseURL: TEMPO_API_BASE_URL,
			headers: {
				Authorization: `Bearer ${apiToken}`
			}
		});
	}

	async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
		const response = await this.httpClient.get<T>(path, { params });
		return response.data;
	}

	async post<T>(path: string, body?: unknown): Promise<T> {
		const response = await this.httpClient.post<T>(path, body);
		return response.data;
	}

	async put<T>(path: string, body?: unknown): Promise<T> {
		const response = await this.httpClient.put<T>(path, body);
		return response.data;
	}

	async delete<T>(path: string, params?: Record<string, unknown>): Promise<T> {
		const response = await this.httpClient.delete<T>(path, { params });
		return response.data;
	}
}
