import { Card, CardContent } from './ui/card';

export default function AdPlaceholder() {
  return (
    <Card className="h-full min-h-[400px] flex items-center justify-center bg-card/50">
      <CardContent className="p-4 flex items-center justify-center">
        <img
          src="/adsPlaceholder.png"
          alt="Advertisement"
          className="max-h-[400px] max-w-full object-contain"
        />
      </CardContent>
    </Card>
  );
}
