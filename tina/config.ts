import { defineConfig } from 'tinacms'

// Force re-index: 2025-07-31T16:30:00Z

export default defineConfig({
  // Comment out or remove this line to always use TinaCloud
  // contentApiUrlOverride: 
  //   process.env.NODE_ENV === "development" 
  //     ? "http://localhost:4001/graphql" 
  //     : undefined,
  
  branch: 'main',
  clientId: process.env.TINA_CLIENT_ID || process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'metrics',
        label: 'Metrics',
        path: 'content/metrics',
        format: 'json',
        fields: [
          {
            type: 'string',
            name: 'category',
            label: 'Category',
            required: true,
            ui: {
              validate: (value) => {
                if (!value || value.trim() === '') {
                  return 'Category is required'
                }
              }
            }
          },
          {
            type: 'string',
            name: 'week',
            label: 'Week',
            required: true,
            ui: {
              validate: (value) => {
                if (!value || value.trim() === '') {
                  return 'Week is required'
                }
              }
            }
          },
          {
            type: 'object',
            name: 'data',
            label: 'Data',
            required: false, // Make the entire object optional
            fields: [
              {
                type: 'number',
                name: 'value',
                label: 'Value',
                required: false,
                ui: {
                  // Add a helpful description
                  description: 'Enter a numeric value (leave empty if not applicable)',
                  // Optional: Add validation if you want to enforce certain rules
                  validate: (value) => {
                    // Allow null/empty values
                    if (value === null || value === undefined || value === '') {
                      return
                    }
                    // Check if it's a valid number
                    if (typeof value === 'number' && !isNaN(value)) {
                      return
                    }
                    return 'Please enter a valid number'
                  },
                }
              },
              {
                type: 'string',
                name: 'unit',
                label: 'Unit',
                required: false,
                ui: {
                  description: 'e.g., hours, dollars, percentage',
                }
              },
              {
                type: 'string',
                name: 'trend',
                label: 'Trend',
                required: false,
                options: ['up', 'down', 'stable', 'n/a'],
                ui: {
                  description: 'Select the trend direction',
                }
              },
            ],
          },
        ],
      },
      {
        name: 'findings',
        label: 'Findings',
        path: 'content/findings',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
            ui: {
              validate: (value) => {
                if (!value || value.trim() === '') {
                  return 'Title is required'
                }
                if (value.length < 3) {
                  return 'Title must be at least 3 characters long'
                }
              }
            }
          },
          {
            type: 'string',
            name: 'category',
            label: 'Category',
            options: ['WORK', 'LIFE'],
            required: true,
            ui: {
              validate: (value) => {
                if (!value) {
                  return 'Please select a category'
                }
              }
            }
          },
          {
            type: 'string',
            name: 'week',
            label: 'Week',
            required: true,
            ui: {
              validate: (value) => {
                if (!value || value.trim() === '') {
                  return 'Week is required'
                }
                // Optional: Add week format validation
                // Example: if expecting format like "2024-W01"
                // const weekPattern = /^\d{4}-W\d{2}$/
                // if (!weekPattern.test(value)) {
                //   return 'Week format should be YYYY-WXX (e.g., 2024-W01)'
                // }
              }
            }
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Date',
            required: true,
            ui: {
              dateFormat: 'YYYY-MM-DD',
              validate: (value) => {
                if (!value) {
                  return 'Date is required'
                }
                // Check if date is not in the future
                const selectedDate = new Date(value)
                const today = new Date()
                if (selectedDate > today) {
                  return 'Date cannot be in the future'
                }
              }
            }
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
      {
        name: 'apps',
        label: 'Apps',
        path: 'content/apps',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
            ui: {
              validate: (value) => {
                if (!value || value.trim() === '') {
                  return 'Title is required'
                }
                if (value.length < 2) {
                  return 'Title must be at least 2 characters long'
                }
                if (value.length > 100) {
                  return 'Title must be less than 100 characters'
                }
              }
            }
          },
          {
            type: 'string',
            name: 'status',
            label: 'Status',
            options: ['concept', 'development', 'testing', 'launched'],
            required: false,
            ui: {
              description: 'Current status of the app',
            }
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: false,
            ui: {
              component: 'textarea',
              description: 'Brief description of the app',
              validate: (value) => {
                if (value && value.length > 500) {
                  return 'Description must be less than 500 characters'
                }
              }
            }
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
    ],
  },
})
// Remove everything after this line
