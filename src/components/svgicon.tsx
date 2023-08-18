/*eslint import/namespace: ['error', { allowComputed: true }]*/
import React from "react";

import * as Icons from "@app/resources/icons";

export type SvgIconName = keyof typeof Icons;
interface SvgIconProps {
  name: SvgIconName;
  fill?: string;
}
const SvgIcon = React.memo(({ name, fill }: SvgIconProps) => {
  const Comp = Icons[name];

  return <Comp fill={fill} />;
});

export default SvgIcon;
