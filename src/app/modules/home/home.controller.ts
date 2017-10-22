import { Controller, Get, Res } from '@nestjs/common';
import * as path from 'path';

@Controller('/')
export class HomeController {

    @Get()
    async home(@Res() res): Promise<any> {
        res.sendFile(path.join(__dirname + '/public/index.html'));
    }
}