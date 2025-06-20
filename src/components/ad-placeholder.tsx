import { Card, CardContent } from './ui/card';

export default function AdPlaceholder() {
  return (
    <Card className="h-full min-h-[400px] flex items-center justify-center bg-card/50">
      <CardContent className="p-4 text-center">
        <span className="text-sm text-muted-foreground">Advertisement</span>
      </CardContent>
    </Card>
  );
}
