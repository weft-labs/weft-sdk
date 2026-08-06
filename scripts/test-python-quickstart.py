#!/usr/bin/env python3

"""Exercise the installed Python buyer client against a local API fixture."""

from __future__ import annotations

import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread

from weft_sdk import Client
from weft_sdk.generated.models.user_principal import UserPrincipal


class ApiFixture(BaseHTTPRequestHandler):
    authorization: str | None = None

    def do_GET(self) -> None:
        type(self).authorization = self.headers.get("Authorization")
        if self.path != "/api/v1/me":
            self.send_error(404)
            return

        body = json.dumps(
            {
                "data": {
                    "principal_type": "user",
                    "id": 7,
                    "email": "quickstart@example.com",
                    "display_name": "Quickstart Buyer",
                    "status": "active",
                    "buyer_enabled": True,
                    "seller_enabled": False,
                    "provisioning_status": "ready",
                    "wallet": None,
                }
            }
        ).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format: str, *args: object) -> None:
        return


server = ThreadingHTTPServer(("127.0.0.1", 0), ApiFixture)
thread = Thread(target=server.serve_forever, daemon=True)
thread.start()

try:
    host, port = server.server_address
    with Client(api_key="wk_quickstart_fixture", base_url=f"http://{host}:{port}") as weft:
        account = weft.me()

    assert ApiFixture.authorization == "Bearer wk_quickstart_fixture"
    principal = account.data.actual_instance
    assert isinstance(principal, UserPrincipal)
    assert principal.email == "quickstart@example.com"
finally:
    server.shutdown()
    server.server_close()
    thread.join()

print("Packed Python buyer quickstart passed.")
