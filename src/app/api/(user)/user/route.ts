import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

//* NOTA: ELE VAI CHAMAR QUALQUER ROTA DE API COM O WEBHOOK, MAS ELE TEM QUE CONTER ESSE VERIFYWEBHOOK PARA PEGAR O PAYLOAD CORRETO (NÃO PRECISAR SER AQUELA ROTA WEBHOOKS/CLERK) SE VOCE QUISER PODE SER A ROTA DE CRIAÇÃO

//* CREATE USER / CLERK AUTH
export async function POST(req: NextRequest) {
  const client = await clerkClient();
  try {
    const body = await req.json();

    // evt.data.id;
    //evt.data.email_addresses[0].email_address
    //evt.data.first_name

    const { name, email, password } = body;
    //PROVAVELMENTE A VERIFICAÇÃO PARA GARANTIR QUE TODOS OS CAMPOS ESTÃO AQUI SERIA NO FRONT

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Usuário já existe" },
        { status: 200 }
      );
    }

    const clerkUser = await client.users.createUser({
      username: name,
      emailAddress: [email],
      password: password
    })

    const user = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
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
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  try {

    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "userId não informado" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if(!user) {
      return NextResponse.json(
        { message: "Nenhum usuário encontrado"},
        { status: 500 }
      )
    }

    return NextResponse.json(
      { user }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ocorreu um erro ao tentar recuperar o user", error },
      { status: 500 }
    );
  }

}

//* UPDATE USER
//Assumindo que o usuário criou a conta usando o Google, oque não permite alterar email
export async function PUT(req: NextRequest) {
  const body = await req.json();
  //TODO - Adicionar forma de verificar se conta usa Google ou não e talvez permitir alterar email nesse caso
  try {
    const { name, userId } = body;
    //POR ENQUANTO SEM FORMA DE MUDAR SENHA, TALVEZ EU DESCUBRA

    const updateUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        name,
      },
    });

    revalidatePath("/");
    return NextResponse.json(
      { message: "Usuário atualizado com sucesso", updateUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ocorreu um problema ao tentar atualizar o usuário", error },
      { status: 500 }
    );
  }
}

//* DELETE USER
export async function DELETE(req: NextRequest) {
  const body = await req.json();
  try {
    const { userId } = body;

    const deleteUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    revalidatePath("/");
    return NextResponse.json(
      { message: "Usuário apagado com sucesso", deleteUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ocorreu um problema ao tentar apagar o usuário", error },
      { status: 500 }
    );
  }
}