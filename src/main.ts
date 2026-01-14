// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { UploadMiddleware } from './common/middleware/upload.middleware';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { join } from 'path';

// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);

//   // ✅ Serve uploads folder publicly
//   app.useStaticAssets(join(__dirname, '..', 'uploads'), {
//     prefix: '/uploads/',
//   });

//   // ✅ Apply upload middleware globally
//   app.use('/upload', new UploadMiddleware().use);

//   await app.listen(3000);
//   console.log(`🚀 Server running on: http://localhost:3000`);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // <-- your React dev server URL
    credentials: true,               // <-- required for cookies
  });

  app.use(cookieParser());


  // ✅ Ensure upload folder exists
  const uploadPath = join(__dirname, '..', 'uploads/customers');
  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath, { recursive: true });
  }

  // ✅ Serve uploads folder publicly
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(process.env.PORT!);
  console.log(`🚀 Server running on: http://localhost:3000`);
}
bootstrap();
