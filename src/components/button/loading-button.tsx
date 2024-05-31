import { Button, ButtonSpinner } from '@gluestack-ui/themed';
import React, { ReactNode } from 'react';

type LoadingButtonProps = React.ComponentProps<typeof Button> & {
  isLoading?: boolean;
  startIcon?: ReactNode;
  children: ReactNode;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  isLoading = false,
  ...buttonProps
}) => {
  return (
    <Button {...buttonProps} isDisabled={isLoading}>
      {isLoading ? <ButtonSpinner /> : <>{children}</>}
    </Button>
  );
};
