import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const recentDatasets = await prisma.dataset.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(recentDatasets);
  } catch (error) {
    console.error("Error fetching recent datasets:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent datasets" },
      { status: 500 }
    );
  }
}
