import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const response = await request.json(); 

        if (!response) {
            return NextResponse.json(
                {error: 'Mangler Noe i mail'}
            )
        }

        
    } catch {}
}