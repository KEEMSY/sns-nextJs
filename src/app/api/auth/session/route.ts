import { NextResponse } from 'next/server'
import { authOptions } from "../options"
import { getServerSession } from "next-auth/next"
export async function GET() {
    const session = await getServerSession(authOptions)
    return NextResponse.json(session)
  }