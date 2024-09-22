
import { NextResponse } from 'next/server';
const baseURL = process.env.BASE_URL;
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${baseURL}/api/children/?search=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const users = await response.json();
    
    const filteredUsers = users.child.filter((user: { first_name: string; last_name: string; }) =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(query.toLowerCase())
    );

    return NextResponse.json(filteredUsers);

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
