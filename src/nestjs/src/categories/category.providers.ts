/* eslint-disable @typescript-eslint/no-namespace */
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  FindAllCategoriesUseCase,
  FindCategoryUseCase,
  UpdateCategoryUseCase,
} from '@fc/Core_AdmCatalogoVideo/category/application';
import { CategoryInMemoryRepository } from '@fc/Core_AdmCatalogoVideo/category/infra';
import CategoryRepository from '@fc/Core_AdmCatalogoVideo/dist/category/domain/repositories/category.repository';

export namespace CATEGORY_PROVIDERS {
  export namespace REPOSITORIES {
    export const IN_MEMORY = {
      provide: 'CategoryInMemoryRepository',
      useClass: CategoryInMemoryRepository,
    };
  }

  export namespace USE_CASES {
    export const CREATE_USE_CASE = {
      provide: CreateCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) =>
        new CreateCategoryUseCase.UseCase(categoryRepo),
      inject: [REPOSITORIES.IN_MEMORY.provide],
    };

    export const FIND_USE_CASE = {
      provide: FindCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) =>
        new FindCategoryUseCase.UseCase(categoryRepo),
      inject: [REPOSITORIES.IN_MEMORY.provide],
    };

    export const FIND_ALL_USE_CASE = {
      provide: FindAllCategoriesUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) =>
        new FindAllCategoriesUseCase.UseCase(categoryRepo),
      inject: [REPOSITORIES.IN_MEMORY.provide],
    };

    export const UPDATE_USE_CASE = {
      provide: UpdateCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) =>
        new UpdateCategoryUseCase.UseCase(categoryRepo),
      inject: [REPOSITORIES.IN_MEMORY.provide],
    };

    export const DELETE_USE_CASE = {
      provide: DeleteCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) =>
        new DeleteCategoryUseCase.UseCase(categoryRepo),
      inject: [REPOSITORIES.IN_MEMORY.provide],
    };
  }
}
