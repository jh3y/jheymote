import gsap from "gsap";
import { Physics2DPlugin } from "gsap/dist/Physics2DPlugin";

import getBear from "./getParachuteBear.js";

let count = 0
let POP

const parachute = () => {
  gsap.registerPlugin(Physics2DPlugin);
  const hue = gsap.utils.random(0, 359, 1);
  const pos = gsap.utils.random(10, 60, 1);
  const BEAR = Object.assign(document.createElement("div"), {
    className: "bear__container",
    style: `--eye-delay: ${gsap.utils.random(0, 3, 1)}; --pos: ${pos};`,
    innerHTML: `<div class="parachuter">
      ${getBear(hue)}
    </div>`,
  });
  const PARACHUTE = BEAR.querySelector(".parachute");
  const BEAR_SVG = BEAR.querySelector(".bear");
  gsap.set(PARACHUTE, { scale: 0, transformOrigin: "50% 100%" });
  const unlucky = Math.random() > 0.5;
  document.body.appendChild(BEAR);


  const duration = gsap.utils.random(0.5, 1, 0.1);
  const velocity = gsap.utils.random(900, 1200, 1);
  const delay = gsap.utils.random(0.25, 0.5, 0.1);
  const DISTANCE = window.innerHeight * 0.5

  if (velocity >= 630 && Math.random() > 0.5 && count > 3) {
    console.info('Do an r2 animation')
    // gsap.to(BEAR.firstChild, {
    //   y: -window.innerHeight * 2,
    //   duration: window.innerHeight / DISTANCE_PER_SECOND,
    //   onStart: () => {
    //     // R2_SCREAM.pause();
    //     // R2_SCREAM.currentTime = 0;
    //     // R2_SCREAM.play();
    //   },
    //   onComplete: () => {
    //     BEAR.remove();
    //   },
    // });
  } else {
    // Do a physics animations...

    const left = Math.random() > 0.5;
    // At this point we need to make the parachuter jump but not the bear.
    // Start by clipping the bear and then unclip after peak jump...
    const JUMP = gsap
      .to(BEAR.firstChild, {
        y: -DISTANCE,
        duration: 8,
        physics2D: {
          velocity,
          angle: left ? -95 : -85,
          gravity: velocity * 0.8,
        },
        onComplete: () => {
          BEAR.remove();
        },
      })
      .timeScale(2.2);
    gsap.delayedCall(delay + gsap.utils.random(0.2, 0.5), () => {
      gsap
        .timeline({
          onStart: () => {
            if (!POP) POP = new Audio('/shared/audio/pop.mp3')
            POP.pause();
            POP.currentTime = 0;
            POP.play();
            if (Math.random() > 0.5) {
              gsap.to(BEAR_SVG, {
                x: left ? -window.innerWidth : window.innerWidth,
                duration: 30,
              });
            }
          },
        })
        .set(JUMP, { timeScale: 0 })
        .to(PARACHUTE, {
          delay: 0.1,
          scale: gsap.utils.random(1, 2),
          duration: 0.1,
        })
        .to(JUMP, { timeScale: gsap.utils.random(0.1, 0.25) });
    });
  }
};

export default parachute;