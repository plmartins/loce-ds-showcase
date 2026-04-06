import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Select,
  Textarea,
  Checkbox,
  Switch,
  SearchInput,
  TimeInput,
  DatePicker,
  MultiSelect,
  ExpandableTextarea,
  ImageUpload,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  ConfigCard,
  Separator,
  ScrollFade,
  Tabs,
  Text,
  Badge,
  Avatar,
  StatusDot,
  ColorDot,
  LabelBadge,
  MetricCard,
  Timeline,
  DataTable,
  PaginationBar,
  TextCopy,
  SelectCard,
  ImageWithZoom,
  TextType,
  Skeleton,
  SkeletonText,
  SkeletonCard,
  EmptyState,
  TypingIndicator,
  Tooltip,
  ModalDelete,
  ModalConfirm,
  SheetEntity,
  DropdownActions,
  AIIcon,
  AIButton,
  AICard,
  SparklesText,
} from "loce-ds";
import {
  Sun,
  Moon,
  Mail,
  Phone,
  User,
  Settings,
  Bell,
  Heart,
  Star,
  Zap,
  Shield,
  Clock,
  Check,
  Trash2,
  Edit3,
  Copy,
  Download,
  Upload,
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Package,
  ShoppingCart,
  Calendar,
  FileText,
  Inbox,
  AlertCircle,
  Eye,
  Share2,
  Layers,
  Send,
  Palette,
  Store,
  Globe,
  MessageCircle,
} from "lucide-react";

// --- Color presets ---

const colorPresets = [
  { label: "Purple", value: "#ad46ff" },
  { label: "Blue", value: "#3b82f6" },
  { label: "Green", value: "#22c55e" },
  { label: "Orange", value: "#f97316" },
  { label: "Pink", value: "#ec4899" },
  { label: "Red", value: "#ef4444" },
  { label: "Teal", value: "#14b8a6" },
  { label: "Indigo", value: "#6366f1" },
];

function getInitialDark(): boolean {
  const stored = localStorage.getItem("loce-ds-dark");
  if (stored !== null) return stored === "true";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getInitialColor(): string {
  return localStorage.getItem("loce-ds-color") || "#ad46ff";
}

// --- Helpers ---

const sections = [
  { id: "forms", label: "Formularios" },
  { id: "layout", label: "Layout" },
  { id: "data", label: "Data Display" },
  { id: "feedback", label: "Feedback" },
  { id: "modals", label: "Modais" },
  { id: "ai", label: "AI" },
] as const;

function Section({
  id,
  title,
  count,
  children,
}: {
  id: string;
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-2xl font-bold text-dark dark:text-light">
          {title}
        </h2>
        <span className="px-2.5 py-0.5 rounded-xl bg-loce/10 text-loce text-xs font-bold">
          {count}
        </span>
      </div>
      <div className="flex flex-col gap-12">{children}</div>
    </section>
  );
}

function Demo({
  title,
  description,
  children,
  bare,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  bare?: boolean;
}) {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-base font-bold text-dark dark:text-light">
          {title}
        </h3>
        {description && (
          <p className="text-sm font-medium text-neutral-500 mt-0.5">
            {description}
          </p>
        )}
      </div>
      {bare ? (
        children
      ) : (
        <div className="rounded-2xl ring-1 ring-neutral-200 dark:ring-neutral-700 bg-white dark:bg-white/[0.02] p-6 overflow-hidden">
          {children}
        </div>
      )}
    </div>
  );
}

// --- Main App ---

export default function App() {
  const [dark, setDark] = useState(getInitialDark);
  const [brandColor, setBrandColor] = useState(getInitialColor);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  // Apply dark mode on mount and changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("loce-ds-dark", String(dark));
  }, [dark]);

  // Apply brand color
  useEffect(() => {
    document.documentElement.style.setProperty("--color-loce", brandColor);
    document.documentElement.style.setProperty("--color-loceSec", brandColor);
    localStorage.setItem("loce-ds-color", brandColor);
  }, [brandColor]);

  // Form states
  const [selectVal, setSelectVal] = useState("");
  const [textareaVal, setTextareaVal] = useState("");
  const [checkboxVal, setCheckboxVal] = useState(false);
  const [switchVal, setSwitchVal] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [dateVal, setDateVal] = useState<Date | undefined>();
  const [multiVal, setMultiVal] = useState<string[]>(["1"]);
  const [expandVal, setExpandVal] = useState(
    "Este texto pode ser expandido em um modal para editar com mais espaço."
  );
  const [imageVal, setImageVal] = useState("");

  // Layout states
  const [tabVal, setTabVal] = useState("geral");

  // Data states
  const [page, setPage] = useState(1);
  const [selectCardVal, setSelectCardVal] = useState("email");

  // Modal states
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const toggleDark = () => setDark((d) => !d);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-dm transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-9 rounded-2xl bg-loce text-white">
              <Layers size={18} />
            </div>
            <div>
              <span className="text-base font-bold text-dark dark:text-light">
                Loce DS
              </span>
              <span className="ml-2 text-xs font-semibold text-neutral-400">
                v0.2.4
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <nav className="hidden md:flex items-center gap-1 mr-4">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="px-3 py-1.5 text-sm font-semibold text-neutral-500 hover:text-dark dark:hover:text-light rounded-xl hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </nav>
            <div className="relative">
              <Button variant="ghost" size="icon" onClick={() => setColorPickerOpen((p) => !p)}>
                <Palette size={18} style={{ color: brandColor }} />
              </Button>
              {colorPickerOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setColorPickerOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 z-50 p-3 rounded-2xl shadow-lg ring-1 ring-neutral-200 dark:ring-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-3">
                    <span className="text-xs font-semibold text-neutral-500 px-1">Cor primaria</span>
                    <div className="flex gap-2">
                      {colorPresets.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => { setBrandColor(c.value); setColorPickerOpen(false); }}
                          className="size-7 rounded-full ring-2 ring-offset-2 ring-offset-white dark:ring-offset-neutral-900 transition-all active:scale-90 cursor-pointer"
                          style={{ background: c.value, ringColor: brandColor === c.value ? c.value : "transparent" }}
                          title={c.label}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={brandColor}
                        onChange={(e) => setBrandColor(e.target.value)}
                        className="size-7 rounded-lg cursor-pointer border-0 p-0"
                      />
                      <span className="text-xs font-semibold text-neutral-500">{brandColor}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={toggleDark}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-2xl">
          <Text variant="supertitle" as="h1">
            Loce Design System
          </Text>
          <Text variant="subtitle" className="mt-3 text-neutral-500">
            44 componentes React com Tailwind CSS v4. Plug and play, dark mode,
            whitelabel-ready.
          </Text>
          <div className="flex items-center gap-3 mt-6">
            <Badge variant="default">React 18+</Badge>
            <Badge variant="info">Tailwind v4</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="outline">Radix UI</Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 pb-24 flex flex-col gap-24">
        {/* ==================== FORMS ==================== */}
        <Section id="forms" title="Formularios" count={12}>
          {/* Button */}
          <Demo
            title="Button"
            description="7 variantes, 5 tamanhos, loading state"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="gradient">Gradient</Button>
                <Button variant="upgrade">Upgrade</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg">Large</Button>
                <Button size="default">Default</Button>
                <Button size="sm">Small</Button>
                <Button size="icon">
                  <Star size={16} />
                </Button>
                <Button size="icon-sm">
                  <Star size={14} />
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button loading>Salvando...</Button>
                <Button variant="secondary" disabled>
                  Disabled
                </Button>
                <Button variant="primary">
                  <Send size={16} />
                  Com icone
                </Button>
              </div>
            </div>
          </Demo>

          {/* Input */}
          <Demo
            title="Input"
            description="Label, hint, error, loading, labelAction"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <Input label="Nome" placeholder="Digite seu nome" />
              <Input
                label="Email"
                placeholder="seu@email.com"
                hint="Nunca compartilharemos seu email"
              />
              <Input
                label="Telefone"
                placeholder="(11) 99999-9999"
                error="Telefone invalido"
              />
              <Input label="Buscando..." placeholder="Aguarde..." loading />
              <Input
                label="Senha"
                type="password"
                placeholder="********"
                labelAction={{
                  label: "Esqueceu?",
                  onClick: () => {},
                }}
              />
            </div>
          </Demo>

          {/* Select */}
          <Demo
            title="Select"
            description="Custom dropdown com icones, descriptions, error"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <Select
                label="Cargo"
                placeholder="Selecione um cargo"
                value={selectVal}
                onChange={setSelectVal}
                options={[
                  {
                    value: "dev",
                    label: "Desenvolvedor",
                    icon: <Zap size={16} />,
                  },
                  {
                    value: "design",
                    label: "Designer",
                    icon: <Star size={16} />,
                  },
                  {
                    value: "pm",
                    label: "Product Manager",
                    icon: <Shield size={16} />,
                  },
                  {
                    value: "qa",
                    label: "QA Engineer",
                    icon: <Check size={16} />,
                    description: "Testes e qualidade",
                  },
                ]}
              />
              <Select
                label="Status"
                placeholder="Escolha..."
                error="Selecione um status"
                options={[
                  { value: "active", label: "Ativo" },
                  { value: "inactive", label: "Inativo" },
                ]}
              />
            </div>
          </Demo>

          {/* Textarea */}
          <Demo title="Textarea" description="Auto-resize, onSubmit com Enter">
            <div className="max-w-md">
              <Textarea
                label="Mensagem"
                placeholder="Escreva sua mensagem..."
                value={textareaVal}
                onChange={setTextareaVal}
              />
            </div>
          </Demo>

          {/* Checkbox */}
          <Demo title="Checkbox" description="Com label e description">
            <div className="flex flex-col gap-3">
              <Checkbox
                label="Aceito os termos de uso"
                checked={checkboxVal}
                onChange={(e) => setCheckboxVal(e.target.checked)}
              />
              <Checkbox
                label="Receber novidades"
                description="Enviaremos no maximo 1 email por semana"
              />
              <Checkbox label="Opcao desabilitada" disabled />
            </div>
          </Demo>

          {/* Switch */}
          <Demo title="Switch" description="Radix Switch com label">
            <div className="flex flex-col gap-3">
              <Switch
                label="Notificacoes"
                checked={switchVal}
                onCheckedChange={setSwitchVal}
              />
              <Switch
                label="Modo escuro"
                description="Alterna entre tema claro e escuro"
              />
            </div>
          </Demo>

          {/* SearchInput */}
          <Demo
            title="SearchInput"
            description="Input com icone de busca e clear"
          >
            <div className="max-w-sm">
              <SearchInput
                placeholder="Buscar componentes..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onClear={() => setSearchVal("")}
              />
            </div>
          </Demo>

          {/* TimeInput */}
          <Demo title="TimeInput" description='Input type="time" estilizado'>
            <div className="max-w-xs">
              <TimeInput label="Horario" />
            </div>
          </Demo>

          {/* DatePicker */}
          <Demo
            title="DatePicker"
            description="Calendar dropdown com clearable"
          >
            <div className="max-w-xs">
              <DatePicker
                label="Data"
                value={dateVal}
                onChange={setDateVal}
                placeholder="Selecione uma data"
                clearable
              />
            </div>
          </Demo>

          {/* MultiSelect */}
          <Demo
            title="MultiSelect"
            description="Multi-select com avatars e badges"
          >
            <div className="max-w-md">
              <MultiSelect
                label="Responsaveis"
                options={[
                  {
                    value: "1",
                    label: "Ana Silva",
                    image: "https://i.pravatar.cc/32?img=1",
                  },
                  {
                    value: "2",
                    label: "Pedro Santos",
                    image: "https://i.pravatar.cc/32?img=3",
                  },
                  {
                    value: "3",
                    label: "Maria Costa",
                    image: "https://i.pravatar.cc/32?img=5",
                  },
                  { value: "4", label: "Lucas Oliveira" },
                ]}
                value={multiVal}
                onChange={setMultiVal}
                addLabel="Adicionar responsavel"
              />
            </div>
          </Demo>

          {/* ExpandableTextarea */}
          <Demo
            title="ExpandableTextarea"
            description="Textarea que expande em modal para editar"
          >
            <div className="max-w-md">
              <ExpandableTextarea
                label="Descricao"
                value={expandVal}
                onChange={setExpandVal}
                maxLength={500}
                modalTitle="Editar descricao"
              />
            </div>
          </Demo>

          {/* ImageUpload */}
          <Demo
            title="ImageUpload"
            description="Upload com drag & drop e preview"
          >
            <div className="max-w-xs">
              <ImageUpload
                label="Avatar"
                value={imageVal}
                onChange={setImageVal}
                uploadFn={async (file: File) => ({
                  url: URL.createObjectURL(file),
                })}
                aspect="square"
              />
            </div>
          </Demo>
        </Section>

        {/* ==================== LAYOUT ==================== */}
        <Section id="layout" title="Layout" count={5}>
          {/* Card */}
          <Demo
            title="Card"
            description="Container com subcomponentes Header, Title, Description, Content, Footer"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Projeto Alpha</CardTitle>
                  <CardDescription>
                    Dashboard de vendas em tempo real
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold text-neutral-500">
                    12 membros ativos neste projeto com 3 sprints em andamento.
                  </p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="secondary" size="sm">
                    Detalhes
                  </Button>
                  <Button size="sm">Abrir</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Metricas do mes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-extrabold text-dark dark:text-light">
                    R$ 48.200
                  </div>
                  <p className="text-sm font-semibold text-emerald-500 mt-1">
                    +12.5% vs mes anterior
                  </p>
                </CardContent>
              </Card>
            </div>
          </Demo>

          {/* ConfigCard */}
          <Demo
            title="ConfigCard"
            description="Card de secao para paginas de configuracao — icon, title, description, children"
            bare
          >
            <div className="flex flex-col gap-4">
              <ConfigCard
                icon={Store}
                title="Identidade da loja"
                description="Informacoes basicas e imagens da sua marca"
              >
                <Input label="Nome do site" placeholder="Minha Loja" />
                <Input label="Descricao" placeholder="Uma breve descricao..." />
              </ConfigCard>
              <ConfigCard
                icon={MessageCircle}
                title="Conversas"
                description="Acoes automaticas durante as conversas"
              >
                <Switch label="Responder automaticamente" description="A IA responde mensagens sem intervencao humana" />
                <Switch label="Gerar sugestoes automaticas" description="Sugere respostas para voce aprovar antes de enviar" />
              </ConfigCard>
              <ConfigCard
                icon={Globe}
                title="SEO"
                description="Como sua loja aparece no Google"
              >
                <Input label="Titulo SEO" placeholder="Titulo da pagina" />
                <Textarea label="Meta descricao" placeholder="Descricao para mecanismos de busca..." />
              </ConfigCard>
            </div>
          </Demo>

          {/* Separator */}
          <Demo
            title="Separator"
            description="Horizontal e vertical, com label opcional"
          >
            <div className="flex flex-col gap-6">
              <Separator />
              <Separator label="ou" />
              <div className="flex items-center gap-4 h-8">
                <span className="text-sm font-semibold text-neutral-500">
                  Item A
                </span>
                <Separator orientation="vertical" />
                <span className="text-sm font-semibold text-neutral-500">
                  Item B
                </span>
                <Separator orientation="vertical" />
                <span className="text-sm font-semibold text-neutral-500">
                  Item C
                </span>
              </div>
            </div>
          </Demo>

          {/* ScrollFade */}
          <Demo
            title="ScrollFade"
            description="Container com fade no scroll (top/bottom/both)"
          >
            <div className="h-64 flex flex-col">
              <ScrollFade position="both" className="scrollbar-hide">
                <div className="flex flex-col gap-2 p-1">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.03] ring-1 ring-neutral-200/50 dark:ring-neutral-700/50"
                    >
                      <Avatar alt={`User ${i + 1}`} name={`Usuario ${i + 1}`} size={32} fallback="initials" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-dark dark:text-light">
                          Notificacao {i + 1}
                        </span>
                        <span className="block text-xs font-medium text-neutral-500 truncate">
                          Descricao do item da lista com scroll fade
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-neutral-400 shrink-0">{i + 1}m</span>
                    </div>
                  ))}
                </div>
              </ScrollFade>
            </div>
          </Demo>

          {/* Tabs */}
          <Demo title="Tabs" description="Com icones e contadores">
            <div className="flex flex-col gap-4">
              <Tabs
                tabs={[
                  { key: "geral", label: "Geral", icon: <Settings size={14} /> },
                  { key: "membros", label: "Membros", icon: <Users size={14} />, count: 8 },
                  { key: "config", label: "Configuracoes", icon: <Shield size={14} /> },
                ]}
                value={tabVal}
                onChange={setTabVal}
              />
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.02]">
                <Text variant="description">
                  Aba selecionada: <strong>{tabVal}</strong>
                </Text>
              </div>
            </div>
          </Demo>
        </Section>

        {/* ==================== DATA DISPLAY ==================== */}
        <Section id="data" title="Data Display" count={15}>
          {/* Text */}
          <Demo
            title="Text"
            description="8 variantes tipograficas com tag HTML configuravel"
          >
            <div className="flex flex-col gap-2">
              <Text variant="supertitle">Supertitle</Text>
              <Text variant="title">Title</Text>
              <Text variant="subtitle">Subtitle</Text>
              <Text variant="default">Default text</Text>
              <Text variant="description">Description text</Text>
              <Text variant="subdescription">Subdescription text</Text>
              <Text variant="label">Label text</Text>
              <Text variant="code">code_example</Text>
            </div>
          </Demo>

          {/* Badge */}
          <Demo title="Badge" description="7 variantes semanticas">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </Demo>

          {/* Avatar */}
          <Demo
            title="Avatar"
            description="Com imagem, fallback icon/initials, offline"
          >
            <div className="flex items-center gap-4">
              <Avatar
                src="https://i.pravatar.cc/80?img=1"
                alt="Ana"
                size={48}
              />
              <Avatar
                src="https://i.pravatar.cc/80?img=3"
                alt="Pedro"
                size={40}
              />
              <Avatar alt="Maria" name="Maria Costa" size={40} fallback="initials" />
              <Avatar alt="User" size={40} fallback="icon" />
              <Avatar
                src="https://i.pravatar.cc/80?img=5"
                alt="Offline"
                size={40}
                offline
              />
            </div>
          </Demo>

          {/* StatusDot */}
          <Demo title="StatusDot" description="4 status com pulse e tamanhos">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <StatusDot status="online" pulse />
                <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                  Online
                </span>
              </div>
              <div className="flex items-center gap-2">
                <StatusDot status="away" />
                <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                  Away
                </span>
              </div>
              <div className="flex items-center gap-2">
                <StatusDot status="busy" />
                <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                  Busy
                </span>
              </div>
              <div className="flex items-center gap-2">
                <StatusDot status="offline" />
                <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                  Offline
                </span>
              </div>
            </div>
          </Demo>

          {/* ColorDot */}
          <Demo title="ColorDot" description="Dot com cor e label">
            <div className="flex items-center gap-4">
              <ColorDot color="#ad46ff" label="Loce" />
              <ColorDot color="#22c55e" label="Success" />
              <ColorDot color="#ef4444" label="Error" />
              <ColorDot color="#f59e0b" label="Warning" />
              <ColorDot color="#3b82f6" label="Info" />
            </div>
          </Demo>

          {/* LabelBadge */}
          <Demo title="LabelBadge" description="Badge colorido com remove">
            <div className="flex flex-wrap items-center gap-2">
              <LabelBadge name="Frontend" color="#ad46ff" />
              <LabelBadge name="Backend" color="#3b82f6" />
              <LabelBadge name="Urgente" color="#ef4444" onRemove={() => {}} />
              <LabelBadge
                name="Em progresso"
                color="#f59e0b"
                onRemove={() => {}}
              />
              <LabelBadge name="Small" color="#22c55e" size="sm" />
            </div>
          </Demo>

          {/* MetricCard */}
          <Demo
            title="MetricCard"
            description="Cards de metrica com trend, progress, accent"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="RECEITA"
                value="R$ 48.2k"
                icon={DollarSign}
                trend={{ value: "12.5%", positive: true }}
                accent="green"
              />
              <MetricCard
                title="CLIENTES"
                value="1.284"
                icon={Users}
                trend={{ value: "3.2%", positive: true }}
                accent="purple"
              />
              <MetricCard
                title="PEDIDOS"
                value="342"
                icon={ShoppingCart}
                progress={{ value: 72 }}
                description="72% da meta"
                accent="blue"
              />
              <MetricCard
                title="CHURN"
                value="2.4%"
                icon={TrendingUp}
                trend={{ value: "0.8%", positive: false }}
                accent="red"
              />
            </div>
          </Demo>

          {/* Timeline */}
          <Demo
            title="Timeline"
            description="Lista cronologica com icones e cores"
          >
            <div className="max-w-md">
              <Timeline
                items={[
                  {
                    icon: <Check size={14} />,
                    title: "Pedido confirmado",
                    description: "Pagamento aprovado via PIX",
                    time: "10:30",
                    color:
                      "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600",
                  },
                  {
                    icon: <Package size={14} />,
                    title: "Em separacao",
                    description: "Produto sendo preparado",
                    time: "11:45",
                    color: "bg-blue-100 dark:bg-blue-500/10 text-blue-600",
                  },
                  {
                    icon: <Send size={14} />,
                    title: "Enviado",
                    description: "Transportadora coletou o pacote",
                    time: "14:00",
                    color:
                      "bg-violet-100 dark:bg-violet-500/10 text-violet-600",
                  },
                  {
                    icon: <Clock size={14} />,
                    title: "Em transito",
                    time: "Agora",
                  },
                ]}
              />
            </div>
          </Demo>

          {/* DataTable */}
          <Demo
            title="DataTable"
            description="Tabela com sort, mobile cards, actions"
            bare
          >
            <DataTable
              columns={[
                { header: "Nome", accessor: "name" },
                { header: "Email", accessor: "email" },
                { header: "Cargo", accessor: "role" },
                {
                  header: "Status",
                  accessor: "status",
                  render: (val: string) => (
                    <Badge
                      variant={val === "Ativo" ? "success" : "secondary"}
                    >
                      {val}
                    </Badge>
                  ),
                },
              ]}
              data={[
                {
                  name: "Ana Silva",
                  email: "ana@loce.com",
                  role: "Designer",
                  status: "Ativo",
                },
                {
                  name: "Pedro Santos",
                  email: "pedro@loce.com",
                  role: "Dev",
                  status: "Ativo",
                },
                {
                  name: "Maria Costa",
                  email: "maria@loce.com",
                  role: "PM",
                  status: "Inativo",
                },
              ]}
              actions={[
                {
                  label: "Editar",
                  icon: <Edit3 size={14} />,
                  onClick: () => {},
                },
                {
                  label: "Excluir",
                  icon: <Trash2 size={14} />,
                  onClick: () => {},
                  color: "text-red-500",
                },
              ]}
              mainActions={[
                {
                  label: "Ver",
                  icon: <Eye size={14} />,
                  onClick: () => {},
                },
              ]}
            />
          </Demo>

          {/* PaginationBar */}
          <Demo title="PaginationBar" description="Navegacao de paginas" bare>
            <PaginationBar
              page={page}
              totalPages={10}
              total={97}
              onPageChange={setPage}
            />
          </Demo>

          {/* TextCopy */}
          <Demo
            title="TextCopy"
            description="Texto clicavel com copy to clipboard"
          >
            <div className="flex flex-col gap-2">
              <TextCopy text="npm install loce-ds" variant="code" />
              <TextCopy text="sk-abc123def456ghi789" />
            </div>
          </Demo>

          {/* SelectCard */}
          <Demo title="SelectCard" description="Cards selecionaveis com icones">
            <SelectCard
              value={selectCardVal}
              onChange={setSelectCardVal}
              columns={3}
              options={[
                {
                  value: "email",
                  label: "Email",
                  description: "Notificacao por email",
                  icon: <Mail size={20} />,
                },
                {
                  value: "sms",
                  label: "SMS",
                  description: "Mensagem de texto",
                  icon: <Phone size={20} />,
                },
                {
                  value: "push",
                  label: "Push",
                  description: "Notificacao no app",
                  icon: <Bell size={20} />,
                },
              ]}
            />
          </Demo>

          {/* ImageWithZoom */}
          <Demo
            title="ImageWithZoom"
            description="Imagem com zoom modal ao clicar"
          >
            <div className="flex gap-4">
              <ImageWithZoom
                src="https://picsum.photos/seed/loce1/400/300"
                width={200}
                height={150}
              />
              <ImageWithZoom
                src="https://picsum.photos/seed/loce2/400/300"
                width={200}
                height={150}
              />
            </div>
          </Demo>

          {/* TextType */}
          <Demo
            title="TextType"
            description="Efeito de digitacao com loop e cores"
          >
            <div className="flex flex-col gap-4">
              <Text variant="title" as="div">
                <TextType
                  text={[
                    "Crie interfaces incriveis",
                    "Componentes reutilizaveis",
                    "Design system completo",
                  ]}
                  typingSpeed={60}
                  loop
                />
              </Text>
            </div>
          </Demo>
        </Section>

        {/* ==================== FEEDBACK ==================== */}
        <Section id="feedback" title="Feedback" count={4}>
          {/* Skeleton */}
          <Demo
            title="Skeleton / SkeletonText / SkeletonCard"
            description="Loading placeholders"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-3">
                <Text variant="label">Skeleton</Text>
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-8 w-3/4 rounded-xl" />
                <Skeleton className="h-8 w-1/2 rounded-xl" />
              </div>
              <div className="flex flex-col gap-3">
                <Text variant="label">SkeletonText</Text>
                <SkeletonText />
              </div>
              <div className="flex flex-col gap-3">
                <Text variant="label">SkeletonCard</Text>
                <SkeletonCard />
              </div>
            </div>
          </Demo>

          {/* EmptyState */}
          <Demo
            title="EmptyState"
            description="3 variantes: default, minimal, horizontal"
          >
            <div className="flex flex-col gap-8">
              <EmptyState
                variant="horizontal"
                icon={Inbox}
                text="Nenhum projeto encontrado"
                description="Crie seu primeiro projeto para comecar"
                action={<Button size="sm">Criar projeto</Button>}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EmptyState
                  variant="minimal"
                  icon={FileText}
                  text="Sem documentos"
                  description="Adicione um documento"
                />
                <EmptyState
                  variant="minimal"
                  icon={Search}
                  text="Nenhum resultado"
                  muted
                />
              </div>
            </div>
          </Demo>

          {/* TypingIndicator */}
          <Demo title="TypingIndicator" description="3 pontos animados">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <TypingIndicator />
                <Text variant="description">Default</Text>
              </div>
              <div className="flex items-center gap-2">
                <TypingIndicator size="sm" />
                <Text variant="description">Small</Text>
              </div>
            </div>
          </Demo>

          {/* Tooltip */}
          <Demo
            title="Tooltip"
            description="4 posicoes: top, right, bottom, left"
          >
            <div className="flex items-center gap-6 py-4 justify-center">
              <Tooltip content="Tooltip no topo" position="top">
                <Button variant="secondary" size="sm">
                  Top
                </Button>
              </Tooltip>
              <Tooltip content="Tooltip na direita" position="right">
                <Button variant="secondary" size="sm">
                  Right
                </Button>
              </Tooltip>
              <Tooltip content="Tooltip embaixo" position="bottom">
                <Button variant="secondary" size="sm">
                  Bottom
                </Button>
              </Tooltip>
              <Tooltip content="Tooltip na esquerda" position="left">
                <Button variant="secondary" size="sm">
                  Left
                </Button>
              </Tooltip>
            </div>
          </Demo>
        </Section>

        {/* ==================== MODALS ==================== */}
        <Section id="modals" title="Modais & Overlays" count={4}>
          {/* ModalDelete */}
          <Demo
            title="ModalDelete"
            description="3 modos: simple, checkbox, input"
          >
            <div className="flex flex-wrap gap-3">
              <Button
                variant="destructive"
                onClick={() => setDeleteOpen(true)}
              >
                <Trash2 size={16} />
                Abrir ModalDelete
              </Button>
              <ModalDelete
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                onConfirm={() => setDeleteOpen(false)}
                mode="checkbox"
              />
            </div>
          </Demo>

          {/* ModalConfirm */}
          <Demo
            title="ModalConfirm"
            description="Modal generico de confirmacao"
          >
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setConfirmOpen(true)}>
                <Check size={16} />
                Abrir ModalConfirm
              </Button>
              <ModalConfirm
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={() => setConfirmOpen(false)}
                title="Confirmar acao"
                description="Tem certeza que deseja prosseguir com esta acao?"
                confirmIcon={<Check size={16} />}
              />
            </div>
          </Demo>

          {/* SheetEntity */}
          <Demo
            title="SheetEntity"
            description="Sheet lateral com formulario"
          >
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={() => setSheetOpen(true)}>
                <Edit3 size={16} />
                Abrir SheetEntity
              </Button>
              <SheetEntity
                open={sheetOpen}
                onClose={() => setSheetOpen(false)}
                title="Editar usuario"
                description="Altere as informacoes do usuario"
                onSubmit={() => setSheetOpen(false)}
              >
                <div className="flex flex-col gap-4">
                  <Input label="Nome" placeholder="Digite o nome" />
                  <Input label="Email" placeholder="seu@email.com" />
                  <Select
                    label="Cargo"
                    options={[
                      { value: "dev", label: "Dev" },
                      { value: "design", label: "Design" },
                      { value: "pm", label: "PM" },
                    ]}
                  />
                  <Textarea
                    label="Observacoes"
                    placeholder="Observacoes opcionais..."
                  />
                </div>
              </SheetEntity>
            </div>
          </Demo>

          {/* DropdownActions */}
          <Demo
            title="DropdownActions"
            description="Dropdown menu de acoes"
          >
            <div className="flex gap-4">
              <DropdownActions
                actions={[
                  {
                    label: "Editar",
                    icon: <Edit3 size={14} />,
                    onClick: () => {},
                  },
                  {
                    label: "Duplicar",
                    icon: <Copy size={14} />,
                    onClick: () => {},
                  },
                  {
                    label: "Compartilhar",
                    icon: <Share2 size={14} />,
                    onClick: () => {},
                  },
                  {
                    label: "Excluir",
                    icon: <Trash2 size={14} />,
                    onClick: () => {},
                    variant: "destructive",
                  },
                ]}
              />
              <DropdownActions
                trigger={
                  <Button variant="secondary" size="sm">
                    <Settings size={14} />
                    Mais opcoes
                  </Button>
                }
                actions={[
                  {
                    label: "Exportar CSV",
                    icon: <Download size={14} />,
                    onClick: () => {},
                  },
                  {
                    label: "Importar",
                    icon: <Upload size={14} />,
                    onClick: () => {},
                  },
                  {
                    label: "Filtros",
                    icon: <Filter size={14} />,
                    onClick: () => {},
                  },
                ]}
              />
            </div>
          </Demo>
        </Section>

        {/* ==================== AI ==================== */}
        <Section id="ai" title="AI Components" count={4}>
          {/* AIIcon */}
          <Demo
            title="AIIcon"
            description="Icone SVG de sparkles (3 estrelas)"
          >
            <div className="flex items-center gap-6">
              <AIIcon size={16} />
              <AIIcon size={24} />
              <AIIcon size={32} />
              <AIIcon size={48} className="text-loce" />
            </div>
          </Demo>

          {/* AIButton */}
          <Demo
            title="AIButton"
            description="Botao com borda rainbow animada"
          >
            <div className="flex flex-wrap items-center gap-3">
              <AIButton size="sm">Gerar com IA</AIButton>
              <AIButton>Melhorar texto</AIButton>
              <AIButton size="lg">Criar conteudo</AIButton>
              <AIButton loading>Gerando...</AIButton>
            </div>
          </Demo>

          {/* AICard */}
          <Demo
            title="AICard"
            description="Card para conteudo gerado por IA"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AICard title="Resumo da IA" onRefresh={() => {}}>
                Este cliente demonstrou alto engajamento nas ultimas 4 semanas,
                com 12 interacoes registradas e 3 compras realizadas. Sugiro
                oferecer o plano premium com desconto de fidelidade.
              </AICard>
              <AICard title="Sugestao de resposta" glow>
                Ola! Obrigado pelo seu interesse. Nosso plano Pro inclui todas
                as funcionalidades que voce precisa, com suporte prioritario.
                Posso agendar uma demonstracao?
              </AICard>
            </div>
          </Demo>

          {/* SparklesText */}
          <Demo
            title="SparklesText"
            description="Texto com sparkles animados"
          >
            <div className="flex flex-col gap-4">
              <SparklesText className="text-2xl font-bold text-loce">
                Powered by AI
              </SparklesText>
              <SparklesText
                className="text-lg font-semibold text-dark dark:text-light"
                sparkleCount={6}
              >
                Gere conteudo em segundos
              </SparklesText>
            </div>
          </Demo>
        </Section>

        {/* Footer */}
        <footer className="border-t border-neutral-200 dark:border-neutral-800 pt-8 mt-8">
          <div className="flex items-center justify-between">
            <Text variant="description" className="text-neutral-400">
              Loce Design System v0.2.4 — 44 componentes
            </Text>
            <div className="flex items-center gap-2">
              <Text variant="description" className="text-neutral-400">
                npm install loce-ds
              </Text>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
