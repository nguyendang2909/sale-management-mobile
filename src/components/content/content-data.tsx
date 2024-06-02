import { FC, ReactElement, ReactNode } from 'react';
import { ViewProps } from 'src/types';

import { LoadingOverlay } from '../overlay';
import { ContentNoData } from './content-no-data';

export const ContentData: FC<
  ViewProps & {
    refresh: () => void;
    isRefreshing: boolean;
    title?: string;
    description?: string;
    ActionComponent?: ReactElement;
    isLoading?: boolean;
    hasData?: boolean;
    children?: ReactNode;
  }
> = ({
  isRefreshing,
  refresh,
  title,
  description,
  ActionComponent,
  isLoading,
  hasData,
  children,
  ...viewProps
}) => {
  return (
    <>
      <LoadingOverlay isLoading={!!isLoading} />
      {!hasData ? (
        <ContentNoData
          isRefreshing={isRefreshing}
          refresh={refresh}
          title={title}
          description={description}
          ActionComponent={ActionComponent}
        />
      ) : (
        <>{children}</>
      )}
    </>
  );
};
