declare module 'theme-in-css' {
  type ThemeValueMap = Record<string, string | number>;
  type ThemeConfig = Record<string, ThemeValueMap | ThemeConfig>;
  function createTheme<Shape extends ThemeConfig>(config: Shape): Theme<Shape>;
}
