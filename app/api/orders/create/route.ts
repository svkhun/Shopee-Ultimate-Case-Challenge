/**
 * RESTful Endpoint: POST /api/orders/create
 * Creates an order, enforces risk tier policies, and reserves preferred delivery window
 */

import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { OrderCreateRequestSchema } from "@/server/dto/schemas";
import { OrderService } from "@/server/services/order.service";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const validatedPayload = OrderCreateRequestSchema.parse(rawBody);

    const result = await OrderService.create(validatedPayload);

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "ข้อมูลคำสั่งซื้อไม่ถูกต้อง",
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
          code: "ORDER_CREATION_FAILED",
          message,
        },
      },
      { status: 422 }
    );
  }
}
