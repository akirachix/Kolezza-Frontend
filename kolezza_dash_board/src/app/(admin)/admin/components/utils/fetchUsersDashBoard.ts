const url = '/api/users/';

export async function fetchUsers() {
    try {
      const response = await fetch(`${url}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }