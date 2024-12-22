import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set a global prefix for your API routes
  app.setGlobalPrefix('api');

  // Enable CORS for all origins
  app.enableCors();

  // Start the application on the specified PORT or default to 8000
  await app.listen(process.env.PORT ?? 8000);
  console.log(`Application is running on http://localhost:${process.env.PORT ?? 8000}`);
}
bootstrap();
