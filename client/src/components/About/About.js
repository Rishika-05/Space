import React from 'react'
import './style.css'
import ScrollMagic from 'scrollmagic'
import TweenMax from 'gsap/ScrollTrigger'
export default function About() {

    const intro = document.querySelector(".intro");
    const video = document.querySelector("#video_about");
    const text = document.querySelector("#h1_about");
    //END SECTION
    const section = document.querySelector("#section_about");
    const end = document.querySelector("#h1_about");

    //SCROLLMAGIC
    const controller = new ScrollMagic.Controller();

    //Scenes
    let scene = new ScrollMagic.Scene({
        duration: 4500,
        triggerElement: intro,
        triggerHook: 0
    })
        .addIndicators()
        .setPin(intro)
        .addTo(controller);

    //Text Animation
    const textAnim = TweenMax.fromTo(text, 3, { opacity: 1 }, { opacity: 0 });

    let scene2 = new ScrollMagic.Scene({
        duration: 3000,
        triggerElement: intro,
        triggerHook: 0
    })
        .setTween(textAnim)
        .addTo(controller);

    //Video Animation
    let accelamount = 0.1;
    let scrollpos = 0;
    let delay = 0;

    scene.on("update", e => {
        scrollpos = e.scrollPos / 1000;
    });

    setInterval(() => {
        delay += (scrollpos - delay) * accelamount;
        console.log(scrollpos, delay);

        video.currentTime = delay;
    }, 33.3);


    return (
        <div>
            <div class="intro">
                <h1 id="h1_about" ><img src="./Space.png" alt="logo" /></h1>
                <video id="video_about" src="Apple-Dev Ed Pro.mp4"></video>
            </div>
            <section id="section_about" >
                <h1>REVOLUTIONARRY</h1>
            </section>
        </div>
    )
}
