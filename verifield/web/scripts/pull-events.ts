async function pullEvents() {
  console.log("Pulling events...");
  try {
    const response = await fetch("http://localhost:3000/api/indexer", {
      method: "POST",
    });
    const data = await response.json();
    console.log("Indexer response:", data);
  } catch (error) {
    console.error("Error pulling events:", error);
  }
}

async function main() {
  while (true) {
    await pullEvents();
    // Wait for 10 seconds before pulling again
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
}

main();
