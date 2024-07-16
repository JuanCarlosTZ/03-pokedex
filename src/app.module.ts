import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './common/config/env.config';
import { joiValidationSchema } from './common/config/joi_validation_schema';

const configModule = ConfigModule.forRoot({
  load: [envConfig],
  validationSchema: joiValidationSchema,
});

const staticModule = ServeStaticModule.forRoot({
  rootPath: join(__dirname, '..', 'public'),
  exclude: ['/api/(.*)'],
});

const mongooseModule = MongooseModule.forRoot(
  process.env.MONGODB
)

@Module({
  imports: [
    configModule,
    staticModule,
    mongooseModule,
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }


