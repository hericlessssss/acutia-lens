import { Link } from 'react-router-dom';
import { Camera, Instagram, Twitter, Facebook, Linkedin, Mail, MapPin, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const footerLinks = {
    navegacao: [
      { label: 'Eventos', to: '/eventos' },
      { label: 'Encontrar Fotos', to: '/encontrar' },
      { label: 'Galeria', to: '/galeria' },
      { label: 'Área do Fotógrafo', to: '/admin' },
    ],
    legal: [
      { label: 'Termos de Uso', to: '#' },
      { label: 'Política de Privacidade', to: '#' },
      { label: 'Cookies', to: '#' },
      { label: 'Licenciamento', to: '#' },
    ],
    contato: [
      { label: 'suporte@acutialens.com', href: 'mailto:suporte@acutialens.com', icon: Mail },
      { label: 'São Paulo, SP', href: '#', icon: MapPin },
    ]
  };

  return (
    <footer className="border-t border-border bg-surface-1 mt-auto">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">

          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                <Camera className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-text-1">
                Acutia <span className="text-primary">Lens</span>
              </span>
            </Link>
            <p className="text-text-2 text-sm max-w-xs leading-relaxed">
              A plataforma definitiva para conectar fotógrafos de eventos esportivos aos fãs apaixonados. Capture, encontre e reviva cada momento.
            </p>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-surface-2 text-text-2 hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="font-display font-bold text-lg text-text-1 mb-4">Navegação</h3>
            <ul className="space-y-3">
              {footerLinks.navegacao.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-text-2 hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-display font-bold text-lg text-text-1 mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-text-2 hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-display font-bold text-lg text-text-1 mb-4">Contato</h3>
            <ul className="space-y-4">
              {footerLinks.contato.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-3 text-text-2 hover:text-primary transition-colors text-sm"
                  >
                    <div className="h-8 w-8 rounded-lg bg-surface-2 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-4 w-4" />
                    </div>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border my-8 md:my-10" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-3">
          <p>© {currentYear} Acutia Lens. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1.5">
            <span>Feito com</span>
            <Heart className="h-4 w-4 text-primary fill-primary animate-pulse" />
            <span>para o esporte.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
