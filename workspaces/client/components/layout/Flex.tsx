import styled from '@emotion/styled';

interface FlexProps {
  /* Flex Props */
  flexDirection?: 'row' | 'column';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'initial'
    | 'inherit';
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  alignItems?:
    | 'stretch'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'baseline'
    | 'initial'
    | 'inherit';
  /* Child Prop */
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number;
  flex?: string;
  /****** Layout Props ********/
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
}

const kebabCase = (str: string) =>
  str
    .match(/[A-Z, a-z][a-z]+/g)
    ?.join('-')
    .toLowerCase();

const stylePropsToString = (props: FlexProps): string =>
  Object.entries(props)
    .filter(([prop]) => prop !== 'children' && prop !== 'theme')
    .reduce(
      (styleString: string, [property, value]: [string, string | number]) =>
        `${styleString}
      ${kebabCase(property)}:${value};`,
      ''
    );

export const Flex = styled.div<FlexProps>`
  display: flex;
  ${(props) => stylePropsToString(props)}
`;
