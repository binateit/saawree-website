/* eslint-disable @next/next/no-img-element */
import { urlExists } from "@/core/helpers/helperFunctions";
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
    urlExists(url, function (status: number | boolean) {
      if (status === 200) {
        setImage(url);
      } else {
        setImage(productImagePlaceholder?.src);
      }
    });
  }, [url]);

  return <img src={image} className={className} alt={`Product`} />;
};

export default ProductImage;
