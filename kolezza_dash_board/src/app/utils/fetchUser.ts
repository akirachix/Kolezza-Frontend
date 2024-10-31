export const fetchUsers = async () => {
    try {
        const response = await fetch('/api/getUsers');
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', (error as Error).message);
        throw error;
    }
};
