import { Model } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { Organization, User } from '../interfaces';
import { UserSchema } from '../schema/user.schema';
import { MongoException } from '../../common/exceptions';

@Component()
export class UserService {

    constructor(@InjectModel(UserSchema) private readonly userModel: Model<User>) {
    }

    async findAll(orgId: string): Promise<User[]> {
        try {
            return await this.userModel.find({organization: orgId }).exec();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async findOne(params: object): Promise<User> {
        try {
            return await this.userModel.findOne(params)
                .populate('organization')
                .exec();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async findByEmail(email: string): Promise<User> {
        return await this.findOne({email: email.toLowerCase()});
    }

    async find(orgId: string, userId: string): Promise<User> {
        return await this.findOne({organization: orgId, id: userId});
    }

    async create(organization: Organization, createUserDto: CreateUserDto): Promise<User> {
        try {
            const user = new this.userModel(createUserDto);
            user.organization = organization;
            return await user.save();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async createAdmin(organization: Organization, createUserDto: CreateUserDto): Promise<User> {
        try {
            const user = new this.userModel(createUserDto);
            user.roles = ['admin'];
            user.organization = organization;
            return await user.save();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async update(orgId: string, userId: string, updateUserDto: UpdateUserDto): Promise<any> {
        try {
            return await this.findOne({organization: orgId, _id: userId})
                .then(user => {
                    if (updateUserDto.facebook) {
                        user.facebook = updateUserDto.facebook;
                    }
                    if (updateUserDto.twitter) {
                        user.twitter = updateUserDto.twitter;
                    }
                    if (updateUserDto.google) {
                        user.google = updateUserDto.google;
                    }
                    if (updateUserDto.microsoft) {
                        user.microsoft = updateUserDto.microsoft;
                    }
                    if (updateUserDto.password) {
                        user.password = updateUserDto.password;
                    }
                    return user.save();
                });
        } catch (err) {
            throw new MongoException(err);
        }
    }

}
