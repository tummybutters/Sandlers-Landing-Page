import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { processIntakeSubmission } from './api/intakeFlow.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'local-intake-api',
        configureServer(server) {
          server.middlewares.use('/api/intake', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Method not allowed' }))
              return
            }

            let body = ''

            req.on('data', (chunk) => {
              body += chunk
            })

            req.on('end', async () => {
              try {
                const requestEnv = {
                  ...env,
                  REQUEST_ORIGIN: `http://${req.headers.host || 'localhost:5173'}`,
                }
                const parsedBody = body ? JSON.parse(body) : {}
                const result = await processIntakeSubmission(parsedBody, requestEnv)

                res.statusCode = result.status
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(result.payload))
              } catch (error) {
                res.statusCode = error instanceof SyntaxError ? 400 : 500
                res.setHeader('Content-Type', 'application/json')
                res.end(
                  JSON.stringify({
                    error:
                      error instanceof SyntaxError
                        ? 'Request body must be valid JSON'
                        : error instanceof Error
                          ? error.message
                          : 'Failed to process intake submission',
                  }),
                )
              }
            })
          })
        },
      },
    ],
  }
})
