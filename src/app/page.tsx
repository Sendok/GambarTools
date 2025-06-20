import AdPlaceholder from '@/components/ad-placeholder';
import { ImageEditor } from '@/components/image-editor';

export default function Home() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 xl:grid-cols-[250px_1fr_250px] gap-8 max-w-screen-2xl mx-auto">
        <div className="hidden xl:block">
          <AdPlaceholder />
        </div>
        <ImageEditor />
        <div className="hidden xl:block">
          <AdPlaceholder />
        </div>
      </div>
    </div>
  );
}
