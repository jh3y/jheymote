let slidTimer;
let currentSlide;
let currentSlideDirection;
const SLIDE_ACCELERATION_THRESHOLD = 20;
const SLIDE_DIRECTION_THRESHOLD = 150;

const handleMotion = function ({
  acceleration: { x },
  rotationRate: { gamma },
}) {
  const that = this;
  // Sliding acceleration?
  currentSlide = Math.round(x);
  currentSlideDirection = Math.round(gamma);
  // Detect if there's a slide
  if (
    currentSlide >= SLIDE_ACCELERATION_THRESHOLD &&
    (currentSlideDirection > SLIDE_DIRECTION_THRESHOLD ||
      currentSlideDirection < -SLIDE_DIRECTION_THRESHOLD)
  ) {
    if (currentSlideDirection > SLIDE_DIRECTION_THRESHOLD) {
      that.slide(1);
    } else {
      that.slide(-1);
    }
  }
};

const handler = async function (emoji) {
  const that = this
  that.motionHandler = handleMotion.bind(that);
  if (!that.gestureHandler) {
    that.gestureHandler = true
    if (
      DeviceMotionEvent?.requestPermission
    ) {
      Promise.all([
        DeviceMotionEvent.requestPermission(),
      ]).then((results) => {
        if (results.every((result) => result === "granted")) {
          window.addEventListener("devicemotion", that.motionHandler, true);
        }
      });
    } else {
      window.addEventListener("devicemotion", that.motionHandler, true);
    }
    console.info('Admin Remote:: Gestures enabled')
  } else {
    that.gestureHandler = false
    window.removeEventListener("devicemotion", that.motionHandler, true);
    console.info('Admin Remote:: Gestures disabled')
  }
}

export default handler