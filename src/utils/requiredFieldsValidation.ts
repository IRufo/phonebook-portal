export const validateRequiredFields = (obj: Record<string, any>, requiredFields: string[]): Record<string, string> => {
    return requiredFields.reduce((acc: Record<string, string>, field: string) => {
      if (!obj[field] || obj[field] === "") {
        acc[field] = `${formatFieldName(field)} is required.`;
      }
      return acc;
    }, {});
  };

export const formatFieldName = (field: string): string => {
    const formattedField = field.replace(/_/g, ' ');
    return formattedField.charAt(0).toUpperCase() + formattedField.slice(1);
  }