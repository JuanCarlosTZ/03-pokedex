import { CreatePokemonDto } from "./dto/create-pokemon.dto";
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";
import { Pokemon } from "./entities/pokemon.entity";
import { RepositoryInterface } from "./interfaces/repository.interface";
import { MongodbDatasource } from "./datasources/mogodb.datasource";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PokemonRepository implements RepositoryInterface {
    constructor(
        private readonly datasource: MongodbDatasource,
    ) { }

    async createPokemon(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
        return await this.datasource.createPokemon(createPokemonDto);
    }
    async findPokemons(): Promise<Pokemon[]> {
        return await this.datasource.findPokemons();
    }
    async findOnePokemon(term: string): Promise<Pokemon> {
        return await this.datasource.findOnePokemon(term);
    }
    async updatePokemon(id: string, updatePokemonDto: UpdatePokemonDto): Promise<Pokemon> {
        return await this.datasource.updatePokemon(id, updatePokemonDto);
    }
    async deletePokemon(id: string): Promise<boolean> {
        return await this.datasource.deletePokemon(id);
    }

}