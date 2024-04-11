import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import * as stylex from "@stylexjs/stylex";

import { classes } from "./styles";

export const MultipleEditorWrap = ({ children }: React.PropsWithChildren) => {
  return <div {...stylex.props(classes.wrap)}>{children}</div>;
};

export const MultipleEditorContent = ({ children }: React.PropsWithChildren) => {
  return <div {...stylex.props(classes.root)}>{children}</div>;
};

export const MultipleEditorBody = ({ children }: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <div {...stylex.props(classes.body)}>
      <PerfectScrollbar {...stylex.props(classes.bodyScrollable)}>{children}</PerfectScrollbar>
    </div>
  );
};

export const MultipleEditorActions = ({ children }: React.PropsWithChildren) => {
  return <div {...stylex.props(classes.actions)}>{children}</div>;
};

export const MultipleEditorLeftSlotActions = ({ children }: React.PropsWithChildren<{ className?: string }>) => {
  return <div>{children}</div>;
};

export const MultipleEditorRightSlotActions = ({ children }: React.PropsWithChildren<{ className?: string }>) => {
  return <div {...stylex.props(classes.rightSlotActions)}>{children}</div>;
};
