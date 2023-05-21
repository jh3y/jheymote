const toggleQrCode = function () {
  document.documentElement.dataset.showQrCode =
    document.documentElement.dataset.showQrCode === "true" ? "false" : "true";
};

export default toggleQrCode;