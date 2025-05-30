import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// ROTAS RELACIONADAS AOS POSTS, CREATE, UPDATE, DELETE ETC...import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const { userId } = await auth();

  return NextResponse.json({ userId });
  //TODO - NÃO ESTÁ RETORNANDO SEJA LÁ OQUE DEVERIA RETORNAR
}

//TODO - O userID será aramazenado junto ao registro do user no DB, ache o jeito que vai fazer isso