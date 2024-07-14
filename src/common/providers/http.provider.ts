import axios, { AxiosInstance } from "axios";
import { HttpAdapterAbstract } from "../abstracts/http-adapter.abstract";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HttpProvider implements HttpAdapterAbstract {
    private readonly axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        const { data } = await this.axios.get(url);
        return data;
    }

}