import React from 'react';

import {Container} from './styles';

export default function ToolBox({children, keyboardHeight}) {
  console.tron.log(children.type);
  return <Container keyboardHeight={keyboardHeight}>{children}</Container>;
}
