import Joi from "joi";
import { TradingDataInput } from "../interfaces/trading-data-input.interface";
import { Service } from "typedi";

/**
 * TradingDataValidationService
 * Service responsible for validating trading data before sending it to the LLM.
 */
@Service()
export class TradingDataValidationService {
  private tradingDataSchema = Joi.object({
    tokenSubject: Joi.string().required(),
    tokenName: Joi.string().required(),
    timeframeHours: Joi.string().required(),
    numberOfIntervals: Joi.number().required(),
    ohlcData: Joi.array()
      .items(
        Joi.object({
          time: Joi.date().timestamp("unix").required(),
          open: Joi.number().positive().required(),
          high: Joi.number().positive().required(),
          low: Joi.number().positive().required(),
          close: Joi.number().positive().required(),
          volume: Joi.number().optional(),
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
    console.log("[TradingDataValidation] Validating trading data...");

    const { error, value } = this.tradingDataSchema.validate(data, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (error) {
      console.warn("[TradingDataValidation] Validation failed.");
      throw new Error(`TradingDataValidation Error: ${error.details.map((e) => e.message).join("; ")}`);
    }

    console.log("[TradingDataValidation] Validation successful.");
    return value;
  }
}

export default TradingDataValidationService;
