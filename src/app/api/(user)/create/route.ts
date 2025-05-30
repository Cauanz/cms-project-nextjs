// import prisma from "@/lib/prisma";
import prisma from "@/lib/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  //* NOTA: ELE VAI CHAMAR QUALQUER ROTA DE API COM O WEBHOOK, MAS ELE TEM QUE CONTER ESSE VERIFYWEBHOOK PARA PEGAR O PAYLOAD CORRETO (NÃO PRECISAR SER AQUELA ROTA WEBHOOKS/CLERK) SE VOCE QUISER PODE SER A ROTA DE CRIAÇÃO

  try {

    const evt = await verifyWebhook(req);
    const body = evt.data;
    
    // evt.data.id;
    // evt.data.created_at ?
    //evt.data.email_addresses[0].email_address
    //evt.data.first_name

    const userId = body.id;
    const email = body.email_addresses[0].email_address;
    const name = body.first_name;

    console.log(userId, email, name);

    // const existingUser = await prisma.user.findUnique({
    //   where: { clerkId: userId },
    // });

    // console.log("Estamos aqui");

    // if (existingUser) {
    //   return NextResponse.json(
    //     { message: "Usuário já existe" },
    //     { status: 200 }
    //   );
    // }

    // console.log("Agora estamos aqui");

    // const user = await prisma.user.create({
    //   data: {
    //     clerkId: userId,

    //   },
    // });

    // console.log("Finalmente aqui");

    // return NextResponse.json({ message: "Usuário criado com sucesso", user });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao criar um novo usuário", error: String(error) },
      { status: 500 }
    );
  }
}
