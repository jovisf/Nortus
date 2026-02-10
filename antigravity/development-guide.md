# 📘 Guia de Desenvolvimento - Projeto Fênix (Desafio Nortus)

Este documento serve como guia de referência para manter a consistência e qualidade do código durante o desenvolvimento do desafio técnico. Os padrões aqui descritos são baseados nas boas práticas implementadas no projeto `personal-page`.

---

## 📁 Estrutura de Pastas

```
src/
├── app/                      # App Router do Next.js
│   ├── (auth)/              # Grupo de rotas de autenticação (login)
│   │   └── login/
│   │       └── page.tsx
│   ├── (dashboard)/         # Grupo de rotas protegidas
│   │   ├── dashboard/
│   │   ├── tickets/
│   │   ├── chat/
│   │   └── simulator/
│   ├── api/                 # API Routes (se necessário)
│   ├── fonts/               # Fontes customizadas
│   └── layout.tsx           # Layout raiz
├── components/
│   ├── layout/              # Componentes de layout (Header, Sidebar, etc.)
│   ├── sections/            # Seções de páginas (Dashboard, Tickets, etc.)
│   ├── ui/                  # Componentes UI reutilizáveis (Button, Input, etc.)
│   └── modals/              # Componentes de modais
├── hooks/                   # Custom hooks
├── lib/                     # Utilitários e configurações
│   ├── api/                 # Cliente API e interceptors
│   ├── auth/                # Utilitários de autenticação
│   ├── cookies/             # Gerenciamento de cookies
│   └── utils.ts             # Utilitários gerais
├── services/                # Serviços de API (camada de acesso a dados)
├── stores/                  # Stores do Zustand
├── types/                   # Tipos TypeScript globais
├── schemas/                 # Schemas Zod para validação
├── messages/                # Arquivos de i18n (next-intl)
└── styles/                  # Estilos globais
```

---

## 🧩 Padrões de Componentes

### Estrutura de Arquivos por Componente

Cada componente deve ter sua própria pasta com a seguinte estrutura:

```
ComponentName/
├── index.ts                  # Re-exportação pública
├── ComponentName.tsx         # Implementação do componente
├── ComponentName.types.ts    # Definição de tipos/interfaces
├── ComponentName.schema.ts   # Schema Zod (se tiver formulário)
└── ComponentName.test.tsx    # Testes (opcional/diferencial)
```

### Exemplo: `index.ts`

```typescript
export { ComponentName } from './ComponentName'
export type { ComponentNameProps } from './ComponentName.types'
```

### Exemplo: `ComponentName.types.ts`

```typescript
import { BaseComponentProps } from '@/types/common'

export interface ComponentNameProps extends BaseComponentProps {
  title: string
  onAction?: () => void
  variant?: 'primary' | 'secondary'
}
```

### Exemplo: `ComponentName.tsx`

```typescript
'use client'

import { cn } from '@/lib/utils'
import type { ComponentNameProps } from './ComponentName.types'

export function ComponentName({ 
  title, 
  onAction, 
  variant = 'primary',
  className 
}: ComponentNameProps) {
  return (
    <div className={cn('base-styles', className)}>
      <h2>{title}</h2>
      {onAction && (
        <button onClick={onAction}>Action</button>
      )}
    </div>
  )
}
```

---

## 🔗 Padrões de Services

### Estrutura do Service

Cada serviço deve ser um objeto com métodos que representam operações da API.

```typescript
// src/services/tickets.service.ts
import { api } from '@/lib/api'
import type { 
  Ticket, 
  CreateTicketRequest, 
  GetTicketsParams,
  PaginatedResponse 
} from '@/types/tickets'

const TICKETS_URL = '/tickets'

export const ticketsService = {
  async getAll(params?: GetTicketsParams): Promise<PaginatedResponse<Ticket>> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.set('page', String(params.page))
    if (params?.limit) queryParams.set('limit', String(params.limit))
    if (params?.status) queryParams.set('status', params.status)
    
    const url = params ? `${TICKETS_URL}?${queryParams}` : TICKETS_URL
    return api.get<PaginatedResponse<Ticket>>(url)
  },

  async getById(id: string): Promise<Ticket> {
    return api.get<Ticket>(`${TICKETS_URL}/${id}`)
  },

  async create(data: CreateTicketRequest): Promise<Ticket> {
    return api.post<Ticket>(TICKETS_URL, data)
  },

  async update(id: string, data: Partial<CreateTicketRequest>): Promise<Ticket> {
    return api.patch<Ticket>(`${TICKETS_URL}/${id}`, data)
  },

  async delete(id: string): Promise<void> {
    return api.delete(`${TICKETS_URL}/${id}`)
  },
}
```

### Organização dos Services

```
services/
├── index.ts                  # Barrel exports
├── auth.service.ts           # Autenticação (login, logout)
├── dashboard.service.ts      # KPIs e métricas
├── tickets.service.ts        # CRUD de tickets
├── chat.service.ts           # Chat/Assistente IA
└── simulator.service.ts      # Simulador de planos
```

---

## 🌐 Padrão do API Client

### Cliente Base com Axios/Fetch

```typescript
// src/lib/api/api-client.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

interface RequestConfig extends Omit<RequestInit, 'body'> {
  body?: unknown
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const url = `${BASE_URL}${endpoint}`
    
    // Obter token do cookie para requisições autenticadas
    const token = this.getAuthToken()

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...config.headers,
    }

    const requestConfig: RequestInit = {
      ...config,
      headers,
      body: config.body ? JSON.stringify(config.body) : undefined,
    }

    const response = await fetch(url, requestConfig)

    if (!response.ok) {
      await this.handleError(response)
    }

    // Para respostas vazias (204 No Content)
    if (response.status === 204) {
      return {} as T
    }

    return response.json()
  }

  private getAuthToken(): string | null {
    if (typeof document === 'undefined') return null
    // Implementação para obter token do cookie
    return getCookie('auth-token')
  }

  private async handleError(response: Response): Promise<never> {
    const errorData = await response.json().catch(() => null)
    
    // Tratamento específico por status code
    if (response.status === 401) {
      // Redirecionar para login ou limpar sessão
      this.handleUnauthorized()
    }
    
    const errorMessage = errorData?.message || 
      `API Error: ${response.status} ${response.statusText}`
    throw new Error(errorMessage)
  }

  private handleUnauthorized(): void {
    // Limpar dados de autenticação e redirecionar
    deleteCookie('auth-token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' })
  }

  async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data,
    })
  }

  async put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data,
    })
  }

  async patch<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data,
    })
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' })
  }
}

export const api = new ApiClient()
```

---

## 📝 Padrões de Types

### Tipos Base Globais

```typescript
// src/types/common.ts
export interface BaseComponentProps {
  className?: string
}

export interface BaseSectionProps extends BaseComponentProps {}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface ApiError {
  message: string
  code?: string
  details?: Record<string, string[]>
}
```

### Tipos por Domínio

```typescript
// src/types/auth.ts
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'operator' | 'manager'
  avatar?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}
```

```typescript
// src/types/tickets.ts
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical'

export interface Ticket {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  createdAt: string
  updatedAt: string
  assignee?: User
  customer: Customer
}

export interface CreateTicketRequest {
  title: string
  description: string
  priority: TicketPriority
  customerId: string
}

export interface GetTicketsParams {
  page?: number
  limit?: number
  status?: TicketStatus
  priority?: TicketPriority
  search?: string
}
```

---

## ✅ Padrões de Schemas (Zod)

### Schema com Internacionalização

```typescript
// src/schemas/login.schema.ts
import { z } from 'zod'

export const createLoginSchema = (t: (key: string) => string) => {
  return z.object({
    email: z
      .string()
      .min(1, { message: t('errors.emailRequired') })
      .email({ message: t('errors.emailInvalid') }),
    password: z
      .string()
      .min(1, { message: t('errors.passwordRequired') })
      .min(6, { message: t('errors.passwordMinLength') }),
  })
}

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>
```

### Schema Simples (sem i18n)

```typescript
// src/schemas/ticket.schema.ts
import { z } from 'zod'

export const createTicketSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(100, 'Título deve ter no máximo 100 caracteres'),
  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres'),
  priority: z.enum(['low', 'medium', 'high', 'critical'], {
    errorMap: () => ({ message: 'Selecione uma prioridade válida' }),
  }),
  customerId: z.string().min(1, 'Selecione um cliente'),
})

export type CreateTicketFormData = z.infer<typeof createTicketSchema>
```

---

## 🪝 Padrões de Hooks

### Hook Simples

```typescript
// src/hooks/useToggle.ts
import { useState, useCallback } from 'react'

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue((prev) => !prev), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return { value, toggle, setTrue, setFalse }
}
```

### Hook de API (com loading e error)

```typescript
// src/hooks/useTickets.ts
import { useState, useCallback, useEffect } from 'react'
import { ticketsService } from '@/services/tickets.service'
import type { Ticket, GetTicketsParams, PaginatedResponse } from '@/types/tickets'

interface UseTicketsReturn {
  tickets: Ticket[]
  meta: PaginatedResponse<Ticket>['meta'] | null
  isLoading: boolean
  error: Error | null
  refetch: (params?: GetTicketsParams) => Promise<void>
}

export function useTickets(initialParams?: GetTicketsParams): UseTicketsReturn {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [meta, setMeta] = useState<PaginatedResponse<Ticket>['meta'] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchTickets = useCallback(async (params?: GetTicketsParams) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await ticketsService.getAll(params)
      setTickets(response.data)
      setMeta(response.meta)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro ao carregar tickets'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTickets(initialParams)
  }, [fetchTickets, initialParams])

  return {
    tickets,
    meta,
    isLoading,
    error,
    refetch: fetchTickets,
  }
}
```

### Barrel Export de Hooks

```typescript
// src/hooks/index.ts
export { useToggle } from './useToggle'
export { useTickets } from './useTickets'
export { useAuth } from './useAuth'
export { useToast } from './useToast'
```

---

## 🗄️ Padrões de Stores (Zustand)

### Store de Autenticação

```typescript
// src/stores/auth.store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User } from '@/types/auth'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

interface AuthActions {
  setUser: (user: User) => void
  clearUser: () => void
  updateUser: (data: Partial<User>) => void
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // State
      user: null,
      isAuthenticated: false,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }), // Persiste apenas o user
    }
  )
)
```

### Store de UI/Toast

```typescript
// src/stores/toast.store.ts
import { create } from 'zustand'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastState {
  toasts: Toast[]
}

interface ToastActions {
  addToast: (message: string, type: ToastType) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}

type ToastStore = ToastState & ToastActions

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  addToast: (message, type) => {
    const id = crypto.randomUUID()
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }))
    
    // Auto-remove após 5 segundos
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }))
    }, 5000)
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  clearToasts: () => set({ toasts: [] }),
}))
```

---

## 🍪 Padrões de Cookies/LocalStorage

### Utilitário de Cookies

```typescript
// src/lib/cookies/constants.ts
export const COOKIE_NAMES = {
  AUTH_TOKEN: 'auth-token',
  THEME: 'user-theme',
  LOCALE: 'user-locale',
} as const

export const COOKIE_CONFIG = {
  MAX_AGE: 7 * 24 * 60 * 60, // 7 dias em segundos
  PATH: '/',
  SAME_SITE: 'lax' as const,
} as const
```

```typescript
// src/lib/cookies/cookies.ts
import { COOKIE_CONFIG } from './constants'

export interface CookieOptions {
  maxAge?: number
  path?: string
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
}

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  if (typeof document === 'undefined') return

  const {
    maxAge = COOKIE_CONFIG.MAX_AGE,
    path = COOKIE_CONFIG.PATH,
    secure = true,
    sameSite = COOKIE_CONFIG.SAME_SITE,
  } = options

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
  cookieString += `; max-age=${maxAge}`
  cookieString += `; path=${path}`
  if (secure) cookieString += '; secure'
  cookieString += `; samesite=${sameSite}`

  document.cookie = cookieString
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null

  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=').map((c) => c.trim())
    if (decodeURIComponent(cookieName) === name) {
      return decodeURIComponent(cookieValue)
    }
  }
  return null
}

export function deleteCookie(name: string): void {
  setCookie(name, '', { maxAge: 0 })
}
```

---

## 🔐 Padrão de Autenticação

### Requisitos do Desafio
- Token armazenado em **cookies**
- Informações do usuário em **localStorage**
- Proteção de rotas privadas

### Serviço de Autenticação

```typescript
// src/services/auth.service.ts
import { api } from '@/lib/api'
import { setCookie, deleteCookie, COOKIE_NAMES } from '@/lib/cookies'
import type { LoginRequest, LoginResponse, User } from '@/types/auth'

const AUTH_URL = '/auth'

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(`${AUTH_URL}/login`, data)
    
    // Salvar token em cookie
    setCookie(COOKIE_NAMES.AUTH_TOKEN, response.token)
    
    // Salvar user em localStorage
    localStorage.setItem('user', JSON.stringify(response.user))
    
    return response
  },

  logout(): void {
    deleteCookie(COOKIE_NAMES.AUTH_TOKEN)
    localStorage.removeItem('user')
  },

  getStoredUser(): User | null {
    if (typeof window === 'undefined') return null
    const userJson = localStorage.getItem('user')
    return userJson ? JSON.parse(userJson) : null
  },

  isAuthenticated(): boolean {
    return !!getCookie(COOKIE_NAMES.AUTH_TOKEN)
  },
}
```

### Middleware de Proteção de Rotas

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/login', '/forgot-password']
const authRoutes = ['/login']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  const { pathname } = request.nextUrl

  // Se não autenticado e tentando acessar rota privada
  if (!token && !publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se autenticado e tentando acessar rota de auth (login)
  if (token && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
```

---

## 📊 Requisitos do Desafio Nortus

### Stack Obrigatória
- ✅ Next.js (v12+)
- ✅ TypeScript
- ✅ TailwindCSS
- ✅ Zustand
- ✅ Axios,
- ✅ ESLint + Prettier
- ✅ Zod (formulários)

### Funcionalidades Obrigatórias
1. **Login** - Validação de email, toggle de visibilidade de senha
2. **Dashboard** - Gráficos (ARPU, Retenção, Churn, Conversão), mapa de clientes
3. **Gestão de Tickets** - CRUD, listagem, toast de sucesso
4. **Chat com IA** - Sugestões da IA, ações rápidas
5. **Simulador de Planos** - Seleção de planos, sliders, preço em tempo real

### Diferenciais
- 🎯 Testes
- 🎯 Animações
- 🎯 Loading skeletons
- 🎯 Internacionalização (next-intl)
- 🎯 Histórico de sugestões da IA

### Links Importantes
- **API Docs**: https://nortus-challenge.api.stage.loomi.com.br/docs
- **Protótipo Figma**: https://www.figma.com/design/868T0tcAW9DFNRErbwZFWh/DesafioNortus

---

## 🎨 Boas Práticas de Estilização (TailwindCSS)

### Organização com `cn()` utility

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Variantes de Componentes

```typescript
const buttonVariants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  outline: 'border border-gray-300 bg-transparent hover:bg-gray-50',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}
```

---

## 📋 Checklist de Desenvolvimento

### Para cada nova feature:
- [ ] Criar types em `src/types/`
- [ ] Criar schema Zod em `src/schemas/` (se tiver form)
- [ ] Criar service em `src/services/`
- [ ] Criar hook customizado (se necessário)
- [ ] Criar componentes com estrutura padrão
- [ ] Adicionar store Zustand (se necessário)
- [ ] Implementar tratamento de erros
- [ ] Adicionar loading states
- [ ] Testar responsividade (mín. 1000px)

### Antes do commit:
- [ ] Rodar `npm run lint`
- [ ] Rodar `npm run build`
- [ ] Verificar console sem erros
- [ ] Commit descritivo seguindo conventional commits

---

## 📌 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Lint
npm run lint

# Lint com fix automático
npm run lint:fix

# Formatação
npm run format
```

---

*Este guia será atualizado conforme o projeto evolui.*
