// import _ from 'lodash';
// import moment from 'moment';
// import { CommonService } from 'src/commons/service.common';
// import { APP_CONFIG } from 'src/config/config.app';
// import { AppStore, Entity } from 'src/types';

// class LikedMeService extends CommonService {
//   constructor() {
//     super();
//     this.staleTime = APP_CONFIG.STALE_TIME.DEFAULT;
//   }

//   formatMany(payload: Entity.Product[], options?: Partial<AppStore.Product>): AppStore.View[] {
//     const lastRefreshedAt = moment().toISOString();
//     return payload.map(e => ({
//       ...e,
//       lastRefreshedAt,
//       ...options,
//     }));
//   }

//   formatOne(payload: Entity.Product): AppStore.Product {
//     const { ...rest } = payload;
//     return {
//       ...rest,
//       lastRefreshedAt: moment().toISOString(),
//     };
//   }

//   sortAndUniq(news: AppStore.Product[], olds: AppStore.Product[]) {
//     return _.chain([...news, ...olds])
//       .uniqBy('_id')
//       .orderBy(['createdAt'], ['desc'])
//       .value();
//   }

//   public getCursor(data: Entity.View[]): string | undefined {
//     return this.getCursorByField('createdAt', data);
//   }
// }

// export const likedMeService = new LikedMeService();
