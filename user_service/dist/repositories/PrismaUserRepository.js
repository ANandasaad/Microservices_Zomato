"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const client_1 = require("@prisma/client");
class PrismaUserRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.findUnique({
                where: { email },
            });
        });
    }
    findByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.findUnique({
                where: { phone },
            });
        });
    }
    findById(id) {
        throw new Error("Method not implemented.");
    }
    update(id, data) {
        throw new Error("Method not implemented.");
    }
    delete(id) {
        throw new Error("Method not implemented.");
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userCreated = yield this.prisma.user.create({
                data: {
                    phone: user.phone,
                    provider: client_1.AuthProvider.PHONE,
                },
            });
            yield this.prisma.customerProfile.create({
                data: {
                    userId: userCreated === null || userCreated === void 0 ? void 0 : userCreated.id,
                },
            });
            return userCreated;
        });
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
