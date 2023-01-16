export const cleanDocument = (document: string): string => {
    // Null document returns empty string
    if (document === null) {
        return '';
    }

    // Trim document
    document = document.trim();

    // Remove all non-digit characters
    document = document.replace(/\D/g, '');

    return document;
};

export default {
    cleanDocument,
};