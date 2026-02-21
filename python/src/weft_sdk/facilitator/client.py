"""
Weft Facilitator client factory.
"""

import os
from typing import Callable, Optional

import httpx
from typing_extensions import TypedDict

X402_FACILITATOR_URL = "https://x402.weft.network"
X402_FACILITATOR_URL_ENV = "X402_FACILITATOR_URL"


class WeftFacilitatorConfig(TypedDict, total=False):
    url: str
    create_headers: Callable[[], dict[str, dict[str, str]]]


def validate_url(url: str) -> None:
    if not url or url.strip() == "":
        raise ValueError("Invalid URL: URL cannot be empty")

    if not url.startswith("http://") and not url.startswith("https://"):
        raise ValueError(f"Invalid URL format: URL must start with http:// or https://, got: {url}")


def resolve_url(config: Optional[WeftFacilitatorConfig] = None) -> str:
    if config and config.get("url"):
        return config["url"]

    env_url = os.environ.get(X402_FACILITATOR_URL_ENV)
    if env_url:
        return env_url

    return X402_FACILITATOR_URL


class FacilitatorClient:
    def __init__(
        self, url: str, create_headers: Optional[Callable[[], dict[str, dict[str, str]]]] = None
    ):
        self._url = url
        self._create_headers = create_headers

    async def verify(self, payload: dict, requirements: dict) -> dict:
        headers = {"Content-Type": "application/json"}
        if self._create_headers:
            headers.update(self._create_headers().get("verify", {}))

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self._url}/verify",
                json={
                    "x402Version": 2,
                    "paymentPayload": payload,
                    "paymentRequirements": requirements,
                },
                headers=headers,
                follow_redirects=True,
            )
            response.raise_for_status()
            return response.json()

    async def settle(self, payload: dict, requirements: dict) -> dict:
        headers = {"Content-Type": "application/json"}
        if self._create_headers:
            headers.update(self._create_headers().get("settle", {}))

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self._url}/settle",
                json={
                    "x402Version": 2,
                    "paymentPayload": payload,
                    "paymentRequirements": requirements,
                },
                headers=headers,
                follow_redirects=True,
            )
            response.raise_for_status()
            return response.json()

    async def get_supported(self) -> dict:
        headers = {"Content-Type": "application/json"}
        if self._create_headers:
            headers.update(self._create_headers().get("supported", {}))

        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self._url}/supported",
                headers=headers,
                follow_redirects=True,
            )
            response.raise_for_status()
            return response.json()


def create_facilitator_client(
    config: Optional[WeftFacilitatorConfig] = None,
) -> FacilitatorClient:
    url = resolve_url(config)
    validate_url(url)

    create_headers = config.get("create_headers") if config else None
    return FacilitatorClient(url, create_headers=create_headers)
