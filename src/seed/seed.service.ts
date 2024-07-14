import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokemonModel } from 'src/common/models/pokemon-model.model';
import { SeedRepository } from './seed.repository';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;


  constructor(
    private readonly seedRepository: SeedRepository,
  ) { }

  async executeSeed() {
    try {
      const responsePokemons = await this.seedRepository.get('https://pokeapi.co/api/v2/pokemon?limit=10');
      await this.seedRepository.dropPokemons();

      const pokemonsToInsert: PokemonModel[] = [];

      responsePokemons.results.map(async ({ name, url }) => {
        const urlSegmented = url.split('/');
        const no = +urlSegmented[urlSegmented.length - 2];
        const createPokemon: PokemonModel = { name, no };

        pokemonsToInsert.push(createPokemon);
      });

      await this.seedRepository.createPokemonLote(pokemonsToInsert);

      return 'Seed executed';
    } catch (error) {
      this.handleExeption(error);
    }


  }

  // async executeSeedObsolete() {
  //   const response = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');
  //   let countAdded = 0;
  //   let countRejected = 0;

  //   const promise =
  //     response.data.results.map(async ({ name, url }) => {
  //       const urlSegmented = url.split('/');
  //       const no = +urlSegmented[urlSegmented.length - 2];
  //       const createPokemonDto = { name, no };

  //       try {
  //         await this.create(createPokemonDto);
  //         countAdded++;
  //         console.log(`added: ${countAdded}`);
  //       } catch (error) {
  //         countRejected++;
  //         console.log(`rejected: ${countRejected}`);
  //       }

  //     });

  //   await Promise.all(promise);

  //   const seedRsult: SeedResponse = {
  //     countAdded,
  //     countRejected,
  //     message: `Seed executed`,
  //   };

  //   console.log(`added result: ${countAdded}`);
  //   console.log(`rejected result: ${countRejected}`);

  //   return seedRsult;
  // }

  // async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
  //   try {
  //     createPokemonDto.name.toLowerCase();
  //     const pokemon = await this.pokemons.create(createPokemonDto);
  //     console.log(pokemon);
  //     return pokemon;
  //   } catch (ex) {
  //     this.handleExeption(ex);
  //   }
  // }

  handleExeption(ex) {

    console.log(ex);
    throw new InternalServerErrorException('Pokemons don`t created - check server log');

  }

}
