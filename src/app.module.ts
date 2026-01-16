import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
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
import { JwtModule } from '@nestjs/jwt';
import { JwtUserMiddleware } from './common/middleware/jwt-user.middleware';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGODB_URI!),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),

    CustomersModule,
    SalesSettingModule,
    SalesModule,
    FbrModule,
    RolesModule,
    UsersModule,
    AuthModule,
    DashboardModule, // now this works
  ],
  controllers: [AppController], // Remove DashboardController here; it's already in DashboardModule
  providers: [AppService],      // Remove DashboardService here; it's already in DashboardModule
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtUserMiddleware)
      .forRoutes(
        'sales',
        'customers',
        'roles',
        'users',
        'fbr',
        'sales-setting',
      );

  }
}
