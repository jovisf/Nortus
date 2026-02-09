export interface ChatInputProps {
    value: string
    isTyping: boolean
    onChange: (value: string) => void
    onSend: () => void
}
