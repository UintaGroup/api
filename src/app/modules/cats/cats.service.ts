import { Model } from 'mongoose';
import { Component, Inject, UsePipes } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { MongoException } from '../database/exceptions/mongo.exception';

@Component()
export class CatsService {
    constructor(@Inject('CatModelToken') private readonly catModel: Model<Cat>) {
    }

    async find(id: string): Promise<Cat> {
        try {
            return await this.catModel.findById(id).exec();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async create(createCatDto: CreateCatDto): Promise<Cat> {
        try {
            const cat = new this.catModel(createCatDto);
            return await cat.save()
                .then(c => c);
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async update(updateCatDto: UpdateCatDto): Promise<void> {
        try {
            // TODO prevent fields not on updateCatDTO?
            delete updateCatDto['name'];
            await this.catModel.findByIdAndUpdate(updateCatDto.id, updateCatDto);
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async findAll(): Promise<Cat[]> {
        try {
            return await this.catModel.find().exec();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.catModel.findByIdAndRemove(id).exec();
        } catch (err) {
            throw new MongoException(err);
        }
    }
}
