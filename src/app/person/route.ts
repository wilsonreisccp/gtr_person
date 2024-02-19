import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"
import { off } from "process"

export async function GET(req: NextRequest) {
  //const { searchParams } = new URL(req.url)
  //const id = searchParams.get("id") || ""

  try {
    const persons = await prisma.person.findMany({
      select: {
        id: true,
        name: true,
        birthday: true,
        email: true,
        observation: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { name: "desc" },
    })

    return NextResponse.json({
      message: "OK",
      persons
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error to the get all persons", error
      },
      {
        status: 500
      }
    )
  }
}

export async function POST(req: Request) {
  const {
    name,
    email,
    birthday,
    observation
  } = await req.json()

  try {
    const person = await prisma.person.create({
      data: {
        "name": name,
        "birthday": birthday,
        "email": email,
        "observation": observation
      }
    })

    console.log("Person create: ", person)

    return NextResponse.json({
      message: "OK",
      person,
      status: 200
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error to the create", error
      },
      {
        status: 500
      }
    )
  }
}

export async function PUT(req: Request) {
  const {
    id,
    name,
    email,
    birthday,
    observation
  } = await req.json()

  try {
    const person = await prisma.person.update({
      where: {
        id: id
      },
      data: {
        "name": name,
        "birthday": birthday,
        "email": email,
        "observation": observation
      }
    })

    console.log("Person update: ", person)

    return NextResponse.json({
      message: "OK",
      person,
      status: 200
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error to the update", error
      },
      {
        status: 500
      }
    )
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json()

  try {
    const person = await prisma.person.delete({
      where: {
        id: id
      }
    })

    console.log("Person delete: ", person)

    return NextResponse.json({
      message: "OK - Delete",
      person: person,
      status: 200
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error to the delete Person", error
      },
      {
        status: 500
      }
    )
  }
}