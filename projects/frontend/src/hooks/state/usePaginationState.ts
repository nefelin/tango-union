import { makeVar, useReactiveVar } from '@apollo/client';

const DEFAULT_PAGE_SIZE = 20;

interface PaginationState {
  page: number;
  pageSize: number;
  totalResults: number;
  loading: boolean;
}

const reactivePagination = makeVar<PaginationState>({
  page: 0,
  pageSize: DEFAULT_PAGE_SIZE,
  totalResults: 0,
  loading: false,
});

export const usePaginationState = () => {
  const { loading, pageSize, page, totalResults } = useReactiveVar(reactivePagination);

  const setPage = (newPage: number) =>
    reactivePagination({ ...reactivePagination(), page: newPage });
  const setPageSize = (newSize: number) =>
    reactivePagination({ ...reactivePagination(), pageSize: newSize });
  const setResults = (newResults: number) =>
    reactivePagination({ ...reactivePagination(), totalResults: newResults });
  const setLoading = (newLoading: boolean) =>
    reactivePagination({ ...reactivePagination(), loading: newLoading });

  return {
    setPageSize,
    setPage,
    setResults,
    setLoading,
    offset: pageSize * page,
    totalPages: Math.ceil(totalResults / pageSize),
    totalResults,
    page,
    pageSize,
    loading,
  };
};
