import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptors } from './interceptors/transform.interceptors';
import { HttpExceptionFilter } from './filters/all-expection.filter';

// session
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 开启Cors
  app.enableCors({ origin: 'http://localhost:8080' });
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptors());
  // 全局注册错误过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 定义Session
  app.use(
    session({
      secret: 'hello.my_station.hyy',
      resave: false,
      saveUninitialized: false,
      rolling: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
