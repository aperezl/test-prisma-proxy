import prisma from '../lib/prisma'
import { getSession } from "next-auth/react"

export async function createContext(req, res) {
  console.log(req.cookies)
  return {
    prisma,
    // session: await getSession({ req })
  }
}