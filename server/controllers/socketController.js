let io;

exports.setSocketIoInstance = (ioInstance) => {
  io = ioInstance;
};

exports.getSocketIoInstance = () => {
  if (!io) {
    throw new Error("Socket.IO instance has not been initialized.");
  }
  return io;
};