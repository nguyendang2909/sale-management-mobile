import _ from 'lodash';
import { CommonService } from 'src/commons/service.common';
import { Entity } from 'src/types';

class NearbyProfilesService extends CommonService {
  sortAndUniq(news: Entity.Profile[], olds: Entity.Profile[]) {
    return _.chain([...news, ...olds])
      .uniqBy('_id')
      .orderBy('distance', 'asc')
      .value();
  }

  public getCursor(profiles: Entity.Profile[]): string | undefined {
    if (!profiles.length) {
      return undefined;
    }
    const distance = profiles[profiles.length - 1].distance;
    return this.encodeFromString(`${distance}`);
  }
}

export const nearbyProfilesService = new NearbyProfilesService();
