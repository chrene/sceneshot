import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { toPng } from 'html-to-image';
import tw from 'tailwind-styled-components';

export default function DownloadButton({ querySelector }: { querySelector: string }) {
  return (
    <PrimaryButton
      onClick={() => {
        toPng(document.querySelector(querySelector) as HTMLElement).then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'my-image-name.png';
          link.href = dataUrl;
          link.click();
        });
      }}
    >
      <DownloadIcon />
      Download PNG
    </PrimaryButton>
  );
}

const PrimaryButton = tw.button`bg-blue-700 hover:bg-blue-800 text-white font-medium text-sm py-2 px-4 rounded flex flex-row`;
const DownloadIcon = tw(ArrowDownTrayIcon)`w-5 h-5 mr-2`;
