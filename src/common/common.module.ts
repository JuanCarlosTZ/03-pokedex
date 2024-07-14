import { Module } from '@nestjs/common';
import { HttpProvider } from './providers/http.provider';

@Module({
    providers: [HttpProvider],
    exports: [HttpProvider]
})
export class CommonModule { }
