import { Pokemon } from "src/pokemon/entities/pokemon.entity";
import { CreatePokemonDto } from "../dto/create-pokemon.dto";
import { UpdatePokemonDto } from "../dto/update-pokemon.dto";

export abstract class DatasourceAbstract {
    abstract createPokemon(createPokemonDto: CreatePokemonDto): Promise<Pokemon>;
    abstract findPokemons(): Promise<Pokemon[]>;
    abstract findOnePokemon(term: string): Promise<Pokemon | null>;
    abstract updatePokemon(id: string, updatePokemonDto: UpdatePokemonDto): Promise<Pokemon | null>;
    abstract deletePokemon(id: string): Promise<boolean>;
}