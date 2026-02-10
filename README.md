# Nortus

Sistema de gestão de atendimento e tickets desenvolvido em React/Next.js.

## 🚀 Tecnologias

### Core & Framework
- **Next.js 16** - Framework React (App Router)
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipagem estática

### Estilização & UI
- **TailwindCSS 4** - Framework CSS utility-first
- **Lucide React** - Biblioteca de ícones
- **Framer Motion** - Animações e transições
- **ApexCharts** - Gráficos interativos para Dashboard
- **Sonner** - Notificações toast
- **OpenLayers** - Mapas interativos

### Gerenciamento de Estado & Data Fetching
- **Zustand** - Gerenciamento de estado global
- **TanStack Query (React Query)** - Gerenciamento de estado assíncrono e cache
- **Axios** - Cliente HTTP

### Formulários & Validação
- **Zod** - Validação de schemas

### Internacionalização
- **next-intl** - Suporte a múltiplos idiomas (PT-BR / EN)

### Utilitários
- **js-cookie** - Gerenciamento de cookies
- **clsx / tailwind-merge** - Utilitários para classes CSS conditionally

## 📁 Estrutura do Projeto

```
.
├── messages/               # Arquivos de tradução (i18n)
├── public/                 # Arquivos estáticos
├── src/
│   ├── app/                # App Router (Next.js)
│   │   ├── (auth)/         # Rotas públicas (Login, Recuperação de senha)
│   │   ├── (main)/         # Rotas protegidas (Dashboard, Tickets, etc.)
│   │   └── layout.tsx      # Layout raiz
│   ├── components/         # Componentes da aplicação
│   │   ├── auth/           # Componentes de autenticação
│   │   ├── sections/       # Componentes de seções específicas (Dashboard, etc.)
│   │   ├── shared/         # Componentes compartilhados
│   │   ├── skeletons/      # Loading states
│   │   └── ui/             # Design System e componentes base
│   ├── constants/          # Constantes da aplicação
│   ├── hooks/              # Custom Hooks (useAuth, useRateLimit, etc.)
│   ├── i18n/               # Configuração de internacionalização
│   ├── lib/                # Configurações de bibliotecas (Axios, Utils)
│   ├── services/           # Camada de serviços e chamadas de API
│   ├── store/              # Gerenciamento de estado global (Zustand)
│   ├── types/              # Definições de tipos TypeScript
│   ├── utils/              # Funções utilitárias auxiliares
│   └── middleware.ts       # Middleware (Proteção de rotas e i18n)
└── ...arquivos de configuração
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
- [Documentar padrões de código]
- [Documentar decisões baseadas em sugestões da IA]

---

