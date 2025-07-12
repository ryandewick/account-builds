const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5050/api";

export async function getBuilds() {
  const response = await fetch(`${API_BASE_URL}/builds`);

  if (!response.ok) {
    throw new Error(`Error fetching builds: ${response.statusText}`);
  }

  return await response.json();
}

export async function getBuildSteps(id: string) {
  const response = await fetch(`${API_BASE_URL}/builds/${id}/steps`);

  if (!response.ok) {
    throw new Error(`Error fetching builds: ${response.statusText}`);
  }

  return await response.json();
}
