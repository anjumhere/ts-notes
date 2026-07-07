// ============================================
// TOPIC: Discriminated Union
// ============================================
/*
type SuccessResponse = { status: "success"; data: string[] };
type ErrorResponse = { status: "error"; data: string };
type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(res: ApiResponse) {
  if (res.status === "success") {
    return res.data; // TS knows this is a SuccessResponse
  }
  return res.data; // TS knows this is an ErrorResponse
}
*/
// TS looks at ApiResponse and knows there are two possible outcomes.
// When it sees res.status === 'success', it matches SuccessResponse and
// completely eliminates the ErrorResponse status, putting it in the implicit else block.
