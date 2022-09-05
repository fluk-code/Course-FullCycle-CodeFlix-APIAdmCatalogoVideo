import { CategoryProperties } from '#category/domain';
import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

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
  declare id: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare name: string;

  @Column({ type: DataType.TEXT })
  declare description: string | null;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare isActive: boolean;

  @Column({ type: DataType.DATE, allowNull: false })
  declare createdAt: Date;
}