import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SalesSettingsService } from './sales-setting.service';
import { DiscountType } from './schemas/discount-type.schema';
import { TaxType } from './schemas/tax-type.schema';

@Controller('sales-settings')
export class SalesSettingsController {
  constructor(private readonly service: SalesSettingsService) {}

  // --- DiscountType ---
  @Post('discount-type')
  createDiscount(@Body() data: Partial<DiscountType>) {
    return this.service.createDiscountType(data);
  }

  @Get('discount-types')
  getDiscounts() {
    return this.service.getDiscountTypes();
  }

  @Put('discount-type/:id')
  updateDiscount(@Param('id') id: string, @Body() data: Partial<DiscountType>) {
    return this.service.updateDiscountType(id, data);
  }

  @Delete('discount-type/:id')
  deleteDiscount(@Param('id') id: string) {
    return this.service.deleteDiscountType(id);
  }

  // --- TaxType ---
  @Post('tax-type')
  createTax(@Body() data: Partial<TaxType>) {
    return this.service.createTaxType(data);
  }

  @Get('tax-types')
  getTaxes() {
    return this.service.getTaxTypes();
  }

  @Put('tax-type/:id')
  updateTax(@Param('id') id: string, @Body() data: Partial<TaxType>) {
    return this.service.updateTaxType(id, data);
  }

  @Delete('tax-type/:id')
  deleteTax(@Param('id') id: string) {
    return this.service.deleteTaxType(id);
  }
}
