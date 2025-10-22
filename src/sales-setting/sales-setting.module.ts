import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountType, DiscountTypeSchema } from './schemas/discount-type.schema';
import { TaxType, TaxTypeSchema } from './schemas/tax-type.schema';
import { SalesSettingsService } from './sales-setting.service';
import { SalesSettingsController } from './sales-setting.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DiscountType.name, schema: DiscountTypeSchema },
      { name: TaxType.name, schema: TaxTypeSchema },
    ]),
  ],
  controllers: [SalesSettingsController],
  providers: [SalesSettingsService],
  exports: [SalesSettingsService], // <-- optional, if used elsewhere
})
export class SalesSettingModule {} // must match your import in AppModule
