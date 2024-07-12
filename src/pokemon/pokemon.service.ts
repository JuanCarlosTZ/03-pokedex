import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemons: Model<Pokemon>
  ) { }


  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    try {
      createPokemonDto.name.toLowerCase();
      const pokemon = await this.pokemons.create(createPokemonDto);
      return pokemon;
    } catch (ex) {
      this.handleExeption(ex);
    }
  }

  async findAll(): Promise<Pokemon[]> {
    return await this.pokemons.find();
  }

  async findOne(term: string) {
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

    if (!pokemon) {
      throw new NotFoundException(`Pokemon "${term}" not exist`);
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto): Promise<Pokemon> {
    let pokemon: Pokemon = await this.findOne(`${term}`);
    updatePokemonDto.name = updatePokemonDto.name?.toLowerCase();

    try {
      pokemon = await this.pokemons.findByIdAndUpdate(
        pokemon.id,
        updatePokemonDto,
        { new: true },
      );
    } catch (ex) {
      this.handleExeption(ex);

    }

    return pokemon;
  }

  async remove(term: string): Promise<void> {
    // const pokemon = await this.findOne(term);
    // try {
    //   await pokemon.deleteOne();
    // } catch (ex) {
    //   this.handleExeption(ex);
    // }

    try {
      const { deletedCount } = await this.pokemons.deleteOne({ _id: term });
      if (deletedCount === 0) {
        throw new BadRequestException(`Pokemon do not exist with id ${term}`);
      }
    } catch (ex) {
      this.handleExeption(ex);
    }
  }

  handleExeption(ex) {
    if (ex.code === 11000) {
      throw new BadRequestException(`Pokemon do not exist with ${JSON.stringify(ex.keyValue)}`);
    }
    console.log(ex);
    throw new InternalServerErrorException('Pokemon not created - check server log');

  }
}
