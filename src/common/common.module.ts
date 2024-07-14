import { Module } from '@nestjs/common';
import { HttpProvider } from './providers/http.provider';
import { HttpAdapterAbstract } from './abstracts/http-adapter.abstract';

@Module({
    providers: [
        HttpProvider,
        { provide: HttpAdapterAbstract, useExisting: HttpProvider },
    ],
    exports: [HttpAdapterAbstract]
})
export class CommonModule { }
