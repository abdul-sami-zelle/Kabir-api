import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { SalesSettingModule } from './sales-setting/sales-setting.module';
import { SalesModule } from './sales/sales.module';
import { FbrModule } from './fbr/fbr.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Load .env automatically
    ConfigModule.forRoot({
      isGlobal: true, // 👈 makes env variables available everywhere
    }),

    // Use environment variable here
    MongooseModule.forRoot(process.env.MONGODB_URI!),

    CustomersModule,

    SalesSettingModule,

    SalesModule,

    FbrModule,

    RolesModule,

    UsersModule,

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
