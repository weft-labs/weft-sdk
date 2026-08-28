const CORE_FACILITATOR_UNAVAILABLE =
  /^Facilitator settle failed \(503\):(?: |$)/;

/**
 * Core 2.24 reduces facilitator HTTP failures to an untyped errorReason and
 * drops the upstream status, body, and Retry-After header. Match only Core's
 * exact settle-error prefix until it exposes structured HTTP metadata.
 */
export function isFacilitatorUnavailable(errorReason?: string): boolean {
  return CORE_FACILITATOR_UNAVAILABLE.test(errorReason ?? "");
}
