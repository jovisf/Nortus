export interface KpiValue {
    valor: number
    variacao: number
}

export interface KpisResume {
    arpu: KpiValue
    conversion: KpiValue
    retention: KpiValue
    churn: KpiValue
}

export interface KpiTrendData {
    name: string
    data: number[]
}

export interface KpisTrend {
    labels: string[]
    arpuTrend: KpiTrendData
    conversionTrend: KpiTrendData
    churnTrend: KpiTrendData
    retentionTrend: KpiTrendData
}

export interface Segment {
    nome: string
    valor: number
}

export interface ActiveClientFilters {
    status: string[]
    secureType: string[]
    locations: string[]
}

export type ClientStatus = 'Ativo' | 'Pendente' | 'Inativo'

export interface ActiveClient {
    id: string
    name: string
    email: string
    secureType: string
    monthValue: number
    status: ClientStatus
    renewalDate: string
    location: string
}

export interface ActiveClientsData {
    filters: ActiveClientFilters
    data: ActiveClient[]
}

export interface DashboardData {
    kpisTrend: KpisTrend
    kpisResume: KpisResume
    segments: Segment[]
    activeClients: ActiveClientsData
}

export type KpiType = 'arpu' | 'conversion' | 'churn' | 'retention'

export interface DashboardFilters {
    status: string
    secureType: string
    location: string
}

export interface ApiLocation {
    id: string
    name: string
    description: string
    coordinates: [number, number]
    category: string
    address: string
    icon: string
    color: string
}

export interface MapLocationsResponse {
    data: {
        locations: ApiLocation[]
    }
}
