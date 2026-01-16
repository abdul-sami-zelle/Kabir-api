import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { Sale } from './schemas/sale.schema';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  // ➕ Create new sale
  @Post()
  async create(@Body() body: Partial<Sale>, @Req() req: any) {
    if (!req.userId) {
      throw new UnauthorizedException('Login required');
    }

    return this.salesService.createSale(body, req.userId); // ✅ PASS USER ID
  }

@Get()
async getAll(
  @Query('page') page?: string,
  @Query('limit') limit?: string,
  @Query() query?: any
) {
  const pageNum = page ? parseInt(page, 10) : 1;
  const limitNum = limit ? parseInt(limit, 10) : 10;

  return this.salesService.getAllSales(pageNum, limitNum, query);
}

  // 🔍 Get single sale
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.salesService.getSaleById(id);
  }

  // 🖊️ Update sale
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<Sale>,
    @Req() req: any,
  ) {
    if (!req.userId) {
      throw new UnauthorizedException('Login required');
    }

    return this.salesService.updateSale(id, body);
  }

  // 🗑️ Delete sale
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: any) {
    if (!req.userId) {
      throw new UnauthorizedException('Login required');
    }

    return this.salesService.deleteSale(id);
  }

  // 🔍 Validate Invoice From FBR
  @Post('send-to-fbr')
  async sendToFBR(@Body() body: { inv_no: string }, @Req() req: any) {
    if (!req.userId) {
      throw new UnauthorizedException('Login required');
    }

    return this.salesService.sendToFBR(body.inv_no);
  }

  // 🔄 Change Sale Status
  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'UNPAID' | 'PAID' | 'CANCELED',
    @Req() req: any,
  ) {
    if (!req.userId) {
      throw new UnauthorizedException('Login required');
    }

    return this.salesService.changeStatus(id, status);
  }
}
