import { IsNumber, isNumber, IsPositive, isPositive, IsString, Min, MinLength } from "class-validator";
import { PokemonModel } from "src/common/models/pokemon-model.model";

export class CreatePokemonDto implements PokemonModel {
    @IsString()
    @MinLength(1)
    name: string;

    @IsNumber()
    @IsPositive()
    @Min(1)
    no: number;
}
