import React from "react";
import LayoutClientElement from "./LayoutClientElement";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return <LayoutClientElement>{children}</LayoutClientElement>;
}
