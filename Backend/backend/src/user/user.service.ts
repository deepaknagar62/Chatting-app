import { CreateUserDto } from './dto/createUser.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<string | UserDocument> {
    try {
      const model = new this.UserModel();
      const user = await this.UserModel.findOne({ email: createUserDto.email });
      if (user) {
        return 'user Already exists';
      }
      model.name = createUserDto.name;
      model.email = createUserDto.email;
      model.password = createUserDto.password;
      return model.save();
    } catch (error) {
      console.log(error.message);
    }
  }

  async loginUser(
    createUserDto: CreateUserDto,
  ): Promise<string | UserDocument> {
    try {
      const user = await this.UserModel.findOne({ email: createUserDto.email });
      if (user) {
        if (user.password === createUserDto.password) {
          return user;
        } else {
          return 'wrong password';
        }
      } else {
        return 'user not found';
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  async getAllUsers(): Promise<UserDocument[]> {
    try {
      const users = await this.UserModel.find({});
      return users;
    } catch (error) {
      console.log(error.message);
    }
  }
}
