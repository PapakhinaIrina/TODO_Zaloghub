import type { ErrorMessageProps } from "../lib/types";

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <p className="storage-error" role="alert">
    {message}
  </p>
);
