


export async function GET(request: Request) {
    const baseUrl = process.env.BASE_URL;

  
    try {
      const response = await fetch(`${baseUrl}/api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
       
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }
  
      const result = await response.json();
      return new Response(JSON.stringify(result), {
        status: 201,
        statusText: 'Users Fetched Successful',
      });
    } catch (error) {
      return new Response((error as Error).message, {
        status: 500,
      });
    }
  }
  