/**
 * Data Transfer Objects (DTO) and Zod Validation Schemas
 * Type-safe incoming payload parsing with explicit error details
 */

import { z } from "zod";
import { PaymentMethod, PreferredDeliveryWindow } from "../domain/models";

// -------------------------------------------------------------------------
// 1. Checkout Validation Request & Response
// -------------------------------------------------------------------------
export const CheckoutValidationRequestSchema = z.object({
  buyerId: z.string().min(1, "buyerId is required"),
  paymentMethod: z.nativeEnum(PaymentMethod, {
    message: "Invalid payment method. Must be COD, SHOPEEPAY, CREDIT_CARD, or PROMPTPAY",
  }),
  orderTotal: z.number().positive("orderTotal must be a positive number"),
  cartItemCount: z.number().int().positive().optional().default(1),
});

export type CheckoutValidationRequest = z.infer<typeof CheckoutValidationRequestSchema>;

// -------------------------------------------------------------------------
// 2. Order Creation Request
// -------------------------------------------------------------------------
export const OrderCreateRequestSchema = z.object({
  buyerId: z.string().min(1, "buyerId is required"),
  totalAmount: z.number().positive("totalAmount must be greater than zero"),
  paymentMethod: z.nativeEnum(PaymentMethod, {
    message: "Invalid payment method. Allowed: COD, SHOPEEPAY, CREDIT_CARD, PROMPTPAY",
  }),
  preferredDeliveryWindow: z.nativeEnum(PreferredDeliveryWindow, {
    message: "Invalid preferred delivery window. Allowed: MORNING, AFTERNOON, EVENING, WEEKEND",
  }),
  otpCode: z.string().length(6, "OTP code must be 6 digits").optional(),
  depositConfirmed: z.boolean().optional().default(false),
  shippingAddress: z.object({
    recipientName: z.string().min(2, "Recipient name must be at least 2 characters"),
    phoneNumber: z.string().min(9, "Phone number is too short"),
    addressLine: z.string().min(5, "Address must be descriptive"),
    subDistrict: z.string().min(2),
    district: z.string().min(2),
    province: z.string().min(2),
    postalCode: z.string().length(5, "Postal code must be 5 digits"),
  }),
});

export type OrderCreateRequest = z.infer<typeof OrderCreateRequestSchema>;

// -------------------------------------------------------------------------
// 3. 3PL Courier Delivery Webhook Request
// -------------------------------------------------------------------------
export const DeliveryWebhookRequestSchema = z.object({
  orderNumber: z.string().min(1, "orderNumber is required"),
  trackingNumber: z.string().min(1, "trackingNumber is required"),
  courierCode: z.string().min(1, "courierCode is required"), // e.g. SHOPEE_XPRESS, FLASH, J_AND_T
  deliveryStatus: z.enum(["DELIVERED", "FAILED_ATTEMPT", "RETURNED_TO_ORIGIN"], {
    message: "deliveryStatus must be DELIVERED, FAILED_ATTEMPT, or RETURNED_TO_ORIGIN",
  }),
  failureReasonCode: z.enum([
    "BUYER_UNREACHABLE",
    "REFUSED_NO_CASH",
    "REFUSED_NOT_ORDERED",
    "CUSTOMER_RELOCATED",
    "INCORRECT_ADDRESS",
    "DAMAGED_PACKAGE",
  ]).optional(),
  resolvedAt: z.string().datetime().optional().default(() => new Date().toISOString()),
  notes: z.string().max(500).optional(),
});

export type DeliveryWebhookRequest = z.infer<typeof DeliveryWebhookRequestSchema>;
