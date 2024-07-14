import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { MongodbDatasource } from './datasources/mogodb.datasource';
import { PokemonRepository } from './pokemon.repository';

const mongooseModule = MongooseModule.forFeature([
  {
    name: Pokemon.name,
    schema: PokemonSchema,
  }
])

@Module({
  controllers: [PokemonController],
  providers: [PokemonService, MongodbDatasource, PokemonRepository],
  imports: [mongooseModule]
})
export class PokemonModule { }
