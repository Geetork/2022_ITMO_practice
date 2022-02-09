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
exports.pool = void 0;
// setting up modules
const ts_postgres_1 = require("ts-postgres");
// generic resource pool with Promise API
const generic_pool_1 = require("generic-pool");
// creating pool of connections (using factory object)
exports.pool = (0, generic_pool_1.createPool)({
    create: () => __awaiter(void 0, void 0, void 0, function* () {
        const client = new ts_postgres_1.Client({
            host: 'localhost',
            port: 5432,
            database: 'artists_application',
            user: 'postgres',
            password: 'kiopnm'
        });
        return client.connect().then(() => {
            console.log('Connected to PostgreSQL database artists_application!');
            client.on('error', console.log);
            return client;
        });
    }),
    destroy: (client) => __awaiter(void 0, void 0, void 0, function* () {
        return client.end().then(() => { console.log('Connection to PostgreSQL database artists_application is destroyed'); });
    }),
    validate: (client) => {
        return Promise.resolve(!client.closed);
    }
}, {
    max: 10 // max number of resources to create at any given time
});
//# sourceMappingURL=db_config.js.map