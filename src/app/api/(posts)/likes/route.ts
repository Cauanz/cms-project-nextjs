import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//* UPDATE POST LIKES
export async function PUT(req: NextRequest) {
  const body = await req.json();
  try {
    const { postId, userId }: { postId: string; userId: string } = body;

    if (!postId) {
      return NextResponse.json(
        { message: "postId ou like inválido" },
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (post?.liked_by.includes(userId)) {
      const updatedLikedBy = post.liked_by.filter((id) => id !== userId);

      const updatePost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likes: {
            decrement: 1,
          },
          liked_by: updatedLikedBy,
        },
      });

      return NextResponse.json(
        { message: "Likes atualizado com sucesso", updatePost },
        { status: 200 }
      );
    } else {

      const updatedLikedBy = [...(post?.liked_by ?? []), userId];

      const updatePost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likes: {
            increment: 1,
          },
          liked_by: {
            set: updatedLikedBy,
          },
        },
      });

      return NextResponse.json(
        { message: "Likes atualizado com sucesso", updatePost },
        { status: 200 }
      );
    }

  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao atualizar likes", error },
      { status: 500 }
    );
  }
}
