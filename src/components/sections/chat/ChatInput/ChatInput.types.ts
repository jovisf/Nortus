export interface ChatInputProps {
    value: string
    isTyping: boolean
    suggestion?: string
    onChange: (value: string) => void
    onSend: () => void
}

