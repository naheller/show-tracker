const cron = require("node-cron");

const checkForShows = async () => {
  try {
    // await fetch("http://localhost:3000/addNewShows");
    await fetch("http://show-tracker-api-1:3000/addNewShows");
  } catch (error) {
    console.error("checkForShows error:", error);
  }
};

console.log("Starting cron: checkForShows");

// Every morning at 6am
cron.schedule("0 6 * * *", () => {
  const date = new Date();
  console.log(`${date.toLocaleString()} - Checking for shows...`);
  checkForShows();
});
