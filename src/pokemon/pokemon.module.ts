import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { MongodbDatasource } from './datasources/mogodb.datasource';
import { PokemonRepository } from './pokemon.repository';
import { DatasourceAbstract } from './abstracts/datasource.abstract';
import { RepositoryAbstract } from './abstracts/repository.abstract';
import { ConfigModule } from '@nestjs/config';

const mongooseModule = MongooseModule.forFeature([
  {
    name: Pokemon.name,
    schema: PokemonSchema,
  }
])

@Module({
  controllers: [PokemonController],
  providers: [
    PokemonService,
    MongodbDatasource,
    PokemonRepository,
    { provide: DatasourceAbstract, useExisting: MongodbDatasource },
    { provide: RepositoryAbstract, useExisting: PokemonRepository },
  ],
  imports: [
    mongooseModule,
    ConfigModule
  ]
})
export class PokemonModule { }
