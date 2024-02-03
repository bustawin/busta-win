import '@remix-run/node'
import { commands } from '@src/service/commands.server'
declare module '@remix-run/node' {
  export interface LoaderArgs extends DataFunctionArgs {
    context: { commands: typeof commands }
  }

  export interface ActionArgs extends DataFunctionArgs {
    context: { commands: typeof commands }
  }
}
