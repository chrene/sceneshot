import { useSettings } from '@/contexts/settings';
import tw from 'tailwind-styled-components';

export default function SceneshotCanvas({ image }: { image: File | null }) {
  const { backgrounds, background, padding, shadow, getShadow, border } = useSettings();
  return (
    image && (
      <ImagePreview>
        <PaddingLayer style={{ padding: `${padding}px`, backgroundImage: backgrounds[background] }}>
          <ShadowLayer style={{ borderRadius: `${border}px`, boxShadow: getShadow(shadow) }}>
            <BorderRadiusMask style={{ borderRadius: `${border}px`, overflow: 'hidden' }}>
              <img src={URL.createObjectURL(image)} alt="" />
            </BorderRadiusMask>
          </ShadowLayer>
        </PaddingLayer>
      </ImagePreview>
    )
  );
}

const ImagePreview = tw.div`flex flex-col items-center justify-center gap-8`;
const PaddingLayer = tw.div`mx-auto w-[600px]`;
const ShadowLayer = tw.div``;
const BorderRadiusMask = tw.div``;
