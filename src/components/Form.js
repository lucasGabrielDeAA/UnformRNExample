import React from 'react';
import {Form as Unform} from '@unform/mobile';

export default function Form({reference, onSubmit, children}) {
  return (
    <Unform ref={reference} onSubmit={onSubmit}>
      {children}
    </Unform>
  );
}
