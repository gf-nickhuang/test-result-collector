// Function to parse JSON and reformat
function parseAndReformat(jsonString: string): unknown {
  try {
    // Parse JSON string into JavaScript object
    const parsedJson = JSON.parse(jsonString);

    // Reformat the JSON object (you can add your reformatting logic here)
    // For now, just return the original object as we haven't defined any specific formatting.
    return parsedJson;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    throw error; // You can choose to handle or propagate the error based on your application's requirements
  }
}
