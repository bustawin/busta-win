import '@remix-run/node'
import * as commands from '@src/service/commands'
declare module '@remix-run/node' {
  export interface LoaderArgs extends DataFunctionArgs {
    context: { commands: typeof commands }
  }

  export interface ActionArgs extends DataFunctionArgs {
    context: { commands: typeof commands }
  }
}
