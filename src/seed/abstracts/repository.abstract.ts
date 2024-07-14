import { PokemonModel } from "src/common/models/pokemon-model.model";
import { Pokemon } from "src/pokemon/entities/pokemon.entity";
import { PokeResponse } from "../interfaces/poke-response.interface";


export abstract class RepositoryAbstract {
    abstract get(url: string): Promise<PokeResponse>;
    abstract createPokemonLote(pokemons: PokemonModel[]): Promise<Pokemon[]>;
    abstract dropPokemons(): Promise<void>;
}