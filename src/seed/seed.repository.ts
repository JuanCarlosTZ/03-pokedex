import { PokemonModel } from "src/common/models/pokemon-model.model";
import { RepositoryInterface } from "./interfaces/repository.interface";
import { Pokemon } from "src/pokemon/entities/pokemon.entity";
import { Injectable } from "@nestjs/common";
import { MongodbDatasource } from "./datasources/mogodb.datasource";
import { PokeResponse } from "./interfaces/poke-response.interface";
import { HttpProvider } from "src/common/providers/http.provider";

@Injectable()
export class SeedRepository implements RepositoryInterface {
    constructor(
        private readonly httpProvider: HttpProvider,
        private readonly pokemons: MongodbDatasource,
    ) { }

    async get(url: string): Promise<PokeResponse> {
        return await this.httpProvider.get<PokeResponse>(url);
    }

    async createPokemonLote(pokemons: PokemonModel[]): Promise<Pokemon[]> {
        return await this.pokemons.createPokemonLote(pokemons);
    }

    async dropPokemons(): Promise<void> {
        return await this.pokemons.dropPokemons();
    }

}