import { useState } from 'react';
import {
  LayoutGrid, Cpu, Workflow, Terminal, Sparkles, Puzzle, Server, Palette,
  Compass, Share2, Settings as SettingsIcon, Search, Zap, Moon, Sun, Folder,
  Pencil, ChevronDown, ChevronRight, Info, Lightbulb, Plus, Upload, UserPlus,
  Check, X, Github, ArrowRight, Code2, CircleDot, Package, Bot,
} from 'lucide-react';

/* ============================================================
   THEME TOKENS
   ============================================================ */

const THEMES = {
  dark: {
    mode: 'dark',
    appBg: 'bg-black',
    sidebarBg: 'bg-zinc-950',
    sidebarBorder: 'border-zinc-900',
    panel: 'bg-zinc-900/50',
    panelSolid: 'bg-zinc-900',
    border: 'border-zinc-800',
    text: 'text-white',
    textMuted: 'text-zinc-400',
    textFaint: 'text-zinc-500',
    hover: 'hover:bg-zinc-800/60',
    inputBg: 'bg-zinc-950',
    inputBorder: 'border-zinc-800',
    placeholder: 'placeholder-zinc-600',
    activeNavBg: 'bg-zinc-900/70',
    activeNavBorder: 'border-amber-500/50',
    kbd: 'bg-zinc-900 border-zinc-800 text-zinc-500',
  },
  light: {
    mode: 'light',
    appBg: 'bg-zinc-100',
    sidebarBg: 'bg-white',
    sidebarBorder: 'border-zinc-200',
    panel: 'bg-white',
    panelSolid: 'bg-white',
    border: 'border-zinc-200',
    text: 'text-zinc-900',
    textMuted: 'text-zinc-500',
    textFaint: 'text-zinc-400',
    hover: 'hover:bg-zinc-100',
    inputBg: 'bg-zinc-50',
    inputBorder: 'border-zinc-200',
    placeholder: 'placeholder-zinc-400',
    activeNavBg: 'bg-amber-50',
    activeNavBorder: 'border-amber-400',
    kbd: 'bg-zinc-100 border-zinc-300 text-zinc-500',
  },
};

/* ============================================================
   MOCK DATA — swap these arrays for real data from your own
   Claude Code project / API once you wire up a backend.
   ============================================================ */

const AGENTS = [
  { id: 'a1', name: 'App Store Optimizer', model: 'sonnet', skillsCount: 3,
    description: 'Expert app store marketing specialist focused on App Store Optimization (ASO), keyword research, and conversion rate optimization for iOS and Android listings.' },
  { id: 'a2', name: 'code-reviewer', model: 'sonnet', skillsCount: 4,
    description: 'Reviews pull requests and code changes for bugs, style issues, and security vulnerabilities before merge.' },
  { id: 'a3', name: 'Content Creator', model: 'sonnet', skillsCount: 0,
    description: 'Expert content strategist and creator for multi-platform campaigns. Develops editorial calendars, copy, and creative briefs.' },
  { id: 'a4', name: 'documentation-writer', model: 'sonnet', skillsCount: 2,
    description: 'Creates and maintains technical documentation, READMEs, and API docs.' },
];

const COMMANDS = [
  { id: 'c1', name: 'create-commit',
    description: 'Generates a conventional commit message from staged changes and creates the commit.' },
  { id: 'c2', name: 'create-pr-master',
    description: 'Opens a pull request against master with an auto-generated summary and linked issues.' },
];

const SKILLS = [
  { id: 's1', name: 'brainstorming', badge: { tone: 'plugin', label: 'plugin: superpowers' }, linked: true,
    description: 'You MUST use this before any creative work - creating features, building content, or solving open-ended problems.' },
  { id: 's2', name: 'context7-mcp', badge: { tone: 'mcp', label: 'mcp: context7' }, linked: false,
    description: 'This skill should be used when the user asks about libraries, frameworks, API references, or up-to-date documentation.' },
  { id: 's3', name: 'dispatching-parallel-agents', badge: { tone: 'plugin', label: 'plugin: superpowers' }, linked: true,
    description: 'Use when facing 2+ independent tasks that can be worked on without shared state or sequencing.' },
  { id: 's4', name: 'executing-plans', badge: { tone: 'plugin', label: 'plugin: superpowers' }, linked: true,
    description: 'Use when you have a written implementation plan to execute in a separate context window.' },
  { id: 's5', name: 'explaining-code', badge: null, linked: false,
    description: 'Explains code with visual diagrams and analogies. Use when explaining how code works, teaching a concept, or onboarding a teammate.' },
  { id: 's6', name: 'finishing-a-development-branch', badge: { tone: 'plugin', label: 'plugin: superpowers' }, linked: true,
    description: 'Use when implementation is complete, all tests pass, and you need to decide how to land the branch.' },
  { id: 's7', name: 'frontend-design', badge: { tone: 'plugin', label: 'plugin: frontend-design' }, linked: true,
    description: 'Create distinctive, production-grade frontend interfaces with high design standards.' },
  { id: 's8', name: 'receiving-code-review', badge: { tone: 'plugin', label: 'plugin: superpowers' }, linked: true,
    description: 'Use when receiving code review feedback, before implementing suggestions verbatim.' },
  { id: 's9', name: 'requesting-code-review', badge: { tone: 'plugin', label: 'plugin: superpowers' }, linked: true,
    description: 'Use when completing tasks, implementing major features, or before merging to a shared branch.' },
  { id: 's10', name: 'skill-creator', badge: null, linked: false,
    description: 'Guide for creating effective skills. Use this when you want to create a new skill or improve an existing one.' },
  { id: 's11', name: 'spark-visualization-design-spec', badge: null, linked: true,
    description: 'Generate comprehensive design specifications for Apache Spark visualization components using familiar chart grammar.' },
  { id: 's12', name: 'subagent-driven-development', badge: { tone: 'plugin', label: 'plugin: superpowers' }, linked: true,
    description: 'Use when executing implementation plans with independent tasks in the codebase.' },
  { id: 's13', name: 'systematic-debugging', badge: { tone: 'plugin', label: 'plugin: superpowers' }, linked: true,
    description: 'Use when encountering any bug, test failure, or unexpected behavior, before reaching for a fix.' },
  { id: 's14', name: 'test-driven-development', badge: { tone: 'plugin', label: 'plugin: superpowers' }, linked: true,
    description: 'Use when implementing any feature or bugfix, before writing implementation code.' },
  { id: 's15', name: 'using-git-worktrees', badge: { tone: 'plugin', label: 'plugin: superpowers' }, linked: true,
    description: 'Use when starting feature work that needs isolation from the current workspace.' },
  { id: 's16', name: 'using-superpowers', badge: { tone: 'plugin', label: 'plugin: superpowers' }, linked: true,
    description: 'Use when starting any conversation - establishes how to find and use skills.' },
  { id: 's17', name: 'writing-changelogs', badge: { tone: 'plugin', label: 'plugin: superpowers' }, linked: true,
    description: 'Use when preparing a release - summarizes merged pull requests into a human-readable changelog.' },
  { id: 's18', name: 'api-documentation', badge: null, linked: true,
    description: 'Generates and maintains OpenAPI specs and reference docs directly from source code.' },
  { id: 's19', name: 'code-refactoring-patterns', badge: { tone: 'plugin', label: 'plugin: superpowers' }, linked: true,
    description: 'Use when cleaning up working code - applies safe, incremental refactoring patterns.' },
];

const PLUGINS = [
  { id: 'p1', name: 'superpowers', version: 'v2.4.0', skillsCount: 14, enabled: true,
    description: 'A curated collection of battle-tested skills for planning, TDD, debugging, and multi-agent orchestration.' },
  { id: 'p2', name: 'frontend-design', version: 'v1.1.0', skillsCount: 1, enabled: true,
    description: 'Design tokens and aesthetic guidelines for building distinctive, production-grade interfaces.' },
];

const MCP_SERVERS = [
  { id: 'm1', name: 'context7', status: 'connected',
    description: "Provides up-to-date library and framework documentation via Context7's live index." },
  { id: 'm2', name: 'github-mcp', status: 'connected',
    description: 'Reads and writes GitHub issues, pull requests, and repository content directly from Claude Code.' },
];

const WORKFLOWS = [
  { id: 'w1', name: 'Release Pipeline', steps: ['Run tests', 'Draft changelog', 'Open PR', 'Request review'],
    description: 'Runs the test suite, drafts a changelog, opens a pull request, and requests review - end to end.' },
];

const OUTPUT_STYLES = [
  { id: 'o1', name: 'Default', active: true, description: 'Balanced responses for everyday coding and planning work.' },
  { id: 'o2', name: 'Concise', active: false, description: 'Short, to-the-point answers with minimal preamble.' },
  { id: 'o3', name: 'Explanatory', active: false, description: 'Adds reasoning and context alongside every code change.' },
  { id: 'o4', name: 'Educational', active: false, description: 'Slower pace with definitions, analogies, and follow-up checks.' },
];

const INITIAL_SUGGESTIONS = [
  { id: 'sg1', text: 'Agent "Content Creator" mentions capabilities but has no linked skills.' },
  { id: 'sg2', text: 'Skill "context7-mcp" is not linked to any agent.' },
  { id: 'sg3', text: 'Skill "explaining-code" is not linked to any agent.' },
  { id: 'sg4', text: 'Skill "skill-creator" is not linked to any agent.' },
  { id: 'sg5', text: 'MCP server "github-mcp" is not linked to any agent.' },
];

/* ---- Explore tab data ---- */

function buildAgents(names, descFn) {
  return names.map((n, i) => ({
    id: `${n}-${i}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: n,
    selected: false,
    description: typeof descFn === 'function' ? descFn(n) : descFn,
  }));
}

const IMPORTED_AGENT_REPO = {
  owner: 'msitarzewski/agency-agents',
  totalFound: 163,
  importedCount: 2,
  date: 'Apr 2, 2026',
  sha: '4feb0cd',
};

const EXPLORE_CATEGORIES = [
  {
    key: 'academic', label: 'ACADEMIC', expanded: true,
    agents: [
      { id: 'anthropologist', name: 'Anthropologist', selected: false,
        description: 'Expert in cultural systems, rituals, kinship, belief systems, and social structures across human societies.' },
      { id: 'geographer', name: 'Geographer', selected: true,
        description: 'Expert in physical and human geography, climate systems, spatial analysis, and cartography.' },
      { id: 'historian', name: 'Historian', selected: true,
        description: 'Expert in historical analysis, periodization, material culture, and primary source interpretation.' },
      { id: 'narratologist', name: 'Narratologist', selected: false,
        description: 'Expert in narrative theory, story structure, character arcs, and literary analysis.' },
      { id: 'psychologist', name: 'Psychologist', selected: false,
        description: 'Expert in human behavior, personality theory, motivation, and cognitive processes.' },
    ],
  },
  {
    key: 'design', label: 'DESIGN', expanded: false,
    agents: buildAgents(
      ['UI Designer', 'UX Researcher', 'Brand Strategist', 'Motion Designer', 'Illustrator', 'Design Systems Architect', 'Accessibility Specialist', 'Visual Designer'],
      (n) => `Specialist in ${n.toLowerCase()} practices, from discovery through production-ready delivery.`
    ),
  },
  {
    key: 'engineering', label: 'ENGINEERING', expanded: false,
    agents: buildAgents(
      ['Backend Engineer', 'Frontend Engineer', 'Full-Stack Engineer', 'DevOps Engineer', 'Site Reliability Engineer', 'Data Engineer', 'ML Engineer', 'Security Engineer', 'QA Engineer', 'Mobile Engineer (iOS)', 'Mobile Engineer (Android)', 'Cloud Architect', 'Database Administrator', 'Systems Programmer', 'Embedded Systems Engineer', 'Network Engineer', 'API Engineer', 'Performance Engineer', 'Build Engineer', 'Release Engineer', 'Platform Engineer', 'Infrastructure Engineer', 'Blockchain Engineer', 'Compiler Engineer', 'Distributed Systems Engineer', 'Technical Lead'],
      (n) => `Focused on production-grade ${n.toLowerCase()} work, from design through deployment.`
    ),
  },
  {
    key: 'game-dev', label: 'GAME-DEVELOPMENT', expanded: false,
    agents: buildAgents(
      ['Game Designer', 'Level Designer', 'Technical Artist', 'Gameplay Programmer', 'Game Producer'],
      (n) => `Expert ${n.toLowerCase()} for cross-platform game production.`
    ),
  },
  {
    key: 'game-dev-blender', label: 'GAME-DEVELOPMENT/BLENDER', expanded: true,
    agents: [
      { id: 'blender-addon-engineer', name: 'Blender Add-on Engineer', selected: false,
        description: 'Blender tooling specialist - builds Python add-ons, asset validators, and pipeline scripts.' },
    ],
  },
  {
    key: 'game-dev-godot', label: 'GAME-DEVELOPMENT/GODOT', expanded: false,
    agents: buildAgents(['Godot Gameplay Programmer', 'Godot Shader Artist', 'Godot Plugin Developer'], (n) => `${n} for Godot-based projects.`),
  },
  {
    key: 'game-dev-roblox', label: 'GAME-DEVELOPMENT/ROBLOX-STUDIO', expanded: false,
    agents: buildAgents(['Roblox Lua Scripter', 'Roblox UI Builder', 'Roblox Monetization Designer'], (n) => `${n} for Roblox Studio experiences.`),
  },
  {
    key: 'game-dev-unity', label: 'GAME-DEVELOPMENT/UNITY', expanded: false,
    agents: buildAgents(['Unity Gameplay Programmer', 'Unity Shader Developer', 'Unity Editor Tools Engineer', 'Unity Performance Optimizer'], (n) => `${n} for Unity projects.`),
  },
  {
    key: 'game-dev-unreal', label: 'GAME-DEVELOPMENT/UNREAL-ENGINE', expanded: false,
    agents: buildAgents(['Unreal Blueprint Developer', 'Unreal C++ Gameplay Engineer', 'Unreal Materials Artist', 'Unreal Networking Engineer'], (n) => `${n} for Unreal Engine projects.`),
  },
];

const TEMPLATES = [
  { id: 't1', name: 'Code Reviewer', description: 'Reviews diffs for bugs, style, and security issues before merge.' },
  { id: 't2', name: 'Technical Writer', description: 'Drafts and maintains docs, READMEs, and API references.' },
  { id: 't3', name: 'Data Analyst', description: 'Explores datasets, builds queries, and summarizes findings.' },
  { id: 't4', name: 'SEO Specialist', description: 'Keyword research, on-page audits, and content briefs.' },
  { id: 't5', name: 'QA Engineer', description: 'Writes test plans and automates regression coverage.' },
  { id: 't6', name: 'DevOps Engineer', description: 'CI/CD pipelines, infra as code, and release automation.' },
  { id: 't7', name: 'UX Researcher', description: 'Plans studies and turns findings into design recommendations.' },
  { id: 't8', name: 'Product Manager', description: 'Prioritizes roadmaps and writes specs from user needs.' },
  { id: 't9', name: 'Security Auditor', description: 'Threat models and reviews code for vulnerabilities.' },
  { id: 't10', name: 'API Designer', description: 'Designs REST and RPC contracts with clear versioning.' },
  { id: 't11', name: 'Customer Support Agent', description: 'Drafts responses and triages incoming tickets.' },
  { id: 't12', name: 'Marketing Strategist', description: 'Plans campaigns and writes channel-specific copy.' },
  { id: 't13', name: 'Onboarding Guide', description: 'Walks new teammates through setup and conventions.' },
];

const MARKETPLACE_ITEMS = [
  { id: 'mk1', name: 'Superpowers Plugin Pack', author: 'community',
    description: '14 battle-tested skills for planning, TDD, code review, and parallel agent workflows.' },
  { id: 'mk2', name: 'Frontend Design Toolkit', author: 'community',
    description: 'Design tokens, component patterns, and aesthetic guidelines for production UI.' },
];

const IMPORTED_SKILLS_REPO = {
  owner: 'anthropics/skills-pack',
  totalFound: 8,
  importedCount: 1,
  date: 'Jun 14, 2026',
  sha: '9a21ff0',
  skills: [
    { id: 'isk1', name: 'advanced-prompt-caching', selected: true,
      description: 'Optimizes prompt structure for maximum cache hit rate across multi-turn conversations.' },
  ],
};

/* ============================================================
   SHARED PRIMITIVES
   ============================================================ */

function Badge({ tone = 'plugin', children }) {
  const styles = {
    plugin: 'bg-zinc-800 text-amber-200/80',
    mcp: 'bg-indigo-500/10 text-indigo-300',
  };
  return (
    <span className={`font-mono text-xs px-2 py-0.5 rounded ${styles[tone] || styles.plugin} whitespace-nowrap`}>
      {children}
    </span>
  );
}

function ModelBadge({ model }) {
  const styles = {
    sonnet: 'bg-blue-500/10 text-blue-400',
    opus: 'bg-violet-500/10 text-violet-400',
    haiku: 'bg-orange-500/10 text-orange-400',
    unset: 'bg-zinc-500/10 text-zinc-400',
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${styles[model] || styles.unset}`}>
      {model}
    </span>
  );
}

const ICON_COLORS = ['blue', 'emerald', 'violet', 'amber', 'rose', 'cyan'];

function IconBox({ icon: Icon, colorIdx = 0, size = 'md' }) {
  const color = ICON_COLORS[colorIdx % ICON_COLORS.length];
  const pad = size === 'sm' ? 'p-2' : 'p-2.5';
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return (
    <div className={`shrink-0 rounded-lg bg-${color}-500/10 ${pad}`}>
      <Icon className={`${iconSize} text-${color}-400`} />
    </div>
  );
}

function SearchInput({ T, value, onChange, placeholder }) {
  return (
    <div className={`flex items-center gap-2 rounded-lg border ${T.inputBorder} ${T.inputBg} px-3.5 py-2.5`}>
      <Search className={`w-4 h-4 shrink-0 ${T.textFaint}`} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`bg-transparent outline-none w-full text-sm ${T.text} ${T.placeholder}`}
      />
    </div>
  );
}

function Btn({ variant = 'outline', T, icon: Icon, onClick, children, className = '' }) {
  const base = 'inline-flex items-center gap-2 text-sm font-medium px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap';
  const variants = {
    primary: 'bg-teal-400 hover:bg-teal-300 text-zinc-950',
    outline: `border ${T.border} ${T.textMuted} hover:${T.text} ${T.hover}`,
    ghost: `${T.textMuted} hover:${T.text} ${T.hover}`,
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant] || variants.outline} ${className}`}>
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-9 h-5 rounded-full transition-colors ${checked ? 'bg-teal-400' : 'bg-zinc-700'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

function Panel({ T, className = '', children }) {
  return <div className={`rounded-xl border ${T.border} ${T.panel} ${className}`}>{children}</div>;
}

function PageHeader({ T, title, count, actions }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
      <div className="flex items-baseline gap-3">
        <h1 className={`text-4xl font-extrabold tracking-tight ${T.text}`}>{title}</h1>
        {count != null && <span className={`text-lg font-medium ${T.textFaint}`}>{count}</span>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  );
}

/* ============================================================
   GENERIC RESOURCE LIST PAGE
   ============================================================ */

function SimpleListPage({
  T, icon, title, count, description, items, searchPlaceholder,
  renderBadge, renderMeta, actions, emptyLabel = 'No results found.',
}) {
  const [q, setQ] = useState('');
  const filtered = items.filter((it) => {
    const hay = `${it.name} ${it.description || ''}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <PageHeader T={T} title={title} count={count} actions={actions} />
      {description && <p className={`${T.textMuted} mb-5 max-w-3xl`}>{description}</p>}
      <SearchInput T={T} value={q} onChange={setQ} placeholder={searchPlaceholder || `Search ${title.toLowerCase()}...`} />
      <Panel T={T} className="mt-5 overflow-hidden">
        {filtered.length === 0 && (
          <div className={`p-8 text-center text-sm ${T.textFaint}`}>{emptyLabel}</div>
        )}
        <div className={`divide-y ${T.border}`}>
          {filtered.map((item, idx) => (
            <div key={item.id} className={`flex items-center gap-4 p-4 ${T.hover} transition-colors`}>
              <IconBox icon={icon} colorIdx={idx} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`font-semibold ${T.text}`}>{item.name}</span>
                  {renderBadge && renderBadge(item)}
                </div>
                {item.description && (
                  <p className={`text-sm ${T.textMuted} truncate`}>{item.description}</p>
                )}
              </div>
              {renderMeta && <div className="shrink-0">{renderMeta(item)}</div>}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function SkillsPage({ T }) {
  return (
    <SimpleListPage
      T={T}
      icon={Sparkles}
      title="Skills"
      count={SKILLS.length}
      description="Specific capabilities that can be added to agents and invoked as slash commands."
      items={SKILLS}
      searchPlaceholder="Search skills..."
      renderBadge={(item) => item.badge && <Badge tone={item.badge.tone}>{item.badge.label}</Badge>}
      actions={
        <>
          <Btn T={T} variant="outline" icon={Upload}>Import</Btn>
          <Btn T={T} variant="primary" icon={Plus}>New Skill</Btn>
        </>
      }
    />
  );
}

function CommandsPage({ T }) {
  return (
    <SimpleListPage
      T={T}
      icon={Terminal}
      title="Commands"
      count={COMMANDS.length}
      description="Slash commands available to every agent in this project."
      items={COMMANDS.map((c) => ({ ...c, name: `/${c.name}` }))}
      searchPlaceholder="Search commands..."
      actions={<Btn T={T} variant="primary" icon={Plus}>New Command</Btn>}
    />
  );
}

function AgentsPage({ T }) {
  return (
    <SimpleListPage
      T={T}
      icon={Cpu}
      title="Agents"
      count={AGENTS.length}
      description="Specialized subagents Claude Code can delegate tasks to."
      items={AGENTS}
      searchPlaceholder="Search agents..."
      renderMeta={(item) => <ModelBadge model={item.model} />}
      actions={<Btn T={T} variant="primary" icon={Plus}>New Agent</Btn>}
    />
  );
}

function PluginsPage({ T }) {
  const [plugins, setPlugins] = useState(PLUGINS);
  const toggle = (id) => setPlugins((all) => all.map((x) => (x.id === id ? { ...x, enabled: !x.enabled } : x)));
  return (
    <SimpleListPage
      T={T}
      icon={Puzzle}
      title="Plugins"
      count={plugins.length}
      description="Bundles of skills, agents, and commands installed as a single unit."
      items={plugins}
      searchPlaceholder="Search plugins..."
      renderBadge={(item) => <span className={`text-xs font-mono ${T.textFaint}`}>{item.version}</span>}
      renderMeta={(item) => <Toggle checked={item.enabled} onChange={() => toggle(item.id)} />}
    />
  );
}

function McpServersPage({ T }) {
  return (
    <SimpleListPage
      T={T}
      icon={Server}
      title="MCP Servers"
      count={MCP_SERVERS.length}
      description="Model Context Protocol servers connected to this project."
      items={MCP_SERVERS}
      searchPlaceholder="Search MCP servers..."
      renderMeta={(item) => (
        <span className="flex items-center gap-1.5 text-xs text-emerald-400 whitespace-nowrap">
          <CircleDot className="w-3 h-3" /> {item.status === 'connected' ? 'Connected' : 'Disconnected'}
        </span>
      )}
      actions={<Btn T={T} variant="primary" icon={Plus}>Add Server</Btn>}
    />
  );
}

/* ============================================================
   WORKFLOWS + OUTPUT STYLES
   ============================================================ */

function WorkflowsPage({ T }) {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <PageHeader T={T} title="Workflows" count={WORKFLOWS.length} actions={<Btn T={T} variant="primary" icon={Plus}>Create Workflow</Btn>} />
      <p className={`${T.textMuted} mb-6 max-w-3xl`}>Multi-step pipelines that chain agents, commands, and skills together.</p>
      <div className="space-y-4">
        {WORKFLOWS.map((w) => (
          <Panel T={T} key={w.id} className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <IconBox icon={Workflow} colorIdx={0} size="sm" />
              <h3 className={`font-semibold text-lg ${T.text}`}>{w.name}</h3>
            </div>
            <p className={`text-sm ${T.textMuted} mb-4`}>{w.description}</p>
            <div className="flex items-center flex-wrap gap-2">
              {w.steps.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <span className={`text-sm px-3 py-1.5 rounded-lg border ${T.border} ${T.panel} ${T.text}`}>{step}</span>
                  {i < w.steps.length - 1 && <ArrowRight className={`w-4 h-4 ${T.textFaint}`} />}
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

function OutputStylesPage({ T }) {
  const [styles, setStyles] = useState(OUTPUT_STYLES);
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <PageHeader T={T} title="Output Styles" actions={<Btn T={T} variant="primary" icon={Plus}>New Style</Btn>} />
      <p className={`${T.textMuted} mb-6 max-w-3xl`}>Controls how Claude Code formats and paces its responses in this project.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {styles.map((s) => (
          <button
            key={s.id}
            onClick={() => setStyles((all) => all.map((x) => ({ ...x, active: x.id === s.id })))}
            className={`text-left p-5 rounded-xl border transition-colors ${
              s.active ? `${T.activeNavBorder} ${T.activeNavBg}` : `${T.border} ${T.panel} ${T.hover}`
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <h3 className={`font-semibold ${T.text}`}>{s.name}</h3>
              {s.active && <Check className="w-4 h-4 text-amber-400" />}
            </div>
            <p className={`text-sm ${T.textMuted}`}>{s.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   DASHBOARD
   ============================================================ */

function StatCard({ T, icon: Icon, label, value }) {
  return (
    <Panel T={T} className="p-6">
      <div className={`flex items-center gap-2 mb-4 text-sm ${T.textMuted}`}>
        <Icon className="w-4 h-4" />
        {label}
      </div>
      <div className={`text-5xl font-extrabold tracking-tight ${T.text}`}>{value}</div>
    </Panel>
  );
}

function ModelDistribution({ T }) {
  const counts = AGENTS.reduce((acc, a) => {
    acc[a.model] = (acc[a.model] || 0) + 1;
    return acc;
  }, {});
  const total = AGENTS.length || 1;
  const rows = [
    { key: 'opus', label: 'Opus', color: 'violet' },
    { key: 'sonnet', label: 'Sonnet', color: 'blue' },
    { key: 'haiku', label: 'Haiku', color: 'orange' },
    { key: 'unset', label: 'unset', color: 'zinc' },
  ].map((r) => ({ ...r, count: counts[r.key] || 0 }));

  return (
    <Panel T={T} className="p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className={`font-semibold text-lg ${T.text}`}>Model Distribution</h2>
        <span className={`text-sm ${T.textFaint}`}>{AGENTS.length} agents</span>
      </div>
      <div className={`w-full h-2.5 rounded-full overflow-hidden flex ${T.inputBg}`}>
        {rows.filter((r) => r.count > 0).map((r) => (
          <div key={r.key} className={`h-full bg-${r.color}-500`} style={{ width: `${(r.count / total) * 100}%` }} />
        ))}
      </div>
      <div className="flex items-center flex-wrap gap-6 mt-4">
        {rows.map((r) => (
          <div key={r.key} className="flex items-center gap-2 text-sm">
            <span className={`w-2 h-2 rounded-full bg-${r.color}-500`} />
            <span className={T.textMuted}>{r.label}</span>
            <span className={T.textFaint}>{r.count}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function DashboardAgentsPanel({ T, setPage }) {
  return (
    <Panel T={T} className="overflow-hidden">
      <div className="flex items-center justify-between p-5 pb-3">
        <div className="flex items-center gap-2">
          <Cpu className={`w-4 h-4 ${T.textMuted}`} />
          <h2 className={`font-semibold ${T.text}`}>Agents</h2>
        </div>
        <button onClick={() => setPage('agents')} className="text-sm text-amber-400 hover:text-amber-300">View all</button>
      </div>
      <div className={`divide-y ${T.border}`}>
        {AGENTS.map((a, i) => (
          <div key={a.id} className={`flex items-center gap-4 p-4 ${T.hover}`}>
            <IconBox icon={Cpu} colorIdx={i} size="sm" />
            <div className="min-w-0 flex-1">
              <span className={`font-semibold ${T.text}`}>{a.name}</span>
              <p className={`text-sm ${T.textMuted} truncate`}>{a.description}</p>
            </div>
            <ModelBadge model={a.model} />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function DashboardCommandsPanel({ T, setPage }) {
  return (
    <Panel T={T} className="overflow-hidden">
      <div className="flex items-center justify-between p-5 pb-3">
        <div className="flex items-center gap-2">
          <Terminal className={`w-4 h-4 ${T.textMuted}`} />
          <h2 className={`font-semibold ${T.text}`}>Commands</h2>
        </div>
        <button onClick={() => setPage('commands')} className="text-sm text-amber-400 hover:text-amber-300">View all</button>
      </div>
      <div className={`divide-y ${T.border}`}>
        {COMMANDS.map((c) => (
          <div key={c.id} className={`flex items-center gap-3 px-5 py-3 ${T.hover}`}>
            <Terminal className={`w-4 h-4 shrink-0 ${T.textFaint}`} />
            <span className={`text-sm font-mono ${T.text} truncate`}>/{c.name}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function QuickAction({ T, icon: Icon, color, title, subtitle, onClick }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 p-4 rounded-xl border ${T.border} ${T.panel} ${T.hover} text-left transition-colors`}>
      <div className={`p-2 rounded-lg bg-${color}-500/10`}>
        <Icon className={`w-4 h-4 text-${color}-400`} />
      </div>
      <div className="min-w-0">
        <div className={`font-medium text-sm ${T.text}`}>{title}</div>
        <div className={`text-xs ${T.textFaint}`}>{subtitle}</div>
      </div>
    </button>
  );
}

function SuggestionsPanel({ T }) {
  const [items, setItems] = useState(INITIAL_SUGGESTIONS);
  return (
    <Panel T={T} className="overflow-hidden">
      <div className="flex items-center justify-between p-5 pb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <h2 className={`font-semibold ${T.text}`}>Suggestions</h2>
        </div>
        <span className={`text-sm ${T.textFaint}`}>{items.length}</span>
      </div>
      <div className={`divide-y ${T.border}`}>
        {items.map((s) => (
          <div key={s.id} className={`flex items-center justify-between gap-3 px-5 py-3 group ${T.hover}`}>
            <div className="flex items-center gap-3 min-w-0">
              <Info className={`w-4 h-4 shrink-0 ${T.textFaint}`} />
              <span className={`text-sm ${T.textMuted}`}>{s.text}</span>
            </div>
            <button
              onClick={() => setItems((all) => all.filter((x) => x.id !== s.id))}
              className={`opacity-0 group-hover:opacity-100 transition-opacity ${T.textFaint} hover:text-red-400 shrink-0`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        {items.length === 0 && <div className={`p-5 text-sm ${T.textFaint}`}>All caught up - no suggestions right now.</div>}
      </div>
    </Panel>
  );
}

function Dashboard({ T, setPage }) {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className={`text-4xl font-extrabold tracking-tight mb-6 ${T.text}`}>Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard T={T} icon={Cpu} label="Agents" value={AGENTS.length} />
        <StatCard T={T} icon={Terminal} label="Commands" value={COMMANDS.length} />
        <StatCard T={T} icon={Sparkles} label="Skills" value={SKILLS.length} />
        <StatCard T={T} icon={Puzzle} label="Plugins" value={PLUGINS.length} />
      </div>
      <ModelDistribution T={T} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <DashboardAgentsPanel T={T} setPage={setPage} />
        </div>
        <div className="space-y-4">
          <DashboardCommandsPanel T={T} setPage={setPage} />
          <QuickAction T={T} icon={Share2} color="amber" title="Relationship Graph" subtitle="Visualize connections" onClick={() => setPage('graph')} />
          <QuickAction T={T} icon={Workflow} color="violet" title="Create Workflow" subtitle="Multi-step pipelines" onClick={() => setPage('workflows')} />
          <QuickAction T={T} icon={Compass} color="amber" title="Explore" subtitle="Templates & extensions" onClick={() => setPage('explore')} />
        </div>
      </div>
      <SuggestionsPanel T={T} />
    </div>
  );
}

/* ============================================================
   EXPLORE
   ============================================================ */

function RepoCard({ T, owner, totalFound, importedCount, date, sha, unitLabel, selectedCount, onSelectAll, onCancel }) {
  return (
    <Panel T={T} className="p-5 mb-6 border-l-4 border-l-amber-500 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`p-2.5 rounded-lg ${T.inputBg}`}>
          <Github className={`w-5 h-5 ${T.text}`} />
        </div>
        <div className="min-w-0">
          <div className={`font-semibold ${T.text}`}>{owner}</div>
          <div className={`text-sm ${T.textFaint} truncate`}>
            {totalFound} {unitLabel} found &middot; {importedCount} imported &middot; {date} &middot; SHA {sha}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <button onClick={onSelectAll} className={`text-sm ${T.textMuted} hover:${T.text}`}>Select all</button>
        <button onClick={onCancel} className={`text-sm ${T.textMuted} hover:${T.text}`}>Cancel</button>
        <Btn T={T} variant="primary">Save ({selectedCount})</Btn>
      </div>
    </Panel>
  );
}

function AgentImportCard({ T, agent, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`text-left p-4 rounded-xl border transition-colors ${
        agent.selected
          ? `border-l-4 border-l-amber-500 border-y border-r ${T.border} ${T.panel}`
          : `${T.border} ${T.panel} ${T.hover}`
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <h4 className={`font-semibold text-sm ${T.text}`}>{agent.name}</h4>
        {agent.selected && (
          <span className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 text-zinc-950" />
          </span>
        )}
      </div>
      <p className={`text-xs ${T.textMuted} line-clamp-2`}>{agent.description}</p>
    </button>
  );
}

function CategorySection({ T, cat, onToggleExpand, onToggleAgent }) {
  return (
    <div className="mb-1">
      <button
        onClick={onToggleExpand}
        className={`w-full flex items-center gap-2 py-2.5 text-xs font-semibold tracking-widest ${T.textFaint} hover:${T.textMuted}`}
      >
        {cat.expanded ? <ChevronDown className="w-3.5 h-3.5 shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
        <span className="whitespace-nowrap">{cat.label}</span>
        <span className={`flex-1 border-t ${T.border} ml-2`} />
        <span>{cat.agents.length}</span>
      </button>
      {cat.expanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pb-4">
          {cat.agents.map((agent) => (
            <AgentImportCard key={agent.id} T={T} agent={agent} onToggle={() => onToggleAgent(agent.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

function TemplatesTab({ T }) {
  const [added, setAdded] = useState(new Set());
  const toggle = (id) =>
    setAdded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {TEMPLATES.map((t, i) => (
        <Panel T={T} key={t.id} className="p-5 flex flex-col">
          <IconBox icon={Bot} colorIdx={i} size="sm" />
          <h3 className={`font-semibold mt-3 ${T.text}`}>{t.name}</h3>
          <p className={`text-sm ${T.textMuted} mt-1 mb-4 flex-1`}>{t.description}</p>
          <Btn
            T={T}
            variant={added.has(t.id) ? 'outline' : 'primary'}
            icon={added.has(t.id) ? Check : Plus}
            onClick={() => toggle(t.id)}
            className="justify-center"
          >
            {added.has(t.id) ? 'Added' : 'Use Template'}
          </Btn>
        </Panel>
      ))}
    </div>
  );
}

function MarketplaceTab({ T }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {MARKETPLACE_ITEMS.map((m, i) => (
        <Panel T={T} key={m.id} className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <IconBox icon={Package} colorIdx={i} size="sm" />
            <div className="min-w-0">
              <h3 className={`font-semibold ${T.text}`}>{m.name}</h3>
              <p className={`text-xs ${T.textFaint}`}>by {m.author}</p>
            </div>
          </div>
          <p className={`text-sm ${T.textMuted} mb-4`}>{m.description}</p>
          <Btn T={T} variant="primary" icon={Plus}>Install</Btn>
        </Panel>
      ))}
    </div>
  );
}

function ImportedAgentsTab({ T }) {
  const [categories, setCategories] = useState(EXPLORE_CATEGORIES);
  const [q, setQ] = useState('');

  const toggleExpand = (key) =>
    setCategories((all) => all.map((c) => (c.key === key ? { ...c, expanded: !c.expanded } : c)));

  const toggleAgent = (catKey, agentId) =>
    setCategories((all) =>
      all.map((c) =>
        c.key !== catKey ? c : { ...c, agents: c.agents.map((a) => (a.id === agentId ? { ...a, selected: !a.selected } : a)) }
      )
    );

  const selectAll = () => setCategories((all) => all.map((c) => ({ ...c, agents: c.agents.map((a) => ({ ...a, selected: true })) })));
  const cancelAll = () => setCategories((all) => all.map((c) => ({ ...c, agents: c.agents.map((a) => ({ ...a, selected: false })) })));

  const selectedCount = categories.reduce((sum, c) => sum + c.agents.filter((a) => a.selected).length, 0);

  const filteredCategories = q
    ? categories
        .map((c) => ({
          ...c,
          expanded: true,
          agents: c.agents.filter((a) => `${a.name} ${a.description}`.toLowerCase().includes(q.toLowerCase())),
        }))
        .filter((c) => c.agents.length > 0)
    : categories;

  return (
    <div>
      <SearchInput T={T} value={q} onChange={setQ} placeholder="Search imported agents..." />
      <div className="flex items-center justify-between mt-6 mb-3 gap-3 flex-wrap">
        <p className={T.textMuted}>Agents imported from GitHub repositories.</p>
        <Btn T={T} variant="primary" icon={Plus}>Import new Agent</Btn>
      </div>
      <RepoCard
        T={T}
        owner={IMPORTED_AGENT_REPO.owner}
        totalFound={IMPORTED_AGENT_REPO.totalFound}
        importedCount={IMPORTED_AGENT_REPO.importedCount}
        date={IMPORTED_AGENT_REPO.date}
        sha={IMPORTED_AGENT_REPO.sha}
        unitLabel="agents"
        selectedCount={selectedCount}
        onSelectAll={selectAll}
        onCancel={cancelAll}
      />
      {filteredCategories.map((cat) => (
        <CategorySection
          key={cat.key}
          T={T}
          cat={cat}
          onToggleExpand={() => toggleExpand(cat.key)}
          onToggleAgent={(agentId) => toggleAgent(cat.key, agentId)}
        />
      ))}
    </div>
  );
}

function ImportedSkillsTab({ T }) {
  const [repo, setRepo] = useState(IMPORTED_SKILLS_REPO);
  const toggle = (id) =>
    setRepo((r) => ({ ...r, skills: r.skills.map((s) => (s.id === id ? { ...s, selected: !s.selected } : s)) }));
  const selectAll = () => setRepo((r) => ({ ...r, skills: r.skills.map((s) => ({ ...s, selected: true })) }));
  const cancelAll = () => setRepo((r) => ({ ...r, skills: r.skills.map((s) => ({ ...s, selected: false })) }));
  const selectedCount = repo.skills.filter((s) => s.selected).length;
  return (
    <div>
      <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
        <p className={T.textMuted}>Skills imported from GitHub repositories.</p>
        <Btn T={T} variant="primary" icon={Plus}>Import new Skill</Btn>
      </div>
      <RepoCard
        T={T}
        owner={repo.owner}
        totalFound={repo.totalFound}
        importedCount={repo.importedCount}
        date={repo.date}
        sha={repo.sha}
        unitLabel="skills"
        selectedCount={selectedCount}
        onSelectAll={selectAll}
        onCancel={cancelAll}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {repo.skills.map((s) => (
          <AgentImportCard key={s.id} T={T} agent={s} onToggle={() => toggle(s.id)} />
        ))}
      </div>
    </div>
  );
}

const EXPLORE_TABS = [
  { key: 'templates', label: 'Templates' },
  { key: 'imported-agents', label: 'Imported Agents' },
  { key: 'imported-skills', label: 'Imported Skills' },
  { key: 'marketplace', label: 'Marketplace' },
];

function ExplorePage({ T }) {
  const [tab, setTab] = useState('imported-agents');

  const tabCount = {
    templates: TEMPLATES.length,
    'imported-agents': IMPORTED_AGENT_REPO.importedCount,
    'imported-skills': IMPORTED_SKILLS_REPO.importedCount,
    marketplace: MARKETPLACE_ITEMS.length,
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <PageHeader
        T={T}
        title="Explore"
        count={`${TEMPLATES.length} templates`}
        actions={
          <>
            <Btn T={T} variant="outline" icon={Upload}>Import Skills</Btn>
            <Btn T={T} variant="primary" icon={UserPlus}>Import Agent</Btn>
          </>
        }
      />
      <div className={`inline-flex items-center gap-1 p-1 rounded-lg border ${T.border} ${T.panel} mb-6 flex-wrap`}>
        {EXPLORE_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
              tab === t.key ? `${T.panelSolid} ${T.text}` : `${T.textMuted} hover:${T.text}`
            }`}
          >
            {t.label}
            {tabCount[t.key] != null ? ` (${tabCount[t.key]})` : ''}
          </button>
        ))}
      </div>

      {tab === 'templates' && <TemplatesTab T={T} />}
      {tab === 'imported-agents' && <ImportedAgentsTab T={T} />}
      {tab === 'imported-skills' && <ImportedSkillsTab T={T} />}
      {tab === 'marketplace' && <MarketplaceTab T={T} />}
    </div>
  );
}

/* ============================================================
   GRAPH + CLI
   ============================================================ */

function GraphPage({ T }) {
  const nodes = [
    { id: 'content-creator', label: 'Content Creator', x: 110, y: 70, color: 'blue' },
    { id: 'code-reviewer', label: 'code-reviewer', x: 110, y: 210, color: 'blue' },
    { id: 'doc-writer', label: 'documentation-writer', x: 110, y: 350, color: 'blue' },
    { id: 'tdd', label: 'test-driven-development', x: 420, y: 40, color: 'emerald' },
    { id: 'review-skill', label: 'requesting-code-review', x: 420, y: 130, color: 'emerald' },
    { id: 'debug', label: 'systematic-debugging', x: 420, y: 220, color: 'emerald' },
    { id: 'api-docs', label: 'api-documentation', x: 420, y: 310, color: 'emerald' },
    { id: 'context7', label: 'context7-mcp', x: 420, y: 400, color: 'indigo' },
    { id: 'create-commit', label: '/create-commit', x: 700, y: 140, color: 'amber' },
    { id: 'create-pr', label: '/create-pr-master', x: 700, y: 250, color: 'amber' },
  ];
  const links = [
    ['code-reviewer', 'review-skill'], ['code-reviewer', 'debug'], ['code-reviewer', 'tdd'],
    ['doc-writer', 'api-docs'], ['doc-writer', 'context7'],
    ['review-skill', 'create-pr'], ['tdd', 'create-commit'], ['debug', 'create-commit'],
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <PageHeader T={T} title="Relationship Graph" />
      <p className={`${T.textMuted} mb-6 max-w-2xl`}>How agents, skills, commands, and MCP servers reference each other.</p>
      <Panel T={T} className="p-4 overflow-x-auto">
        <svg viewBox="0 0 820 460" className="w-full" style={{ minWidth: 680 }}>
          {links.map(([a, b], i) => {
            const A = byId[a];
            const B = byId[b];
            return (
              <line
                key={i}
                x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                stroke="currentColor"
                className={T.textFaint}
                strokeWidth="1.5"
                opacity="0.5"
              />
            );
          })}
          {nodes.map((n) => (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r="8" className={`fill-${n.color}-500`} />
              <text x={n.x + 16} y={n.y + 4} className={`text-xs ${T.text}`} fill="currentColor">{n.label}</text>
            </g>
          ))}
        </svg>
      </Panel>
      <div className="flex items-center gap-6 mt-4 flex-wrap">
        {[['Agent', 'blue'], ['Skill', 'emerald'], ['MCP Server', 'indigo'], ['Command', 'amber']].map(([label, color]) => (
          <div key={label} className="flex items-center gap-2 text-sm">
            <span className={`w-2.5 h-2.5 rounded-full bg-${color}-500`} />
            <span className={T.textMuted}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CliPage({ T }) {
  const lines = [
    { prompt: true, text: 'claude' },
    { text: 'Welcome to Claude Code. Type /help for a list of commands.' },
    { prompt: true, text: '/agents' },
    { text: '4 agents available: App Store Optimizer, code-reviewer, Content Creator, documentation-writer' },
    { prompt: true, text: '/create-commit' },
    { text: 'Staged changes summarized. Commit created: "fix: correct pagination bug in agent list"' },
  ];
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <PageHeader T={T} title="CLI" />
      <p className={`${T.textMuted} mb-6`}>A quick look at what a Claude Code session looks like from the terminal.</p>
      <Panel T={T} className="p-0 overflow-hidden">
        <div className={`flex items-center gap-1.5 px-4 py-3 border-b ${T.border}`}>
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-amber-500/70" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
          <span className={`ml-3 text-xs font-mono ${T.textFaint}`}>~/.claude</span>
        </div>
        <div className="p-5 font-mono text-sm space-y-2 overflow-x-auto">
          {lines.map((l, i) => (
            <div key={i} className={l.prompt ? 'text-emerald-400' : T.textMuted}>
              {l.prompt ? `\u276F ${l.text}` : l.text}
            </div>
          ))}
          <div className="text-emerald-400">{'\u276F'} <span className="animate-pulse">&#9612;</span></div>
        </div>
      </Panel>
    </div>
  );
}

/* ============================================================
   SIDEBAR
   ============================================================ */

const NAV_MAIN = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutGrid, count: null },
  { key: 'agents', label: 'Agents', icon: Cpu, count: AGENTS.length },
  { key: 'workflows', label: 'Workflows', icon: Workflow, count: WORKFLOWS.length },
  { key: 'commands', label: 'Commands', icon: Terminal, count: COMMANDS.length },
  { key: 'skills', label: 'Skills', icon: Sparkles, count: SKILLS.length },
  { key: 'plugins', label: 'Plugins', icon: Puzzle, count: PLUGINS.length },
  { key: 'mcp', label: 'MCP Servers', icon: Server, count: MCP_SERVERS.length },
  { key: 'styles', label: 'Output Styles', icon: Palette, count: null },
];

const NAV_SECONDARY = [
  { key: 'explore', label: 'Explore', icon: Compass, count: null },
  { key: 'graph', label: 'Graph', icon: Share2, count: null },
  { key: 'cli', label: 'CLI', icon: Code2, count: null },
  { key: 'settings', label: 'Settings', icon: SettingsIcon, count: null },
];

function NavItem({ T, item, active, onClick }) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-sm transition-colors ${
        active ? `${T.activeNavBorder} ${T.activeNavBg} ${T.text}` : `border-transparent ${T.textMuted} ${T.hover}`
      }`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span className="flex-1 text-left font-medium truncate">{item.label}</span>
      {item.count != null && <span className={`text-xs ${T.textFaint}`}>{item.count}</span>}
    </button>
  );
}

function Sidebar({ T, page, setPage, theme, setTheme, projectDir, setProjectDir }) {
  const [editingDir, setEditingDir] = useState(false);
  const [dirDraft, setDirDraft] = useState(projectDir);

  const saveDir = () => {
    setProjectDir(dirDraft.trim() || projectDir);
    setEditingDir(false);
  };

  return (
    <aside className={`w-72 shrink-0 h-full flex flex-col border-r ${T.sidebarBorder} ${T.sidebarBg} p-4 overflow-y-auto`}>
      <div className="flex items-center gap-3 mb-6 px-1">
        <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center shrink-0">
          <Bot className="w-5 h-5 text-zinc-950" />
        </div>
        <div className="min-w-0">
          <div className={`font-bold leading-tight truncate ${T.text}`}>Agent Manager</div>
          <div className={`text-xs tracking-widest ${T.textFaint}`}>CLAUDE CODE</div>
        </div>
      </div>

      <nav className="space-y-1">
        {NAV_MAIN.map((item) => (
          <NavItem key={item.key} T={T} item={item} active={page === item.key} onClick={() => setPage(item.key)} />
        ))}
      </nav>

      <div className={`my-4 border-t ${T.border}`} />

      <nav className="space-y-1">
        {NAV_SECONDARY.map((item) => (
          <NavItem key={item.key} T={T} item={item} active={page === item.key} onClick={() => setPage(item.key)} />
        ))}
      </nav>

      <div className="flex-1 min-h-4" />

      <div className="space-y-1 pt-4">
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${T.inputBorder} ${T.inputBg}`}>
          <Search className={`w-4 h-4 shrink-0 ${T.textFaint}`} />
          <span className={`flex-1 text-sm ${T.textFaint}`}>Search</span>
          <kbd className={`text-xs px-1.5 py-0.5 rounded border ${T.kbd}`}>&#8984;K</kbd>
        </div>
        <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${T.textMuted} ${T.hover}`}>
          <Zap className="w-4 h-4 shrink-0" />
          <span className="flex-1 text-left font-medium">Claude</span>
          <kbd className={`text-xs px-1.5 py-0.5 rounded border ${T.kbd}`}>&#8984;J</kbd>
        </button>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${T.textMuted} ${T.hover}`}
        >
          {theme === 'dark' ? <Moon className="w-4 h-4 shrink-0" /> : <Sun className="w-4 h-4 shrink-0" />}
          <span className="flex-1 text-left font-medium">{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
        </button>
      </div>

      <div className={`mt-3 pt-3 border-t ${T.border}`}>
        <div className={`flex items-center gap-3 px-3 py-2 text-sm ${T.textMuted}`}>
          <Folder className="w-4 h-4 shrink-0" />
          <span className="flex-1 text-left font-medium truncate">Set project directory</span>
          <button onClick={() => { setDirDraft(projectDir); setEditingDir(true); }} className="shrink-0">
            <Pencil className={`w-3.5 h-3.5 ${T.textFaint}`} />
          </button>
        </div>
        {editingDir ? (
          <input
            autoFocus
            value={dirDraft}
            onChange={(e) => setDirDraft(e.target.value)}
            onBlur={saveDir}
            onKeyDown={(e) => { if (e.key === 'Enter') saveDir(); }}
            className={`w-full px-3 py-1 text-xs font-mono ${T.inputBg} ${T.text} outline-none border ${T.inputBorder} rounded`}
          />
        ) : (
          <div className={`px-3 text-xs font-mono truncate ${T.textFaint}`}>{projectDir}</div>
        )}
      </div>
    </aside>
  );
}

/* ============================================================
   SETTINGS
   ============================================================ */

function SettingsRow({ T, label, description, children }) {
  return (
    <div className={`flex items-center justify-between gap-6 py-4 border-b ${T.border} last:border-0`}>
      <div className="min-w-0">
        <div className={`font-medium text-sm ${T.text}`}>{label}</div>
        {description && <div className={`text-sm ${T.textFaint}`}>{description}</div>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function SettingsPage({ T, theme, setTheme, projectDir }) {
  const [autoSave, setAutoSave] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [defaultModel, setDefaultModel] = useState('sonnet');

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <PageHeader T={T} title="Settings" />
      <Panel T={T} className="p-5 mb-6">
        <h2 className={`font-semibold mb-1 ${T.text}`}>General</h2>
        <SettingsRow T={T} label="Theme" description="Switch between light and dark interface.">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`text-sm px-3 py-1.5 rounded-lg border ${T.border} ${T.textMuted} ${T.hover}`}
          >
            {theme === 'dark' ? 'Dark' : 'Light'}
          </button>
        </SettingsRow>
        <SettingsRow T={T} label="Default model" description="Used for new agents unless overridden.">
          <select
            value={defaultModel}
            onChange={(e) => setDefaultModel(e.target.value)}
            className={`text-sm px-3 py-1.5 rounded-lg border ${T.inputBorder} ${T.inputBg} ${T.text} outline-none`}
          >
            <option value="opus">Opus</option>
            <option value="sonnet">Sonnet</option>
            <option value="haiku">Haiku</option>
          </select>
        </SettingsRow>
        <SettingsRow T={T} label="Auto-save sessions" description="Persist session history to disk automatically.">
          <Toggle checked={autoSave} onChange={() => setAutoSave((v) => !v)} />
        </SettingsRow>
        <SettingsRow T={T} label="Desktop notifications" description="Notify when a long-running agent finishes.">
          <Toggle checked={notifications} onChange={() => setNotifications((v) => !v)} />
        </SettingsRow>
      </Panel>
      <Panel T={T} className="p-5">
        <h2 className={`font-semibold mb-1 ${T.text}`}>Project</h2>
        <SettingsRow T={T} label="Project directory" description="Where agents, skills, and commands are read from.">
          <span className={`text-sm font-mono ${T.textFaint}`}>{projectDir}</span>
        </SettingsRow>
      </Panel>
    </div>
  );
}

/* ============================================================
   ROOT APP
   ============================================================ */

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [theme, setTheme] = useState('dark');
  const [projectDir, setProjectDir] = useState('/Users/liamnguyen/.claude');
  const T = THEMES[theme];

  const PAGES = {
    dashboard: <Dashboard T={T} setPage={setPage} />,
    agents: <AgentsPage T={T} />,
    workflows: <WorkflowsPage T={T} />,
    commands: <CommandsPage T={T} />,
    skills: <SkillsPage T={T} />,
    plugins: <PluginsPage T={T} />,
    mcp: <McpServersPage T={T} />,
    styles: <OutputStylesPage T={T} />,
    explore: <ExplorePage T={T} />,
    graph: <GraphPage T={T} />,
    cli: <CliPage T={T} />,
    settings: <SettingsPage T={T} theme={theme} setTheme={setTheme} projectDir={projectDir} />,
  };

  return (
    <div className={`flex h-screen w-full ${T.appBg} overflow-hidden`}>
      <Sidebar T={T} page={page} setPage={setPage} theme={theme} setTheme={setTheme} projectDir={projectDir} setProjectDir={setProjectDir} />
      <main className="flex-1 overflow-y-auto">{PAGES[page]}</main>
    </div>
  );
}
