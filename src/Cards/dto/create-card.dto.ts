import { IsNumber, IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsNumber()
  readonly bid: number;

  @IsNumber()
  readonly cid: number;
}
