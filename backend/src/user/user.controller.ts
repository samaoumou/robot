import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwtAuthGuard';

//Controller pour les utilisateurs chargé de gérer les routes
//de l'api pour les utilisateurs et de communiquer avec le service
//pour les requêtes à la base de donnée
//Pour chaque route on appelle la fonction correspondante dans le service
//et on retourne la réponse
//Exemple: la route pour créer un utilisateur appelle la fonction create
//du service et retourne la réponse
//Point d'entrée de l'api pour les utilisateurs
//Les routes sont préfixées par /user
//Exemple:GET /user pour récupérer tout les utilisateurs
//Exemple:POST /user pour créer un utilisateur
//Exemple:GET /user/1 pour récupérer l'utilisateur avec l'id 1
//Exemple:PATCH /user/1 pour modifier l'utilisateur avec l'id 1
//Exemple:DELETE /user/1 pour supprimer l'utilisateur avec l'id 1
@UseGuards(JwtAuthGuard) // pour l'autorisation
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //Route pour créer un utilisateur
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  //Route pour récupérer tout les utilisateurs
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  //Route pour récupérer un utilisateur
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  //Route pour modifier un utilisateur
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  //Route pour supprimer un utilisateur
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
