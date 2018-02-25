import { Model } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoException } from '../../common/exceptions';
import { Organization } from '../interfaces';
import { CreateOrganizationDto } from '../dto';
import { OrganizationSchema } from '../schema/organization.schema';

@Component()
export class OrganizationService {
    constructor(@InjectModel(OrganizationSchema) private readonly organizationModel: Model<Organization>) {
    }

    async find(id: string): Promise<Organization> {
        try {
            return await this.organizationModel.findById(id)
                .populate('users')
                .exec();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
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

    async findAll(): Promise<Organization[]> {
        try {
            return await this.organizationModel.find().exec();
        } catch (err) {
            throw new MongoException(err);
        }
    }
}
