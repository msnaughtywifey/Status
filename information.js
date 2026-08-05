const imgUrl = "https://pbs.twimg.com/profile_images/2057489128883892224/DrUyBrsI_400x400.jpg";
const profileName = "Ms Naughty Wifey";

const avatar = document.querySelector(".avatar");
avatar.innerHTML = `<img src="${imgUrl}">`;

const title = document.querySelector(".title");
title.innerHTML = profileName;

const socialsLinks = document.querySelector('.social-links');

const socialLinks = [
  { cashapp: "$msnaughtywifey", x: "MsNaughtyWifey" }
];

// Map over the array data dynamically instead of relying on an undeclared 'item' variable
const activeSocials = socialLinks.flatMap(item => [
  item.cashapp ? `<a href="https://cash.app/${item.cashapp}" title="${item.cashapp}" target="_blank" rel="noopener" class="social-link cashapp" aria-label="Cashapp"><i class="fa-solid fa-dollar-sign"></i>` : null,
  item.snapchat ? `<a href="https://www.snapchat.com/${item.snapchat}" title="${item.snapchat}" target="_blank" rel="noopener" class="social-link snapchat" aria-label="Snapchat"><i class="fa-brands fa-snapchat"></i></a>` : null,
  item.x ? `<a href="https://x.com/${item.x}" title="${item.x}" target="_blank" rel="noopener" class="social-link x" aria-label="X / Twitter"><i class="fa-brands fa-x-twitter"></i></a>` : null,
  item.ig ? `<a href="https://www.instagram.com/${item.ig}" title="${item.ig}" target="_blank" rel="noopener" class="social-link instagram" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>` : null
]).filter(Boolean); // Cleanly removes null/empty values

socialsLinks.innerHTML = activeSocials.join(' ');

const currentHour = new Date().getHours();

// Evaluates to true only between 9:00 AM and 2:59 PM
const isBusinessHours = currentHour >= 9 && currentHour <17;

const bodyElement = document.querySelector('body');

const avatarWrapper = document.querySelector('.avatar-wrapper');
const avatarRing = document.querySelector('.avatar-ring');
const avatarPulses = document.querySelectorAll('.avatar-pulse');
const contentWrapper = document.querySelector('.content-wrapper');
const subTitle = document.querySelector(".subtitle");
const socialColor = document.querySelectorAll(".social-link");
const bio = document.querySelector(".description");

 

if (bodyElement) {
    bodyElement.style.background = isBusinessHours ? "" : "linear-gradient(135deg, #ff008c 0%, #141113  100%)";
}

if (avatarWrapper) {
    avatarWrapper.style.filter = isBusinessHours ? "" : "grayscale(100%)";
}

if (avatarRing) {
    avatarRing.style.animation = isBusinessHours ? "spinRing 4s linear infinite" : "none";
}

if (avatarPulses) {
    avatarPulses.forEach(pulse => {
        pulse.classList.add("hide");
    });
}

if (contentWrapper) {
    contentWrapper.style.display = isBusinessHours ? "none" : "none";
    
}

if (title) {
    title.style.background = isBusinessHours ? "" : "black";
    title.style.backgroundClip = isBusinessHours ? "" : "text";
}

if (subTitle) {
    subTitle.style.color = isBusinessHours ? "" : "rgba(255, 255, 255, 0.5)";
    subTitle.innerHTML = isBusinessHours ? "<p>✦ Now online at your disposal 18+✦</p>" : "<p>✦ Now offline ✦</p>";
}

if (bio) {
    bio.style.color = isBusinessHours ? "" : "white";
    bio.innerHTML = isBusinessHours ? "Im here crafting a new experience everyday just for you! Something to do with a special reward 18+. Chat with me below!" : "<p>18+ Check in tomorrow 9am-6pm PST</p><p>Time left till next task</p><div id='timer'>00:00:00</div>";
}

if (socialColor.length > 0) { // Safely check if elements exist in the collection
    socialColor.forEach(link => {
        // FIXED: Removed the extra "background:" text and completed the opacity number
        link.style.background = isBusinessHours ? "" : "rgba(0, 0, 0, 0.5)";
    });


let isDotVisible = true;

setInterval(() => {
    if (isDotVisible) {
        // Show the correct color dot based on business hours
        document.title = isBusinessHours ? "🟢 Now Online 🟢" : "🔴 Now Offline 🔴";
    } else {
        // Hide the dot, show only the text
        document.title = isBusinessHours ? "Ms Naughty Wifey" : "Ms Naughty Wifey";
    }
    
    // Toggle the visibility state for the next blink
    isDotVisible = !isDotVisible;
}, 500); // Blinks every 500 milliseconds (0.5 seconds)

}

function startCountdown() {
  const timerElement = document.getElementById("timer");
  if (!timerElement) return;

  setInterval(() => {
    const now = new Date();
    const target = new Date();

    // Target 9:00 AM today
    target.setHours(9, 0, 0, 0);

    // If past 9:00 AM today, target 9:00 AM tomorrow
    if (now >= target) {
      target.setDate(target.getDate() + 1);
    }

    const difference = target - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Display string with labels
    timerElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}

startCountdown();
