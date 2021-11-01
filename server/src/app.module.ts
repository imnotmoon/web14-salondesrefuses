import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeORMConfig } from "./config/typeorm.config";
import { ExhibitionModule } from "./exhibition/exhibition.module";
import { ArtworkModule } from "./artwork/artwork.module";
import { UserModule } from './user/user.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        ExhibitionModule,
        ArtworkModule,
        UserModule,
    ],
})
export class AppModule {}
