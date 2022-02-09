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
exports.ClientInstance = void 0;
// setting up modules
const db_config_1 = require("../db_config");
class ClientInstance {
    getData(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_config_1.pool.acquire();
                const data = yield client.query(query);
                db_config_1.pool.release(client);
                return data;
            }
            catch (error) {
                return new Error('Error occured!');
            }
        });
    }
    ;
}
exports.ClientInstance = ClientInstance;
;
//# sourceMappingURL=clientInstance.js.map