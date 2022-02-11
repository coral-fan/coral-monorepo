export const getEnvironmentVariableErrorMessage = (missingEnvVariable: string) =>
  `process.env.${missingEnvVariable} is not defined.`;
