export type Language = 'en' | 'hi';
export type UserRole = 'worker' | 'admin';
export type PlatformName = 'Swiggy' | 'Zomato' | 'Uber' | 'Ola' | 'Blinkit' | 'Porter' | 'Zepto';
export type VerificationStatus = 'verified' | 'expiring' | 'missing' | 'review';
export type TicketStatus = 'open' | 'in_review' | 'resolved' | 'escalated';
export type ZoneRisk = 'low' | 'medium' | 'high';

export interface LocalizedString {
  en: string;
  hi: string;
}

export interface NavItem {
  key: string;
  path: string;
  icon: string;
}

export interface WorkerProfile {
  id: string;
  name: string;
  phone: string;
  city: string;
  zone: string;
  preferredLanguage: Language;
  role: UserRole;
  avatarInitials: string;
  platforms: PlatformName[];
  vehicle: {
    type: string;
    model: string;
    registration: string;
    fuelType: string;
  };
  notificationSettings: {
    payoutAlerts: boolean;
    shiftReminders: boolean;
    safetyBroadcasts: boolean;
    quietHours: string;
  };
  safetyPreferences: {
    shareLiveLocation: boolean;
    nightShiftCheckIn: boolean;
    emergencyContactName: string;
    emergencyContactPhone: string;
  };
}

export interface AuthSession {
  isAuthenticated: boolean;
  workerId: string | null;
  role: UserRole;
}

export interface QuickAction {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  route: string;
}

export interface ChartDatum {
  label: string;
  amount: number;
  incentive?: number;
  expense?: number;
  hours?: number;
}

export interface DashboardOverview {
  todayEarnings: number;
  completedTrips: number;
  weeklyGoalProgress: number;
  nextPayout: {
    date: string;
    amount: number;
    cycle: LocalizedString;
  };
  activeShift: {
    status: LocalizedString;
    startedAt: string;
    targetHours: number;
    elapsedHours: number;
  };
  safetyScore: number;
  weeklyEarnings: ChartDatum[];
  quickActions: QuickAction[];
  aiInsight: {
    title: LocalizedString;
    body: LocalizedString;
    tag: LocalizedString;
  };
}

export interface EarningsSummary {
  total: number;
  incentives: number;
  deductions: number;
  expenses: number;
  net: number;
}

export interface ExpenseEntry {
  id: string;
  label: LocalizedString;
  amount: number;
  date: string;
  category: 'fuel' | 'maintenance' | 'food' | 'mobile' | 'other';
}

export interface PlatformEarnings {
  platform: PlatformName;
  amount: number;
  trips: number;
  avgPerTrip: number;
}

export interface EarningsDataset {
  summary: EarningsSummary;
  trend: ChartDatum[];
  comparison: ChartDatum[];
  platformBreakdown: PlatformEarnings[];
  expenses: ExpenseEntry[];
  forecast: {
    amount: number;
    confidence: number;
    note: LocalizedString;
  };
}

export interface DemandSlot {
  id: string;
  day: string;
  window: string;
  demandScore: number;
  hotspot: string;
}

export interface ShiftBlock {
  id: string;
  title: LocalizedString;
  date: string;
  start: string;
  end: string;
  status: 'scheduled' | 'recommended' | 'completed';
  zone: string;
  earningsTarget: number;
}

export interface ShiftPlannerData {
  upcoming: ShiftBlock[];
  demandSlots: DemandSlot[];
  productivity: {
    activeDays: number;
    avgHours: number;
    bestWindow: LocalizedString;
    weeklyTarget: number;
  };
  aiSuggestion: {
    headline: LocalizedString;
    body: LocalizedString;
  };
}

export interface SafetyContact {
  id: string;
  name: string;
  relation: LocalizedString;
  phone: string;
}

export interface SafetyIncident {
  id: string;
  area: string;
  type: LocalizedString;
  timestamp: string;
  severity: ZoneRisk;
  note: LocalizedString;
}

export interface SafetyZone {
  id: string;
  label: string;
  latitude: number;
  longitude: number;
  risk: ZoneRisk;
}

export interface SafetyData {
  city: string;
  contacts: SafetyContact[];
  incidents: SafetyIncident[];
  zones: SafetyZone[];
  tips: LocalizedString[];
  status: {
    batterySafe: boolean;
    helmetCheck: boolean;
    lastCheckIn: string;
  };
  routeAlert: {
    title: LocalizedString;
    body: LocalizedString;
    severity: ZoneRisk;
  };
}

export interface DocumentItem {
  id: string;
  label: LocalizedString;
  documentNumber: string;
  status: VerificationStatus;
  expiresOn: string;
  issuedBy: string;
}

export interface DocumentsVaultData {
  documents: DocumentItem[];
  reminders: LocalizedString[];
}

export interface TicketTimelineEvent {
  id: string;
  label: LocalizedString;
  date: string;
}

export interface GrievanceTicket {
  id: string;
  title: string;
  category: string;
  createdAt: string;
  status: TicketStatus;
  summary: LocalizedString;
  attachments: string[];
  timeline: TicketTimelineEvent[];
}

export interface FAQItem {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
}

export interface GrievanceCenterData {
  categories: Array<{ value: string; label: LocalizedString }>;
  tickets: GrievanceTicket[];
  faqs: FAQItem[];
}
