import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

export const internalAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const expectedSecret = process.env.INTERNAL_API_SECRET;
  const incomingSecret = req.header("x-internal-auth");

  if (!expectedSecret) {
    console.error("INTERNAL_API_SECRET is not configured");
    res.status(500).json({ error: "Internal server error secret not configured." });
    return;
  }

  const expectedBuffer = Buffer.from(expectedSecret, "utf-8");
  const incomingBuffer = Buffer.from(incomingSecret || "", "utf-8");

  if (incomingBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(incomingBuffer, expectedBuffer)) {
    console.warn("Unauthorized request - missing or invalid secret");
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  next();
};
