from unittest.mock import MagicMock

import pytest
from urllib3.exceptions import ProtocolError

from weft_sdk import Client, WeftError
from weft_sdk.generated.exceptions import ApiException


def test_normalizes_transport_failures_into_uncertain_outcome_shape() -> None:
    client = Client(api_key="wk_test", api_client=MagicMock())
    client._account = MagicMock()
    client._account.get_me.side_effect = ProtocolError("Connection aborted")

    with pytest.raises(WeftError) as raised:
        client.me()

    assert raised.value.status == 0
    assert raised.value.code == "NETWORK_ERROR"
    assert raised.value.retryable is True
    assert raised.value.request_id is None


def test_normalizes_generated_api_errors() -> None:
    client = Client(api_key="wk_test", api_client=MagicMock())
    client._account = MagicMock()
    client._account.get_me.side_effect = ApiException(
        status=429,
        reason="Too Many Requests",
        body='{"error":{"code":"RATE_LIMITED","message":"slow down","request_id":"req-1"}}',
    )

    with pytest.raises(WeftError) as raised:
        client.me()

    assert raised.value.status == 429
    assert raised.value.code == "RATE_LIMITED"
    assert raised.value.request_id == "req-1"
    assert raised.value.retryable is True
    assert raised.value.details["error"]["message"] == "slow down"
