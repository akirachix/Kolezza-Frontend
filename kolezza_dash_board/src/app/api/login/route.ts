export async function POST(request: Request) {
  const baseURL = process.env.BASE_URL; 

  const { username, password } = await request.json();

  if (!username || !password) {
      return new Response('Username and password are missing', {
          status: 400,
      });
  }

  try {
      const response = await fetch(`${baseURL}/api/login/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
          const errorData = await response.json();
          return new Response(errorData.message || 'Login failed', {
              status: response.status,
          });
      }

      const data = await response.json();
      return new Response(JSON.stringify(data), {
          status: 201,
      });
  } catch (error) {
      return new Response((error as Error).message || 'Internal server error', {
          status: 500,
      });
  }
}
