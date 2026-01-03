import { NextResponse } from 'next/server'

import { connectToDatabase } from '@/db/mongo/connect'
import Count from '@/db/mongo/models/count'

export const dynamic = 'force-dynamic'
const id = 'page-views'
export async function GET() {
  try {
    return countAdd()
  } catch (error) {
    console.error('Error processing:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
export async function countAdd() {
  await connectToDatabase()
  let count = await Count.findOne({
    id,
  })
  if (count) {
    count.count++
    await count.save()
  } else {
    count = await Count.create({
      id,
      name: 'Page views',
      count: 0,
    })
  }

  return NextResponse.json(
    {
      message: 'processed successfully',
      count: count.count,
    },
    { status: 200 }
  )
}
