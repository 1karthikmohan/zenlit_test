/**
 * Enhanced messaging types for real-time features
 */

export interface MessageStatus {
  id: string;
  messageId: string;
  status: 'sending' | 'delivered' | 'read' | 'failed';
  timestamp: string;
  readAt?: string;
}

export interface TypingIndicator {
  userId: string;
  userName: string;
  isTyping: boolean;
  timestamp: number;
}

export interface EnhancedMessage {
  id: string;
  text: string;            // required
  senderId: string;
  timestamp: number;
  isRead?: boolean;        // optional
  reactions?: string[];    // optional
  attachments?: string[];  // optional: image/file URLs
}

export interface ChatSession {
  id: string;
  participants: string[];
  lastActivity: string;
  typingUsers: TypingIndicator[];
  unreadCount: number;
}

export interface RealtimeSubscription {
  channel: any;
  isConnected: boolean;
  lastHeartbeat: number;
}