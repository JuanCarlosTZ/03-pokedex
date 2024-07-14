export abstract class HttpAdapterAbstract {
    abstract get<T>(url: string): Promise<T>;
}