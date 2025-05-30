import {
  MetroLine,
  MetroStation,
  MetroRoute,
  MetroTicket,
  Station,
  Schedule,
  SuspensionAlert,
  AlertStation,
} from "@/types/metroline";

// Metro Stations
export const stations: Station[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Central Station",
    address: "123 Main Street",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Downtown Station",
    address: "456 Market Street",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "s1",
    name: "Ben Thanh",
    code: "BT",
    coordinates: { lat: 10.7797, lng: 106.6989 },
    facilities: ["elevator", "escalator", "restroom", "ticket-counter"],
    isTransferStation: true,
    transferLines: ["line1", "line2"],
  },
  {
    id: "s2",
    name: "Opera House",
    code: "OH",
    coordinates: { lat: 10.7756, lng: 106.7019 },
    facilities: ["escalator", "ticket-counter"],
    isTransferStation: false,
  },
  {
    id: "s3",
    name: "Notre-Dame Cathedral",
    code: "ND",
    coordinates: { lat: 10.7798, lng: 106.6989 },
    facilities: ["elevator", "escalator", "restroom"],
    isTransferStation: false,
  },
  {
    id: "s4",
    name: "Reunification Palace",
    code: "RP",
    coordinates: { lat: 10.777, lng: 106.6952 },
    facilities: ["escalator", "ticket-counter"],
    isTransferStation: false,
  },
  {
    id: "s5",
    name: "Tao Dan Park",
    code: "TP",
    coordinates: { lat: 10.7756, lng: 106.6919 },
    facilities: ["elevator", "escalator", "restroom"],
    isTransferStation: false,
  },
  {
    id: "s6",
    name: "Phu Nhuan",
    code: "PN",
    coordinates: { lat: 10.8011, lng: 106.6783 },
    facilities: ["escalator", "ticket-counter"],
    isTransferStation: true,
    transferLines: ["line1", "line3"],
  },
  {
    id: "s7",
    name: "Tan Binh",
    code: "TB",
    coordinates: { lat: 10.8031, lng: 106.6527 },
    facilities: ["elevator", "escalator", "restroom"],
    isTransferStation: false,
  },
  {
    id: "s8",
    name: "Tan Son Nhat International Airport",
    code: "TSN",
    coordinates: { lat: 10.8188, lng: 106.6517 },
    facilities: [
      "elevator",
      "escalator",
      "restroom",
      "ticket-counter",
      "information-desk",
    ],
    isTransferStation: false,
  },
  {
    id: "s9",
    name: "District 1",
    code: "D1",
    coordinates: { lat: 10.7769, lng: 106.7009 },
    facilities: ["elevator", "escalator", "restroom", "ticket-counter"],
    isTransferStation: true,
    transferLines: ["line2", "line3"],
  },
  {
    id: "s10",
    name: "District 2",
    code: "D2",
    coordinates: { lat: 10.7872, lng: 106.7491 },
    facilities: ["escalator", "ticket-counter"],
    isTransferStation: false,
  },
  {
    id: "s11",
    name: "Thu Duc",
    code: "TD",
    coordinates: { lat: 10.8494, lng: 106.7537 },
    facilities: ["elevator", "escalator", "restroom"],
    isTransferStation: false,
  },
  {
    id: "s12",
    name: "Binh Thanh",
    code: "BT",
    coordinates: { lat: 10.8105, lng: 106.7148 },
    facilities: ["escalator", "ticket-counter"],
    isTransferStation: true,
    transferLines: ["line2", "line4"],
  },
];

// Metro Lines
export const metroLines: MetroLine[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Line 1",
    first_arrival: "05:00:00",
    train_frequency: "00:10:00",
    total_duration: "01:30:00",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Line 2",
    first_arrival: "05:30:00",
    train_frequency: "00:15:00",
    total_duration: "01:45:00",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "line3",
    name: "Line 3",
    color: "#F9A01B", // Yellow
    stations: stations.filter((s) => ["s6", "s9", "s12"].includes(s.id)),
    operatingHours: {
      start: "05:30",
      end: "23:00",
    },
    frequency: 7,
    status: "maintenance",
  },
  {
    id: "line4",
    name: "Line 4",
    color: "#00AEEF", // Blue
    stations: stations.filter((s) => ["s12"].includes(s.id)),
    operatingHours: {
      start: "05:30",
      end: "23:00",
    },
    frequency: 8,
    status: "planned",
  },
];

// Metro Routes
export const metroRoutes: MetroRoute[] = [
  {
    id: "r1",
    fromStation: "s1",
    toStation: "s8",
    lineId: "line1",
    duration: 25,
    distance: 17.2,
    price: 15000,
    stops: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"],
  },
  {
    id: "r2",
    fromStation: "s8",
    toStation: "s1",
    lineId: "line1",
    duration: 25,
    distance: 17.2,
    price: 15000,
    stops: ["s8", "s7", "s6", "s5", "s4", "s3", "s2", "s1"],
  },
  {
    id: "r3",
    fromStation: "s1",
    toStation: "s11",
    lineId: "line2",
    duration: 30,
    distance: 19.5,
    price: 18000,
    stops: ["s1", "s9", "s10", "s11"],
  },
  {
    id: "r4",
    fromStation: "s11",
    toStation: "s1",
    lineId: "line2",
    duration: 30,
    distance: 19.5,
    price: 18000,
    stops: ["s11", "s10", "s9", "s1"],
  },
  {
    id: "r5",
    fromStation: "s6",
    toStation: "s12",
    lineId: "line3",
    duration: 20,
    distance: 12.8,
    price: 12000,
    stops: ["s6", "s9", "s12"],
  },
  {
    id: "r6",
    fromStation: "s12",
    toStation: "s6",
    lineId: "line3",
    duration: 20,
    distance: 12.8,
    price: 12000,
    stops: ["s12", "s9", "s6"],
  },
];

// Metro Tickets
export const metroTickets: MetroTicket[] = [
  {
    id: "t1",
    routeId: "r1",
    fromStation: "s1",
    toStation: "s8",
    departureTime: "08:00",
    arrivalTime: "08:25",
    price: 15000,
    type: "single",
    validUntil: "2023-12-31T23:59:59",
    isAvailable: true,
  },
  {
    id: "t2",
    routeId: "r1",
    fromStation: "s1",
    toStation: "s8",
    departureTime: "09:00",
    arrivalTime: "09:25",
    price: 15000,
    type: "single",
    validUntil: "2023-12-31T23:59:59",
    isAvailable: true,
  },
  {
    id: "t3",
    routeId: "r3",
    fromStation: "s1",
    toStation: "s11",
    departureTime: "10:00",
    arrivalTime: "10:30",
    price: 18000,
    type: "single",
    validUntil: "2023-12-31T23:59:59",
    isAvailable: true,
  },
  {
    id: "t4",
    routeId: "r5",
    fromStation: "s6",
    toStation: "s12",
    departureTime: "11:00",
    arrivalTime: "11:20",
    price: 12000,
    type: "single",
    validUntil: "2023-12-31T23:59:59",
    isAvailable: false,
  },
  {
    id: "t5",
    routeId: "r1",
    fromStation: "s1",
    toStation: "s8",
    departureTime: "12:00",
    arrivalTime: "12:25",
    price: 15000,
    type: "day",
    validUntil: "2023-12-31T23:59:59",
    isAvailable: true,
  },
  {
    id: "t6",
    routeId: "r3",
    fromStation: "s1",
    toStation: "s11",
    departureTime: "13:00",
    arrivalTime: "13:30",
    price: 18000,
    type: "week",
    validUntil: "2023-12-31T23:59:59",
    isAvailable: true,
  },
  {
    id: "t7",
    routeId: "r5",
    fromStation: "s6",
    toStation: "s12",
    departureTime: "14:00",
    arrivalTime: "14:20",
    price: 12000,
    type: "month",
    validUntil: "2023-12-31T23:59:59",
    isAvailable: true,
  },
];

export const schedules: Schedule[] = [
  {
    metro_line_id: "550e8400-e29b-41d4-a716-446655440000",
    station_id: "550e8400-e29b-41d4-a716-446655440002",
    order: 1,
    arrival_time: "05:00:00",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    metro_line_id: "550e8400-e29b-41d4-a716-446655440000",
    station_id: "550e8400-e29b-41d4-a716-446655440003",
    order: 2,
    arrival_time: "05:15:00",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  // Line 2 schedules
  {
    metro_line_id: "550e8400-e29b-41d4-a716-446655440001",
    station_id: "s1",
    order: 1,
    arrival_time: "05:30:00",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    metro_line_id: "550e8400-e29b-41d4-a716-446655440001",
    station_id: "s9",
    order: 2,
    arrival_time: "05:45:00",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    metro_line_id: "550e8400-e29b-41d4-a716-446655440001",
    station_id: "s10",
    order: 3,
    arrival_time: "06:00:00",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    metro_line_id: "550e8400-e29b-41d4-a716-446655440001",
    station_id: "s11",
    order: 4,
    arrival_time: "06:15:00",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  // Line 3 schedules
  {
    metro_line_id: "line3",
    station_id: "s6",
    order: 1,
    arrival_time: "05:30:00",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    metro_line_id: "line3",
    station_id: "s9",
    order: 2,
    arrival_time: "05:45:00",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    metro_line_id: "line3",
    station_id: "s12",
    order: 3,
    arrival_time: "06:00:00",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  // Line 4 schedules
  {
    metro_line_id: "line4",
    station_id: "s12",
    order: 1,
    arrival_time: "05:30:00",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

export const suspensionAlerts: SuspensionAlert[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    suspension_type: "MAINTAINENCE",
    metro_line_id: "550e8400-e29b-41d4-a716-446655440000",
    type: "Scheduled Maintenance",
    description: "Line 1 will be under maintenance from 10 PM to 4 AM",
    expected_restore_time: "2024-01-02T04:00:00Z",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

export const alertStations: AlertStation[] = [
  {
    alert_id: "550e8400-e29b-41d4-a716-446655440004",
    station_id: "550e8400-e29b-41d4-a716-446655440002",
  },
];
