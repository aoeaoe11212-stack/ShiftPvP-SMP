/*
    ShiftSMP Website
    Main JavaScript
*/

"use strict";


/* =========================================
   CONFIG
========================================= */

const CONFIG = {

    serverIP:
        "shiftsmp.shockbyte.xyz",

    discord:
        "https://discord.gg/4A25tQDkMJ"

};


/* =========================================
   COPY SERVER IP
========================================= */

function copyServerIP(){

    const ip =
        CONFIG.serverIP;

    if(
        navigator.clipboard &&
        window.isSecureContext
    ){

        navigator.clipboard
            .writeText(ip)
            .then(() => {

                showToast(
                    "Server IP copied!"
                );

            })
            .catch(() => {

                fallbackCopy(ip);

            });

    }else{

        fallbackCopy(ip);

    }

}


function fallbackCopy(text){

    const input =
        document.createElement("textarea");

    input.value =
        text;

    input.style.position =
        "fixed";

    input.style.left =
        "-9999px";

    document.body.appendChild(input);

    input.select();

    try{

        document.execCommand("copy");

        showToast(
            "Server IP copied!"
        );

    }catch(error){

        showToast(
            "Copy failed — use the IP manually."
        );

    }

    input.remove();

}


/* =========================================
   COPY BUTTONS
========================================= */

document
    .querySelectorAll("[data-copy-ip]")
    .forEach(button => {

        button.addEventListener(
            "click",
            copyServerIP
        );

    });


/* =========================================
   TOAST
========================================= */

let toastTimer = null;

function showToast(message){

    const toast =
        document.getElementById("toast");

    if(!toast){
        return;
    }

    toast.textContent =
        message;

    toast.classList.add("show");

    clearTimeout(
        toastTimer
    );

    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        },1800);

}


/* =========================================
   MOBILE NAV
========================================= */

const menuButton =
    document.getElementById(
        "menuButton"
    );

const navLinks =
    document.getElementById(
        "navLinks"
    );


if(menuButton && navLinks){

    menuButton.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "mobile-open"
            );

        }
    );


    navLinks
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "mobile-open"
                    );

                }
            );

        });

}


/* =========================================
   VIDEO
========================================= */

const video =
    document.getElementById(
        "pvpVideo"
    );


if(video){

    /*
        Prevent the video from automatically
        playing audio when the page loads.
    */

    video.muted =
        true;


    /*
        If the browser allows autoplay,
        keep it paused until the user interacts.
    */

    video.addEventListener(
        "play",
        () => {

            video.classList.add(
                "playing"
            );

        }
    );


    video.addEventListener(
        "pause",
        () => {

            video.classList.remove(
                "playing"
            );

        }
    );

}


/* =========================================
   SMOOTH ANCHOR SCROLL
========================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetID =
                    link.getAttribute(
                        "href"
                    );

                if(
                    !targetID ||
                    targetID === "#"
                ){

                    return;

                }

                const target =
                    document.querySelector(
                        targetID
                    );

                if(!target){

                    return;

                }

                event.preventDefault();

                target.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "start"

                });

            }
        );

    });


/* =========================================
   SIMPLE SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".card, .rank, .command-card, .video-wrapper, .join-card, .comparison"
    );


revealElements.forEach(
    element => {

        element.style.opacity =
            "0";

        element.style.transform =
            "translateY(16px)";

        element.style.transition =
            "opacity .55s ease, transform .55s ease";

    }
);


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if(!entry.isIntersecting){

                        return;

                    }

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                }
            );

        },

        {
            threshold:.12
        }

    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================
   CURRENT YEAR
========================================= */

const footerYear =
    document.querySelector(
        "[data-year]"
    );


if(footerYear){

    footerYear.textContent =
        new Date().getFullYear();

}


/* =========================================
   DISCORD BUTTON
========================================= */

document
    .querySelectorAll(
        "[data-discord]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                window.open(
                    CONFIG.discord,
                    "_blank",
                    "noopener"
                );

            }
        );

    });


/* =========================================
   PAGE READY
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document.body.classList.add(
            "loaded"
        );

        console.log(
            "✦ ShiftSMP website loaded."
        );

    }
);
