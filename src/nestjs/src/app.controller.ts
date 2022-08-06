import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Category } from '@fc/Core_AdmCatalogoVideo/category/domain';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const category = new Category({
      name: 'a',
    });
    console.log(category);
    return this.appService.getHello();
  }
}
