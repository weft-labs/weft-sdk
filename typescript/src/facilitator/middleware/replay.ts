import type {
  CompletedSettlement,
  HTTPRequestContext,
  PaymentCancellationDispatcher,
  x402ResourceServer,
} from "@x402/core/server";
import { decodePaymentSignatureHeader } from "@x402/core/http";
import { validatePaymentPayload } from "@x402/core/schemas";
import type { PaymentPayload, PaymentRequirements } from "@x402/core/types";

/** A structurally valid, but not cryptographically verified, v2 payment. */
export interface PaymentResumeCandidate {
  paymentPayload: PaymentPayload;
  paymentRequirements: PaymentRequirements;
}

/** Verified payment inputs restored from durable application storage. */
export interface VerifiedPaymentResume {
  paymentPayload: PaymentPayload;
  paymentRequirements: PaymentRequirements;
  declaredExtensions?: Record<string, unknown>;
  /** Restore this receipt when Core settled before the original handler. */
  beforeHandlerSettlement?: CompletedSettlement;
  /** Restore Core's cancellation state for a before-handler settlement. */
  cancellationDispatcher?: PaymentCancellationDispatcher;
}

/**
 * Restore a previously verified payment for settlement replay.
 *
 * This callback is a trust boundary. The caller must durably bind its result to
 * the exact signed payment payload and request fingerprint. The SDK does not
 * authenticate or validate callback output before settlement.
 */
export type ResumeVerifiedPayment = (
  context: HTTPRequestContext,
  candidate: PaymentResumeCandidate,
) =>
  | VerifiedPaymentResume
  | undefined
  | Promise<VerifiedPaymentResume | undefined>;

/**
 * Decode the generic v2 envelope before it crosses the application replay
 * trust boundary. Scheme validation and signature verification stay with Core
 * and the registered scheme implementation.
 */
export function paymentResumeCandidate(
  context: HTTPRequestContext,
): PaymentResumeCandidate | undefined {
  if (!context.paymentHeader) return undefined;

  try {
    const paymentPayload = decodePaymentSignatureHeader(context.paymentHeader);
    validatePaymentPayload(paymentPayload);
    if (paymentPayload.x402Version !== 2) return undefined;

    return {
      paymentPayload,
      paymentRequirements: paymentPayload.accepted,
    };
  } catch {
    return undefined;
  }
}

export function resumePaymentResult(
  resourceServer: x402ResourceServer,
  resumed: VerifiedPaymentResume,
  context: HTTPRequestContext,
) {
  return {
    type: "payment-verified" as const,
    paymentPayload: resumed.paymentPayload,
    paymentRequirements: resumed.paymentRequirements,
    declaredExtensions: resumed.declaredExtensions,
    beforeHandlerSettlement: resumed.beforeHandlerSettlement,
    cancellationDispatcher:
      resumed.cancellationDispatcher ??
      resourceServer.createPaymentCancellationDispatcher(
        resumed.paymentPayload,
        resumed.paymentRequirements,
        resumed.declaredExtensions,
        { request: context },
        resumed.beforeHandlerSettlement ? ["before-handler"] : [],
      ),
  };
}
