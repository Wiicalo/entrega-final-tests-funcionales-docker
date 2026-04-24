import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { ToolsService } from "./tools.service";

@Controller('tools')
export class ToolsController {
    constructor(private readonly toolsService: ToolsService) {}

    @Get('config')
    getConfig() {
        return this.toolsService.getConfigInfo();
    }

    @Get('process-info')
    getProcessInfo(){
        return this.toolsService.getProcessInfo();
    }

    @Get('calculate')
    async calculate(
        @Query('numbers') numbersQuery?: string,
        @Query('operation') operation?: string,
    ) {
        if(!numbersQuery){
            throw new BadRequestException('Debes enviar numbers. Ejemplo: ?numbers=2,3,4,5');
        }

        const numbers = numbersQuery.split(',').map((value) => Number(value));

        if(numbers.some((value) => Number.isNaN(value))){
            throw new BadRequestException('Todos los valores en numbers deben ser numericos.')
        }

        return this.toolsService.calculateWithChild(numbers, operation);
    }
}
