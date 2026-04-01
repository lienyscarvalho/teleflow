# TeleFlow — Gerenciamento de Atividades para Técnicos de Campo

## Visão Geral
Aplicativo web completo para gerenciar tarefas e técnicos de campo na área de telecomunicações. Interface 100% em português do Brasil.

## Arquitetura
- **Frontend**: React + TypeScript + Vite, shadcn/ui, TanStack Query, Wouter
- **Backend**: Express.js + TypeScript
- **Banco de Dados**: PostgreSQL com Drizzle ORM
- **Autenticação**: Replit Auth (OAuth)

## Funcionalidades Principais
- Dashboard com estatísticas de tarefas (pendentes, em andamento, concluídas, canceladas)
- Gerenciamento completo de tarefas (CRUD, filtros, busca, histórico, comentários)
- Gerenciamento de técnicos (CRUD, ativar/desativar, busca)
- Importação em lote via CSV/Excel para tarefas e técnicos
- Download de planilha modelo para importação
- Sistema de comentários e histórico de alterações de status

## Estrutura do Banco de Dados
- `users` — gerenciado pelo Replit Auth
- `sessions` — sessões de autenticação
- `tasks` — tarefas de campo
- `task_updates` — histórico e comentários das tarefas
- `technicians` — técnicos de campo (cadastro independente)

## Páginas
- `/` — Landing (redireciona para /dashboard se autenticado)
- `/dashboard` — Painel com métricas
- `/tasks` — Gerenciamento de tarefas + importação CSV/Excel
- `/technicians` — Gerenciamento de técnicos + importação CSV/Excel
- `/settings` — Configurações do usuário

## Comandos Úteis
- `npm run dev` — Inicia o servidor de desenvolvimento
- `npm run db:push` — Sincroniza o schema com o banco de dados
