import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { BadRequestError } from "../utils/error";
export const validateDto = (bodyDtoClass?: any, paramsDtoClass?: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let errors: string[] = [];

      // Validate `req.body` if a DTO class is provided
      if (bodyDtoClass) {
        const bodyDto = plainToInstance(bodyDtoClass, req.body);
        const bodyErrors = await validate(bodyDto);
        if (bodyErrors.length > 0) {
          errors.push(
            ...bodyErrors
              .map((err) => Object.values(err.constraints || {}))
              .flat()
          );
        }
        req.body = bodyDto; // Assign validated object
      }

      // Validate `req.params` if a DTO class is provided
      if (paramsDtoClass) {
        const paramsDto = plainToInstance(paramsDtoClass, req.params);
        const paramsErrors = await validate(paramsDto as any);
        if (paramsErrors.length > 0) {
          errors.push(
            ...paramsErrors
              .map((err) => Object.values(err.constraints || {}))
              .flat()
          );
        }
        req.params = paramsDto as any;
      }

      // If any validation errors exist, throw an error
      if (errors.length > 0) {
        throw new BadRequestError(errors.join(", "));
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
