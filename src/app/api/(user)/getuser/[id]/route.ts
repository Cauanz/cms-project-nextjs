// import prisma from "@/lib/prisma";
import prisma from "@/lib/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";


//* GET USER
export async function GET(req: NextRequest) {
  //TODO - TERMINAR ESSA ROTA PARA PEGAR O USUÁRIO DO DB USANDO CLERKID E USAR PARA FUNÇÃO DE LIKES UNICOS
}
