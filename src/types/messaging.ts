/**
 * Enhanced messaging types for real-time features
 */

export interface MessageStatus {
  id: string;
  messageId: string;
  status: 'sending' | 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
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
  content: string;            // Corrected property name
  senderId: string;
  receiverId: string;
  timestamp: string;          // ISO timestamp
  read?: boolean;
  readAt?: string;
  status?: 'sending' | 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
  type?: 'text' | 'image' | 'file';
  metadata?: Record<string, any>;
  reactions?: string[];
  attachments?: string[];
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