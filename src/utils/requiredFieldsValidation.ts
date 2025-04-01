export const validateRequiredFields = (obj: Record<string, any>, requiredFields: string[]): Record<string, string> => {
    return requiredFields.reduce((acc: Record<string, string>, field: string) => {
      if (!obj[field] || obj[field] === "") {
        acc[field] = `${field} is required`;
      }
      return acc;
    }, {});
  };