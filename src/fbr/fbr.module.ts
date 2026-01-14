import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FbrService } from './fbr.service';
import { FbrController } from './fbr.controller';
import { HSCodeSchema } from './schemas/hs-codes.schema';
import { UOMSchema } from './schemas/uom.schema';

@Module({
  imports: [
    // Register Mongoose schemas here
    MongooseModule.forFeature([
      { name: 'HSCode', schema: HSCodeSchema },
      { name: 'UOM', schema: UOMSchema },
    ]),
  ],
  controllers: [FbrController],
  providers: [FbrService],
  exports: [FbrService]
})
export class FbrModule {}
