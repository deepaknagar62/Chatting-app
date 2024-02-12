/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Post('/login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.userService.loginUser(createUserDto);
  }
  @Get('/getusers')
  getAll() {
    return this.userService.getAllUsers();
  }
}
