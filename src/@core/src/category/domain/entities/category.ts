import Entity from '#seedwork/domain/entity/entity';
import { UniqueEntityId } from '#seedwork/domain/value-objects';

export type CategoryProperties = {
  name: string,
  description?: string,
  isActive?: boolean,
  createdAt?: Date
}

export class Category extends Entity<CategoryProperties> {
  public readonly uniqueEntityId: UniqueEntityId;

  constructor(
    public readonly props: CategoryProperties,
    id?: UniqueEntityId
  ) {
    super(props, id);
    this.props.description = this.props.description ?? null;
    this.props.isActive = this.props.isActive ?? true;
    this.props.createdAt = this.props.createdAt ?? new Date();
  }
  
  get name(): string {
    return this.props.name;
  }
  
  get description(): string {
    return this.props.description;
  }
  
  get isActive(): boolean {
    return this.props.isActive;
  }
  
  get createdAt(): Date {
    return this.props.createdAt;
  }

  private set name(value: string) {
    this.props.name = value
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  } 

  private set isActive(value: boolean) {
    this.props.isActive = value ?? true;
  }

  public update(name: string, description: string): void {
    this.name = name;
    this.description = description;
  }

  public activate() {
    this.props.isActive = true;
  }

  public deactivate() {
    this.props.isActive = false;
  }
}