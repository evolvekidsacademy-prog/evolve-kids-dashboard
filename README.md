# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## JaaS video calls

Jitsi as a Service calls are served by the Vercel function in `api/jaas-token.js`. Configure the JaaS and Supabase environment variables, then apply the Supabase migrations in order. Setup details and the exact variable names are in [supabase/README.md](./supabase/README.md).

Staff and students can join a shared JaaS room without a class assignment. Ending a direct call saves a `class_sessions` record with a null `batch_id`; staff/admin can then mark manual attendance for students assigned to their batches. Run all migrations in [supabase/README.md](./supabase/README.md) before deploying this flow.
