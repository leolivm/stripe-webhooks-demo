import Stripe from 'stripe'
import { version } from '../package.json'

export const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
  apiVersion: '2023-08-16',
  appInfo: {
    name: 'Webhooks Demo',
    version: version,
  },
})
