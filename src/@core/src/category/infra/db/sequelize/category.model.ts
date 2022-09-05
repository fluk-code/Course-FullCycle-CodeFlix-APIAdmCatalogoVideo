import { CategoryProperties } from '#category/domain';
import { Model } from 'sequelize';
import { Column, DataType, PrimaryKey, Table } from 'sequelize-typescript';

/*
  ### Anotações: 
  > O sequelize cria o nume da tabela iguals ao nome da classe "categoryModel"
  para definir outro nome utilizamos o atributo "tableName".

  > O sequelize tambem cria colunas "createAt" e "updatedAt" e as gerenciam,
  para remover esse comportamento utilizamos o atributo "timestamp" igual a false.
*/

type CategoryModelProperties = Required<
  { id: string }
  & CategoryProperties 
>

@Table({ tableName: 'categories', timestamps: false })
export class CategoryModel 
extends Model<CategoryModelProperties>
{
  @PrimaryKey
  @Column({ type: DataType.UUID })
  id: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT })
  description: string | null;

  @Column({ allowNull: false })
  isActive: boolean;

  @Column({ allowNull: false })
  createdAt: Date;
}