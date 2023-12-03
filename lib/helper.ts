import { NextApiRequest } from "next/types"
import { getToken } from "next-auth/jwt"





const secret = process.env.NEXTAUTH_SECRET

export default async function handler(req: NextApiRequest) {
  const token = await getToken({ req })
}
