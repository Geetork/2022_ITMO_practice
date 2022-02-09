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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.artistsRouter = void 0;
// setting up modules
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
// creating router
exports.artistsRouter = express_1.default.Router();
exports.artistsRouter.use(bodyParser.json());
// setting up routes
exports.artistsRouter.route('/')
    .get((req, res, next) => {
    return res.send('okey');
});
exports.artistsRouter.route('/:artistId')
    .get((req, res, next) => {
    return res.send(req.params.artistId);
});
//# sourceMappingURL=artistsRouter.js.map