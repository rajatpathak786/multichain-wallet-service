import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/app/user/entities/user.entity';
import { Org } from 'src/app/wallet/entities/org.entity';
import { Wallet } from 'src/app/wallet/entities/wallet.entity';
@Module({})
export class DatabaseModule {
  static forRoot() {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'root',
          database: 'wallet-service',
          entities: [User, Wallet, Org],
          synchronize: true,
          autoLoadEntities: true,
        }),
      ],
    };
  }
}
