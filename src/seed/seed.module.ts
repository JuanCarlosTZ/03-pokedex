import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from 'src/pokemon/entities/pokemon.entity';
import { CommonModule } from 'src/common/common.module';
import { SeedRepository } from './seed.repository';
import { MongodbDatasource } from './datasources/mogodb.datasource';

const mongooseModule = MongooseModule.forFeature([
  {
    name: Pokemon.name,
    schema: PokemonSchema,
  }
]);

@Module({
  controllers: [SeedController],
  providers: [SeedService, SeedRepository, MongodbDatasource],
  imports: [
    mongooseModule,
    CommonModule
  ]
})
export class SeedModule { }
