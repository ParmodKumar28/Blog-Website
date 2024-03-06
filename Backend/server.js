// Importing the server from app.js and listening here.
// Imports
import connectToDB from "./src/Database/configDB.js";
import app from "./src/app.js";

// Listen
app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log("Something went wrong while listening to server: " + error);
  } else {
    // Connecting DB
    connectToDB();
    console.log("Server is listening on http://localhost:" + process.env.PORT);
  }
});
