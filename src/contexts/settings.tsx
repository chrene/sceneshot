import React, { PropsWithChildren, useContext } from 'react';

const gradients = [
  'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)',
  'linear-gradient(to right, rgb(242, 112, 156), rgb(255, 148, 114))',
  'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient( 109.6deg,  rgba(48,207,208,1) 11.2%, rgba(51,8,103,1) 92.5% )',
  'radial-gradient( circle farthest-corner at 10% 20%,  rgba(255,209,67,1) 0%, rgba(255,145,83,1) 90% )',
  'linear-gradient( 109.6deg,  rgba(61,245,167,1) 11.2%, rgba(9,111,224,1) 91.1% )',
  'linear-gradient( 102.4deg,  rgba(253,189,85,1) 7.8%, rgba(249,131,255,1) 100.3% )',
  'linear-gradient( 109.6deg,  rgba(238,58,136,1) 11.2%, rgba(128,162,245,1) 91.1% )',
];

const shadows = [
  '0 0 0 0 rgba(0, 0, 0, 0)',
  '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
  '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
  '0 8px 16px 0 rgba(0, 0, 0, 0.2)',
  '0 16px 32px 0 rgba(0, 0, 0, 0.25)',
  '0 16px 32px 0 rgba(0, 0, 0, 0.35)',
];

const defaultValue = {
  padding: 0,
  border: 0,
  setPadding: (padding: number) => {},
  setBorder: (border: number) => {},
  background: 0,
  setBackground: (background: number) => {},
  backgrounds: gradients,
  shadow: 0,
  setShadow: (shadow: number) => {},
  getShadow: (shadow: number) => shadows[shadow],
};
export const SettingsContext = React.createContext(defaultValue);

export const SettingsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [padding, setPadding] = React.useState(100);
  const [border, setBorder] = React.useState(8);
  const [shadow, setShadow] = React.useState(0);
  const [background, setBackground] = React.useState(0);
  const backgrounds = gradients;
  const getShadow = (shadow: number) => shadows[shadow];

  return (
    <SettingsContext.Provider
      value={{
        padding,
        border,
        setPadding,
        setBorder,
        background,
        setBackground,
        backgrounds,
        shadow,
        setShadow,
        getShadow,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  return context;
};
