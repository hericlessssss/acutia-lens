import { Link } from 'react-router-dom';
import { Camera, Search, ShieldCheck, ArrowRight, Upload, Eye, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { content } from '@/content/ptBR';
import heroBg from '@/assets/hero-bokeh.jpg';

const Index = () => {
  const steps = [
    { icon: Upload, title: content.home.features.search.title, desc: content.home.features.search.description },
    { icon: Eye, title: content.home.features.quality.title, desc: content.home.features.quality.description },
    { icon: Download, title: content.home.features.instant.title, desc: content.home.features.instant.description },
  ];

  const benefits = [
    { title: 'Para Clubes', desc: 'Monetize a experiência dos torcedores com fotos profissionais dos jogos.' },
    { title: 'Para Fotógrafos', desc: 'Venda suas fotos automaticamente para milhares de fãs em cada evento.' },
    { title: 'Para Fãs', desc: 'Encontre e compre suas fotos de estádio sem esforço, em segundos.' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 select-none">
          <img
            src={heroBg}
            alt="Hero Background"
            className="h-full w-full object-cover opacity-60 scale-105 animate-pulse-glow"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/80 to-bg" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--bg))_100%)] opacity-80" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >


            {/* Title */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight drop-shadow-2xl">
              {content.home.hero.title}
              <br />
              <span className="text-gradient-cyan block mt-2 pb-4">{content.home.hero.highlight}</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg sm:text-xl md:text-2xl text-text-2 mb-10 max-w-4xl mx-auto leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content.home.hero.subtitle }}
            />

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link
                to="/encontrar"
                className="group relative flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_hsl(var(--primary))] active:scale-95 w-full sm:w-auto overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Search className="h-5 w-5" />
                <span>{content.home.hero.ctaFind}</span>
              </Link>

              <Link
                to="/eventos"
                className="group flex items-center justify-center gap-2 rounded-full border border-border bg-surface-1/50 backdrop-blur-sm px-8 py-4 text-lg font-medium text-text-1 hover:bg-surface-2/50 hover:border-primary/50 transition-all w-full sm:w-auto"
              >
                <span>{content.home.hero.ctaEvents}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-24 relative overflow-hidden bg-bg">
        <div className="absolute inset-0 bg-surface-2/20 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-5xl font-bold mb-6 text-text-1">
              Como <span className="text-gradient-cyan">funciona</span>
            </h2>
            <p className="text-text-2 text-lg max-w-xl mx-auto">
              Três passos simples para reviver seus melhores momentos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="group relative p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all hover:bg-card hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-xl bg-background border border-border shadow-sm group-hover:border-primary/50 group-hover:text-primary transition-colors z-20">
                  <span className="font-display font-bold text-lg">{i + 1}</span>
                </div>

                <div className="mt-6 flex flex-col items-center text-center">
                  <div className="mb-6 p-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Benefícios para <span className="text-gradient-cyan">todos</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-8 rounded-2xl border border-border bg-gradient-to-b from-surface-1 to-bg hover:border-primary/30 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="font-display font-bold text-xl mb-3 text-primary">{b.title}</h3>
                <p className="text-text-2">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LGPD Banner */}
      <section className="py-20 border-t border-border bg-card/30">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary mb-6">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 text-text-1">Segurança e Privacidade</h2>
          <p className="text-text-2 text-lg mb-8">
            Seus dados são processados com total segurança. Não armazenamos sua selfie de busca,
            apenas a utilizamos momentaneamente para encontrar suas fotos.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-text-3">
            <span className="flex items-center gap-1.5">
              <span className="block w-1.5 h-1.5 rounded-full bg-green-500" />
              Conformidade LGPD
            </span>
            <span className="flex items-center gap-1.5">
              <span className="block w-1.5 h-1.5 rounded-full bg-green-500" />
              Sem armazenamento de face
            </span>
            <span className="flex items-center gap-1.5">
              <span className="block w-1.5 h-1.5 rounded-full bg-green-500" />
              Criptografia de ponta
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
