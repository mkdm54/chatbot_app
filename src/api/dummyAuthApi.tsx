// Free Fake REST API for Placeholder JSON Data https://dummyjson.com/docs/auth
export const loginUser = async (username: string, password: string) => {
  console.log("Mencoba login dengan", username, password);
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username:username,
        password: password,
        expiresInMins: 30,
      }),
      credentials: 'include'
    });

    const data = await response.json();
    console.log("API response:", data);

    if (data.message || data.error) {
      throw new Error(data.message || data.error);
    }

    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    return { error: error instanceof Error ? error.message : "Login failed" };
  }
};
