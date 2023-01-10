import React from "react";

export interface BaseContainerProps {
  children: React.ReactNode;
}

export const BaseContainer: React.FC<BaseContainerProps> = ({ children }) => {
  return <div>{children}</div>;
};
