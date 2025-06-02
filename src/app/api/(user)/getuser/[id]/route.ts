// import prisma from "@/lib/prisma";
import prisma from "@/lib/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";


//ROTA PARA ADMIN JÁ QUE NÃO É PARA OS USUÁRIOS PODEREM VER OS OUTROS USUÁRIOS
//* GET USERS?
