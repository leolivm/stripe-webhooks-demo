import Stripe from 'stripe'
import { Request } from 'express'

import { stripe } from 'src/stripe'
import { AppError } from 'src/error'

interface IRequest {
  request: Request
}

const webhook = process.env.STRIPE_WEBHOOK_SECRET as string

const relevantEvents = new Set([
  'payment_intent.succeeded',
  'customer.subscription.updated',
  'customer.subscription.deleted',
])

export async function webhooks({ request }: IRequest) {
  if (request.method === 'POST') {
    const secret = request.headers['stripe-signature'] as
      | string
      | Buffer
      | string[]

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(request.body, secret, webhook)
    } catch (error) {
      throw new AppError({ message: error as string, statusCode: 400 })
    }

    const { type } = event

    console.log(type)

    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object
            // logic here
            break
          }

          case 'customer.subscription.updated':
          case 'customer.subscription.deleted': {
            const subscription = event.data.object
            // logic here
            break
          }

          default:
            throw new AppError({
              message: `Unhandled event type ${type}`,
              statusCode: 500,
            })
        }
      } catch (error) {
        throw new AppError({ message: error as string, statusCode: 400 })
      }
    }
  } else {
    throw new AppError({ message: 'Method not allowed', statusCode: 405 })
  }
}
