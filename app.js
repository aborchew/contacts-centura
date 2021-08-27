const express = require("express");
const logger = require("morgan");

const contactsRouter = require("./routes/contacts");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use("/contacts", contactsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) =>
  res.status(404).json({ error: "Nothing to see here..." })
);

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
