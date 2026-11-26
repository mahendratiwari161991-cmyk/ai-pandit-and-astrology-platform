export interface CityLocation {
  name: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  timezone: number;
}

export const POPULAR_CITIES: CityLocation[] = [
  { name: "New Delhi", state: "Delhi", country: "India", lat: 28.6139, lng: 77.209, timezone: 5.5 },
  { name: "Mumbai", state: "Maharashtra", country: "India", lat: 19.076, lng: 72.8777, timezone: 5.5 },
  { name: "Bengaluru", state: "Karnataka", country: "India", lat: 12.9716, lng: 77.5946, timezone: 5.5 },
  { name: "Varanasi", state: "Uttar Pradesh", country: "India", lat: 25.3176, lng: 82.9739, timezone: 5.5 },
  { name: "Jaipur", state: "Rajasthan", country: "India", lat: 26.9124, lng: 75.7873, timezone: 5.5 },
  { name: "Kolkata", state: "West Bengal", country: "India", lat: 22.5726, lng: 88.3639, timezone: 5.5 },
  { name: "Chennai", state: "Tamil Nadu", country: "India", lat: 13.0827, lng: 80.2707, timezone: 5.5 },
  { name: "Hyderabad", state: "Telangana", country: "India", lat: 17.385, lng: 78.4867, timezone: 5.5 },
  { name: "Pune", state: "Maharashtra", country: "India", lat: 18.5204, lng: 73.8567, timezone: 5.5 },
  { name: "Ahmedabad", state: "Gujarat", country: "India", lat: 23.0225, lng: 72.5714, timezone: 5.5 },
  { name: "Lucknow", state: "Uttar Pradesh", country: "India", lat: 26.8467, lng: 80.9462, timezone: 5.5 },
  { name: "Chandigarh", state: "Punjab/Haryana", country: "India", lat: 30.7333, lng: 76.7794, timezone: 5.5 },
  { name: "Indore", state: "Madhya Pradesh", country: "India", lat: 22.7196, lng: 75.8577, timezone: 5.5 },
  { name: "Haridwar", state: "Uttarakhand", country: "India", lat: 29.9457, lng: 78.1642, timezone: 5.5 },
  { name: "Patna", state: "Bihar", country: "India", lat: 25.5941, lng: 85.1376, timezone: 5.5 },
  { name: "Bhopal", state: "Madhya Pradesh", country: "India", lat: 23.2599, lng: 77.4126, timezone: 5.5 },
  { name: "London", state: "England", country: "United Kingdom", lat: 51.5074, lng: -0.1278, timezone: 0.0 },
  { name: "New York", state: "NY", country: "United States", lat: 40.7128, lng: -74.006, timezone: -5.0 },
  { name: "Dubai", state: "Dubai", country: "United Arab Emirates", lat: 25.2048, lng: 55.2708, timezone: 4.0 },
  { name: "Singapore", state: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198, timezone: 8.0 },
];
