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
  const [mainProductImage, setMainProductImage] = React.useState(url);

  useEffect(() => {
    urlExists(url, function (status: any) {
      if (status === 200) {
        setMainProductImage(url);
      } else {
        setMainProductImage(productImagePlaceholder?.src);
      }
    });
  }, [mainProductImage]);

  return <img src={mainProductImage} className={className} alt={`Product`} />;
};

export default ProductImage;
