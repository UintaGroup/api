import { Controller, Post, Get, Body, Put, Req } from '@nestjs/common';
import { UserService } from '../services';
import { IUser } from '../interfaces';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { Roles } from '../../auth/decorators';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    @Roles('admin')
    async create(@Req() req, @Body() createUserDto: CreateUserDto): Promise<IUser> {
        return await this.userService.create(req.user.organization, createUserDto);
    }

    @Get('me')
    async me(@Req() req): Promise<IUser> {
        return this.userService.find(req.user.email);
    }

    @Get()
    @Roles('admin')
    async findAll(@Req() req): Promise<IUser[]> {
        return this.userService.findAll(req.user.orgId);
    }

    @Put()
    async update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
        this.userService.update(req.user.id, updateUserDto);
    }
}
