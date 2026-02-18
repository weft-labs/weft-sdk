package facilitator

type Network string

type Price interface{}

type AssetAmount struct {
	Asset  string                 `json:"asset"`
	Amount string                 `json:"amount"`
	Extra  map[string]interface{} `json:"extra,omitempty"`
}

type PaymentRequirements struct {
	Scheme            string                 `json:"scheme"`
	Network           string                 `json:"network"`
	Asset             string                 `json:"asset"`
	Amount            string                 `json:"amount"`
	PayTo             string                 `json:"payTo"`
	MaxTimeoutSeconds int                    `json:"maxTimeoutSeconds"`
	Extra             map[string]interface{} `json:"extra,omitempty"`
}

type PaymentPayload struct {
	X402Version int                    `json:"x402Version"`
	Payload     map[string]interface{} `json:"payload"`
	Accepted    PaymentRequirements    `json:"accepted"`
	Resource    *ResourceInfo          `json:"resource,omitempty"`
	Extensions  map[string]interface{} `json:"extensions,omitempty"`
}

type PaymentRequired struct {
	Scheme     string            `json:"scheme"`
	Network    string            `json:"network"`
	Price      Price             `json:"price"`
	PayTo      string            `json:"payTo"`
	Resource   *ResourceInfo     `json:"resource,omitempty"`
	Extensions map[string]string `json:"extensions,omitempty"`
	MaxTimeout int               `json:"maxTimeoutSeconds"`
}

type ResourceInfo struct {
	Url         string            `json:"url"`
	Method      string            `json:"method"`
	Description string            `json:"description,omitempty"`
	MimeType    string            `json:"mimeType,omitempty"`
	Metadata    map[string]string `json:"metadata,omitempty"`
}
