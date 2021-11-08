import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuctionDetailDTO, AuctionListItemDTO } from '../dto/auctionDTOs';
import AuctionService from '../service/auction.service';
import {
    getAuctionDetailApiOperation,
    getAuctionsSortedByPopularApiOperation,
    getAuctionsSortedByNewsestApiOperation,
} from '../swagger';

@Controller('acutions')
@ApiTags('옥션 컨트롤러')
export default class AuctionController {
    constructor(private readonly auctionService: AuctionService) {}

    @Get('/newest')
    @ApiOperation(getAuctionsSortedByNewsestApiOperation)
    @ApiQuery({ name: 'page', type: Number })
    @ApiResponse({ type: AuctionListItemDTO })
    getAuctionsOrderByNewsest(@Query('page', ParseIntPipe) page: number): Promise<AuctionListItemDTO[]> {
        return this.auctionService.getAuctionsSortedByNewest(page);
    }

    @Get('/popular')
    @ApiOperation(getAuctionsSortedByPopularApiOperation)
    @ApiQuery({ name: 'page', type: Number })
    @ApiResponse({ type: AuctionListItemDTO })
    getAuctionsOrderByPopular(@Query('page', ParseIntPipe) page: number): Promise<AuctionListItemDTO[]> {
        return this.auctionService.getAuctionsSortedByPopular(page);
    }

    @Get(':id')
    @ApiOperation(getAuctionDetailApiOperation)
    @ApiResponse({ type: AuctionDetailDTO })
    getAuctionDetail(@Param('id', ParseIntPipe) auctionId: number): Promise<AuctionDetailDTO> {
        return this.auctionService.getAuctionDetail(auctionId);
    }
}
