// Replace with your actual API key for Twelve Data
const apiKey = "ENTER YOUR API KEY HERE"; 

// Sample stock data
const stocks = [
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "MSFT", name: "Microsoft Corp." },
    { symbol: "GOOGL", name: "Alphabet Inc." },
    { symbol: "AMZN", name: "Amazon.com Inc." },
    { symbol: "TSLA", name: "Tesla Inc." },
    { symbol: "META", name: "Meta Platforms" },
    { symbol: "NFLX", name: "Netflix Inc." },
    { symbol: "NVDA", name: "NVIDIA Corp." },
    { symbol: "V", name: "Visa Inc." },
    { symbol: "JPM", name: "JPMorgan Chase & Co." }
];

// Fetch stock price from Twelve Data API
async function fetchStockPrice(tickerSymbol) {
    const url = `https://api.twelvedata.com/price?symbol=${tickerSymbol}&apikey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.price) {
            return data.price;
        } else {
            console.error("Error fetching stock price for " + tickerSymbol);
            return "N/A";
        }
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return "N/A";
    }
}

// Display stock data on the page
async function displayStocks() {
    const stocksContainer = document.getElementById("stocks");
    for (const stock of stocks) {
        const price = await fetchStockPrice(stock.symbol);
        const formattedPrice = price !== "N/A" ? parseFloat(price).toFixed(2) : "N/A";

        const stockCard = document.createElement("div");
        stockCard.className = "stock-card";
        stockCard.innerHTML = `
            <h2>${stock.symbol}</h2>
            <p><strong>${stock.name}</strong></p>
            <p>Price: $${formattedPrice}</p>
        `;
        stocksContainer.appendChild(stockCard);
    }
}

// Send chatbot messages
function sendMessage() {
    const input = document.getElementById("chat-input").value;
    document.getElementById("chat-input").value = "";
    if (input) {
        appendChatMessage("User", input);
        appendChatMessage("Chatbot", "Thank you for your query. I'll get back to you!");
    }
}

function appendChatMessage(sender, message) {
    const chatOutput = document.getElementById("chat-output");
    const messageElement = document.createElement("p");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatOutput.appendChild(messageElement);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

// Initialize the page with stock data
displayStocks();
