"""Tests for fee info helpers."""

from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from weft_sdk.facilitator.fee import (
    get_fee_info,
    invalidate_fee_cache,
)


@pytest.fixture(autouse=True)
def clear_cache():
    invalidate_fee_cache()
    yield
    invalidate_fee_cache()


def _mock_supported_response(fee=None):
    """Create a mock httpx response for /supported."""
    response = MagicMock()
    response.status_code = 200
    data = {}
    if fee is not None:
        data["fee"] = fee
    response.json.return_value = data
    return response


@pytest.mark.asyncio
async def test_fetches_fee_info():
    response = _mock_supported_response(
        fee={"amount": "0.001", "asset": "USDC", "network": "base-sepolia"}
    )

    with patch("weft_sdk.facilitator.fee.httpx.AsyncClient") as mock_cls:
        mock_http = AsyncMock()
        mock_http.get.return_value = response
        mock_http.__aenter__ = AsyncMock(return_value=mock_http)
        mock_http.__aexit__ = AsyncMock(return_value=False)
        mock_cls.return_value = mock_http

        fee = await get_fee_info()
        assert fee == {"amount": "0.001", "asset": "USDC", "network": "base-sepolia"}


@pytest.mark.asyncio
async def test_caches_fee_info():
    response = _mock_supported_response(
        fee={"amount": "0.001", "asset": "USDC", "network": "base-sepolia"}
    )

    with patch("weft_sdk.facilitator.fee.httpx.AsyncClient") as mock_cls:
        mock_http = AsyncMock()
        mock_http.get.return_value = response
        mock_http.__aenter__ = AsyncMock(return_value=mock_http)
        mock_http.__aexit__ = AsyncMock(return_value=False)
        mock_cls.return_value = mock_http

        first = await get_fee_info()
        second = await get_fee_info()

        assert first == second
        assert mock_http.get.call_count == 1


@pytest.mark.asyncio
async def test_refetches_after_invalidation():
    response = _mock_supported_response(
        fee={"amount": "0.001", "asset": "USDC", "network": "base-sepolia"}
    )

    with patch("weft_sdk.facilitator.fee.httpx.AsyncClient") as mock_cls:
        mock_http = AsyncMock()
        mock_http.get.return_value = response
        mock_http.__aenter__ = AsyncMock(return_value=mock_http)
        mock_http.__aexit__ = AsyncMock(return_value=False)
        mock_cls.return_value = mock_http

        await get_fee_info()
        invalidate_fee_cache()
        await get_fee_info()

        assert mock_http.get.call_count == 2


@pytest.mark.asyncio
async def test_raises_when_fee_not_found():
    response = _mock_supported_response(fee=None)

    with patch("weft_sdk.facilitator.fee.httpx.AsyncClient") as mock_cls:
        mock_http = AsyncMock()
        mock_http.get.return_value = response
        mock_http.__aenter__ = AsyncMock(return_value=mock_http)
        mock_http.__aexit__ = AsyncMock(return_value=False)
        mock_cls.return_value = mock_http

        with pytest.raises(ValueError, match="Fee information not found"):
            await get_fee_info()


@pytest.mark.asyncio
async def test_raises_when_amount_not_string():
    response = _mock_supported_response(
        fee={"amount": 0.001, "asset": "USDC", "network": "base-sepolia"}
    )

    with patch("weft_sdk.facilitator.fee.httpx.AsyncClient") as mock_cls:
        mock_http = AsyncMock()
        mock_http.get.return_value = response
        mock_http.__aenter__ = AsyncMock(return_value=mock_http)
        mock_http.__aexit__ = AsyncMock(return_value=False)
        mock_cls.return_value = mock_http

        with pytest.raises(ValueError, match="amount must be a string"):
            await get_fee_info()


@pytest.mark.asyncio
async def test_raises_when_asset_not_string():
    response = _mock_supported_response(
        fee={"amount": "0.001", "asset": 123, "network": "base-sepolia"}
    )

    with patch("weft_sdk.facilitator.fee.httpx.AsyncClient") as mock_cls:
        mock_http = AsyncMock()
        mock_http.get.return_value = response
        mock_http.__aenter__ = AsyncMock(return_value=mock_http)
        mock_http.__aexit__ = AsyncMock(return_value=False)
        mock_cls.return_value = mock_http

        with pytest.raises(ValueError, match="asset must be a string"):
            await get_fee_info()


@pytest.mark.asyncio
async def test_raises_on_http_error():
    response = MagicMock()
    response.status_code = 500
    response.text = "Internal Server Error"

    with patch("weft_sdk.facilitator.fee.httpx.AsyncClient") as mock_cls:
        mock_http = AsyncMock()
        mock_http.get.return_value = response
        mock_http.__aenter__ = AsyncMock(return_value=mock_http)
        mock_http.__aexit__ = AsyncMock(return_value=False)
        mock_cls.return_value = mock_http

        with pytest.raises(ValueError, match="Failed to fetch fee info: 500"):
            await get_fee_info()
