import { useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Upload, Search, ShieldCheck, AlertTriangle, AlertCircle, Loader2 } from 'lucide-react';
import { mockPhotos } from '@/lib/mockData';
import { storage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { content } from '@/content/ptBR';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const FindPhotos = () => {
  const [searchParams] = useSearchParams();
  const eventoId = searchParams.get('eventoId');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [lgpdConsent, setLgpdConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFile = useCallback((f: File) => {
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith('image/')) handleFile(f);
  }, [handleFile]);

  const handleSearch = () => {
    if (!lgpdConsent) {
      toast({ title: 'Consentimento necessário', description: 'Por favor, aceite os termos LGPD para continuar.', variant: 'destructive' });
      return;
    }
    if (!file) {
      toast({ title: 'Selfie necessária', description: 'Envie uma foto para que possamos encontrar você.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Logic from content/mock
      let pool = eventoId
        ? mockPhotos.filter(p => p.eventId === eventoId)
        : mockPhotos;

      const count = Math.floor(pool.length * (0.4 + Math.random() * 0.3));
      const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, count);
      const matched = shuffled.map(p => ({
        ...p,
        matchScore: Math.floor(60 + Math.random() * 38),
      }));

      storage.setMatchedPhotos(matched);
      setLoading(false);

      if (matched.length > 0) {
        toast({ title: content.find.resultsTitle, description: `${matched.length} fotos encontradas!` });
        navigate('/galeria?tab=minhas');
      } else {
        toast({ title: 'Ops!', description: content.find.noResults, variant: 'destructive' });
      }
    }, 2500); // Realistic delay
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">{content.find.title}</h1>
          <p className="text-lg text-muted-foreground">{content.find.subtitle}</p>
        </div>

        {/* Upload Area */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={cn(
            "relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 transition-all cursor-pointer group bg-card/50",
            dragOver
              ? "border-primary bg-primary/5 scale-[1.02] shadow-xl shadow-primary/10"
              : "border-border hover:border-primary/50 hover:bg-card hover:shadow-lg"
          )}
          onClick={() => document.getElementById('selfie-input')?.click()}
        >
          {preview ? (
            <div className="flex flex-col items-center gap-6 animate-fade-in">
              <div className="relative">
                <img
                  src={preview}
                  alt="Selfie preview"
                  className="h-40 w-40 rounded-full object-cover border-4 border-primary shadow-2xl shadow-primary/20"
                />
                <div className="absolute inset-0 rounded-full ring-2 ring-white/20" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">{file?.name}</p>
                <p className="text-xs text-primary font-bold mt-1 uppercase tracking-wide">Clique para trocar</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center gap-4">
              <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <Upload className="h-10 w-10 text-muted-foreground group-hover:text-primary" />
              </div>
              <div>
                <p className="font-display font-bold text-xl mb-1">{content.find.uploadLabel}</p>
                <p className="text-sm text-muted-foreground">{content.find.uploadHelp}</p>
              </div>
            </div>
          )}
          <input
            id="selfie-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>

        {/* LGPD Consent */}
        <div className="mt-8 bg-card border border-border rounded-xl p-5 shadow-sm">
          <label className="flex items-start gap-4 cursor-pointer">
            <input
              type="checkbox"
              checked={lgpdConsent}
              onChange={e => setLgpdConsent(e.target.checked)}
              className="mt-1 h-5 w-5 rounded border-input bg-background/50 text-primary focus:ring-primary/30 accent-primary"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="font-bold text-sm text-foreground">{content.find.lgpd.title}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {content.find.lgpd.text}
              </p>
            </div>
          </label>
        </div>

        {/* Warnings */}
        {!lgpdConsent && file && (
          <Alert variant="destructive" className="mt-4 bg-destructive/10 border-destructive/20 text-destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription>
              Você precisa aceitar os termos de uso para realizar a busca.
            </AlertDescription>
          </Alert>
        )}

        {/* Action Button */}
        <Button
          onClick={handleSearch}
          disabled={loading || !file || !lgpdConsent}
          className="w-full mt-8 h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all glow-cyan"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {content.find.analyzing}
            </>
          ) : (
            <>
              <Search className="mr-2 h-5 w-5" />
              {content.common.search}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FindPhotos;
