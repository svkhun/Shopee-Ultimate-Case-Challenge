/**
 * RESTful Endpoint: POST /api/orders/checkout-validation
 * Validates buyer eligibility for COD and returns required interventions based on risk tier
 */

import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { CheckoutValidationRequestSchema } from "@/server/dto/schemas";
import { CheckoutService } from "@/server/services/checkout.service";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const validatedPayload = CheckoutValidationRequestSchema.parse(rawBody);

    const result = await CheckoutService.validate(validatedPayload);

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "ข้อมูลที่ส่งมาไม่ถูกต้องตามข้อกำหนด",
            details: error.issues,
          },
        },
        { status: 400 }
      );
    }

    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message,
        },
      },
      { status: 500 }
    );
  }
}
