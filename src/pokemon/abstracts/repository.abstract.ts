import { PaginationDto } from "src/common/dto/pagination.dto";
import { CreatePokemonDto } from "../dto/create-pokemon.dto";
import { UpdatePokemonDto } from "../dto/update-pokemon.dto";
import { Pokemon } from "../entities/pokemon.entity";

export abstract class RepositoryAbstract {
    abstract createPokemon(createPokemonDto: CreatePokemonDto): Promise<Pokemon>;
    abstract findPokemons(paginationDto: PaginationDto): Promise<Pokemon[]>;
    abstract findOnePokemon(term: string): Promise<Pokemon>;
    abstract updatePokemon(id: string, updatePokemonDto: UpdatePokemonDto): Promise<Pokemon>;
    abstract deletePokemon(id: string): Promise<boolean>;
}