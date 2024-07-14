import { PokemonModel } from "src/common/models/pokemon-model.model";
import { RepositoryAbstract } from "./abstracts/repository.abstract";
import { Pokemon } from "src/pokemon/entities/pokemon.entity";
import { Injectable } from "@nestjs/common";
import { PokeResponse } from "./interfaces/poke-response.interface";
import { HttpAdapterAbstract } from "src/common/abstracts/http-adapter.abstract";
import { DatasourceAbstract } from "./abstracts/datasource.abstract";

@Injectable()
export class SeedRepository implements RepositoryAbstract {
    constructor(
        private readonly httpProvider: HttpAdapterAbstract,
        private readonly datasource: DatasourceAbstract,
    ) { }

    async get(url: string): Promise<PokeResponse> {
        return await this.httpProvider.get<PokeResponse>(url);
    }

    async createPokemonLote(pokemons: PokemonModel[]): Promise<Pokemon[]> {
        return await this.datasource.createPokemonLote(pokemons);
    }

    async dropPokemons(): Promise<void> {
        return await this.datasource.dropPokemons();
    }

}