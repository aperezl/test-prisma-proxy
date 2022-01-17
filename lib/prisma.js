import { PrismaClient } from '@prisma/client'

let prisma

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prima) {
    global.prima = new PrismaClient()
  }
  prisma = global.prima
}

export default prisma