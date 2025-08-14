function loadPage(page) {
    const content = document.getElementById("content");
    if (page === "producten") {
        content.innerHTML = `
            <h2>Producten</h2>
            <ul>
                <li>Kaartje met bloemen</li>
                <li>Verjaardagskaart</li>
                <li>Bedankkaartje</li>
            </ul>
        `;
    } else if (page === "winkelwagentje") {
        content.innerHTML = `
            <h2>Winkelwagentje</h2>
            <p>Je winkelwagen is leeg.</p>
        `;
    } else if (page === "over") {
        content.innerHTML = `
            <h2>Over ons</h2>
            <p>Coosje maakt handgemaakte kaartjes voor elke gelegenheid.</p>
        `;
    } else if (page === "contact") {
        content.innerHTML = `
            <h2>Contact</h2>
            <p>Mail ons op <a href="mailto:info@kaartjesvancoosje.nl">info@kaartjesvancoosje.nl</a></p>
        `;
    }
}
