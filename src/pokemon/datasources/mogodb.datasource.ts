
import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model } from "mongoose";
import { Pokemon } from "src/pokemon/entities/pokemon.entity";
import { Injectable } from "@nestjs/common";
import { CreatePokemonDto } from "../dto/create-pokemon.dto";
import { UpdatePokemonDto } from "../dto/update-pokemon.dto";
import { DatasourceAbstract } from "../abstracts/datasource.abstract";

@Injectable()
export class MongodbDatasource implements DatasourceAbstract {
    constructor(
        @InjectModel(Pokemon.name)
        private readonly pokemons: Model<Pokemon>
    ) { }

    async createPokemon(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
        return await this.pokemons.create(createPokemonDto);
    }

    async findPokemons(): Promise<Pokemon[]> {
        return await this.pokemons.find();
    }

    async findOnePokemon(term: string): Promise<Pokemon | null> {
        let pokemon: Pokemon;
        const termIsName = isNaN(Number(term));
        const termIsId = isValidObjectId(term);

        if (termIsId) {
            pokemon = await this.pokemons.findById(term);
        }

        if (!termIsId && termIsName) {
            pokemon = await this.pokemons.findOne({ name: 'term' });
        }

        if (!termIsId && !termIsName) {
            pokemon = await this.pokemons.findOne({ no: term });
        }

        return pokemon;
    }

    async updatePokemon(id: string, updatePokemonDto: UpdatePokemonDto): Promise<Pokemon> {
        return await this.pokemons.findByIdAndUpdate(
            id,
            updatePokemonDto,
            { new: true },
        );
    }

    async deletePokemon(id: string): Promise<boolean> {
        const { deletedCount } = await this.pokemons.deleteOne({ _id: id });
        if (deletedCount === 0) return false;
        return true;
    }

}