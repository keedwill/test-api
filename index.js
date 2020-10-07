const express = require("express");
const { DB, PORT } = require("./config/index");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')

const app = express();

app.use(express.json())


//routes
app.use("/api/users", require("./routes/users"));





// connect to database
startApp = async () => {
  try {
    await mongoose.connect(DB, {
      useUnifiedTopology: true,
      useFindAndModify: true,
      useNewUrlParser: true,
    });
    console.log(`Succesfully connected to  \n${DB}`);
    app.listen(PORT, () => console.log(`Sever started on port ${PORT}`));
  } catch (err) {
    console.log(`Unable to connect with database ${err}`);
    startApp();
  }
};
startApp();
