import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth.config";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        email: true,
        bio: true,
        location: true,
        targetRole: true,
        experienceLevel: true,
        role: true,
        careerScore: true,
        image: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error("Error fetching user settings:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, bio, location, targetRole, experienceLevel } = body;

    // Optional validation
    if (name && name.trim().length === 0) {
      return NextResponse.json({ error: "Name cannot be empty" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name?.trim(),
        bio: bio?.trim() ?? null,
        location: location?.trim() ?? null,
        targetRole: targetRole?.trim() ?? null,
        experienceLevel: experienceLevel ?? null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        location: true,
        targetRole: true,
        experienceLevel: true,
        image: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
      user: updatedUser,
    });
  } catch (error: any) {
    console.error("Error updating user settings:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
