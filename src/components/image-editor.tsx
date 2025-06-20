'use client';

import { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import {
  UploadCloud,
  Loader2,
  Download,
  Scissors,
  Paintbrush,
  Sparkles,
} from 'lucide-react';
import { generateBackgroundFromPrompt } from '@/ai/flows/generate-background-from-prompt';
import { suggestColorBackground } from '@/ai/flows/suggest-color-background';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Link from 'next/link';
import { Input } from './ui/input';

export function ImageEditor() {
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [background, setBackground] = useState<string>('hsl(var(--card))');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTool, setActiveTool] = useState<string | undefined>('resize');
  const { toast } = useToast();

  const [prompt, setPrompt] = useState('');
  const [suggestion, setSuggestion] = useState<{
    color: string;
    reason: string;
  } | null>(null);

  const [showAdModal, setShowAdModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => Promise<void>) | null>(null);

  const triggerActionWithAd = (action: () => Promise<void>) => {
    // For demonstration, we assume the user is not premium
    setPendingAction(() => action);
    setShowAdModal(true);
  };

  const handleFileChange = useCallback((files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadstart = () => setIsProcessing(true);
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setImage(result);
          // Simulate background removal and set as processedImage
          // In a real app, this would be an API call
          setTimeout(() => {
            setProcessedImage(result);
            setIsProcessing(false);
            toast({
              title: 'Image loaded',
              description: 'Background has been removed.',
            });
          }, 1500);
        };
        reader.onerror = () => {
          setIsProcessing(false);
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to read file.',
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }, [toast]);

  const handleGenerateBackground = async () => {
    if (!prompt) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter a background prompt.',
      });
      return;
    }
    setIsProcessing(true);
    try {
      const result = await generateBackgroundFromPrompt({
        backgroundPrompt: prompt,
      });
      setBackground(`url(${result.generatedBackground})`);
      toast({
        title: 'Success!',
        description: 'AI background has been generated.',
      });
    } catch (error) {
      console.error('AI Background Error:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate AI background.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSuggestColor = async () => {
    if (!processedImage) return;
    setIsProcessing(true);
    setSuggestion(null);
    try {
      const result = await suggestColorBackground({
        productPhotoDataUri: processedImage,
      });
      setSuggestion({
        color: result.suggestedColor,
        reason: result.reasoning,
      });
      toast({
        title: 'Color Suggested',
        description: 'AI has picked a complementary color.',
      });
    } catch (error) {
      console.error('AI Color Suggestion Error:', error);
      toast({
        variant: 'destructive',
        title: 'Suggestion Failed',
        description: 'Could not suggest a color.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resizePresets = useMemo(() => [
    { name: 'Tokopedia', width: 1080, height: 1080 },
    { name: 'Shopee', width: 1080, height: 1080 },
    { name: 'Instagram Post', width: 1080, height: 1080 },
    { name: 'Instagram Story', width: 1080, height: 1920 },
    { name: 'Facebook Post', width: 1200, height: 630 },
  ], []);

  const handleDownload = () => {
    toast({
      title: 'Download Started',
      description: 'Your image is being prepared.',
    });
    // This is a placeholder for actual download logic
  };

  if (!image) {
    return (
      <Card
        className="w-full min-h-[60vh] flex items-center justify-center transition-all duration-300"
        onDrop={(e) => {
          e.preventDefault();
          handleFileChange(e.dataTransfer.files);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <CardContent className="text-center p-6 w-full">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg p-12 cursor-pointer hover:bg-card hover:border-accent transition-colors"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mx-auto h-16 w-16 text-accent animate-spin" />
                <p className="mt-4 font-semibold">Processing image...</p>
              </>
            ) : (
              <>
                <UploadCloud className="mx-auto h-16 w-16 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">
                  Drag & drop an image or{' '}
                  <span className="text-accent font-semibold">
                    click to upload
                  </span>
                </p>
                <p className="text-xs text-muted-foreground/70 mt-2">PNG, JPG, WEBP supported</p>
              </>
            )}
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files)}
              disabled={isProcessing}
            />
          </label>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,400px)_1fr] gap-8 items-start">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Editing Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion
              type="single"
              collapsible
              value={activeTool}
              onValueChange={setActiveTool}
            >
              <AccordionItem value="resize">
                <AccordionTrigger className="text-base font-semibold">
                  <Scissors className="mr-2 h-5 w-5" /> Resize & Crop
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                   <div className="grid grid-cols-2 gap-2">
                        {resizePresets.map(p => <Button key={p.name} variant="outline">{p.name}</Button>)}
                    </div>
                    <div className="flex items-center gap-2">
                        <Input type="number" placeholder="Width" className="w-full" />
                        <span className="text-muted-foreground">x</span>
                        <Input type="number" placeholder="Height" className="w-full" />
                    </div>
                    <Button className="w-full">Apply</Button>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ai-background">
                <AccordionTrigger className="text-base font-semibold">
                  <Sparkles className="mr-2 h-5 w-5" /> AI Custom Background
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <Textarea
                    placeholder="e.g., a marble podium with soft lighting"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <Button
                    onClick={() => triggerActionWithAd(handleGenerateBackground)}
                    disabled={isProcessing}
                    className="w-full"
                  >
                    {isProcessing && activeTool === 'ai-background' ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Generate
                  </Button>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ai-color">
                <AccordionTrigger className="text-base font-semibold">
                  <Paintbrush className="mr-2 h-5 w-5" /> AI Color Background
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <Button
                    onClick={() => triggerActionWithAd(handleSuggestColor)}
                    disabled={isProcessing}
                    className="w-full"
                    variant="outline"
                  >
                    {isProcessing && activeTool === 'ai-color' ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Suggest a Color
                  </Button>
                  {suggestion && (
                    <Card className="bg-secondary p-4">
                      <div className="flex items-center gap-4 mb-2">
                        <div
                          style={{ backgroundColor: suggestion.color }}
                          className="w-10 h-10 rounded-full border-2 border-border"
                        />
                        <div className="flex-1">
                          <p className="font-mono text-lg">{suggestion.color}</p>
                           <Button size="sm" onClick={() => setBackground(suggestion.color)} className="mt-1">Apply Color</Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground italic">
                        &quot;{suggestion.reason}&quot;
                      </p>
                    </Card>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
             <Button onClick={handleDownload} size="lg" className="w-full mt-6">
                <Download className="mr-2 h-5 w-5" />
                Download Image
            </Button>
          </CardContent>
        </Card>
        <div className="aspect-square relative flex items-center justify-center overflow-hidden rounded-lg bg-card border">
            <div 
                className="absolute inset-0 transition-all duration-300"
                style={{ background: background, backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></div>
            {processedImage && (
              <Image
                src={processedImage}
                alt="Processed product"
                width={800}
                height={800}
                className="relative z-10 max-w-full max-h-full object-contain"
                style={{ maxWidth: '80%', maxHeight: '80%' }}
              />
            )}
        </div>
      </div>
      <AlertDialog
        open={showAdModal}
        onOpenChange={(open) => {
          if (!open) {
            setPendingAction(null);
          }
          setShowAdModal(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>One More Step!</AlertDialogTitle>
            <AlertDialogDescription>
              To support our free service, please watch a short ad to continue. Premium users enjoy an ad-free experience.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="h-64 bg-secondary flex items-center justify-center rounded-md border">
            <p className="text-muted-foreground">Advertisement Placeholder</p>
          </div>
          <AlertDialogFooter>
            <Button asChild variant="outline">
              <Link href="/premium">Upgrade to Premium</Link>
            </Button>
            <AlertDialogAction
              onClick={async () => {
                if (pendingAction) {
                  await pendingAction();
                  setPendingAction(null);
                }
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
