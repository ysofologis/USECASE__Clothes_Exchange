import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should return health status', () => {
    const result = controller.check();
    expect(result).toHaveProperty('status', 'ok');
    expect(result).toHaveProperty('timestamp');
    expect(result).toHaveProperty('uptime');
  });

  it('should return a valid ISO timestamp', () => {
    const result = controller.check();
    expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp);
  });

  it('should return positive uptime', () => {
    const result = controller.check();
    expect(result.uptime).toBeGreaterThanOrEqual(0);
  });
});
