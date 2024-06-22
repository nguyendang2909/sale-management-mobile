// import _ from 'lodash';
// import { CommonService } from 'src/commons/service.common';
// import { Entity } from 'src/types';

// class SwipeProfilesService extends CommonService {
//   sortAndUniq(news: Entity.Profile[], olds: Entity.Profile[]) {
//     return _.chain([...news, ...olds])
//       .uniqBy('_id')
//       .orderBy(['distance', '_id'], ['asc', 'asc'])
//       .value();
//   }

//   public getCursor(profiles: Entity.Profile[]): string | undefined {
//     if (!profiles.length) {
//       return undefined;
//     }
//     const minDistance = profiles[profiles.length - 1].distance;
//     const excludedUserIds = profiles.filter(e => e.distance === minDistance).map(e => e._id);
//     const cursor = {
//       minDistance,
//       excludedUserIds,
//     };
//     return this.encodeFromObj(cursor);
//   }
// }

// export const swipeProfilesService = new SwipeProfilesService();
