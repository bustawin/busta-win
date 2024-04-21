import { serve, server } from '@jutils/src.server/service/serve'

const app = await server()

serve(app)
