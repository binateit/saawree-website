/* eslint-disable @next/next/no-img-element */
import { checkIfImageExists, urlExists } from "@/core/helpers/helperFunctions";
import React, { useEffect } from "react";
import productImagePlaceholder from "@/assets/images/productImagePlaceHolder.jpg";

const ProductImage = ({
  url,
  className,
}: {
  url: string;
  className?: string;
}) => {
  const [image, setImage] = React.useState(url);

  useEffect(() => {
    checkIfImageExists(url, function (status: number | boolean) {
      if (status) {
        setImage(url);
      } else {
        setImage(productImagePlaceholder?.src);
      }
    });
  }, [url]);

  return (
    <img src={image} className={className} alt={`Product`} loading='lazy' />
  );
};

export default ProductImage;
