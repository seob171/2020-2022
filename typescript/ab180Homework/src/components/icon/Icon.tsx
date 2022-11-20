import styled from '@emotion/styled';

type Props = {
  color?: string;
  size?: number | 'inherit';
  children: string;
};

const Icon = styled.i<Props>(
  ({ color = 'inherit', size = 'inherit' }) => `
  color: ${color};
  font-size: ${typeof size === 'number' ? `${size}px` : size} !important;
  font-family: 'Material Icons' !important;
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
`,
);

export default Icon;
