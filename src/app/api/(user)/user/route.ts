// import prisma from "@/lib/prisma";
import prisma from "@/lib/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

//* NOTA: ELE VAI CHAMAR QUALQUER ROTA DE API COM O WEBHOOK, MAS ELE TEM QUE CONTER ESSE VERIFYWEBHOOK PARA PEGAR O PAYLOAD CORRETO (NÃO PRECISAR SER AQUELA ROTA WEBHOOKS/CLERK) SE VOCE QUISER PODE SER A ROTA DE CRIAÇÃO

//* CREATE USER / CLERK AUTH
export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const body = evt.data;

    // evt.data.id;
    //evt.data.email_addresses[0].email_address
    //evt.data.first_name

    if (
      !("email_addresses" in body) ||
      !Array.isArray(body.email_addresses) ||
      !body.email_addresses[0]
    ) {
      return NextResponse.json(
        { message: "Payload do webhook não contém email_addresses" },
        { status: 400 }
      );
    }

    const userId = body.id;
    const email = body.email_addresses[0].email_address;
    const name = body.first_name;

    console.log(userId, email, name);

    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Usuário já existe" },
        { status: 200 }
      );
    }

    const user = await prisma.user.create({
      data: {
        clerkId: userId,
        name,
        email,
      },
    });

    return NextResponse.json({ message: "Usuário criado com sucesso", user });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao criar um novo usuário", error },
      { status: 500 }
    );
  }
}

//* GET USER

//* UPDATE USER

//* DELETE USER