import { api } from '@/lib'
import type { ChatData } from '@/types'

const CHAT_URL = '/nortus-v1/chat'

export const chatService = {
    async getChat(): Promise<ChatData> {
        const response = await api.get<ChatData>(CHAT_URL)
        return response.data
    }
}
