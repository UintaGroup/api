import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { IOrganization } from '../interfaces/organization.interface';
// import { UpdateDto } from '../common/dto/update.dto';
import { MongoException } from '../../database/exceptions/mongo.exception';
import { CreateOrganizationDto } from '../dto/create-organization.dto';

@Component()
export class OrganizationService {
    constructor(@Inject('OrganizationModelToken') private readonly organizationModel: Model<IOrganization>) {
    }

    async find(id: string): Promise<IOrganization> {
        try {
            return await this.organizationModel.findById(id)
                .populate('users')
                .exec();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async create(createOrganizationDto: CreateOrganizationDto): Promise<IOrganization> {
        try {
            const organization = new this.organizationModel(createOrganizationDto);
            return await organization.save();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    // async update(updateDto: UpdateDto): Promise<any> {
    //     try {
    //         const update: any = {};
    //         update[updateDto.field] = updateDto.value;
    //         return this.organizationModel.findByIdAndUpdate(updateDto.id, update);
    //     } catch (err) {
    //         throw new MongoException(err);
    //     }
    // }

    async findAll(): Promise<IOrganization[]> {
        try {
            return await this.organizationModel.find().exec();
        } catch (err) {
            throw new MongoException(err);
        }
    }
}
