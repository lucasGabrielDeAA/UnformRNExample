import React from 'react';

import {Container} from './styles';

export default function ToolBox({bottom, keyboardHeight, children}) {
  return (
    <Container bottom={bottom} keyboardHeight={keyboardHeight}>
      {children}
    </Container>
  );
}

ToolBox.defaultProps = {
  bottom: false,
};
