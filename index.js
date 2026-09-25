
/* =========================================================
   SERVICE DATA
========================================================= */

const services = [

    {
        number: "01",
        title: "Personal Companionship",

        image:
        "https://images.unsplash.com/photo-1559234938-b60fff04894d?auto=format&fit=crop&w=1200&q=90",

        icon: "heart-handshake",

        description:
        "Warm conversation and meaningful companionship that helps every day feel more connected.",

        backDescription:
        "A familiar, friendly presence that supports emotional wellbeing and brings genuine connection into everyday life.",

        features: [
            ["message-circle", "Meaningful conversations"],
            ["coffee", "Social companionship"],
            ["smile", "Emotional connection"]
        ]
    },


    {
        number: "02",
        title: "Home Comfort Visits",

        image:
        "https://images.unsplash.com/photo-1576765608866-5b51046452be?auto=format&fit=crop&w=1200&q=90",

        icon: "house",

        description:
        "Reliable in-home support focused on comfort, safety and familiar daily routines.",

        backDescription:
        "Regular visits provide practical support while helping older adults remain comfortable in their own home.",

        features: [
            ["house", "Personal home visits"],
            ["shield-check", "Safety-focused care"],
            ["clipboard-check", "Visit observations"]
        ]
    },


    {
        number: "03",
        title: "Everyday Living Support",

        image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=90",

        icon: "hand-helping",

        description:
        "Practical assistance that helps maintain confidence, routine and independence.",

        backDescription:
        "Gentle assistance with everyday activities while preserving dignity and personal choice.",

        features: [
            ["shopping-bag", "Essential errands"],
            ["utensils", "Meal support"],
            ["calendar-check", "Routine assistance"]
        ]
    },


    {
        number: "04",
        title: "Wellness Reminder Care",

        image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=90",

        icon: "heart-pulse",

        description:
        "Helpful routine reminders and wellness observations that give families greater peace of mind.",

        backDescription:
        "Support with daily wellness routines and reminders, helping families stay informed and reassured.",

        features: [
            ["clock-3", "Routine reminders"],
            ["heart-pulse", "Wellness observations"],
            ["bell", "Family notifications"]
        ]
    },


    {
        number: "05",
        title: "Appointment Companion",

        image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=90",

        icon: "stethoscope",

        description:
        "Calm and dependable assistance for important appointments, hospital visits and travel.",

        backDescription:
        "Practical companionship helps make important appointments and hospital visits feel less stressful.",

        features: [
            ["calendar-days", "Appointment support"],
            ["hospital", "Hospital visits"],
            ["map-pin", "Travel coordination"]
        ]
    },


    {
        number: "06",
        title: "Family Connection Updates",

        image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=90",

        icon: "users-round",

        description:
        "Clear and meaningful updates that keep families connected with their loved one's care.",

        backDescription:
        "Families receive useful visit notes, observations and important updates after scheduled support.",

        features: [
            ["message-square", "Visit updates"],
            ["file-text", "Care notes"],
            ["bell", "Important alerts"]
        ]
    }

];


/* =========================================================
   ELEMENTS
========================================================= */

const panels =
    document.querySelectorAll(".service-box");

const dots =
    document.querySelectorAll(".rotation-dot");

const grid =
    document.querySelector(".services-grid");


/* =========================================================
   STATE
========================================================= */

let startIndex = 0;

let rotationTimer = null;

let isRotating = false;


/* =========================================================
   UPDATE CARD
========================================================= */

function updateCard(panel, service) {

    const image =
        panel.querySelector(".service-image");

    const number =
        panel.querySelector(".service-number");

    const frontIcon =
        panel.querySelector(".front-icon i");

    const frontTitle =
        panel.querySelector(".front-content h3");

    const frontText =
        panel.querySelector(".front-content p");

    const backIcon =
        panel.querySelector(".back-icon i");

    const backLabel =
        panel.querySelector(".back-label");

    const backTitle =
        panel.querySelector(".back-content h3");

    const backText =
        panel.querySelector(".back-content p");

    const featureList =
        panel.querySelector(".feature-list");


    /* IMAGE */

    image.src =
        service.image;

    image.alt =
        service.title;


    /* NUMBER */

    number.textContent =
        service.number;


    /* FRONT */

    frontIcon.setAttribute(
        "data-lucide",
        service.icon
    );

    frontTitle.textContent =
        service.title;

    frontText.textContent =
        service.description;


    /* BACK */

    backIcon.setAttribute(
        "data-lucide",
        service.icon
    );

    backLabel.textContent =
        "SERVICE " + service.number;

    backTitle.textContent =
        service.title;

    backText.textContent =
        service.backDescription;


    /* FEATURES */

    featureList.innerHTML = "";


    service.features.forEach(function(feature) {

        const row =
            document.createElement("div");

        row.className =
            "feature-row";


        row.innerHTML = `
            <i data-lucide="${feature[0]}"></i>
            <span>${feature[1]}</span>
        `;


        featureList.appendChild(row);

    });

}


/* =========================================================
   RENDER THREE SERVICES
========================================================= */

function renderServices() {

    panels.forEach(function(panel, position) {

        const serviceIndex =
            (startIndex + position) %
            services.length;


        updateCard(
            panel,
            services[serviceIndex]
        );

    });


    dots.forEach(function(dot, index) {

        dot.classList.toggle(
            "active",
            index === startIndex % 3
        );

    });


    lucide.createIcons();

}


/* =========================================================
   ROTATE
========================================================= */

function rotateServices() {

    if (isRotating) return;


    isRotating = true;


    /* FLIP ALL THREE */

    panels.forEach(function(panel) {

        panel.classList.add("flipped");

    });


    /*
       Wait until cards are facing backward.
       Then change the service information.
    */

    setTimeout(function() {

        startIndex =
            (startIndex + 1) %
            services.length;


        renderServices();


        /*
           Small pause so the new information
           is visible before flipping forward.
        */

        setTimeout(function() {

            panels.forEach(function(panel) {

                panel.classList.remove(
                    "flipped"
                );

            });


            setTimeout(function() {

                isRotating = false;

            }, 850);

        }, 300);

    }, 850);

}


/* =========================================================
   START
========================================================= */

function startRotation() {

    stopRotation();


    rotationTimer =
        setInterval(
            rotateServices,
            4000
        );

}


/* =========================================================
   STOP
========================================================= */

function stopRotation() {

    if (rotationTimer) {

        clearInterval(
            rotationTimer
        );

        rotationTimer = null;

    }

}


/* =========================================================
   CLICK CARD
========================================================= */

panels.forEach(function(panel) {

    panel.addEventListener(
        "click",
        function() {

            if (isRotating) return;


            panel.classList.toggle(
                "flipped"
            );

        }
    );

});


/* =========================================================
   HOVER PAUSE
========================================================= */

grid.addEventListener(
    "mouseenter",
    stopRotation
);

grid.addEventListener(
    "mouseleave",
    startRotation
);


/* =========================================================
   DOT NAVIGATION
========================================================= */

dots.forEach(function(dot, index) {

    dot.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();


            if (isRotating) return;


            startIndex =
                index;


            panels.forEach(function(panel) {

                panel.classList.remove(
                    "flipped"
                );

            });


            renderServices();


            startRotation();

        }
    );

});


/* =========================================================
   INITIALIZE
========================================================= */

renderServices();

startRotation();


