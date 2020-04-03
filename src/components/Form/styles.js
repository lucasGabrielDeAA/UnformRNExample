import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs(props => ({
  contentContainerStyle: {
    paddingBottom: props.debouncedKeyboard,
  },
}))`
  width: 100%;
`;
