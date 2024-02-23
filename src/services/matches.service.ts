import _ from 'lodash';
import moment from 'moment';
import { CommonService } from 'src/commons/service.common';
import { APP_CONFIG } from 'src/config/config.app';
import { AppStore, Entity } from 'src/types';

class MatchesService extends CommonService {
  constructor() {
    super();
    this.staleTime = APP_CONFIG.STALE_TIME.DEFAULT;
  }

  formatMany(payload: Entity.Match[], options?: Partial<AppStore.Match>): AppStore.Match[] {
    const lastRefreshedAt = moment().toISOString();
    return payload.map(e => ({
      ...e,
      lastRefreshedAt,
      ...options,
    }));
  }

  formatOne(payload: Entity.Match): AppStore.Match {
    return {
      ...payload,
      lastRefreshedAt: moment().toISOString(),
    };
  }

  sortAndUniq(news: AppStore.Match[], olds: AppStore.Match[]) {
    return _.chain([...news, ...olds])
      .uniqBy('_id')
      .orderBy(['lastMessageAt', 'createdAt'], ['desc', 'desc'])
      .value();
  }

  public getCursor(data: Entity.Match[]): string | undefined {
    return this.getCursorByField(['createdAt'], data);
  }
}

export const matchesService = new MatchesService();
