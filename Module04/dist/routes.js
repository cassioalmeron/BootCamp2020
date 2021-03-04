"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cassioAlmeron = void 0;
var CreateUser_1 = __importDefault(require("./services/CreateUser"));
function cassioAlmeron(request, response) {
    var user = CreateUser_1.default({
        name: "Cássio Almeron",
        email: "cassioalmeron@gmail.com",
        password: "123456",
        techs: [
            "C#",
            "PHP",
            "DELPHI",
        ]
    });
    response.json({ message: 'Cássio Almeron is Back!!! stronger that ever!!!!!', user: user });
}
exports.cassioAlmeron = cassioAlmeron;
