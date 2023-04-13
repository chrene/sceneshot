import { useSettings } from '@/contexts/settings';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import tw from 'tailwind-styled-components';

export const Sidebar: React.FC = () => {
  const {
    padding,
    border,
    setPadding,
    setBorder,
    backgrounds,
    background,
    setBackground,
    shadow,
    setShadow,
  } = useSettings();

  return (
    <>
      <Header>
        <HeaderContent>
          <BrandLink href="/app">Sceneshot</BrandLink>
        </HeaderContent>
      </Header>
      <SidebarContent>
        <SettingsSection>
          <label className="text-slate-500" htmlFor="background">
            Background
          </label>
          <div className="flex flex-row flex-wrap gap-4">
            {backgrounds.map((bg, i) => (
              <div
                key={i}
                className={clsx('rounded-lg w-10 h-10 border border-white', {
                  'border-opacity-100': background === i,
                  'border-opacity-0': background !== i,
                })}
                onClick={() => {
                  setBackground(i);
                }}
                style={{ background: bg, backgroundRepeat: 'no-repeat' }}
              ></div>
            ))}
          </div>
        </SettingsSection>
        <SettingsSection>
          <label className="text-slate-500" htmlFor="padding">
            Padding
          </label>
          <input
            type="range"
            min="1"
            max="300"
            value={padding}
            className="slider"
            onInput={(e: any) => {
              setPadding(parseInt(e.target.value));
            }}
          />
        </SettingsSection>
        <SettingsSection>
          <label className="text-slate-500" htmlFor="border">
            Border
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={border}
            className="slider"
            onInput={(e: any) => {
              setBorder(parseInt(e.target.value));
            }}
            onChange={(e: any) => {
              setBorder(parseInt(e.target.value));
            }}
          />
        </SettingsSection>
        <SettingsSection>
          <label className="text-slate-500" htmlFor="shadow">
            Shadow
          </label>
          <input
            type="range"
            min="0"
            max={'5'}
            value={shadow}
            className="slider"
            onInput={(e: any) => {
              setShadow(parseInt(e.target.value));
            }}
            onChange={(e: any) => {
              setShadow(parseInt(e.target.value));
            }}
          />
        </SettingsSection>
      </SidebarContent>
    </>
  );
};

const Header = tw.div`flex justify-between p-8`;

const HeaderContent = tw.div`flex items-center space-x-2 text-white`;

const BrandLink = tw(Link)`text-2xl font-bold`;

const SidebarContent = tw.nav`px-8 text-white divide-y divide-solid divide-slate-700 flex flex-col gap-8 justify-center`;

const SettingsSection = tw.div`pt-4 flex flex-col space-y-4`;
