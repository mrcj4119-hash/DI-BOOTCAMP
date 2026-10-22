import { WebSocketServer, type WebSocket } from 'ws'
import jwt from 'jsonwebtoken'
import { canEditStory } from './models/storiesModel'
import type { Story } from '../../types/types'
const clients = new Map<WebSocket, { storyId?: number }>()
const server = new WebSocketServer({ port: Number(process.env.WS_PORT) || 3002, path: '/ws' })
server.on('connection', (socket, request) => { try { const payload = jwt.verify(new URL(request.url ?? '', 'http://localhost').searchParams.get('token') ?? '', process.env.JWT_SECRET!) as { id: number }; clients.set(socket, {}); socket.send(JSON.stringify({ type: 'connected' })); socket.on('message', async (raw) => { const message = JSON.parse(raw.toString()) as { type?: string; storyId?: number }; const storyId = message.storyId; if (message.type === 'subscribe' && typeof storyId === 'number' && Number.isSafeInteger(storyId)) { const authorized = await canEditStory(storyId, payload.id); if (authorized) clients.set(socket, { storyId }) } }); socket.on('close', () => clients.delete(socket)) } catch { socket.close(1008, 'Authentication required.') } })
export function broadcastStoryUpdate(story: Story) { for (const [socket, client] of clients) if (client.storyId === story.id && socket.readyState === socket.OPEN) socket.send(JSON.stringify({ type: 'story.updated', story })) }
