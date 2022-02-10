"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// setting up modules
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const typeorm_1 = require("typeorm");
;
// importing routers
const artistsRouter_1 = require("./routes/artistsRouter");
const usersRouter_1 = require("./routes/usersRouter");
// importing app's middleware
const auth_1 = require("./middleware/auth");
// creating app
const app = (0, express_1.default)();
// setting up port (app.set(name, value) assigns any name to value)
app.set('port', process.env.PORT || 3000);
// starting bd connection and server
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, typeorm_1.createConnection)({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        database: 'artists_application',
        username: 'postgres',
        password: 'kiopnm',
        entities: ['./src/models/*.ts']
    });
    app.listen(app.get('port'), () => console.log(`Running on http://localhost:${app.get('port')}`));
});
start().catch(console.error);
// returning middleware that parses json and only looks at request where Content-Type header matches the type option
app.use(bodyParser.json());
// using the session middleware
// forcing the session to be saved back to the session store, even if the sission was never midified during the request
// forcing a session that id 'uninitialized' to be saved to the store. A session is uninitialized when it is new but not modified
app.use((0, express_session_1.default)({
    secret: '12345-67890-09876-54321',
    resave: true,
    saveUninitialized: true
}));
// setting up routes
app.get('/', (req, res, next) => { res.send('hi'); });
app.use(usersRouter_1.usersRouter);
// using app's authorization middleware
app.use(auth_1.auth);
app.get('/logout', (req, res, next) => {
    req.session.destroy((err) => { next(err); });
    res.clearCookie('connect.sid');
    res.redirect('/');
});
app.use('/artists', artistsRouter_1.artistsRouter);
module.exports = app;
//# sourceMappingURL=index.js.map