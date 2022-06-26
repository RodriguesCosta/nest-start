import { Test, TestingModule } from '@nestjs/testing';
import { UserMemoryRepository } from './repositories/in-memory/UserMemoryRepository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'UserRepository',
          useClass: UserMemoryRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const userData = {
        email: 'test@test.com',
        name: 'User Test',
        password: '123456789',
      };

      const user = await service.create({ ...userData });

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.password).not.toBe(userData.password);
    });
  });
});
