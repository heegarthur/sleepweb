function main() {
    const modeInputs = document.querySelectorAll('input[name="mode"]');
    const wakeGroup = document.getElementById('wake-input');
    const sleepGroup = document.getElementById('sleep-input');
    const wakeTime = document.getElementById('wake-time');
    const sleepTime = document.getElementById('sleep-time');
    const calcBedBtn = document.getElementById('calc-bedtimes');
    const calcWakeBtn = document.getElementById('calc-waketimes');
    const results = document.getElementById('results');
    const resultNote = document.getElementById('result-note');
    const useNowBtn = document.getElementById('use-now');
    const nowLabel = document.getElementById('now-label');

    let ageGroup = localStorage.getItem("age-group");

    if (ageGroup == null) {
        ageGroup = document.getElementById("age-group").value;

        localStorage.setItem("age-group", ageGroup)
    } else {
        document.getElementById("age-group").value = ageGroup;
    }
    ageGroup = document.getElementById("age-group");

    function setMode(mode) {
        const isWake = mode === 'wake';
        wakeGroup.hidden = !isWake;
        sleepGroup.hidden = isWake;
        results.innerHTML = '';
        resultNote.textContent = '';
    }

    function pad(n) { return n.toString().padStart(2, '0'); }

    function toMinutes(hhmm) {
        if (!hhmm) return null;
        const [h, m] = hhmm.split(':').map(Number);
        return h * 60 + m;
    }

    function fromMinutes(total) {
        total = ((total % (24 * 60)) + (24 * 60)) % (24 * 60);
        const h = Math.floor(total / 60);
        const m = total % 60;
        return `${pad(h)}:${pad(m)}`;
    }

    function cyclesForAge() {
        let ageGroup = localStorage.getItem("age-group").value;

        if (ageGroup == null) {
            ageGroup = document.getElementById("age-group").value;

            localStorage.setItem("age-group", ageGroup)
        } else {
            document.getElementById("age-group").value = ageGroup;
        }
        ageGroup = document.getElementById("age-group");
        switch (ageGroup.value) {
            case 'teen':
            case 'child': return [6, 5, 4];
            case 'elder': return [5, 4, 3];
            default: return [6, 5, 4, 3];
        }
    }

    function makeNote(prefix, baseTime) {
        const t = fromMinutes(baseTime);
        resultNote.textContent = `${prefix} ${t} — includes ~15 min to fall asleep.`;
    }

    function renderList(items, suffix) {
        results.innerHTML = '';
        items.forEach(time => {
            const li = document.createElement('li');
            li.textContent = suffix ? `${time} ${suffix}` : time;
            results.appendChild(li);
        });
    }

    function calcBedtimesForWake() {
        const wake = toMinutes(wakeTime.value);
        if (wake == null) {
            alert('Please enter a wake-up time.');
            return;
        }
        makeNote('Wake-up time', wake);
        const cycleLen = 90;
        const fallAsleep = 15;
        const list = cyclesForAge().map(c => fromMinutes(wake - c * cycleLen - fallAsleep));
        renderList(list, '(go to bed at)');
    }

    function calcWaketimesForSleep() {
        const sleep = toMinutes(sleepTime.value);
        if (sleep == null) {
            alert('Please enter a bedtime.');
            return;
        }
        makeNote('Bedtime', sleep);
        const cycleLen = 90;
        const fallAsleep = 15;
        const list = cyclesForAge().map(c => fromMinutes(sleep + c * cycleLen + fallAsleep));
        renderList(list, '(wake up at)');
    }

    function useNow() {
        const now = new Date();
        const hh = pad(now.getHours());
        const mm = pad(now.getMinutes());
        nowLabel.textContent = `Current time: ${hh}:${mm}`;
        if (!sleepGroup.hidden) {
            sleepTime.value = `${hh}:${mm}`;
        } else {
            wakeTime.value = `${hh}:${mm}`;
        }
    }

    modeInputs.forEach(r => r.addEventListener('change', e => setMode(e.target.value)));
    calcBedBtn.addEventListener('click', calcBedtimesForWake);
    calcWakeBtn.addEventListener('click', calcWaketimesForSleep);
    useNowBtn.addEventListener('click', useNow);

    document.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            if (!wakeGroup.hidden) calcBedtimesForWake();
            else calcWaketimesForSleep();
        }
    });

    setMode('wake');
}
main();
