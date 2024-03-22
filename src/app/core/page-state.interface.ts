export interface PageState {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    pageSize: number;
    categories: number[];
    searchTerm: string;
    pageActivated: boolean;
}
