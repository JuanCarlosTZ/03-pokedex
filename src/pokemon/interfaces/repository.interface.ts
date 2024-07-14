import { CreatePokemonDto } from "../dto/create-pokemon.dto";
import { UpdatePokemonDto } from "../dto/update-pokemon.dto";
import { Pokemon } from "../entities/pokemon.entity";

export interface RepositoryInterface {
    createPokemon(createPokemonDto: CreatePokemonDto): Promise<Pokemon>;
    findPokemons(): Promise<Pokemon[]>;
    findOnePokemon(term: string): Promise<Pokemon>;
    updatePokemon(id: string, updatePokemonDto: UpdatePokemonDto): Promise<Pokemon>;
    deletePokemon(id: string): Promise<boolean>;
}