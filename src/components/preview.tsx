import tw from 'tailwind-styled-components';
import SceneshotCanvas from '@/components/canvas';
import DownloadButton from '@/components/download-button';
import RenderIf from '@/components/render-if';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import Dropzone from 'react-dropzone';

export const Preview: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const classes = useMemo(() => {
    return clsx(
      'flex flex-col w-11/12 md:w-2/3 lg:w-1/2 border rounded-lg p-8 text-slate-700 items-center justify-center transition-all duration-150 ease-in-out opacity-0',
      {
        'text-slate-100 border-slate-100': isDragActive,
        'opacity-100': isDragActive || !image,
        'border-none': isDragActive && image,
        'border-dashed border-2 border-slate-700': !isDragActive || !image,
      }
    );
  }, [isDragActive]);

  function onDragEnter() {
    setIsDragActive(true);
  }

  function onDragLeave() {
    setIsDragActive(false);
  }

  function onDrop(acceptedFiles: File[]) {
    setIsDragActive(false);
    setImage(acceptedFiles[0]);
  }

  return (
    <PreviewContainer>
      <Dropzone
        accept={{ 'image/jpeg': [], 'image/png': [] }}
        noClick
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {({ getRootProps }) => (
          <FullscreenAbsoluteContainer>
            <DropzoneContainer {...getRootProps()}>
              <DropzoneArea className={classes} />
              <DropzoneContent isDragActive={isDragActive}>
                <SceneshotCanvas image={image} />
                <RenderIf condition={!!image}>
                  <DownloadButton querySelector=".mx-auto" />
                </RenderIf>
              </DropzoneContent>
            </DropzoneContainer>
          </FullscreenAbsoluteContainer>
        )}
      </Dropzone>
    </PreviewContainer>
  );
};

export default Preview;

const DropzoneArea: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <p className="mb-4">Drop or paste image here</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-12 h-12"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
        />
      </svg>
    </div>
  );
};
const PreviewContainer = tw.div`flex w-full h-full relative`;
const FullscreenAbsoluteContainer = tw.div`absolute inset-0`;
const DropzoneContainer = tw.div`h-full w-full flex flex-col justify-center items-center`;
const DropzoneContent = tw.div`${({ isDragActive }: { isDragActive: boolean }) =>
  clsx(
    'absolute inset-0 flex flex-col items-center w-full h-full justify-center p-8 gap-8 transition-opacity duration-150',
    {
      'opacity-0': isDragActive,
      'opacity-100': !isDragActive,
    }
  )}`;
