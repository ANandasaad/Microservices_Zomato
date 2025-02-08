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
exports.validateDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const error_1 = require("../utils/error");
const validateDto = (bodyDtoClass, paramsDtoClass) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let errors = [];
            // Validate `req.body` if a DTO class is provided
            if (bodyDtoClass) {
                const bodyDto = (0, class_transformer_1.plainToInstance)(bodyDtoClass, req.body);
                const bodyErrors = yield (0, class_validator_1.validate)(bodyDto);
                if (bodyErrors.length > 0) {
                    errors.push(...bodyErrors
                        .map((err) => Object.values(err.constraints || {}))
                        .flat());
                }
                req.body = bodyDto; // Assign validated object
            }
            // Validate `req.params` if a DTO class is provided
            if (paramsDtoClass) {
                const paramsDto = (0, class_transformer_1.plainToInstance)(paramsDtoClass, req.params);
                const paramsErrors = yield (0, class_validator_1.validate)(paramsDto);
                if (paramsErrors.length > 0) {
                    errors.push(...paramsErrors
                        .map((err) => Object.values(err.constraints || {}))
                        .flat());
                }
                req.params = paramsDto;
            }
            // If any validation errors exist, throw an error
            if (errors.length > 0) {
                throw new error_1.BadRequestError(errors.join(", "));
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.validateDto = validateDto;
