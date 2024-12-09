import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { resetSequences } from './database/reset-sequences';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // Create a test connection before starting the app
    const dataSource = new DataSource({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
    });

    await dataSource.initialize();
    console.log('✅ Database connection has been established successfully.');

    // Only reset sequences in development
    if (configService.get('NODE_ENV') !== 'production') {
      await resetSequences(dataSource);
    }

    await dataSource.destroy(); // Close test connection

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true, // Enable transformation
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    app.enableCors();

    const config = new DocumentBuilder()
      .setTitle('Review System API')
      .setDescription('The Review System API description')
      .setVersion('1.0')
      .addTag('departments', 'Department management endpoints')
      .addTag('positions', 'Position management endpoints')
      .addTag('employees', 'Employee management endpoints')
      .addTag('roles', 'Role management endpoints')
      .addTag('review-cycles', 'Review cycle management endpoints')
      .addTag('review-questions', 'Review question management endpoints')
      .addTag('review-requests', 'Review request management endpoints')
      .addTag('reviews', 'Review management endpoints')
      .addTag('assignments', 'Assignment management endpoints')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const port = configService.get('PORT', 3000);
    await app.listen(port);
    console.log(`🚀 Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1); // Exit the application if database connection fails
  }
}

bootstrap();
