/**
 * RESTful Endpoint: GET /api/buyers/[buyerId]
 * Fetches buyer profile, current reliability score, risk tier, and audit history
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db/database";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ buyerId: string }> }
) {
  try {
    const { buyerId } = await context.params;
    const buyer = await db.findBuyerByIdOrExternal(buyerId);

    if (!buyer) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "BUYER_NOT_FOUND",
            message: `ไม่พบข้อมูลผู้ซื้อรหัส ${buyerId}`,
          },
        },
        { status: 404 }
      );
    }

    const auditLogs = await db.getScoreLogsByBuyer(buyer.id);

    return NextResponse.json(
      {
        success: true,
        data: {
          buyer,
          auditLogs,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
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
