export const cleanDocument = (document: string | number): string => {
  // Numbers are accepted, but only whole, non-negative ones can be a document
  if (typeof document === "number") {
    if (!Number.isInteger(document) || document < 0) {
      return "";
    }

    document = document.toString();
  }

  // Anything that is not a string at this point cannot be a document
  if (typeof document !== "string") {
    return "";
  }

  // Trim document
  document = document.trim();

  // Remove dashes, the only separator documents are written with
  document = document.replace(/-/g, "");

  // Documents are made of digits only
  if (!/^[0-9]+$/.test(document)) {
    return "";
  }

  return document;
};

export default {
  cleanDocument,
};
