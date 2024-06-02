import { FC, ReactElement, ReactNode } from 'react';

import { LoadingOverlay } from '../overlay';
import { ContentNoData } from './content-no-data';

export const ContentData: FC<{
  refresh?: () => void;
  isRefreshing?: boolean;
  title?: string;
  description?: string;
  ActionComponent?: ReactElement;
  isLoading?: boolean;
  hasData?: boolean;
  children?: ReactNode;
}> = ({
  isRefreshing,
  refresh,
  title,
  description,
  ActionComponent,
  isLoading,
  hasData,
  children,
}) => {
  return (
    <>
      <LoadingOverlay isLoading={!!isLoading} />
      <RenderContent
        hasData={hasData}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        refresh={refresh}
        title={title}
        description={description}
        ActionComponent={ActionComponent}
      >
        {children}
      </RenderContent>
    </>
  );
};

const RenderContent: FC<{
  hasData?: boolean;
  children?: ReactNode;
  isLoading?: boolean;
  isRefreshing?: boolean;
  refresh?: () => void;
  title?: string;
  description?: string;
  ActionComponent?: ReactElement;
}> = ({
  hasData,
  children,
  isLoading,
  isRefreshing,
  refresh,
  title,
  description,
  ActionComponent,
}) => {
  if (hasData) {
    return <>{children}</>;
  }

  if (!isLoading) {
    return (
      <ContentNoData
        isRefreshing={isRefreshing}
        refresh={refresh}
        title={title}
        description={description}
        ActionComponent={ActionComponent}
      />
    );
  }

  return null;
};
