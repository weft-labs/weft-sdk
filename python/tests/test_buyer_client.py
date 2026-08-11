from unittest.mock import MagicMock

import pytest

from weft_sdk import Client


def test_requires_buyer_api_key() -> None:
    with pytest.raises(ValueError, match="api_key is required"):
        Client(api_key=" ")


def test_routes_supported_buyer_operations() -> None:
    api_client = MagicMock()
    client = Client(api_key="wk_test", base_url="https://api.example/", api_client=api_client)
    client._account = MagicMock()
    client._balance = MagicMock()
    client._search = MagicMock()
    client._fetch = MagicMock()
    client._purchases = MagicMock()

    client.me()
    client.balance()
    client.search(query="weather", max_results=3)
    client.fetch(
        url="https://merchant.example/data",
        max_cost_usd="0.05",
        idempotency_key="retry-1",
    )
    client.purchases(page=2, per_page=10)
    client.purchase(7)

    client._account.get_me.assert_called_once_with()
    client._balance.get_balance.assert_called_once_with()
    search_request = client._search.search.call_args.args[0]
    assert search_request.query == "weather"
    assert search_request.max_results == 3
    fetch_request = client._fetch.fetch.call_args.args[0]
    assert fetch_request.max_cost_usd == "0.05"
    client._fetch.fetch.assert_called_once_with(fetch_request, idempotency_key="retry-1")
    client._purchases.list_purchases.assert_called_once_with(page=2, per_page=10)
    client._purchases.get_purchase.assert_called_once_with(7)


def test_paid_fetch_requires_cost_and_idempotency() -> None:
    client = Client(api_key="wk_test", api_client=MagicMock())
    with pytest.raises(ValueError, match="max_cost_usd is required"):
        client.fetch(url="https://merchant.example", max_cost_usd="", idempotency_key="retry")
    with pytest.raises(ValueError, match="idempotency_key is required"):
        client.fetch(url="https://merchant.example", max_cost_usd="0.05", idempotency_key="")
