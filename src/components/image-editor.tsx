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
  RotateCcw,
  X,
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

  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(800);
  const [originalWidth, setOriginalWidth] = useState(800);
  const [originalHeight, setOriginalHeight] = useState(800);

  const [isBgRemoved, setIsBgRemoved] = useState(false);
  const [isRemovingBg, setIsRemovingBg] = useState(false);

  const triggerActionWithAd = (action: () => Promise<void>) => {
    // For demonstration, we assume the user is not premium
    setPendingAction(() => action);
    setShowAdModal(true);
  };

  const handleChangeImage = () => {
    setImage(null);
    setProcessedImage(null);
    setBackground('hsl(var(--card))');
    setPrompt('');
    setSuggestion(null);
    setIsProcessing(false);
    setIsBgRemoved(false);
    setIsRemovingBg(false);
    setActiveTool('resize');
  };

  const handleFileChange = useCallback(
    (files: FileList | null) => {
      if (files && files[0]) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadstart = () => setIsProcessing(true);
          reader.onload = (e) => {
            const result = e.target?.result as string;
            const img = new window.Image();
            img.onload = () => {
              setOriginalWidth(img.width);
              setOriginalHeight(img.height);
              setWidth(img.width);
              setHeight(img.height);
              setImage(result);
              setProcessedImage(result); // Initially, processed is same as original
              setIsBgRemoved(false); // Reset bg removal state
              setIsProcessing(false);
              toast({
                title: 'Image loaded',
                description: 'Click "Remove Background" to enable AI features.',
              });
            };
            img.src = result;
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
    },
    [toast]
  );
  
  const handleRemoveBackground = async () => {
    if (!image) return;
    setIsRemovingBg(true);
    // Simulate background removal API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // In a real app, the processedImage would be set to the result from an API.
    // For this simulation, we'll just mark it as removed.
    setProcessedImage(image); 
    setIsBgRemoved(true);
    setIsRemovingBg(false);
    toast({
      title: 'Success!',
      description: 'Background has been removed. You can now use AI tools.',
    });
  };

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

  const resizePresets = useMemo(
    () => [
      { name: 'Tokopedia', width: 1080, height: 1080 },
      { name: 'Shopee', width: 1080, height: 1080 },
      { name: 'Instagram Post', width: 1080, height: 1080 },
      { name: 'Instagram Story', width: 1080, height: 1920 },
      { name: 'Facebook Post', width: 1200, height: 630 },
    ],
    []
  );

  const handleApplyResize = async () => {
    toast({
      title: 'Dimensions Applied',
      description: `Image dimensions set to ${width}x${height}px.`,
    });
  };

  const handleDownload = () => {
    if (!processedImage) return;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create image canvas.',
      });
      return;
    }

    const drawProductImage = () => {
      const img = new window.Image();
      img.onload = () => {
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio) * 0.8;
        const newWidth = img.width * ratio;
        const newHeight = img.height * ratio;
        const x = (canvas.width - newWidth) / 2;
        const y = (canvas.height - newHeight) / 2;

        ctx.drawImage(img, x, y, newWidth, newHeight);

        const link = document.createElement('a');
        link.download = 'edited-image.png';
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
          title: 'Download Started',
          description: 'Your image is being prepared.',
        });
      };
      img.onerror = () => {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load product image for download.',
        });
      };
      img.src = processedImage;
    };

    if (background.startsWith('url')) {
      const bgImg = new window.Image();
      bgImg.crossOrigin = 'Anonymous';
      bgImg.onload = () => {
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        drawProductImage();
      };
      bgImg.onerror = () => {
        ctx.fillStyle = 'hsl(var(--card))';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawProductImage();
      };
      const bgUrl = background.match(/url\("?(.*?)"?\)/)?.[1];
      if (bgUrl) {
        bgImg.src = bgUrl;
      } else {
        ctx.fillStyle = 'hsl(var(--card))';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawProductImage();
      }
    } else {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawProductImage();
    }
  };

  const handleReset = () => {
    if (!image) return;
    setProcessedImage(image);
    setBackground('hsl(var(--card))');
    setWidth(originalWidth);
    setHeight(originalHeight);
    setPrompt('');
    setSuggestion(null);
    setActiveTool('resize');
    setIsBgRemoved(false);
    toast({
      title: 'Image Reset',
      description: 'All edits have been reverted.',
    });
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
                <p className="text-xs text-muted-foreground/70 mt-2">
                  PNG, JPG, WEBP supported
                </p>
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
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full flex-1 order-1 lg:order-2">
          <div
            className="relative flex items-center justify-center overflow-hidden rounded-lg bg-card border"
            style={{ aspectRatio: width && height ? `${width} / ${height}` : '1 / 1' }}
          >
            <div
              className="absolute inset-0 transition-all duration-300"
              style={{
                background: background,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
            {processedImage && (
              <Image
                key={`${width}x${height}`}
                src={processedImage}
                alt="Processed product"
                width={width}
                height={height}
                className="relative z-10 max-w-full max-h-full object-contain"
                style={{ maxWidth: '80%', maxHeight: '80%' }}
              />
            )}
          </div>
        </div>
        <div className="w-full lg:w-[400px] lg:flex-none order-2 lg:order-1">
          <Card className="lg:sticky top-24">
            <CardHeader>
              <CardTitle>Editing Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                  <Button
                      onClick={() => triggerActionWithAd(handleRemoveBackground)}
                      disabled={isBgRemoved || isRemovingBg}
                      className="w-full"
                  >
                      {isRemovingBg ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                          <Scissors className="mr-2 h-4 w-4" />
                      )}
                      {isBgRemoved ? 'Background Removed' : 'Remove Background'}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center px-2">
                      {isBgRemoved 
                          ? "You can now use AI background tools." 
                          : "Remove the background to unlock AI features."}
                  </p>
              </div>
              
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
                      {resizePresets.map((p) => (
                        <Button
                          key={p.name}
                          variant="outline"
                          onClick={() => {
                            setWidth(p.width);
                            setHeight(p.height);
                          }}
                        >
                          {p.name}
                        </Button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Width"
                        className="w-full"
                        value={width}
                        onChange={(e) =>
                          setWidth(parseInt(e.target.value, 10) || 0)
                        }
                      />
                      <span className="text-muted-foreground">x</span>
                      <Input
                        type="number"
                        placeholder="Height"
                        className="w-full"
                        value={height}
                        onChange={(e) =>
                          setHeight(parseInt(e.target.value, 10) || 0)
                        }
                      />
                    </div>
                    <Button className="w-full" onClick={() => triggerActionWithAd(handleApplyResize)}>
                      Apply
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ai-background" disabled={!isBgRemoved}>
                  <AccordionTrigger className="text-base font-semibold">
                    <Sparkles className="mr-2 h-5 w-5" /> AI Custom Background
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2">
                    <Textarea
                      placeholder="e.g., a marble podium with soft lighting"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      disabled={!isBgRemoved}
                    />
                    <Button
                      onClick={() => triggerActionWithAd(handleGenerateBackground)}
                      disabled={isProcessing || !isBgRemoved}
                      className="w-full"
                    >
                      {isProcessing && activeTool === 'ai-background' ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      Generate
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ai-color" disabled={!isBgRemoved}>
                  <AccordionTrigger className="text-base font-semibold">
                    <Paintbrush className="mr-2 h-5 w-5" /> AI Color Background
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2">
                    <Button
                      onClick={() => triggerActionWithAd(handleSuggestColor)}
                      disabled={isProcessing || !isBgRemoved}
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
                            <Button
                              size="sm"
                              onClick={() => setBackground(suggestion.color)}
                              className="mt-1"
                            >
                              Apply Color
                            </Button>
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
              <div className="mt-6 flex flex-col gap-2">
                <Button onClick={handleDownload} size="lg" className="w-full">
                  <Download className="mr-2 h-5 w-5" />
                  Download Image
                </Button>
                <Button
                  onClick={handleReset}
                  size="lg"
                  className="w-full"
                  variant="outline"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Reset Edits
                </Button>
                <Button
                  onClick={handleChangeImage}
                  size="lg"
                  className="w-full"
                  variant="ghost"
                >
                  <X className="mr-2 h-5 w-5" />
                  Change Image
                </Button>
              </div>
            </CardContent>
          </Card>
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
              To support our free service, please watch a short ad to continue.
              Premium users enjoy an ad-free experience.
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
