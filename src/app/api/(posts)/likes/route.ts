import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Post {
  id: string;
  title: string | null;
  content: string | null;
  likes: number | null;
  liked_by: string[];
  published: boolean | null;
  authorId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

//* UPDATE POST LIKES
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { postId, clerkId }: { postId: string; clerkId: string } = body;
  try {
    const userObj = await prisma.user.findUnique({
      where: { clerkId },
    });
    const userId = userObj?.id;

    if (!postId && typeof postId === "string") {
      return NextResponse.json(
        { message: "postId não existe ou é inválido" },
        { status: 400 }
      );
    }

    if (
      (!userId && typeof userId === "string") ||
      typeof userId === "undefined"
    ) {
      return NextResponse.json(
        { message: "userId não existe ou é inválido" },
        { status: 400 }
      );
    }

    const post: Post | null = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return NextResponse.json(
        { message: "post não existe ou é inválido" },
        { status: 400 }
      );
    }

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
