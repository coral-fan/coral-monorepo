import styled from '@emotion/styled';

interface ShorthandFlexProps {
  /* Flex Props */
  direction?: 'row' | 'column';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  /* Child Prop */
  grow?: number;
  shrink?: number;
  basis?: number;
}

// TODO: should figure out a way to have a single source of truth for property values...
const shorthandFlexKeys = ['direction', 'wrap', 'grow', 'shrink', 'basis'];

const isPropertyShorthandFlexKey = (property: string) => shorthandFlexKeys.includes(property);
interface FlexProps extends ShorthandFlexProps {
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'initial'
    | 'inherit';
  flex?: string;
  alignItems?:
    | 'stretch'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'baseline'
    | 'initial'
    | 'inherit';
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

const getCSSProperty = (property: string) =>
  isPropertyShorthandFlexKey(property) ? `flex-${property}` : `${kebabCase(property)}`;

const stylePropsToString = (props: FlexProps): string =>
  Object.entries(props)
    .filter(([prop]) => prop !== 'children' && prop !== 'theme')
    .reduce(
      (styleString: string, [property, value]: [string, string | number]) =>
        `${styleString}
      ${getCSSProperty(property)}:${value};`,
      ''
    );

export const Flex = styled.div<FlexProps>`
  display: flex;
  ${(props) => stylePropsToString(props)}
`;
