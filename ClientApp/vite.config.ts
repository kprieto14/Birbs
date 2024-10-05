import { defineConfig, loadEnv } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import checker from 'vite-plugin-checker'
import { EsLinter, linterPlugin } from 'vite-plugin-linter'
import { config } from 'dotenv'

// Load environment variables from .env file
config()

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    reactRefresh(),
    checker({
      // TypeScript config
      typescript: { tsconfigPath: './tsconfig.json' },
    }),
    linterPlugin({
      disableForBuild: true,
      include: ['./src/**/*.ts', './src/**/*.tsx'],
      linters: [
        new EsLinter({
          configEnv: configEnv,
          serveOptions: { cache: false, formatter: 'visualstudio' },
        }),
      ],
    }),
  ],
  define: {
    'process.env': process.env
  },
}))
