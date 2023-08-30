import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptors } from './interceptors/transform.interceptors';
import { HttpExceptionFilter } from './filters/all-expection.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:8080' });
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptors());
  // 全局注册错误过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
