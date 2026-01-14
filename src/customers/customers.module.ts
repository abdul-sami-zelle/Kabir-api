import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { FbrModule } from 'src/fbr/fbr.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    FbrModule
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
