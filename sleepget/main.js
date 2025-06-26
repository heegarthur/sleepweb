function updateTijd() {
    const nu = new Date();

    const tijd = nu.toLocaleTimeString('en-GB', {
        timeZone: 'Europe/Amsterdam',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    document.getElementById("nu").textContent = tijd;
}


setInterval(updateTijd, 1000);
updateTijd();

function slaapBerekenen() {
    let nu = new Date(); // blijft een Date-object
    const input = document.getElementById("wektijd").value;

    if (!input) {
        document.getElementById("resultaat").textContent = "Choose wake up time.";
        return;
    }

    const [uur, min] = input.split(":").map(Number);

    const wektijd = new Date(nu); // kopie van 'nu'
    wektijd.setHours(uur, min, 0, 0);

    // Als wektijd al voorbij is vandaag, pak volgende dag
    if (wektijd <= nu) {
        wektijd.setDate(wektijd.getDate() + 1);
    }

    const verschil = wektijd - nu;
    const uren = Math.floor(verschil / 1000 / 60 / 60);
    const minuten = Math.floor((verschil / 1000 / 60) % 60);

    document.getElementById("resultaat").textContent =
        `If you're going to sleep now, you will get ${uren} hour${uren !== 1 ? 's' : ''} and ${minuten} minute${minuten !== 1 ? 's' : ''} of sleep.`;
}
