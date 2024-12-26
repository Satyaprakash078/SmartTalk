// openai.js (Updated)
export async function sendMsgToOpenAi(messages) {
    try {
        // Send the messages to the backend (backend now handles OpenAI API)
        const response = await fetch('http://localhost:5000/api/openai', { // Backend endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages }), // Send the messages to backend
        });

        if (!response.ok) {
            throw new Error("Failed to fetch from backend");
        }

        const data = await response.json(); // Get the response from backend
        return data.text; // Assuming backend returns { text: "Bot's response" }
    } catch (error) {
        console.error("Error communicating with OpenAI:", error);
        throw error; // Rethrow the error for further handling
    }
}
