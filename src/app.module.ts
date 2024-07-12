import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';

const staticModule = ServeStaticModule.forRoot({
  rootPath: join(__dirname, '..', 'public'),
  exclude: ['/api/(.*)'],
});

const mongooseModule = MongooseModule.forRoot(
  'mongodb://localhost:27017/nest-pokemon'
)

@Module({
  imports: [
    staticModule,
    mongooseModule,
    PokemonModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

