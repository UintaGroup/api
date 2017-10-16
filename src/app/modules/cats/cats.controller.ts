import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces';
import { ObjectIdPipe } from '../common/pipes';
import { RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators';

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
    constructor(private readonly catsService: CatsService) {
    }

    @Get(':id')
    async find(@Param('id', new ObjectIdPipe()) id): Promise<Cat> {
        return this.catsService.find(id);
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Post()
    @Roles('admin')
    async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
        return this.catsService.create(createCatDto);
    }

    @Put()
    async update(@Body() updateCatDto: UpdateCatDto) {
        await this.catsService.update(updateCatDto);
    }

    @Delete(':id')
    async delete(@Param('id', new ObjectIdPipe()) id) {
        await this.catsService.delete(id);
    }
}