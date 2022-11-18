const { createLogger, transports, format } = require("winston");
const { combine, timestamp, simple, colorize, printf, label } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {
  return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = {
  file: combine(
    label({
      label: "백엔드 맛보기",
    }),
    // colorize(),
    timestamp({
      format: "YYYY-MM-DD HH:mm:dd",
    }),
    printFormat
  ),
  console: combine(
    colorize(),
    simple()
  )
};

const opts = {
  file: new transports.File({
    filename: "access.log",
    dirname: "./log",
    level: "info",
    format: printLogFormat.file,
  }),
  console: new transports.Console({
    level: "info",
    format: printLogFormat.console,
  }),
};

const logger = createLogger({
  transports: [opts.file],
});
// production - 실제 서비스 중인 서버를 나타냄
if (process.env.NODE_ENV !== "production") {
  logger.add(opts.console);
  // logger에 추가한다.
}

// morgan 이랑 같이 써주기 위한 것
// logger.stream={
//   write: (message)=> logger.info(message),
// }

module.exports = logger;
