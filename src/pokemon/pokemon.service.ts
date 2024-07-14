import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { RepositoryAbstract } from './abstracts/repository.abstract';

@Injectable()
export class PokemonService {
  constructor(
    private readonly repository: RepositoryAbstract,
  ) { }

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    try {
      createPokemonDto.name.toLowerCase();
      const pokemon = await this.repository.createPokemon(createPokemonDto);
      return pokemon;
    } catch (ex) {
      this.handleExeption(ex);
    }
  }

  async findAll(): Promise<Pokemon[]> {
    return await this.repository.findPokemons();
  }

  async findOne(term: string): Promise<Pokemon> {
    let pokemon: Pokemon;

    try {
      pokemon = await this.repository.findOnePokemon(term);

    } catch (ex) {
      this.handleExeption(ex);
    }

    if (!pokemon) throw new NotFoundException(`Pokemon "${term}" not exist`);

    return pokemon;

  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto): Promise<Pokemon> {
    let pokemon: Pokemon = await this.findOne(`${term}`);
    updatePokemonDto.name = updatePokemonDto.name?.toLowerCase();

    try {
      pokemon = await this.repository.updatePokemon(
        pokemon.id,
        updatePokemonDto,
      );
    } catch (ex) {
      this.handleExeption(ex);
    }

    return pokemon;
  }

  async remove(id: string): Promise<void> {
    let isDeleted: boolean;

    try {
      isDeleted = await this.repository.deletePokemon(id);

    } catch (ex) {
      this.handleExeption(ex);
    }

    if (!isDeleted) {
      throw new BadRequestException(`Pokemon do not exist with id ${id}`);
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
