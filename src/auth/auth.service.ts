import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    signup() {
        return 'Sign Up service'
    }

    signin() {
        return 'Sign In service'
    }
}