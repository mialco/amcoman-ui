import { Pagination } from "./pagination.interface";
import { ProductData } from "./product.interface";

export interface ProductListPaged {
    products: ProductData[];
    pagination: Pagination;
}
