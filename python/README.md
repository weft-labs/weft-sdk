# `weft-sdk` for Python

The supported Python buyer client for Weft. Generated OpenAPI APIs remain
available under `weft_sdk.generated` as an advanced escape hatch.

## Install and authenticate

Create a buyer `wk_*` key in
[Dashboard → API keys](https://weft.network/dashboard/buyer/api_keys), then:

```sh
pip install weft-sdk
export WEFT_API_KEY="wk_..."
```

## Search

```python
import os

from weft_sdk import Client

api_key = os.environ["WEFT_API_KEY"]
with Client(api_key=api_key) as weft:
    account = weft.me()
    results = weft.search(query="weather data API", max_results=5)

print(account.data)
print(results.results)
```

The client defaults to `https://weft.network`.

## Bounded paid fetch

Paid fetches require both a maximum cost and an idempotency key. Reuse the key
when retrying the same logical purchase after an uncertain response.

```python
from uuid import uuid4

idempotency_key = str(uuid4())
artifact = weft.fetch(
    url="https://merchant.example/data",
    max_cost_usd="0.05",
    idempotency_key=idempotency_key,
)
```

See the [API reference](https://weft.network/docs) for the complete contract.
