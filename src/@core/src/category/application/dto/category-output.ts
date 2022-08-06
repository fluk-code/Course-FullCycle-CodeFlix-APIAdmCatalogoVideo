import { Category } from '@category/domain/entities';


export type CategoryOutputDTO = {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
}

export class CategoryOutputMapper {
  static toOutput(entity: Category): CategoryOutputDTO {
    return entity.toJson()
  }
}