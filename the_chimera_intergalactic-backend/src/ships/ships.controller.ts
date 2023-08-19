import {Controller, Post, Body, Res, Get, Param,} from '@nestjs/common'
import { ShipsService} from "./ships.service";
import {FormDataRequest} from "nestjs-form-data";
import {CreateShipDto} from "./dto/create-ship.dto";
import { Response, Request } from 'express'

@Controller({
    version: '1',
    path: 'ships'
})
export class ShipsController {
    constructor(private readonly shipService: ShipsService) {
    }

    @Post('add')
    @FormDataRequest()
    async createShip(@Body() createShipDto: CreateShipDto,@Res() res: Response){
        const { name,id} =await this.shipService.createShip(createShipDto);
        res.send({id,name})
    }

    @Get(':identifier')
    getShipByIdentifier(@Param('identifier') identifier:string){
        return this.shipService.getShipByIdentifier(identifier)
    }

}