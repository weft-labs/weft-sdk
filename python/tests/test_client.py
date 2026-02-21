"""Tests for facilitator client."""

from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from weft_sdk.facilitator.client import (
    X402_FACILITATOR_URL,
    X402_FACILITATOR_URL_ENV,
    FacilitatorClient,
    create_facilitator_client,
    resolve_url,
    validate_url,
)


class TestValidateUrl:
    def test_accepts_https_url(self):
        validate_url("https://x402.weft.network")

    def test_accepts_http_url(self):
        validate_url("http://localhost:7676")

    def test_rejects_empty_string(self):
        with pytest.raises(ValueError, match="URL cannot be empty"):
            validate_url("")

    def test_rejects_whitespace_only(self):
        with pytest.raises(ValueError, match="URL cannot be empty"):
            validate_url("   ")

    def test_rejects_url_without_protocol(self):
        with pytest.raises(ValueError, match="URL must start with http://"):
            validate_url("x402.weft.network")

    def test_rejects_ftp_protocol(self):
        with pytest.raises(ValueError, match="URL must start with http://"):
            validate_url("ftp://x402.weft.network")


class TestResolveUrl:
    def test_returns_config_url_when_provided(self):
        assert resolve_url({"url": "https://custom.example.com"}) == "https://custom.example.com"

    def test_returns_env_var_url_when_no_config(self, monkeypatch):
        monkeypatch.setenv(X402_FACILITATOR_URL_ENV, "https://env.example.com")
        assert resolve_url() == "https://env.example.com"

    def test_prefers_config_over_env(self, monkeypatch):
        monkeypatch.setenv(X402_FACILITATOR_URL_ENV, "https://env.example.com")
        assert resolve_url({"url": "https://config.example.com"}) == "https://config.example.com"

    def test_returns_default_when_no_config_no_env(self, monkeypatch):
        monkeypatch.delenv(X402_FACILITATOR_URL_ENV, raising=False)
        assert resolve_url() == X402_FACILITATOR_URL

    def test_returns_default_when_config_has_no_url(self, monkeypatch):
        monkeypatch.delenv(X402_FACILITATOR_URL_ENV, raising=False)
        assert resolve_url({}) == X402_FACILITATOR_URL


class TestCreateFacilitatorClient:
    def test_creates_client_with_default_url(self, monkeypatch):
        monkeypatch.delenv(X402_FACILITATOR_URL_ENV, raising=False)
        client = create_facilitator_client()
        assert isinstance(client, FacilitatorClient)

    def test_creates_client_with_custom_url(self):
        client = create_facilitator_client({"url": "https://custom.example.com"})
        assert isinstance(client, FacilitatorClient)

    def test_raises_on_invalid_url(self):
        with pytest.raises(ValueError, match="URL must start with http://"):
            create_facilitator_client({"url": "not-a-url"})


class TestFacilitatorClient:
    @pytest.fixture
    def client(self):
        return FacilitatorClient("https://x402.weft.network")

    @pytest.mark.asyncio
    async def test_verify_sends_correct_payload(self, client):
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"valid": True}
        mock_response.raise_for_status = MagicMock()

        with patch("weft_sdk.facilitator.client.httpx.AsyncClient") as mock_cls:
            mock_http = AsyncMock()
            mock_http.post.return_value = mock_response
            mock_http.__aenter__ = AsyncMock(return_value=mock_http)
            mock_http.__aexit__ = AsyncMock(return_value=False)
            mock_cls.return_value = mock_http

            result = await client.verify({"sig": "abc"}, {"amount": "1"})
            assert result == {"valid": True}

            call_args = mock_http.post.call_args
            assert "/verify" in call_args[0][0]
            assert call_args[1]["json"]["x402Version"] == 2
            assert call_args[1]["json"]["paymentPayload"] == {"sig": "abc"}
            assert call_args[1]["json"]["paymentRequirements"] == {"amount": "1"}

    @pytest.mark.asyncio
    async def test_settle_sends_correct_payload(self, client):
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"success": True, "txHash": "0xabc"}
        mock_response.raise_for_status = MagicMock()

        with patch("weft_sdk.facilitator.client.httpx.AsyncClient") as mock_cls:
            mock_http = AsyncMock()
            mock_http.post.return_value = mock_response
            mock_http.__aenter__ = AsyncMock(return_value=mock_http)
            mock_http.__aexit__ = AsyncMock(return_value=False)
            mock_cls.return_value = mock_http

            result = await client.settle({"sig": "abc"}, {"amount": "1"})
            assert result == {"success": True, "txHash": "0xabc"}

            call_args = mock_http.post.call_args
            assert "/settle" in call_args[0][0]
            assert call_args[1]["json"]["x402Version"] == 2

    @pytest.mark.asyncio
    async def test_get_supported(self, client):
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "kinds": [{"x402Version": 2, "scheme": "eip-3009", "network": "base-sepolia"}],
            "fee": {"amount": "0.001", "asset": "USDC", "network": "base-sepolia"},
        }
        mock_response.raise_for_status = MagicMock()

        with patch("weft_sdk.facilitator.client.httpx.AsyncClient") as mock_cls:
            mock_http = AsyncMock()
            mock_http.get.return_value = mock_response
            mock_http.__aenter__ = AsyncMock(return_value=mock_http)
            mock_http.__aexit__ = AsyncMock(return_value=False)
            mock_cls.return_value = mock_http

            result = await client.get_supported()
            assert "kinds" in result
            assert "fee" in result
