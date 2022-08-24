import { UniqueEntityId } from '#seedwork/domain/value-objects';
import { Category, CategoryProperties } from './category';

const categoryName = Category.name;
const categoryMethodUpdateName = Category.prototype.update.name;
const categoryMethodActivateName = Category.prototype.activate.name;
const categoryMethodDeactivateName = Category.prototype.deactivate.name;

describe(`${categoryName} Unit Test`, () => {
  beforeAll(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date());
  })

  describe('Constructor', () => {
    it('Should create category with id when category is created', () => {
      type InputType = {props: CategoryProperties, id?: UniqueEntityId};
      const inputs: InputType[] = [
        { props: { name: 'some name' }, id: null },
        { props: { name: 'some name' }, id: undefined },
        { props: { name: 'some name' }, id: new UniqueEntityId('cda16f22-e6ec-4ea3-a804-3aeee4b92581') },
      ];

      inputs.forEach(input => {
        const category = new Category(input.props, input.id as any);
        expect(category.id).not.toBeNull();

        input.id && expect(category.id).toBe('cda16f22-e6ec-4ea3-a804-3aeee4b92581');
      });
    })

    it('Should create category when only name properties is provided', () => {
      const category = new Category({
        name: 'some name'
      });

      expect(category.props).toStrictEqual({
        name: 'some name',
        description: null,
        isActive: true,
        createdAt: new Date()
      });
      expect(category.props.name).toBe('some name');
      expect(category.props.description).toBeNull();
      expect(category.props.isActive).toBeTruthy();
      expect(category.props.createdAt).toBeInstanceOf(Date);
    })

    it('Should create category when all properties is provided', () => {
      let categoryProperties: CategoryProperties = {
        name: 'some name',
        description: 'some description',
        isActive: false,
        createdAt: new Date()
      };

      let category = new Category(categoryProperties);
      
      expect(category.props).toStrictEqual(categoryProperties);
      
      expect(category.props.name).toBe(categoryProperties.name);
      expect(category.props.description).toBe(categoryProperties.description);
      expect(category.props.isActive).toBeFalsy();
      expect(category.props.createdAt).toBeInstanceOf(Date);
    })
  })

  describe('Getters and Setters', () => {
    it('Should return getter of name when setter name is provided', () => {
      const category = new Category({
        name: 'some name'
      });
      expect(category.name).toBe('some name');
    })

    it('Should return getter of description when setter description is provided', () => {
      const categoryWithDescription = new Category({
        name: 'some name',
        description: 'some description'
      });
      expect(categoryWithDescription.description).toBe('some description');

      const categoryWithoutDescription = new Category({
        name: 'some name',
      });
      expect(categoryWithoutDescription.description).toBeNull();
    })

    it('Should return getter of isActive when setter isActive is provided', () => {
      const categoryIsActive = new Category({
        name: 'some name',
        description: 'some description',
        isActive: true
      });
      expect(categoryIsActive.isActive).toBeTruthy();

      const categoryIsNotActive = new Category({
        name: 'some name',
        description: 'some description',
        isActive: false
      });
      expect(categoryIsNotActive.isActive).toBeFalsy();
    })

    it('Should return getter of createAt when category is created', () => {
      let createdAt = new Date()
      const category = new Category({
        name: 'some name'
      });
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(category.createdAt).toEqual(createdAt);

      createdAt = new Date('2020-01-01');
      const categoryWhitCreatedAt = new Category({
        name: 'some name',
        createdAt
      });
      expect(categoryWhitCreatedAt.createdAt).toBeInstanceOf(Date);
      expect(categoryWhitCreatedAt.createdAt).toEqual(createdAt);
    })
  })

  describe(`Methods Tests`, () => {
    it(`should update name and description when ${categoryMethodUpdateName} is called with correct values`, () => {
      const category = new Category({
        name: 'some name',
        description: 'some description'
      });

      category.update('name updated', 'description updated');

      expect(category.name).toBe('name updated');
      expect(category.description).toBe('description updated');
    });

    it(`should activate category when ${categoryMethodActivateName} is called`, () => {
      const category = new Category({
        name: 'some name',
        description: 'some description',
        isActive: false
      });

      category.activate();

      expect(category.isActive).toBeTruthy();
    });

    it(`should activate category when ${categoryMethodDeactivateName} is called`, () => {
      const category = new Category({
        name: 'some name',
        description: 'some description',
        isActive: true
      });

      category.deactivate();

      expect(category.isActive).toBeFalsy();
    });
  });
})