import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  prenom: string;

  @IsEmail({}, { message: "Format de l'email invalide" })
  @Matches(
    new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
    ),
    { message: "Format de l'email invalide" },
  )
  email: string;

  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  password: string;

/*   @IsNotEmpty({ message: "RFID requis pour l'accés à la plateforme" })
  rfId: string; */
}
