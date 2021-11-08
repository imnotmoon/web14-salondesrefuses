import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user.repository';
import { ArtworkRepository } from '../../artwork/artwork.repository';
import { Artwork } from '../../artwork/artwork.entity';
import { User } from '../user.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @InjectRepository(ArtworkRepository)
        private artworkRepository: ArtworkRepository
    ) {}

    getAllUsersArtworks(userId: number): Promise<Artwork[]> {
        return this.artworkRepository.getAllUsersArtworks(userId);
    }

    async checkRegisteredUser(userId: string, avatar: string, loginStrategy: string): Promise<User> {
        let user = await this.userRepository.findOne({ userId, loginStrategy });

        if(!user) {
            user = await this.userRepository.createUser(userId, avatar, loginStrategy);
        }

        return user;
    }

    updateUserToken(id: number, refreshToken: string): Promise<UpdateResult> {
        return this.userRepository.update(id, { refreshToken });
    }

}
