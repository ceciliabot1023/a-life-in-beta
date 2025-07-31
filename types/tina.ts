// TinaCMS content types
export type TinaMarkdownContent = any // TinaCMS rich-text content type
export type TinaRichTextContent = any // Alternative alias for clarity

// More specific interfaces for your content
export interface TinaFinding {
  id: string
  title: string
  category: string
  week: string
  date: string
  body: TinaMarkdownContent | null
}

export interface TinaApp {
  id: string
  title: string
  status: string
  description: TinaMarkdownContent
  body: TinaMarkdownContent
}