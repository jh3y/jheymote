const toggleCounter = function () {
  document.documentElement.dataset.showPopCounter =
    document.documentElement.dataset.showPopCounter === 'true' ? 'false' : 'true';
};

export default toggleCounter;