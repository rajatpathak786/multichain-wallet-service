export const handleSuccess = <T>(
  message: string,
  data: T,
): { message: string; data: T } => {
  return { message, data };
};
