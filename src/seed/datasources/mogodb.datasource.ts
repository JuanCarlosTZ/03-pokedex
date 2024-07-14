import { PokemonModel } from "src/common/models/pokemon-model.model";
import { DatasourceAbstract } from "../abstracts/datasource.abstract";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Pokemon } from "src/pokemon/entities/pokemon.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MongodbDatasource implements DatasourceAbstract {
    constructor(
        @InjectModel(Pokemon.name)
        private readonly pokemons: Model<Pokemon>
    ) { }

    async createPokemonLote(pokemons: PokemonModel[]): Promise<Pokemon[]> {
        return await this.pokemons.insertMany(pokemons);
    }

    async dropPokemons(): Promise<void> {
        await this.pokemons.deleteMany();
    }

}