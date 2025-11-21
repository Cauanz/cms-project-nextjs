import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//* UPDATE POST LIKES
export async function PUT(req: NextRequest) {
  const body = await req.json();
  try {
    const { like, postId } = body;

    //TODO - RECEBER APENAS POSTID, RECUPERAR QUANTIDADE DE LIKES AQUI
    //TODO - VERIFICAR SE USER JÁ DEU LIKE, SE SIM, DECREMENTA, SE NÃO, INCREMENTA


    if(!postId) {
      return NextResponse.json(
        { message: "postId ou like inválido" },
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId
      }
    })

    console.log(post)

    const updatePost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: like
        // likes: post?.liked_by.includes(userId) ? post?.likes += 1: post?.likes -= 1
      },
    });

    return NextResponse.json(
      { message: "Likes atualizado com sucesso", updatePost },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao atualizar likes", error },
      { status: 500 }
    );
  }
}