// import prisma from "@/lib/prisma";
import prisma from "@/lib/prisma";
// import { verifyWebhook } from "@clerk/nextjs/webhooks"; //TODO - pesquisar se precisamos usar isso em algum lugar, porque eu não lembro
import { NextRequest, NextResponse } from "next/server";

//* GET USER
// RETORNA ID (DO DB) E CLERKID DO USUÁRIO USANDO SOMENTE O CLERKID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const ResolvedParams = await params;
  const clerkId = ResolvedParams.id;

  try {
    if (!clerkId) {
      return NextResponse.json(
        { message: "Erro, clerkId não é válido ou não existe" },
        { status: 500 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message:
            "Erro ao recuperar usuário, usuário não existe ou clerkId é inválido",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: user.id,
      clerkId: user.clerkId,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao recuperar usuário com clerkId", error },
      { status: 500 }
    );
  }
}
