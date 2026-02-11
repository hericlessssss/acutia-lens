import { Book, ArrowRight, Database, Shield, Webhook, Layout, Code } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Docs = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Book className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold">Documentação Técnica</h1>
              <p className="text-muted-foreground text-sm">Guia para integração backend e arquitetura.</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link to="/">Voltar ao início</Link>
          </Button>
        </div>

        {/* Route Map */}
        <Section icon={<Layout className="h-5 w-5" />} title="Mapa de Rotas (React Router)">
          <Table
            headers={['Rota', 'Componente Page', 'Descrição Funcional']}
            rows={[
              ['/', 'Home', 'Landing page, hero banner, fluxo principal.'],
              ['/eventos', 'Events', 'Listagem de eventos, filtros de status/nome.'],
              ['/evento/:id', 'EventDetail', 'Detalhes do evento, grid de fotos públicas.'],
              ['/encontrar', 'FindPhotos', 'Upload de selfie, fluxo LGPD, simulador de IA.'],
              ['/galeria', 'Gallery', 'Grid geral, aba "Minhas Fotos" (resultado da busca), favoritar.'],
              ['/carrinho', 'Cart', 'Gestão de itens no carrinho (localStorage).'],
              ['/checkout', 'Checkout', 'Formulário de dados, seleção de pagamento demo.'],
              ['/pedido/:id', 'OrderConfirmation', 'Success screen, links de download.'],
              ['/admin', 'Admin', 'Dashboard simulado para gestão de eventos/fotógrafos.'],
              ['/docs', 'Docs', 'Esta documentação técnica.'],
            ]}
          />
        </Section>

        {/* Components */}
        <Section icon={<Code className="h-5 w-5" />} title="Componentes Principais (Atomic Design)">
          <Table
            headers={['Componente', 'Caminho', 'Responsabilidade']}
            rows={[
              ['Header', 'components/Header.tsx', 'Navegação fixa, estado de login, mini-cart badge.'],
              ['Footer', 'components/Footer.tsx', 'Links de rodapé, copyright.'],
              ['EventCard', 'components/EventCard.tsx', 'Card visual para lista de eventos (com hover effects).'],
              ['PhotoCard', 'components/PhotoCard.tsx', 'Card complexo: imagem, preço, favoritar, add ao carrinho.'],
              ['SkeletonGrid', 'components/SkeletonGrid.tsx', 'Loading states (shimmer effect) para grids.'],
              ['LoginModal', 'components/LoginModal.tsx', 'Modal dialog para simular autenticação.'],
            ]}
          />
        </Section>

        {/* System Events */}
        <Section icon={<Webhook className="h-5 w-5" />} title="Eventos e Triggers (Client-Side)">
          <Table
            headers={['Evento', 'Trigger UI', 'Ação no Sistema (Mock)']}
            rows={[
              ['onLogin', 'Modal "Entrar"', 'Persiste user no localStorage e atualiza contexto.'],
              ['onFaceSearch', '/encontrar → "Buscar"', 'Timeout de 2.5s + algoritmo random para selecionar fotos.'],
              ['onAddToCart', 'PhotoCard Button', 'Adiciona item ao array cart em localStorage.'],
              ['onCheckout', '/checkout → "Pagar"', 'Gera ID único, cria registro em "orders", limpa carrinho.'],
              ['onDownload', 'Order/Photo', 'Abre URL da imagem com query params ?download=1.'],
            ]}
          />
        </Section>

        {/* Future API Contract */}
        <Section icon={<Database className="h-5 w-5" />} title="Contrato de API Sugerido (REST)">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-0 overflow-hidden">
              <Table
                headers={['Método', 'Endpoint', 'Finalidade']}
                rows={[
                  ['POST', '/auth/login', 'Autenticação (JWT)'],
                  ['GET', '/events', 'Listagem pública de eventos'],
                  ['GET', '/events/:id/photos', 'Fotos de um evento (com paginação)'],
                  ['POST', '/face/search', 'Envio de imagem (multipart) -> Retorna IDs de fotos'],
                  ['POST', '/orders', 'Criação de pedido (inicia gate de pagamento)'],
                  ['GET', '/orders/:id', 'Status do pedido e links seguros (signed URLs)'],
                ]}
                renderCell={(content, index) => {
                  if (index === 0) {
                    const color = content === 'GET' ? 'bg-blue-500/10 text-blue-500' : content === 'POST' ? 'bg-green-500/10 text-green-500' : content === 'DELETE' ? 'bg-red-500/10 text-red-500' : 'bg-gray-500/10 text-gray-500';
                    return <Badge variant="outline" className={`${color} border-0 font-mono`}>{content}</Badge>;
                  }
                  if (index === 1) return <code className="text-xs bg-secondary px-1.5 py-0.5 rounded text-primary">{content}</code>;
                  return content;
                }}
              />
            </CardContent>
          </Card>
        </Section>

        {/* LGPD */}
        <Section icon={<Shield className="h-5 w-5" />} title="Conformidade LGPD (Privacy by Design)">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <ul className="space-y-3 text-sm text-foreground/80">
                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">1</span>
                  <span><strong>Consentimento Explícito:</strong> Obrigatório "check" no termo de uso antes do upload da selfie.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">2</span>
                  <span><strong>Descarte Automático:</strong> A selfie do usuário deve ser processada em memória e descartada imediatamente após a geração do vetor biométrico (embedding).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">3</span>
                  <span><strong>Dados Mínimos:</strong> Armazenar apenas o necessário (nome, email para recibo). Não rastrear geolocalização sem aviso.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </Section>

        <div className="mt-12 text-center border-t border-border pt-8 text-sm text-muted-foreground">
          <p>
            Documentação gerada automaticamente para o projeto <strong>Acutia Photos MVP</strong>.
            <br />
            Versão 1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-6 border-b border-border pb-2">
        <span className="text-primary bg-primary/10 p-2 rounded-lg">{icon}</span>
        <h2 className="font-display text-xl font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Table({ headers, rows, renderCell }: {
  headers: string[];
  rows: string[][];
  renderCell?: (content: string, index: number) => React.ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="bg-secondary/50">
          <tr>
            {headers.map(h => (
              <th key={h} className="px-6 py-4 font-semibold text-foreground">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-card">
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border/50 hover:bg-secondary/20 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-6 py-4">
                  {renderCell ? renderCell(cell, j) : (
                    j === 0 ? <span className="font-medium text-foreground">{cell}</span> : <span className="text-muted-foreground">{cell}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Docs;
