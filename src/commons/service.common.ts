import { Buffer } from 'buffer';
import _ from 'lodash';
import moment from 'moment';
import { APP_CONFIG } from 'src/config/config.app';
import { ApiResponse } from 'src/types';

export class CommonService {
  staleTime: number;

  constructor() {
    this.staleTime = APP_CONFIG.STALE_TIME.DEFAULT;
  }

  protected encodeFromString(value: string): string {
    return Buffer.from(value, 'utf-8').toString('base64');
  }

  protected encodeFromObj(value: Record<string, unknown>): string {
    return this.encodeFromString(JSON.stringify(value));
  }

  protected getCursor<T extends []>(data: T): string | undefined {
    if (!data?.length) {
      return undefined;
    }

    throw new Error('Not implemented!');
  }

  protected getCursorByField<T>(field: keyof T | (keyof T)[], data: T[]): string | undefined {
    const dataLength = data.length;
    if (!dataLength) {
      return undefined;
    }
    const lastData = data[dataLength - 1];
    if (_.isArray(field)) {
      if (!field.length) {
        return undefined;
      }
      const obj: Partial<T> = {};
      for (const item of field) {
        obj[item] = lastData[item];
      }
      return this.encodeFromObj(obj);
    }
    const lastField = lastData[field]?.toString();
    return lastField ? this.encodeFromString(lastField) : undefined;
  }

  handlePagination = (pagination: ApiResponse.Pagination, fn: (v: boolean) => void) => {
    if (pagination._next) {
      fn(false);
      return;
    }

    fn(true);
  };

  public isStale(time: string): boolean {
    if (moment().diff(moment(time), 'milliseconds') < this.staleTime) {
      return false;
    }

    return true;
  }
}
