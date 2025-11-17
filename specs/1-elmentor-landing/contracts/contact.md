# Contract: Contact/Join (demo)

This contract documents the frontend-only Contact/Join form behavior. There is no server endpoint in the demo, but the contract defines the expected data shape and accepted validation.

## Contract
- POST /contact (demo) — frontend only; client-side only
  - Request body (json or form): { name?: string, email: string, message?: string, circleId?: string }
  - Response: no server response — show localized thank-you message
  - Validation: email must be RFC-compliant; name and message limited to 1k characters

## Notes
- This contract is a placeholder for future backend integration. If a backend is added, it should follow the above schema and return consistent success and error messages localized accordingly.
