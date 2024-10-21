import { fastifyApp } from '@/shared/http/app'
import { env } from '../core/config/env'

fastifyApp.listen({ host: '0.0.0.0', port: env.PORT }).then(() => {
  console.log(`#######################################
# 💻 Server listening on port ${env.PORT} 💻 #
#######################################`)
})
