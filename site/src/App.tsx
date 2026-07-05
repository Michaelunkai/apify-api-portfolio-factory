import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Braces,
  Check,
  Clipboard,
  Database,
  GitBranch,
  Globe2,
  LineChart,
  Lock,
  Play,
  Rocket,
  ShieldCheck,
  Terminal,
} from 'lucide-react';

const actorRef = 'fluting_frostfield~url-intelligence-api';
const deployedUrl = 'https://apify-api-portfolio-factory.netlify.app';

const sampleOutput = {
  url: 'https://example.com',
  status: 'ok',
  httpStatus: 200,
  title: 'Example Domain',
  wordCount: 17,
  linkCount: 1,
  technologies: [],
};

const workflow = [
  ['Input', 'Send up to 100 public URLs with timeout and link limits.'],
  ['Analyze', 'Extract metadata, canonical URLs, text stats, emails, links, and technology hints.'],
  ['Return', 'Receive normalized dataset rows from a private Apify Actor run.'],
  ['Scale', 'Clone the same factory pattern into adjacent sellable API Actors.'],
];

const proofItems = [
  ['Permission test', 'Auth, Actor create/delete, and KV read/write/delete passed.'],
  ['Cloud build', 'Private Actor version 0.2 built successfully on Apify.'],
  ['Smoke test', 'Live run returned one valid dataset item for example.com.'],
];

export function App() {
  const [url, setUrl] = useState('https://example.com');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'curl' | 'json'>('curl');

  const command = useMemo(() => {
    const input = JSON.stringify({
      urls: [url],
      maxLinksPerUrl: 5,
      timeoutMs: 12000,
      includeTextSample: false,
    }, null, 2);

    if (mode === 'json') return input;

    return `curl -X POST "https://api.apify.com/v2/acts/${actorRef}/run-sync-get-dataset-items" \\\n  -H "Authorization: Bearer $APIFY_TOKEN" \\\n  -H "Content-Type: application/json" \\\n  -d '${input.replaceAll('\n', '')}'`;
  }, [mode, url]);

  async function copyCommand() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="URL Intelligence API home">
          <span className="brand-mark"><Braces size={22} /></span>
          <span>URL Intelligence API</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#product">Product</a>
          <a href="#output">Output</a>
          <a href="#deploy">Deploy</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <a className="header-action" href={`https://console.apify.com/actors/${actorRef}`} target="_blank" rel="noreferrer">
          Run on Apify
          <ArrowRight size={16} />
        </a>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <h1>Turn any public URL into clean API-ready intelligence.</h1>
          <p>
            Metadata, links, text statistics, contact hints, and technology signals from a private Apify Actor that is already live.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href={`https://console.apify.com/actors/${actorRef}`} target="_blank" rel="noreferrer">
              <Play size={18} />
              Run on Apify
            </a>
            <a className="secondary-action" href="#demo">
              View request
              <ArrowRight size={17} />
            </a>
          </div>
          <div className="status-strip" aria-label="Deployment status">
            <span><Check size={16} />Actor {actorRef}</span>
            <span><Check size={16} />Build succeeded</span>
            <span><Check size={16} />Smoke test passed</span>
          </div>
        </div>

        <div className="hero-panel" aria-label="Sample output">
          <div className="panel-topbar">
            <span>dataset-item.json</span>
            <span>live schema</span>
          </div>
          <pre>{JSON.stringify(sampleOutput, null, 2)}</pre>
        </div>
      </section>

      <section id="product" className="split-band">
        <div>
          <h2>A focused API Actor, not a generic scraper.</h2>
          <p>
            URL Intelligence API is built for lead enrichment, SEO triage, AI-agent preprocessing, and competitive research pipelines that need predictable rows instead of raw HTML.
          </p>
        </div>
        <div className="feature-list">
          <Feature icon={<Globe2 />} title="Public URL input" text="Validated HTTP and HTTPS URLs with conservative timeout controls." />
          <Feature icon={<Database />} title="Dataset-ready output" text="Stable fields for status, title, links, word counts, and technology hints." />
          <Feature icon={<ShieldCheck />} title="Private by default" text="Deploy, test, and price before exposing anything to the marketplace." />
        </div>
      </section>

      <section id="demo" className="demo-section">
        <div className="section-heading">
          <h2>Try the request shape before you run it.</h2>
          <p>Change the URL and copy either the cURL command or JSON body.</p>
        </div>
        <div className="demo-grid">
          <div className="request-builder">
            <label htmlFor="url">URL</label>
            <input id="url" value={url} onChange={(event) => setUrl(event.target.value)} />
            <div className="segmented" role="tablist" aria-label="Request format">
              <button className={mode === 'curl' ? 'active' : ''} onClick={() => setMode('curl')} type="button">cURL</button>
              <button className={mode === 'json' ? 'active' : ''} onClick={() => setMode('json')} type="button">JSON</button>
            </div>
            <button className="copy-button" onClick={copyCommand} type="button">
              <Clipboard size={17} />
              {copied ? 'Copied' : 'Copy request'}
            </button>
          </div>
          <pre className="command-block">{command}</pre>
        </div>
      </section>

      <section id="output" className="schema-section">
        <div className="section-heading">
          <h2>Output designed for downstream automation.</h2>
          <p>Every run returns normalized dataset items that can be consumed by agents, dashboards, enrichment jobs, and customer-facing APIs.</p>
        </div>
        <div className="schema-grid">
          {['url', 'status', 'httpStatus', 'title', 'description', 'canonicalUrl', 'wordCount', 'linkCount', 'emails', 'technologies', 'links', 'fetchedAt'].map((field) => (
            <span key={field}>{field}</span>
          ))}
        </div>
      </section>

      <section className="workflow-section">
        <div className="section-heading">
          <h2>The factory loop is ready to repeat.</h2>
          <p>One verified Actor becomes a reusable portfolio pattern for adjacent sellable APIs.</p>
        </div>
        <div className="timeline">
          {workflow.map(([title, text], index) => (
            <div className="timeline-item" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="deploy" className="proof-section">
        <div>
          <h2>Deployment proof is part of the product.</h2>
          <p>
            The Actor was built and tested through Apify’s API, and this public site is shipped through Netlify with the URL stored in the GitHub-facing project documentation.
          </p>
          <a className="secondary-action dark" href={deployedUrl}>
            <Rocket size={17} />
            Netlify deployment
          </a>
        </div>
        <div className="proof-list">
          {proofItems.map(([title, text]) => (
            <div className="proof-row" key={title}>
              <Check size={18} />
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="pricing-section">
        <div className="pricing-copy">
          <h2>Ready for marketplace packaging.</h2>
          <p>
            Start private, publish only after Apify account-owner payout and marketplace prompts are complete, then price the Actor as a narrow API utility with low support load.
          </p>
        </div>
        <div className="pricing-panel">
          <div><Lock size={18} /> Private testing</div>
          <div><LineChart size={18} /> Usage monitoring</div>
          <div><GitBranch size={18} /> Portfolio cloning</div>
          <div><Terminal size={18} /> CI deployment</div>
        </div>
      </section>

      <footer>
        <span>URL Intelligence API</span>
        <span>Actor: {actorRef}</span>
        <span>Netlify: {deployedUrl}</span>
      </footer>
    </main>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <article className="feature">
      <div className="feature-icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}
