import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const PORT = process.env.PORT || 3000;
    app.setGlobalPrefix('/api');

    await app.listen(PORT);
}

bootstrap();
