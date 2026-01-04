import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/db.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [DatabaseModule, ConfigModule, JwtModule.registerAsync({
        global: true,
        imports: [ConfigModule],
        inject: [ConfigService],
        // @ts-ignore
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_KEY') as string,
            signOptions: {
                expiresIn: "1h",
            },
        })
    })],
    providers: []
})
export class CoreModule { }