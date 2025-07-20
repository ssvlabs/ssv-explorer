export type Pagination = {
  total: number
  pages: number
  per_page: number
  page: number
}

export interface InfinitePagination extends Pagination {
  current_first: number
  current_last: number
}

export type WithPagination<T extends Record<string, unknown>> = T & {
  pagination: Pagination
}

export type WithInfinitePagination<T extends Record<string, unknown>> = T & {
  pagination: InfinitePagination
}
