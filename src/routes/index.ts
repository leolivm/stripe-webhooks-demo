import { Router, raw } from 'express'

import { webhooks } from 'src/services/webhook'

const router = Router()

router.post(
  '/webhooks',
  raw({ type: 'application/json' }),
  async (request, response) => {
    try {
      await webhooks({ request })
      return response.send()
    } catch (error) {
      return response.status(400).send({
        message:
          'Something went wrong. Please try again or contact support if error persists.',
      })
    }
  }
)

export { router }
