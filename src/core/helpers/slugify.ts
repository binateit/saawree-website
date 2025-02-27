export function slugify(text: string): string {
    return text
      .toLowerCase() // Convert to lowercase
      .replace(/[\s]+/g, "-") // Replace spaces with hyphens
      .replace(/[^\w-]+/g, "") // Remove special characters
      .replace(/--+/g, "-") // Remove duplicate hyphens
      .trim();
  }
  