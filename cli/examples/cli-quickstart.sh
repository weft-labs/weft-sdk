#!/usr/bin/env sh
set -eu

: "${WEFT_API_KEY:?Set WEFT_API_KEY to a buyer wk_* API key}"

weft me
weft search "weather data API"
