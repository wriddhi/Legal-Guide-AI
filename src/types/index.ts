export type Message = {
    role: "user" | "system",
    message: string,
    timestamp: number,
}

export type Chat = {
    user: string,
    id: string,
    created_at: number,
    history: Message[],
    title: string,
    file: URL | null,
}