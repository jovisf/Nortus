# Nortus - Projeto Fênix

Sistema de gestão de atendimento e tickets desenvolvido em React/Next.js.

## 🚀 Tecnologias

### Obrigatórias (conforme desafio)
- **Next.js 16** - Framework React para SSR/SSG
- **TypeScript** - Tipagem estática
- **TailwindCSS 4** - Estilização utility-first
- **Zustand** - Gerenciamento de estado
- **Axios** - Cliente HTTP para consumo de API
- **Zod** - Validação de schemas de formulários
- **next-intl** - Internacionalização (pt-BR / en)

### Complementares
- **ApexCharts** - Gráficos para Dashboard de KPIs
- **Sonner** - Toasts e feedbacks visuais
- **js-cookie** - Gerenciamento de cookies para autenticação
- **Prettier** - Formatação de código

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── (auth)/             # Grupo de rotas públicas
│   │   └── login/          # Página de login
│   ├── (main)/             # Grupo de rotas protegidas
│   │   ├── dashboard/      # KPIs e gráficos
│   │   ├── tickets/        # Gestão de tickets
│   │   ├── chat/           # Chat com IA
│   │   └── simulador/      # Simulador de planos
│   ├── layout.tsx          # Layout raiz
│   └── globals.css         # Estilos globais
├── components/             # Componentes reutilizáveis
│   ├── shared/             # Componentes compartilhados
│   ├── skeletons/          # Loading skeletons
│   └── ui/                 # Design system (buttons, inputs, etc.)
├── hooks/                  # Custom React hooks
├── lib/                    # Configurações e utilitários core
│   ├── api.ts              # Instância Axios configurada
│   └── validations/        # Schemas Zod
├── messages/               # Arquivos de tradução i18n
│   ├── en.json
│   └── pt-BR.json
├── services/               # Camada de serviços/API
│   └── endpoints/          # Endpoints organizados por domínio
├── store/                  # Stores Zustand
│   └── authStore.ts        # Estado de autenticação
├── types/                  # TypeScript types/interfaces
├── utils/                  # Funções utilitárias
└── middleware.ts           # Proteção de rotas
```

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Iniciar em desenvolvimento
npm run dev

# Verificar tipos TypeScript
npm run type-check

# Lint
npm run lint
npm run lint:fix

# Formatação
npm run format
npm run format:check

# Build para produção
npm run build
```

## 🌐 API

Base URL: `https://nortus-challenge.api.stage.loomi.com.br`

Documentação: `https://nortus-challenge.api.stage.loomi.com.br/docs`

## 🎨 Design

Protótipo Figma: [Link do Figma](https://www.figma.com/design/868T0tcAW9DFNRErbwZFWh/DesafioNortus)

## 🔐 Autenticação

- **Token**: Armazenado em cookies (`auth_token`)
- **Dados do usuário**: Persistidos em localStorage via Zustand
- **Proteção de rotas**: Middleware Next.js redireciona para `/login` se não autenticado

## 📦 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Executa ESLint |
| `npm run lint:fix` | Corrige problemas de lint |
| `npm run format` | Formata código com Prettier |
| `npm run format:check` | Verifica formatação |
| `npm run type-check` | Verifica tipos TypeScript |

## 🤖 Uso de IA

Este projeto foi desenvolvido com auxílio de ferramentas de IA para:
- [Documentar ferramentas utilizadas]
- [Documentar prompts relevantes]
- [Documentar decisões baseadas em sugestões da IA]

---

**Desenvolvido para o Desafio Técnico Nortus - Loomi**
