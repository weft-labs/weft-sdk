package weft_test

import (
	"bytes"
	"context"
	"log"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	generated "github.com/weft-labs/weft-sdk/go/generated"
)

func TestGeneratedDebugLoggingOmitsSecrets(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusUnauthorized)
	}))
	t.Cleanup(server.Close)

	var output bytes.Buffer
	previousWriter := log.Writer()
	previousFlags := log.Flags()
	log.SetOutput(&output)
	log.SetFlags(0)
	t.Cleanup(func() {
		log.SetOutput(previousWriter)
		log.SetFlags(previousFlags)
	})

	const password = "secret-password"
	const bearer = "Bearer secret-api-key"
	cfg := generated.NewConfiguration()
	cfg.Debug = true
	cfg.Servers[0].URL = server.URL
	cfg.AddDefaultHeader("Authorization", bearer)
	client := generated.NewAPIClient(cfg)
	request := generated.NewSignInRequest("agent@example.com", password)
	_, _, _ = client.AuthAPI.SignIn(context.Background()).SignInRequest(*request).Execute()

	logged := output.String()
	for _, secret := range []string{password, bearer, "agent@example.com"} {
		if strings.Contains(logged, secret) {
			t.Fatalf("debug log contains secret %q: %s", secret, logged)
		}
	}
	if !strings.Contains(logged, "POST /api/v1/auth/sign_in") {
		t.Fatalf("debug log omits request metadata: %s", logged)
	}
	if !strings.Contains(logged, "401 Unauthorized") {
		t.Fatalf("debug log omits response status: %s", logged)
	}
}
