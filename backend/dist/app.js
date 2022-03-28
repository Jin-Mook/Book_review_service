"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/', (req, res, next) => {
    res.send('practice typescript!!!');
});
app.get('/test', (req, res, next) => {
    res.send('test');
});
app.listen('3000', () => {
    console.log('3000포트에서 서버 시작');
});
//# sourceMappingURL=app.js.map