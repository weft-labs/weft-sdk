"""
Middleware wrappers for Weft Facilitator.
"""

from typing import Any, Callable, Optional, Union

from .client import (
    WeftFacilitatorConfig,
    resolve_url,
    validate_url,
)


def weft_require_payment(
    price: Any,
    pay_to_address: str,
    path: Union[str, list[str]] = "*",
    description: str = "",
    mime_type: str = "",
    max_deadline_seconds: int = 60,
    input_schema: Optional[Any] = None,
    output_schema: Optional[Any] = None,
    discoverable: Optional[bool] = True,
    network: str = "base-sepolia",
    resource: Optional[str] = None,
    paywall_config: Optional[Any] = None,
    custom_paywall_html: Optional[str] = None,
    facilitator_url: Optional[str] = None,
) -> Callable[..., Any]:
    from x402.facilitator import FacilitatorConfig
    from x402.fastapi.middleware import require_payment

    config: WeftFacilitatorConfig = {}
    if facilitator_url:
        config["url"] = facilitator_url

    url = resolve_url(config)
    validate_url(url)

    facilitator_config: FacilitatorConfig = {"url": url}

    return require_payment(
        price=price,
        pay_to_address=pay_to_address,
        path=path,
        description=description,
        mime_type=mime_type,
        max_deadline_seconds=max_deadline_seconds,
        input_schema=input_schema,
        output_schema=output_schema,
        discoverable=discoverable,
        facilitator_config=facilitator_config,
        network=network,
        resource=resource,
        paywall_config=paywall_config,
        custom_paywall_html=custom_paywall_html,
    )


class WeftPaymentMiddleware:
    def __init__(
        self,
        app: Any,
        facilitator_url: Optional[str] = None,
    ):
        from flask import Flask
        from x402.flask.middleware import PaymentMiddleware

        self._app: Flask = app
        self._facilitator_url = facilitator_url
        self._middleware = PaymentMiddleware(app)

    def _get_facilitator_url(self, override_url: Optional[str] = None) -> str:
        config: WeftFacilitatorConfig = {}
        if override_url:
            config["url"] = override_url
        elif self._facilitator_url:
            config["url"] = self._facilitator_url

        url = resolve_url(config)
        validate_url(url)
        return url

    def add(
        self,
        price: Any,
        pay_to_address: str,
        path: Union[str, list[str]] = "*",
        description: str = "",
        mime_type: str = "",
        max_deadline_seconds: int = 60,
        input_schema: Optional[Any] = None,
        output_schema: Optional[Any] = None,
        discoverable: Optional[bool] = True,
        network: str = "base-sepolia",
        resource: Optional[str] = None,
        paywall_config: Optional[Any] = None,
        custom_paywall_html: Optional[Any] = None,
        facilitator_url: Optional[str] = None,
    ) -> None:
        from x402.facilitator import FacilitatorConfig

        url = self._get_facilitator_url(facilitator_url)
        facilitator_config: FacilitatorConfig = {"url": url}

        self._middleware.add(
            price=price,
            pay_to_address=pay_to_address,
            path=path,
            description=description,
            mime_type=mime_type,
            max_deadline_seconds=max_deadline_seconds,
            input_schema=input_schema,
            output_schema=output_schema,
            discoverable=discoverable,
            facilitator_config=facilitator_config,
            network=network,
            resource=resource,
            paywall_config=paywall_config,
            custom_paywall_html=custom_paywall_html,
        )


def weft_flask_require_payment(
    price: Any,
    pay_to_address: str,
    path: Union[str, list[str]] = "*",
    description: str = "",
    mime_type: str = "",
    max_deadline_seconds: int = 60,
    input_schema: Optional[Any] = None,
    output_schema: Optional[Any] = None,
    discoverable: Optional[bool] = True,
    network: str = "base-sepolia",
    resource: Optional[str] = None,
    paywall_config: Optional[Any] = None,
    custom_paywall_html: Optional[Any] = None,
    facilitator_url: Optional[str] = None,
) -> Callable[[Any], "WeftPaymentMiddleware"]:
    def create_middleware(app: Any) -> WeftPaymentMiddleware:
        middleware = WeftPaymentMiddleware(app, facilitator_url=facilitator_url)
        middleware.add(
            price=price,
            pay_to_address=pay_to_address,
            path=path,
            description=description,
            mime_type=mime_type,
            max_deadline_seconds=max_deadline_seconds,
            input_schema=input_schema,
            output_schema=output_schema,
            discoverable=discoverable,
            network=network,
            resource=resource,
            paywall_config=paywall_config,
            custom_paywall_html=custom_paywall_html,
        )
        return middleware

    return create_middleware


__all__ = [
    "weft_require_payment",
    "weft_flask_require_payment",
    "WeftPaymentMiddleware",
]
