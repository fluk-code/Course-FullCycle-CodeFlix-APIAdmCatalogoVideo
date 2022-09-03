import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';

import {
  CreateCategoryUseCase,
  FindCategoryUseCase,
  FindAllCategoriesUseCase,
  UpdateCategoryUseCase,
  DeleteCategoryUseCase,
} from '@fc/Core_AdmCatalogoVideo/category/application';
import { CategoryInMemoryRepository } from '@fc/Core_AdmCatalogoVideo/category/infra';

import CategoryRepository from '@fc/Core_AdmCatalogoVideo/category/domain';

@Module({
  controllers: [CategoriesController],
  providers: [
    {
      provide: 'CategoryInMemoryRepository',
      useClass: CategoryInMemoryRepository,
    },
    {
      provide: CreateCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Category) =>
        new CreateCategoryUseCase.UseCase(categoryRepo),
      inject: ['CategoryInMemoryRepository'],
    },
    {
      provide: FindCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Category) =>
        new FindCategoryUseCase.UseCase(categoryRepo),
      inject: ['CategoryInMemoryRepository'],
    },
    {
      provide: FindAllCategoriesUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Category) =>
        new FindAllCategoriesUseCase.UseCase(categoryRepo),
      inject: ['CategoryInMemoryRepository'],
    },
    {
      provide: UpdateCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Category) =>
        new UpdateCategoryUseCase.UseCase(categoryRepo),
      inject: ['CategoryInMemoryRepository'],
    },
    {
      provide: DeleteCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Category) =>
        new DeleteCategoryUseCase.UseCase(categoryRepo),
      inject: ['CategoryInMemoryRepository'],
    },
  ],
})
export class CategoriesModule {}
