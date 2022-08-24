import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { CreateCategoryUseCase } from '@fc/Core_AdmCatalogoVideo/category/application';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log(CreateCategoryUseCase.UseCase);
    return this.appService.getHello();
  }
}
