import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon2 from "argon2";
import { AuthDTO } from "./dto";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }
    async signup(dto: AuthDTO) {
        const hash = await argon2.hash(dto.password)
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash: hash
            }
        })
        delete user.hash
        return user
    }

    async signin(dto: AuthDTO) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if (!user)
            throw new ForbiddenException('Credentials incorrect')

        const passwordsMatch = await argon2.verify(
            user.hash,
            dto.password)

        if (!passwordsMatch)
            throw new ForbiddenException('Credentials incorrect')

        delete user.hash
        return user
    }
}