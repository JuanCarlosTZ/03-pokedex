import { CreatePokemonDto } from "./dto/create-pokemon.dto";
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";
import { Pokemon } from "./entities/pokemon.entity";
import { Injectable } from "@nestjs/common";
import { RepositoryAbstract } from "./abstracts/repository.abstract";
import { DatasourceAbstract } from "./abstracts/datasource.abstract";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Injectable()
export class PokemonRepository implements RepositoryAbstract {
    constructor(
        private readonly datasource: DatasourceAbstract,
    ) { }

    async createPokemon(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
        return await this.datasource.createPokemon(createPokemonDto);
    }
    async findPokemons(paginationDto: PaginationDto): Promise<Pokemon[]> {
        return await this.datasource.findPokemons(paginationDto);
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