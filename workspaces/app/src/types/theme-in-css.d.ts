declare module 'theme-in-css' {
  type ThemeValueMap = Record<string, string | number>;
  type ThemeConfig = Record<string, ThemeValueMap | ThemeConfig>;
  interface ThemeCSSObject {
    css: {
      string: string;
      properties: Array<[string, string]>;
    };
  }
  declare type ThemeVariableValueMap<Map> = {
    [key in keyof Map]: Map[key] extends string ? string : ThemeVariableValueMap<Map[key]>;
  };
  declare type ThemeVariables<Theme> = {
    [token in keyof Theme]: ThemeVariableValueMap<Theme[token]>;
  };
  declare type Theme<Shape> = ThemeVariables<Shape> & ThemeCSSObject;
  function createTheme<Shape extends ThemeConfig>(config: Shape): Theme<Shape>;
}
