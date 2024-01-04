require("dotenv").config();
const createError = require('http-errors');
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./app_api/routes/index");
const path = require('path');


const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.static(path.join(__dirname + '/browser')));
app.use("/api", router);

// предоставление ангуяру делатиь ройтинг
app.get('/*',  function(req, res, next) {
    console.log("Reloading");
    res.sendFile('/browser/index.html', { root: __dirname });
});

const start = async () => {
  try {
    app.listen(PORT, () => console.log("Server started on port 5000"));
  } catch (err) {
    console.log(err);
  }
};

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

start().then();
