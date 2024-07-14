import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HttpProvider implements HttpAdapter {
    private readonly axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        const { data } = await this.axios.get(url);
        return data;
    }

}