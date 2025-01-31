import { ID, Response } from "./model";

export type categoryImageItems = {
  name?: string;
  extension?: string;
  data?: string;
};
export type Category = {
  id?: ID;
  name?: string;
  parentCategoryId?: number;
  parentCategoryName?: string;
  isActive?: boolean;
  isParent?: boolean;
  hasChild?: boolean;
  printName?: string;
  statusId?: number;
  categoryImagePath?: categoryImageItems;
  bannerImagePath?: string;
};

export type CategoryList = {
  id: number;
  name: string;
  parentCategoryId?: number;
  hasChild?: boolean;
  isParent?: boolean;
};

export type CheckBoxFilter = {
  id: number;
  name: string;
};

export type CategoryQueryResponse = Response<Array<Category>>;

export type PolishingType = {
  id?: ID;
  name?: string;
};

export type PolishingTypeQueryResponse = Array<PolishingType>;

export type Color = {
  id: number;
  printName: string;
  colorCode: string;
  imagePath: string;
};

export type ColorQueryResponse = Array<Color>;

export type ProductList = {
  productId: number;
  productName: string;
  productGroupName: string;
  categoryName: string;
  name: string;
  productPrice: number;
  imagePath: string;
  availableQuantity: number;
};

export type ProductColor = {
  productId?: number;
  productName?: string;
  colorId?: number;
  colorName?: string;
  colorCode?: string;
  imagePath?: string;
  quantity?: number;
  price?: number;
};
export type ReadyStockProductsQueryResponse = Response<Array<ProductList>>;

export type MakeToOrderProduct = {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
  productGroupName: string;
  imagePath: string;
  productId: number;
  productName: string;
  productPrice: number | null;
  availabilityTypeName: string;
  alphanumericSortKey: string;
};

export type MakeToOrderProductsQueryResponse = Response<
  Array<MakeToOrderProduct>
>;

export type ProductsFilterOption = {
  pageNumber: number;
  pageSize: number;
  orderBy?: string[];
  categoryIds?: number[];
  polishingTypeIds?: number[];
  colorIds?: number[];
};

export type ProductDetailsResponse = {
  id: number;
  name: string;
  barcode?: string;
  description: string;
  productPrice: number;
  itemGroupId: number;
  colorId: number;
  colorName: string;
  polishingTypeId: number;
  polishingTypeName: string;
  unitId?: string;
  unitName?: string;
  productGroupId: number;
  productGroupName: string;
  categoryId: number;
  categoryName: string;
  designNumberId: number;
  designNumberName: string;
  brandId: number;
  brandName: string;
  manufacturerId: number;
  manufacturerName: string;
  polishingTypeList: PolishingTypeDropdownDto[];
  colorList: ColorDropdownDto[];
  productImages: ProductImage[];
};
export type ProductImage = {
  id: number;
  productId: number;
  isFeatured: boolean;
  imagePath: string;
  thumbnailImagePath: string;
  smallImagePath: string;
  mediumImagePath: string;
  zoomImagePath: string;
  waterMarkImagePath: string;
};
export type ColorDropdownDto = {
  productId: number;
  productName: string;
  colorId: number;
  colorName: string;
  colorCode: string;
  imagePath?: string;
  avaliableQuantity?: number;
};
export type PolishingTypeDropdownDto = {
  productId: number;
  productName: string;
  polishingTypeId: number;
  polishingTypeName: string;
};
