import { Injectable } from "@nestjs/common";
import { PokemonModel } from "src/common/models/pokemon-model.model";
import { Pokemon } from "src/pokemon/entities/pokemon.entity";
import { PokeResponse } from "./poke-response.interface";


export interface RepositoryInterface {
    get(url: string): Promise<PokeResponse>;
    createPokemonLote(pokemons: PokemonModel[]): Promise<Pokemon[]>;
    dropPokemons(): Promise<void>;
}