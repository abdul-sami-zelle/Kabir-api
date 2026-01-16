import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from '../customers/schemas/customer.schema';
import { Sale, SaleSchema } from '../sales/schemas/sale.schema';
import { DashboardService } from '../dashboard/dashboard.service';
import { DashboardController } from '../dashboard/dashboard.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService], // optional if you want to use service elsewhere
})
export class DashboardModule {}