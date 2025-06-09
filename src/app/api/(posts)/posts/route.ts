import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// ROTAS RELACIONADAS AOS POSTS, CREATE, UPDATE, DELETE ETC...

//* CREATE POST
export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const { title, content, authorId } = body;

    const user = await prisma.user.findUnique({
      where: { clerkId: authorId },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User não encontrado" },
        { status: 500 }
      );
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: user.id,
      },
    });

    revalidatePath("/posts");
    return NextResponse.json(
      { message: "Post criado com sucesso", newPost },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ocorreu um problema ao tentar criar um post", error },
      { status: 500 }
    );
  }
}

//* GET POSTS
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  try {
    const clerkId = searchParams.get("clerkId");

    let posts: object[];
    if (clerkId) {
      const user = await prisma.user.findUnique({ where: { clerkId } });
      if (!user) {
        return NextResponse.json({ posts: [] }, { status: 200 });
      }
      posts = await prisma.post.findMany({
        where: { authorId: user.id },
        orderBy: { createdAt: "desc" },
      });
    } else {
      posts = await prisma.post.findMany({
        include: {
          author: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    if (!posts) {
      return NextResponse.json(
        { message: "Não há posts a serem recuperados" },
        { status: 500 }
      );
    }

    revalidatePath("/");
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Ocorreu um problema ao tentar recuperar os posts", error },
      { status: 500 }
    );
  }
}

//* UPDATE POST
export async function PUT(req: NextRequest) {
  const body = await req.json();
  try {
    const { title, content, postId } = body;

    if (!postId) {
      return NextResponse.json(
        { message: "PostId não encontrado no payload" },
        { status: 500 }
      );
    }

    const updatePost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        content,
      },
    });

    revalidatePath("/");
    return NextResponse.json(
      { message: "Post atualizado com sucesso", updatePost },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ocorreu um problema ao tentar atualizar o post", error },
      { status: 500 }
    );
  }
}

//*DELETE POST
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  try {
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        {
          message: "Post Id não informado ou encontrado",
        },
        { status: 500 }
      );
    }

    const deletePost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    revalidatePath("/");
    return NextResponse.json(
      { message: "Post apagado com sucesso", deletePost },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ocorreu um problema ao tentar apagar o post", error },
      { status: 500 }
    );
  }
}
//TODO - O userID será aramazenado junto ao registro do user no DB, ache o jeito que vai fazer isso
