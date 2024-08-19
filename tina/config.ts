import { defineConfig } from 'tinacms'
import { schema } from './schema'

const tinaConfig = defineConfig({
  tinaioConfig: {
    frontendUrlOverride: 'http://localhost:3002',
    identityApiUrlOverride: 'https://oz-identity.tinajs.dev',
    contentApiUrlOverride: 'https://oz-content.tinajs.dev',

    // Include next line only if you set DEPLOY_ASSETS_API to true for your instance...
    // assetsApiUrlOverride: 'https://assets-api-local-oz.tinajs.dev'
},
  schema,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch:
    // process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
    // process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    // process.env.HEAD!, // Netlify branch env
    "main",
  token: process.env.TINA_TOKEN!,
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
    },
  },
  media: {
    //@ts-ignore
    loadCustomStore: async () => {
      const pack = await import('next-tinacms-cloudinary')
      return pack.TinaCloudCloudinaryMediaStore
    },
  },

  build: { outputFolder: 'admin', publicFolder: 'public' },
  cmsCallback: (cms) => {
    import('react-tinacms-editor').then(({ MarkdownFieldPlugin }) => {
      cms.plugins.add(MarkdownFieldPlugin)
    })
    return cms
  },
})

export default tinaConfig
