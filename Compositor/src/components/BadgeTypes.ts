// Define badge types as a const assertion for better TypeScript inference
export const badgeTypes = [
  'primary', 
  'secondary', 
  'success', 
  'danger', 
  'warning', 
  'info', 
  'light', 
  'dark', 
  'married', 
  'single'
] as const;

// Create a union type from the badge types array
export type BadgeType = typeof badgeTypes[number];

// Type guard function to check if a value is a valid badge type
export function isBadgeType(value: string): value is BadgeType {
  return badgeTypes.includes(value as BadgeType);
}