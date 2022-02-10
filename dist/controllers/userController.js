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
exports.UserController = void 0;
// setting up modules
const typeorm_1 = require("typeorm");
const user_1 = require("../models/user");
class UserController {
    findUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, typeorm_1.getConnection)().manager.findOne(user_1.User, {
                username: username,
                password: password
            });
        });
    }
    ;
    createUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = new user_1.User();
            user.username = username;
            user.password = password;
            return user;
        });
    }
    ;
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, typeorm_1.getConnection)().manager.save(user_1.User, user);
        });
    }
    ;
}
exports.UserController = UserController;
;
//# sourceMappingURL=userController.js.map