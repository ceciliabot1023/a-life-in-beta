import { defineConfig } from 'tinacms'

// Force re-index: 2025-07-31T16:30:00Z

export default defineConfig({
  contentApiUrlOverride: 
    process.env.NODE_ENV == "development" 
      ? "http://localhost:4001/graphql" 
      : `https://content.tinajs.io/1.6/content/${process.env.TINA_CLIENT_ID || process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${process.env.TINA_BRANCH}`,
  
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
          },
          {
            type: 'string',
            name: 'week',
            label: 'Week',
            required: true,
          },
          {
            type: 'object',
            name: 'data',
            label: 'Data',
            fields: [
              {
                type: 'number',
                name: 'value',
                label: 'Value',
              },
              {
                type: 'string',
                name: 'unit',
                label: 'Unit',
              },
              {
                type: 'string',
                name: 'trend',
                label: 'Trend',
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
          },
          {
            type: 'string',
            name: 'category',
            label: 'Category',
            options: ['WORK', 'LIFE'],
            required: true,
          },
          {
            type: 'string',
            name: 'week',
            label: 'Week',
            required: true,
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Date',
            required: true,
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
          },
          {
            type: 'string',
            name: 'status',
            label: 'Status',
            options: ['concept', 'development', 'testing', 'launched'],
          },
          {
            type: 'rich-text',
            name: 'description',
            label: 'Description',
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
