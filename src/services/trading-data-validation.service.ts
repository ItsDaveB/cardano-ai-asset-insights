import Joi from "joi";
import { TradingDataInput } from "../interfaces/trading-data-input.interface";
import { Service } from "typedi";

/**
 * TradingDataValidationService
 * Service responsible for validating trading data before sending it to the LLM.
 */
@Service()
export class TradingDataValidationService {
  /**
   * Joi schema definition for validating the input trading data.
   */
  private tradingDataSchema = Joi.object({
    tokenSubject: Joi.string().required(),
    tokenName: Joi.string().required(),
    timeframeHours: Joi.number().required(),
    ohlcData: Joi.array()
      .items(
        Joi.object({
          timestamp: Joi.date().iso().required(),
          open: Joi.number().positive().required(),
          high: Joi.number().positive().required(),
          low: Joi.number().positive().required(),
          close: Joi.number().positive().required(),
          volume: Joi.number().positive().optional(),
        })
      )
      .min(1)
      .required(),
  });

  /**
   * Validates trading data to ensure compatibility with LLM.
   * @param data - The trading data to validate.
   * @returns The validated data or throws a validation error.
   */
  validate(data: TradingDataInput): TradingDataInput {
    const { error, value } = this.tradingDataSchema.validate(data, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (error) {
      throw new Error(
        `TradingDataValidation Error: ${error.details.map((e) => e.message).join("; ")}`
      );
    }

    return value;
  }
}

export default TradingDataValidationService;
