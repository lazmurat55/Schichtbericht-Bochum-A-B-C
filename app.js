const scriptURL = "https://script.google.com/macros/s/AKfycbx55ShhJiujy6xj8lJZoDOoRh5wSpYpbPCbCNVoKnqR53gSUwsmKzSVv4ZXaihBQwwzVg/exec";

const workers = {
    "A": ["Kunert M. - 502", "Karali O. - 533 E", "Mikuczynski K. - 1212", "Türkmen E. - 1213 E", "Amrouch M. - 1268", "Stania D. - 1368", "Kantaroglu A. - 1382", "Krancioch A. - 1405", "Held D. - 1421", "Berisha I. - 1534", "Neji M. - 1536", "Mulugeta G. - 1633", "Udezue P. - 1686", "Jansen M. - 1692", "Aksoy O. - 1704", "Yildirim S. - 1710", "Brand N. - 1722", "Louze A. - 1724", "Blanquez Romero V. - 1725", "Diallo M.D. - 1726", "Sener E. - 1731 E", "Sonstige"],
    "B": ["Keskin Mur.-517", "Aldirmaz P.-577", "Anderwald R.-509 E", "Bayrakli F.-1377 E", "Kilic D.-1384 E", "Maafi T.-1273 E", "Besche T.-1472", "Eickhoff P.-1406", "Toth Renata-1699", "Gibba n.-1367", "Helf A.-1483", "Isbir J.-1715", "Jeyakumar S.-1698", "Kalisch T.-1451", "Kowarsch R.-484", "Nowak M.-1390", "Pähler D.-1332", "Patarcsity V.-1700", "Pulendran K.-1498", "Sahin E.-1721", "Savas S.-1360", "Schiavitelli C.-1669", "Uluyüz B.-1450", "Uzun S.-1433", "Sonstige"],
    "C": ["Beher T. - 510", "Keskin Mustafa - 518", "Kantaroglu Ö. - 580", "Savas R. - 608", "Rafo S. - 1277", "Gertz Kevin - 1357", "Gertz S. - 1358 E", "Schönborn Ch. - 1361", "Fortes Ch. - 1381", "Sakaguchi M. - 1391", "Mercan M. - 1437 E", "Krämer Ch. - 1449", "Juretzka T. - 1473", "Kumbara E. - 1474", "Skupio D. - 1475", "Skrago T. - 1484", "Bah A. - 1684", "Kaya A. - 1712", "Jdea A. - 1701", "Toure A. - 1713", "Schneider D. - 1714", "Tchaleu Bertrand - 1723", "Sonstige"]
};

const errorCodes = {
    PUR: {
        aus: ["C102 CIM n.voll", "C103 CIM beschädigt", "P101 Anfahrschrott", "P102 PUR n.voll", "P103 Schaum beschädigt", "P104 Schaumbild n.i.O.", "P105 Schaumhärtung n.i.O.", "P106 Einlegefehler", "Sonstige"],
        stoer: ["4-2-01 Werkzeug", "4-2-02 Instandh. Masch.", "4-2-03 POLY/ISO Überdruck", "4-2-04 Mischkopf", "4-2-05 Lichtschranke", "4-2-08 Reinigung", "5-2-01 Logistik", "5-2-04 Wartezeit", "Sonstige"]
    },
    IM_CIM: {
        aus: ["6-1-01 Anfahrschrott", "6-1-02 Mat.Umstellung", "6-1-03 CIM n.voll", "6-1-04 CIM gerissen", "6-1-05 Überspritzung", "6-1-06 Einfallstellen", "6-1-08 Silberstreifen", "Sonstige"],
        stoer: ["3-01 WZ-Wechsel", "3-02 Mat.Umstellung", "4-1-01 Inst. WZ", "4-1-02 Inst. Maschine", "5-1-03 Wartezeit", "Sonstige"]
    },
    COM: {
        aus: ["6-3-01 Anfahrschrott", "6-3-02 Materialfehler", "Sonstige"],
        stoer: ["3-01 WZ-Wechsel", "4-3-01 Lochplatte Messer", "4-3-04 Silowechsel", "5-3-01 Materialmangel", "Sonstige"]
    }
};

window.onload = () => { document.getElementById("datum").value = new Date().toISOString().split("T")[0]; };

function handleAnlageChange(val) {
    document.getElementById("ftBox").style.display = val.startsWith("PUR") ? "block" : "none";
    document.getElementById("gesamtDauerBox").style.display = val === "COM" ? "block" : "none";
    updateSummary();
}

function addWorker() {
    const schicht = document.getElementById("schichtWahl").value;
    const div = document.createElement("div");
    div.className = "worker-box";
    div.innerHTML = `
        <button class="delete-btn" onclick="this.parentElement.remove()">X</button>
        <select class="workerSelect" onchange="this.nextElementSibling.style.display=(this.value==='Sonstige'?'block':'none')">
            ${workers[schicht].map(w => `<option value="${w}">${w}</option>`).join("")}
        </select>
        <input type="text" style="display:none; margin-top:10px;" placeholder="Name...">
    `;
    document.getElementById("workerContainer").appendChild(div);
}

function addArtikel() {
    const anlage = document.getElementById("anlage").value;
    if(!anlage) return alert("Anlage wählen!");
    const unit = anlage === "COM" ? "kg" : "Stk";
    const div = document.createElement("div");
    div.className = "artikel-box";
    div.innerHTML = `
        <button class="delete-btn" onclick="this.parentElement.remove(); updateSummary();">X</button>
        <label>Artikel</label><input class="artBez" type="text">
        ${anlage==='COM' ? '<label>Dauer (Min)</label><input type="number" class="artDauer" oninput="updateSummary()">' : ''}
        <div class="grid">
            <div><label>Gut (${unit})</label><input class="gut" type="number" oninput="updateSummary()"></div>
            <div><label>Ausschuss Gesamt (${unit})</label><input class="ausTotal" type="number" oninput="updateSummary()"></div>
        </div>
        <p class="error-msg" style="color:red; display:none; font-size:12px; font-weight:bold;">⚠️ Ausschuss Summe stimmt nicht mit Gesamt überein!</p>
        <div class="code-area"></div>
        <div style="display:flex; gap:5px; margin-top:10px;">
            <button type="button" class="sub-btn" onclick="addRow(this, 'aus', '${anlage}')">+ Ausschuss</button>
            <button type="button" class="sub-btn" onclick="addRow(this, 'stoer', '${anlage}')">+ Störung</button>
        </div>
    `;
    document.getElementById("artikelContainer").appendChild(div);
}

function addRow(btn, type, anlage) {
    const area = btn.parentElement.previousElementSibling;
    let cat = anlage.startsWith("PUR") ? "PUR" : (anlage === "COM" ? "COM" : "IM_CIM");
    const list = errorCodes[cat][type];
    const div = document.createElement("div");
    div.style = "display:flex; gap:5px; margin-top:5px;";
    div.innerHTML = `
        <select class="${type}-code" style="flex:2;">${list.map(c=>`<option value="${c}">${c}</option>`).join("")}</select>
        <input type="number" class="${type}-val" placeholder="Menge" style="flex:1;" oninput="updateSummary()">
        <button onclick="this.parentElement.remove(); updateSummary();">✕</button>
    `;
    area.appendChild(div);
}

function updateSummary() {
    let totalDauer = 0;
    document.querySelectorAll(".artikel-box").forEach(box => {
        const gesamtAus = Number(box.querySelector(".ausTotal").value) || 0;
        let summeAus = 0;
        box.querySelectorAll(".aus-val").forEach(inp => summeAus += Number(inp.value) || 0);
        
        const errorMsg = box.querySelector(".error-msg");
        errorMsg.style.display = (gesamtAus > 0 && gesamtAus !== summeAus) ? "block" : "none";
        
        if(box.querySelector(".artDauer")) totalDauer += Number(box.querySelector(".artDauer").value) || 0;
    });
    if(document.getElementById("totalMinLabel")) document.getElementById("totalMinLabel").innerText = totalDauer;
}

async function speichern() {
    const anlage = document.getElementById("anlage").value;
    const datum = document.getElementById("datum").value;
    const dauer = Number(document.getElementById("totalMinLabel").innerText);
    
    if(anlage === "COM" && dauer !== 480) return alert("❌ Fehler: Gesamte Dauer muss 480 Min sein!");
    
    let checkAus = true;
    document.querySelectorAll(".artikel-box").forEach(box => {
        if(box.querySelector(".error-msg").style.display === "block") checkAus = false;
    });
    if(!checkAus) return alert("❌ Fehler: Ausschuss-Mengen prüfen!");

    let ftList = [];
    document.querySelectorAll(".ft-check:checked").forEach(c => ftList.push(c.value));
    const ftInfo = ftList.length > 0 ? `🛠 FT: ${ftList.join(", ")}\n` : "";

    let staff = [];
    document.querySelectorAll(".worker-box").forEach(box => {
        const s = box.querySelector("select").value;
        staff.push(s === "Sonstige" ? box.querySelector("input").value : s);
    });

    let details = "";
    document.querySelectorAll(".artikel-box").forEach(box => {
        details += `📦 *${box.querySelector(".artBez").value}*\n`;
        box.querySelectorAll(".aus-code").forEach((sel, i) => {
            const v = box.querySelectorAll(".aus-val")[i].value;
            if(v) details += `  └Fire: ${sel.value} (${v})\n`;
        });
    });

    const report = `📊 *APG REPORT*\n📅 Datum: ${datum}\n🏭 Anlage: ${anlage}\n${ftInfo}👷 Mitarbeiter: ${staff.join(", ")}\n\n${details}`;
    
    window.location.href = `whatsapp://send?phone=4917684126305&text=${encodeURIComponent(report)}`;
}
