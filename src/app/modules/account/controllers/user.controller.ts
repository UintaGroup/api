import { Controller, Post, Get, Body, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../services';
import { IUser } from '../interfaces';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { RolesGuard } from '../../auth/guards';
import { Roles } from '../../auth/decorators';

@Controller('users')
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
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
