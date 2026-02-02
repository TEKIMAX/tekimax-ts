import { HomeLayout } from 'fumadocs-ui/layouts/home';
import Link from 'next/link';
import { Zap, Globe, Shield, Heart } from 'lucide-react';
import { CopyButton } from '@/components/copy-button';
import { CustomCodeBlock } from '@/components/custom-code-block';
import { BrandLogo } from '@/components/brand-logo';

// Server component for syntax highlighting
async function Code({ code, lang, title }: { code: string; lang: string; title: string }) {
  const { codeToHtml } = await import('shiki');
  const html = await codeToHtml(code, {
    lang,
    theme: 'vesper' // Matches the dark aesthetic
  });

  return (
    <CustomCodeBlock
      title={title}
      lang={lang}
      className="text-xs lg:text-sm my-0"
      html={html}
    >
      {/* Fallback for non-JS */}
      <pre className="leading-relaxed">{code}</pre>
    </CustomCodeBlock>
  );
}

export default function HomePage() {
  return (
    <HomeLayout
      nav={{
        title: (
          <BrandLogo />
        ),
      }}
      links={[
        {
          text: 'Documentation',
          url: '/docs',
          active: 'nested-url',
        },
        {
          text: 'Website',
          url: 'https://tekimax.com',
        },
        {
          text: 'GitHub',
          url: 'https://github.com/TEKIMAX/tekimax-ts',
        },
      ]}
    >
      <main className="flex flex-col min-h-screen bg-background text-foreground font-mono">

        {/* Bordered Layout Container */}
        <div className="border-x border-border max-w-7xl mx-auto w-full min-h-screen flex flex-col">

          {/* Hero Section - Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-border">

            {/* Left: Branding & Value Prop */}
            <div className="p-12 lg:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border">
              <div className="mb-8 inline-flex">
                <span className="inline-block border border-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  v0.1.9 Latest
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-8 leading-[0.9]">
                UNIVERSAL<br />
                <span className="bg-foreground text-orange-400">AI ADAPTER</span><br />
                <span className="bg-foreground text-blue-400">LAYER.</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-12 max-w-md leading-relaxed">
                <span className="font-mono text-orange-400 font-bold">[<span className="bg-foreground text-purple-400">TEKIMAX.</span><span className="bg-foreground text-red-400">SDK</span>]</span> End-to-end TypeScript support. Hardened supply chain. Zod schemas for runtime validation of every request/response.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/docs/core"
                  className="inline-flex h-14 items-center justify-center bg-foreground text-background px-8 text-base font-bold uppercase tracking-wide hover:bg-foreground/90 transition-colors"
                >
                  Read Docs -&gt;
                </Link>
                <a
                  href="https://github.com/TEKIMAX/tekimax-ts"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-14 items-center justify-center border border-border bg-background px-8 text-base font-bold uppercase tracking-wide hover:bg-muted transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Right: Technical Preview */}
            <div className="bg-muted/10 p-12 lg:p-24 flex flex-col justify-center relative overflow-hidden">
              {/* Background Blur/Glow */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
              {/* Install Command */}
              <div className="mb-12">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                   // INSTALLATION
                </p>
                <div className="flex items-center justify-between border border-border bg-background p-4">
                  <div className="font-mono text-sm">
                    <span className="text-green-600 mr-4">➜</span>
                    npm install tekimax-ts
                  </div>
                  <CopyButton text="npm install tekimax-ts" />
                </div>
              </div>

              {/* Code Snippet */}
              <div>
                <Code
                  title="USAGE_PREVIEW.TS"
                  lang="typescript"
                  code={`import { Tekimax } from 'tekimax-ts';
import { AnthropicProvider } from 'tekimax-anthropic';

const client = new Tekimax({
  provider: new AnthropicProvider({
    apiKey: process.env.ANTHROPIC_KEY
  })
});

const stream = await client.chat.completions.create({
  model: 'claude-3-5-sonnet-20240620',
  messages: [{ role: 'user', content: 'Hello' }],
  stream: true
});`}
                />
              </div>
            </div>
          </div>


          {/* Features Grid - Brutalist grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x border-border divide-border border-b">
            {FEATURES.map((feature, i) => (
              <div key={i} className="p-8 group hover:bg-muted/30 transition-colors">
                <feature.icon className="w-8 h-8 mb-6 stroke-1" />
                <h3 className="font-bold uppercase tracking-wide mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Sponsor Section */}
          <div className="border-b border-border p-12 lg:p-24 text-center bg-muted/5">
            <h2 className="text-3xl font-bold uppercase tracking-tighter mb-6">
              Support the Development
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Tekimax is open source and free to use. If you find it valuable for your startup or enterprise, considering becoming a sponsor to ensure long-term sustainability.
            </p>
            <a
              href="https://github.com/sponsors/TEKIMAX"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center bg-pink-600 text-white px-8 text-sm font-bold uppercase tracking-wide hover:bg-pink-700 transition-colors rounded-none"
            >
              <Heart className="w-4 h-4 mr-2 fill-current" />
              Become a Sponsor
            </a>
          </div>

          {/* Footer Stinger */}
          <div className="p-8 text-center bg-foreground text-background">
            <p className="font-mono text-xs uppercase tracking-widest">
              Built by Tekimax • Type-Safe by Default
            </p>
          </div>

        </div>
      </main>
    </HomeLayout>
  );
}

const FEATURES = [
  {
    title: 'Universal API',
    description: 'One interface for all providers. Switch from OpenAI to Ollama with a single config change.',
    icon: Globe,
  },
  {
    title: 'Type Safety',
    description: 'End-to-end TypeScript support. Zod schemas for runtime validation of every request/response.',
    icon: Shield,
  },
  {
    title: 'Zero Latency',
    description: 'Lightweight adapter pattern with zero runtime overhead. Direct passthrough performance.',
    icon: Zap,
  },
  {
    title: 'Zero CVEs',
    description: 'Hardened supply chain. Built on Chainguard\'s secure Node.js runtime and continuously scanned by Trivy for zero vulnerabilities.',
    icon: Shield,
  },
];
