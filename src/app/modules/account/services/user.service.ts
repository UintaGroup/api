import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { IUser } from '../interfaces/user.interface';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { MongoException } from '../../database/exceptions/mongo.exception';
import { IOrganization } from '../interfaces/organization.interface';

@Component()
export class UserService {
    constructor(@Inject('UserModelToken') private readonly userModel: Model<IUser>) {
    }

    async findOne(params: object): Promise<IUser> {
        try {
            return await this.userModel.findOne(params)
                .populate('organization')
                .exec();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async find(email: string): Promise<IUser> {
        return await this.findOne({email: email.toLowerCase()});
    }

    async create(organization: IOrganization, createUserDto: CreateUserDto): Promise<IUser> {
        try {
            const user = new this.userModel(createUserDto);
            user.organization = organization;
            return await user.save();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async createAdmin(createUserDto: CreateUserDto, organizationId): Promise<IUser> {
        try {
            const user = new this.userModel(createUserDto);
            user.roles = ['admin'];
            user.organization = organizationId;
            return await user.save();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async update(userId: string, updateUserDto: UpdateUserDto): Promise<any> {
        try {
            return await this.userModel.findById(userId)
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

    async findAll(organizationId: string): Promise<IUser[]> {
        try {
            return await this.userModel.find({organization: organizationId}).exec();
        } catch (err) {
            throw new MongoException(err);
        }
    }
}
