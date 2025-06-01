// import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// ROTAS RELACIONADAS AOS POSTS, CREATE, UPDATE, DELETE ETC...
// import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const { title, content, authorId } = body;

    const user = await prisma.user.findUnique({
      where: { clerkId: authorId }
    })

    if(!user) {
      return NextResponse.json({ message: "User não encontrado"}, { status: 500});
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: user.id
      }
    })


    const userPosts = await prisma.post.findMany({
      where: { authorId: user.id }
    });

    console.log(title, content, authorId, user);
    console.log("Posts do user:", userPosts);

    //TODO - REMOVER PARTE DOS USERPOSTS (ERA TESTE PARA VER COMO PEGAR OS POSTS DO USER), E TERMINAR ISSO / FAZER O PRÓXIMO, DE PEGAR POSTS ETC..

    return NextResponse.json(
      { message: "Post criado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ocorreu um problema ao tentar criar um post", error },
      { status: 500 }
    );
  }
}

//TODO - O userID será aramazenado junto ao registro do user no DB, ache o jeito que vai fazer isso
