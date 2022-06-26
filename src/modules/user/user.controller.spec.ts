import { Test, TestingModule } from '@nestjs/testing';
import { UserMemoryRepository } from './repositories/in-memory/UserMemoryRepository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: 'UserRepository',
          useClass: UserMemoryRepository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('store', () => {
    it('should create a user', async () => {
      const userData = {
        email: 'test@test.com',
        name: 'User Test',
        password: '123456789',
      };

      const user = await controller.store({ ...userData });

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.password).not.toBeDefined();
    });
  });
});
