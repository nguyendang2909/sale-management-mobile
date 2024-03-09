// import { useCallback, useEffect } from 'react';
// import { productEndpoints } from 'src/api';
// import { productActions } from 'src/store';
// import { Entity } from 'src/types';

// import { useAppDispatch } from './usAppDispatch';

// export const useFetchAllProducts = () => {
//   const dispatch = useAppDispatch();

//   const fetchAll = useCallback(async () => {
//     let nextCursor: undefined | null | string;
//     const list: Entity.Product[] = [];
//     do {
//       const promise = dispatch(productEndpoints.fetchProducts.initiate({ _next: nextCursor! }));
//       const { refetch } = promise;
//       const { data } = await refetch();
//       if (data?.data) {
//         list.push(...data.data);
//       }
//       nextCursor = data?.pagination._next;
//     } while (nextCursor === null);
//     dispatch(productActions.setProducts(list));
//   }, [dispatch]);

//   useEffect(() => {
//     fetchAll();
//   }, [fetchAll]);

//   return {
//     fetchAll,
//   };
// };
