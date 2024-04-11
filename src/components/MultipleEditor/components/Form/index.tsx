import React from 'react';
import stylex from '@stylexjs/stylex';

import { Typography } from 'components/_private';

import { classes } from './styles';

export const FormBlockGroupSpace = ({ children }: React.PropsWithChildren) => {
  return <div {...stylex.props(classes.formBlockSpace)}>{children}</div>;
};
export const FormBlockGroup = ({ children }: React.PropsWithChildren) => {
  return (
    <FormBlockGroupSpace>
      <div {...stylex.props(classes.formBlock)}>{children}</div>
    </FormBlockGroupSpace>
  );
};

export const FormBlockRow = ({ title, children }: React.PropsWithChildren<{ title?: string }>) => {
  return (
    <div {...stylex.props(classes.formBlockRow)}>
      {title && <Typography variant="h5">{title}</Typography>}

      {children}
    </div>
  );
};

export const FormBlockRowItem = ({ children }: React.PropsWithChildren) => {
  return <div {...stylex.props(classes.formBlockRowItem)}>{children}</div>;
};
