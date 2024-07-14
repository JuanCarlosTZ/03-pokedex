import { Injectable } from "@nestjs/common";
import { PokemonModel } from "src/common/models/pokemon-model.model";
import { Pokemon } from "src/pokemon/entities/pokemon.entity";


export interface DatasourceInterface {
    createPokemonLote(pokemons: PokemonModel[]): Promise<Pokemon[]>;
    dropPokemons(): Promise<void>;
}