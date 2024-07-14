import { Pokemon } from "src/pokemon/entities/pokemon.entity";
import { CreatePokemonDto } from "../dto/create-pokemon.dto";
import { UpdatePokemonDto } from "../dto/update-pokemon.dto";

export interface DatasourceInterface {
    createPokemon(createPokemonDto: CreatePokemonDto): Promise<Pokemon>;
    findPokemons(): Promise<Pokemon[]>;
    findOnePokemon(term: string): Promise<Pokemon | null>;
    updatePokemon(id: string, updatePokemonDto: UpdatePokemonDto): Promise<Pokemon | null>;
    deletePokemon(id: string): Promise<boolean>;
}