/** @format */

export type StatCardType = {
    title: string;
    count: number;
    rate: number;
};

export type Product = {
    name: string;
    price: number;
    quantity: number;
    amount: number;
};

export type TopSellingProductsTableProps = {
    products: Product[];
};
