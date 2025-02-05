import { ImageLoaderProps } from "next/image";

/**
 * Custom Next.js Image Loader to remove ?w=xxx&q=xxx from URLs
 */
const customLoader = ({ src }: ImageLoaderProps): string => {
  return src; // Returns the original URL without modifying it
};

export default customLoader;
