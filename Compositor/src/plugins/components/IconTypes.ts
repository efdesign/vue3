// Flaticon type definitions
// This file contains type definitions for Flaticon icons available via CDN

// Regular Rounded Icons (fi-rr-*)
export type FlatIconRegular = 
  | 'fi-rr-eye' | 'fi-rr-eye-crossed' | 'fi-rr-heart' | 'fi-rr-star'
  | 'fi-rr-home' | 'fi-rr-user' | 'fi-rr-users' | 'fi-rr-settings'
  | 'fi-rr-search' | 'fi-rr-menu-burger' | 'fi-rr-menu-dots'
  | 'fi-rr-cross' | 'fi-rr-check' | 'fi-rr-plus' | 'fi-rr-minus'
  | 'fi-rr-arrow-left' | 'fi-rr-arrow-right' | 'fi-rr-arrow-up' | 'fi-rr-arrow-down'
  | 'fi-rr-chevron-left' | 'fi-rr-chevron-right' | 'fi-rr-chevron-up' | 'fi-rr-chevron-down'
  | 'fi-rr-edit' | 'fi-rr-trash' | 'fi-rr-delete' | 'fi-rr-duplicate'
  | 'fi-rr-download' | 'fi-rr-upload' | 'fi-rr-share' | 'fi-rr-copy'
  | 'fi-rr-print' | 'fi-rr-save' | 'fi-rr-refresh' | 'fi-rr-undo' | 'fi-rr-redo'
  | 'fi-rr-folder' | 'fi-rr-folder-open' | 'fi-rr-file' | 'fi-rr-file-add'
  | 'fi-rr-document' | 'fi-rr-image' | 'fi-rr-video' | 'fi-rr-music'
  | 'fi-rr-calendar' | 'fi-rr-clock' | 'fi-rr-time' | 'fi-rr-stopwatch'
  | 'fi-rr-bell' | 'fi-rr-bell-ring' | 'fi-rr-mail' | 'fi-rr-envelope'
  | 'fi-rr-phone' | 'fi-rr-phone-call' | 'fi-rr-location' | 'fi-rr-marker'
  | 'fi-rr-lock' | 'fi-rr-unlock' | 'fi-rr-key' | 'fi-rr-shield'
  | 'fi-rr-shopping-cart' | 'fi-rr-shopping-bag' | 'fi-rr-credit-card' | 'fi-rr-money'
  | 'fi-rr-bookmark' | 'fi-rr-tag' | 'fi-rr-tags' | 'fi-rr-flag'
  | 'fi-rr-thumbs-up' | 'fi-rr-thumbs-down' | 'fi-rr-like' | 'fi-rr-dislike'
  | 'fi-rr-comment' | 'fi-rr-comments' | 'fi-rr-message' | 'fi-rr-chat'
  | 'fi-rr-info' | 'fi-rr-question' | 'fi-rr-exclamation' | 'fi-rr-warning'
  | 'fi-rr-bulb' | 'fi-rr-tools' | 'fi-rr-cog' | 'fi-rr-wrench'
  | 'fi-rr-link' | 'fi-rr-unlink' | 'fi-rr-clip' | 'fi-rr-paperclip'
  | 'fi-rr-zoom-in' | 'fi-rr-zoom-out' | 'fi-rr-expand' | 'fi-rr-compress'
  | 'fi-rr-grid' | 'fi-rr-list' | 'fi-rr-layout' | 'fi-rr-dashboard'

// Solid Rounded Icons (fi-sr-*)
export type FlatIconSolid = 
  | 'fi-sr-eye' | 'fi-sr-heart' | 'fi-sr-star' | 'fi-sr-home'
  | 'fi-sr-user' | 'fi-sr-users' | 'fi-sr-settings' | 'fi-sr-search'
  | 'fi-sr-menu-burger' | 'fi-sr-cross' | 'fi-sr-check' | 'fi-sr-plus'
  | 'fi-sr-minus' | 'fi-sr-arrow-left' | 'fi-sr-arrow-right'
  | 'fi-sr-arrow-up' | 'fi-sr-arrow-down' | 'fi-sr-chevron-left'
  | 'fi-sr-chevron-right' | 'fi-sr-chevron-up' | 'fi-sr-chevron-down'
  | 'fi-sr-edit' | 'fi-sr-trash' | 'fi-sr-folder' | 'fi-sr-file'
  | 'fi-sr-bell' | 'fi-sr-mail' | 'fi-sr-phone' | 'fi-sr-location'
  | 'fi-sr-lock' | 'fi-sr-unlock' | 'fi-sr-shopping-cart' | 'fi-sr-bookmark'
  | 'fi-sr-thumbs-up' | 'fi-sr-thumbs-down' | 'fi-sr-comment' | 'fi-sr-info'

// Brand Icons (fi-brands-*)
export type FlatIconBrands = 
  | 'fi-brands-github' | 'fi-brands-gitlab' | 'fi-brands-bitbucket'
  | 'fi-brands-twitter' | 'fi-brands-facebook' | 'fi-brands-instagram'
  | 'fi-brands-linkedin' | 'fi-brands-youtube' | 'fi-brands-tiktok'
  | 'fi-brands-google' | 'fi-brands-apple' | 'fi-brands-microsoft'
  | 'fi-brands-amazon' | 'fi-brands-netflix' | 'fi-brands-spotify'
  | 'fi-brands-discord' | 'fi-brands-slack' | 'fi-brands-telegram'
  | 'fi-brands-whatsapp' | 'fi-brands-pinterest' | 'fi-brands-reddit'

// Line Icons (fi-rr-* alternative naming)
export type FlatIconLine = 
  | 'fi-rs-eye' | 'fi-rs-heart' | 'fi-rs-star' | 'fi-rs-home'
  | 'fi-rs-user' | 'fi-rs-settings' | 'fi-rs-search' | 'fi-rs-menu-burger'

// Union of all available icon types
export type FlatIconName = FlatIconRegular | FlatIconSolid | FlatIconBrands | FlatIconLine

// Helper function to check if a string is a valid icon name
export function isFlatIconName(value: string|undefined): value is FlatIconName {
  // This could be expanded to include runtime validation
  return typeof value === 'string' && value.startsWith('fi-')
}

// Icon categories for easier organization
export const IconCategories = {
  navigation: ['fi-rr-home', 'fi-rr-arrow-left', 'fi-rr-arrow-right', 'fi-rr-menu-burger'] as const,
  actions: ['fi-rr-edit', 'fi-rr-trash', 'fi-rr-save', 'fi-rr-download', 'fi-rr-upload'] as const,
  communication: ['fi-rr-mail', 'fi-rr-phone', 'fi-rr-message', 'fi-rr-chat'] as const,
  social: ['fi-brands-twitter', 'fi-brands-facebook', 'fi-brands-instagram', 'fi-brands-linkedin'] as const,
  interface: ['fi-rr-settings', 'fi-rr-search', 'fi-rr-bell', 'fi-rr-user'] as const,
  media: ['fi-rr-image', 'fi-rr-video', 'fi-rr-music', 'fi-rr-file'] as const
} as const

export type IconCategory = keyof typeof IconCategories
