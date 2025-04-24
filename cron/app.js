const cron = require("node-cron");

const checkForShows = async () => {
  try {
    // await fetch("http://localhost:3000/addNewShows");
    await fetch("http://show-tracker-api-1:3000/addNewShows");
  } catch (error) {
    console.error("checkForShows error:", error);
  }
};

const archivePastShows = async () => {
  try {
    // await fetch("http://localhost:3000/archivePastShows");
    await fetch("http://show-tracker-api-1:3000/archivePastShows");
  } catch (error) {
    console.error("archivePastShows error:", error);
  }
};

console.log("Starting cron: checkForShows");

// Every day at 9am UTC -> 12pm EST
cron.schedule("0 9 * * *", () => {
  const date = new Date();
  console.log(`${date.toLocaleString()} - Checking for shows...`);
  checkForShows();
});

console.log("Starting cron: archivePastShows");

// Every day at 10am UTC -> 1pm EST
cron.schedule("0 10 * * *", () => {
  const date = new Date();
  console.log(`${date.toLocaleString()} - Archiving past shows...`);
  archivePastShows();
});
