interface ErrorResponse {
  status: number;
  message: string;
}

export const makeErrorResponse = (
  status: number,
  message: string,
): ErrorResponse => ({
  status,
  message,
});
