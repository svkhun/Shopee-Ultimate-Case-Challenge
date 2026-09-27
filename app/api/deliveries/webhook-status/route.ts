/**
 * RESTful Endpoint: POST /api/deliveries/webhook-status
 * 3PL Logistics Webhook: updates delivery resolution and triggers the reliability feedback loop
 */

import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { DeliveryWebhookRequestSchema } from "@/server/dto/schemas";
import { DeliveryWebhookService } from "@/server/services/delivery-webhook.service";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const validatedPayload = DeliveryWebhookRequestSchema.parse(rawBody);

    const result = await DeliveryWebhookService.processWebhook(validatedPayload);

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
            code: "WEBHOOK_VALIDATION_ERROR",
            message: "ข้อมูล Webhook ไม่ถูกต้อง",
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
          code: "WEBHOOK_PROCESSING_FAILED",
          message,
        },
      },
      { status: 422 }
    );
  }
}
