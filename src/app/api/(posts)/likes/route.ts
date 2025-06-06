import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//* UPDATE POST LIKES
export async function PUT(req: NextRequest) {
  const body = await req.json();
  try {
    const { like, postId } = body;

    if(!postId) {
      return NextResponse.json(
        { message: "postId ou like inválido" },
        { status: 400 }
      );
    }

    const updatePost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: like
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