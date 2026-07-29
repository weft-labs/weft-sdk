def test_generated_client_imports_cleanly():
    import weft_sdk.generated

    assert weft_sdk.generated.Configuration
