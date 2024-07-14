import { PokemonModel } from "src/common/models/pokemon-model.model";
import { Pokemon } from "src/pokemon/entities/pokemon.entity";


export abstract class DatasourceAbstract {
    abstract createPokemonLote(pokemons: PokemonModel[]): Promise<Pokemon[]>;
    abstract dropPokemons(): Promise<void>;
}