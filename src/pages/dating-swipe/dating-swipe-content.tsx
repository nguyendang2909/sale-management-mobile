// import React from 'react';
// import { LoadingContent } from 'src/components';
// import { useSwipeProfiles } from 'src/hooks';

// import { DatingSwipeNoData } from './dating-swipe-no-data';
// import { DatingSwiper } from './dating-swiper';

// export const DatingSwipeContent: React.FC = () => {
//   const {
//     data: swipeProfiles,
//     length: swipeProfileLength,
//     isLoading,
//     fetchNext,
//     lastRefreshedAt,
//     isLoadingNext,
//   } = useSwipeProfiles();

//   if (!swipeProfileLength) {
//     if (isLoading) {
//       return <LoadingContent />;
//     }

//     if (lastRefreshedAt) {
//       return <DatingSwipeNoData isRefreshing={isLoadingNext} refresh={fetchNext} />;
//     }

//     // Show error
//     return <></>;
//   }

//   return (
//     <>
//       <DatingSwiper
//         swipeProfiles={swipeProfiles}
//         swipeProfileLength={swipeProfileLength}
//         fetchNext={fetchNext}
//       />
//     </>
//   );
// };
