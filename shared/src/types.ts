/**
 * Shared TypeScript types and interfaces for Event Management Platform
 * Used across frontend, backend, and AI services
 */

import { z } from 'zod';

// ========== User Types ==========
export enum UserRole {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  universityId: string; // University student/employee ID
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  department: string;
  year?: number; // For students: 1, 2, 3, 4, etc.
  major?: string; // For students
  interests: string[]; // For AI recommendations
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

// ========== Event Types ==========
export enum EventCategory {
  ACADEMIC = 'ACADEMIC',
  WORKSHOP = 'WORKSHOP',
  SEMINAR = 'SEMINAR',
  CONFERENCE = 'CONFERENCE',
  CLUB_ACTIVITY = 'CLUB_ACTIVITY',
  SPORTS = 'SPORTS',
  CULTURAL = 'CULTURAL',
  CAREER = 'CAREER',
  RESEARCH = 'RESEARCH',
  DEPARTMENT = 'DEPARTMENT',
  ORIENTATION = 'ORIENTATION',
  GRADUATION = 'GRADUATION',
  GUEST_LECTURE = 'GUEST_LECTURE',
  COMPETITION = 'COMPETITION',
  SOCIAL = 'SOCIAL',
  OTHER = 'OTHER'
}

export enum EventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export enum AttendeeStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  DECLINED = 'DECLINED',
  WAITLIST = 'WAITLIST'
}

export interface Event {
  id: string;
  title: string;
  description: string;
  slug: string;
  startDateTime: Date;
  endDateTime: Date;
  timezone: string;
  isAllDay: boolean;
  isOnline: boolean;
  venue?: string; // Campus building/room
  building?: string;
  room?: string;
  category: EventCategory;
  department: string; // Department organizing the event
  targetYear?: number[]; // Target year(s) for students
  targetMajors?: string[]; // Target majors
  tags: string[];
  maxAttendees?: number;
  requiresApproval: boolean;
  coverImage?: string;
  images: string[];
  status: EventStatus;
  instructorId: string; // Changed from organizerId
  instructor: User; // Changed from organizer
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  attendeeCount?: number;
  averageRating?: number;
}

// ========== Event Attendee Types ==========
export interface EventAttendee {
  id: string;
  eventId: string;
  userId: string;
  user: User;
  status: AttendeeStatus;
  ticketId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ========== Comment & Rating Types ==========
export interface EventComment {
  id: string;
  eventId: string;
  userId: string;
  user: User;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventRating {
  id: string;
  eventId: string;
  userId: string;
  user: User;
  rating: number; // 1-5
  review?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ========== Notification Types ==========
export enum NotificationType {
  EVENT_REMINDER = 'EVENT_REMINDER',
  EVENT_UPDATE = 'EVENT_UPDATE',
  EVENT_CANCELLED = 'EVENT_CANCELLED',
  NEW_ATTENDEE = 'NEW_ATTENDEE',
  ATTENDEE_LEFT = 'ATTENDEE_LEFT',
  EVENT_RECOMMENDATION = 'EVENT_RECOMMENDATION',
  SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT'
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  userId: string;
  eventId?: string;
  event?: Event;
  createdAt: Date;
}

// ========== User Preferences ==========
export interface UserPreference {
  id: string;
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  eventReminders: boolean;
  eventRecommendations: boolean;
  marketingEmails: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  profileVisibility: 'public' | 'friends' | 'private';
  showEmail: boolean;
  showPhone: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ========== API Response Types ==========
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

// ========== Authentication Types ==========
export interface LoginCredentials {
  username: string; // University username
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthUser {
  user: User;
  tokens: AuthTokens;
}

// ========== Search & Filter Types ==========
export interface EventFilters {
  category?: EventCategory[];
  department?: string[];
  startDate?: Date;
  endDate?: Date;
  venue?: string;
  building?: string;
  isOnline?: boolean;
  targetYear?: number[];
  targetMajors?: string[];
  tags?: string[];
  instructorId?: string;
  status?: EventStatus[];
}

export interface SearchParams {
  query?: string;
  filters?: EventFilters;
  sortBy?: 'date' | 'popularity' | 'rating' | 'created';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// ========== AI/ML Types ==========
export interface EventRecommendation {
  eventId: string;
  event: Event;
  score: number;
  reason: string;
  confidence: number;
}

export interface UserRecommendations {
  userId: string;
  recommendations: EventRecommendation[];
  generatedAt: Date;
  modelVersion: string;
}

export interface EventAnalytics {
  eventId: string;
  views: number;
  registrations: number;
  cancellations: number;
  conversionRate: number;
  popularTags: string[];
  demographicBreakdown: {
    ageGroups: Record<string, number>;
    locations: Record<string, number>;
    interests: Record<string, number>;
  };
  peakRegistrationTimes: Date[];
  similarEvents: string[];
}

// ========== Validation Schemas (Zod) ==========
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string().min(3).max(30),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  avatar: z.string().url().optional(),
  bio: z.string().max(500).optional(),
  phone: z.string().optional(),
  dateOfBirth: z.date().optional(),
  role: z.nativeEnum(UserRole),
  isVerified: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  lastLoginAt: z.date().optional()
});

export const EventSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  slug: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  timezone: z.string(),
  isAllDay: z.boolean(),
  isOnline: z.boolean(),
  venue: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  category: z.nativeEnum(EventCategory),
  tags: z.array(z.string()),
  maxAttendees: z.number().positive().optional(),
  isPublic: z.boolean(),
  requiresApproval: z.boolean(),
  isFree: z.boolean(),
  ticketPrice: z.number().nonnegative().optional(),
  currency: z.string().default('USD'),
  coverImage: z.string().url().optional(),
  images: z.array(z.string().url()),
  status: z.nativeEnum(EventStatus),
  organizerId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().optional()
});

export const CreateEventSchema = EventSchema.omit({
  id: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true
});

export const UpdateEventSchema = CreateEventSchema.partial();

// ========== Chatbot Types ==========
export interface ChatbotMessage {
  id: string;
  sessionId: string;
  sender: 'user' | 'bot';
  message: string;
  type: 'text' | 'event_recommendation' | 'quick_reply';
  timestamp: Date;
  metadata?: {
    intent?: string;
    confidence?: number;
    suggestedEvents?: string[];
    quickReplies?: string[];
  };
}

export interface ChatbotSession {
  id: string;
  userId: string;
  user: User;
  messages: ChatbotMessage[];
  context: {
    department: string;
    interests: string[];
    lastEventQuery?: string;
    preferredCategories?: EventCategory[];
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatbotIntent {
  name: string;
  patterns: string[];
  responses: string[];
  action?: string;
  entities?: string[];
}

// ========== WebSocket Types ==========
export interface SocketEvent {
  type: string;
  payload: any;
  timestamp: Date;
  userId?: string;
  eventId?: string;
}

// ========== Error Types ==========
export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  validationErrors?: ValidationError[];
}
