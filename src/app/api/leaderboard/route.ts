import { NextResponse } from 'next/server';

const LEADERBOARD_API_URL = "https://pfswt.zerodayarena.com/api/leaderboard";

export async function GET() {
  try {
    const response = await fetch(LEADERBOARD_API_URL, {
      next: { revalidate: 30 } // Revalidate every 30 seconds
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch leaderboard data: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred while fetching the leaderboard.' },
      { status: 500 }
    );
  }
}
