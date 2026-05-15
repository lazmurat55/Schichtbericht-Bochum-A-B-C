const scriptURL = "https://script.google.com/macros/s/AKfycbx55ShhJiujy6xj8lJZoDOoRh5wSpYpbPCbCNVoKnqR53gSUwsmKzSVv4ZXaihBQwwzVg/exec";

// --- VARDIYA BAZLI İSİM LİSTELERİ ---
const workerLists = {
    "A": ["Kunert M. - 502", "Karali O. - 533 E", "Mikuczynski K. - 1212", "Türkmen E. - 1213 E", "Amrouch M. - 1268", "Stania D. - 1368", "Kantaroglu A. - 1382", "Krancioch A. - 1405", "Held D. - 1421", "Berisha I. - 1534", "Neji M. - 1536", "Mulugeta G. - 1633", "Udezue P. - 1686", "Jansen M. - 1692", "Aksoy O. - 1704", "Yildirim S. - 1710", "Brand N. - 1722", "Louze A. - 1724", "Blanquez Romero V. - 1725", "Diallo M.D. - 1726", "Sener E. - 1731 E", "Klomrit, Thanin - 1070", "Garcia-Hervas, Francisco - 339", "Schönborn Ch. - 1361", "Sonstige"],
    "B": ["Keskin Mur.-517", "Aldirmaz P.-577", "Anderwald R.-509 E", "Bayrakli F.-1377 E", "Kilic D.-1384 E", "Maafi T.-1273 E", "Besche T.-1472", "Eickhoff P.-1406", "Toth Renata-1699", "Gibba n.-1367", "Helf A.-1483", "Isbir J.-1715", "Jeyakumar S.-1698", "Kalisch T.-1451", "Kowarsch R.-484", "Nowak M.-1390", "Pähler D.-1332", "Patarcsity V.-1700", "Pulendran K.-1498", "Sahin E.-1721", "Savas S.-1360", "Schiavitelli C.-1669", "Uluyüz B.-1450", "Uzun S.-1433", "Klomrit, Thanin - 1070", "Garcia-Hervas, Francisco - 339", "Sonstige"],
    "C": ["Beher T. - 510", "Keskin Mustafa - 518", "Kantaroglu Ö. - 580", "Savas R. - 608", "Rafo S. - 1277", "Gertz Kevin - 1357", "Gertz S. - 1358 E", "Schönborn Ch. - 1361", "Fortes Ch. - 1381", "Sakaguchi M. - 1391", "Mercan M. - 1437 E", "Krämer Ch. - 1449", "Juretzka T. - 1473", "Kumbara E. - 1474", "Skupio D. - 1475", "Skrago T. - 1484", "Bah A. - 1684", "Kaya A. - 1712", "Jdea A. - 1701", "Toure A. - 1713", "Schneider D. - 1714", "Tchaleu Bertrand - 1723", "Klomrit, Thanin - 1070", "Garcia-Hervas, Francisco - 339", "Sonstige"]
};

// --- ORİJİNAL HATA VE DURUŞ KODLARI ---
const purAusschussCodes = ["C102 CIM nicht voll", "C103 CIM beschädigt", "P101 Anfahrschrott PUR", "P102 PUR nicht voll", "P103 Schaum beschädigt", "P104 Schaumbild n.i.O.", "P105 Schaumhärtung n.i.O.", "P106 Einlegefehler", "Sonstige"];
const imAusschussCodes = ["6-1-01 Anfahrschrott", "6-1-02 Materialumstellung", "6-1-03 CIM nicht voll", "6-1-04 CIM gerissen", "6-1-05 Überspritzungen", "Sonstige"];
const comAusschussCodes = ["6-3-01 Anfahrschrott", "Sonstige"];
const purStoerungCodes = ["4-2-01 Werkzeug", "4-2-02 Ungepl. Instandhaltung Maschine", "4-2-03 POLY / ISO Überdruck", "4-2-04 Mischkopf n.i.O.", "4-2-05 Fehler Lichtschranke", "4-2-06 Trennmittelpistole defekt", "4-2-07 Formträger Problem", "4-2-08 Reinigung", "4-2-09 Not Aus", "5-2-01 Logistik Mangel", "5-2-02 IM/CIM Material fehlt", "5-2-03 Anlernen", "5-2-04 Wartezeit", "Sonstige"];
const imStoerungCodes = ["3-01 Werkzeugwechsel", "3-02 Materialumstellung", "4-1-01 Instandh. Werkzeug", "4-1-02 Instandh. Maschine", "4-1-03 Materialförderung", "4-1-04 Dosiereinheit", "4-1-05 Schließeinheit", "4-1-06 Teileentnahme", "4-1-07 Werkzeugheizung", "4-1-08 Beflammprozess", "5-1-01 Materialmangel", "Sonstige"];
const comStoerungCodes = ["3-01 Werkzeugwechsel", "3-02 Materialumstellung", "4-3-01 Lochplatte Messer schleifen", "4-3-02 Instandh. Maschine", "4-3-04 Silowechsel", "5-3-01 Materialmangel", "Sonstige"];

window.onload = () => {
    document.getElementById("datum").value = new Date().toISOString().split("T")[0]; [cite: 7]
    if (localStorage.getItem("schichtb_user")) {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("mainForm").style.display = "block"; [cite: 8]
    }
};

// --- ANLAGE DEĞİŞİMİ (FT VE COM KONTROLÜ) ---
document.getElementById("anlage").addEventListener("change", (e) => {
    const val = e.target.value;
    document.getElementById("ftBox").style.display = val.startsWith("PUR") ? "block" : "none"; [cite: 15]
    document.getElementById("gesamtDauerBox").style.display = val === "COM" ? "block" : "none"; [cite: 15]
    document.getElementById("artikelContainer").innerHTML = ""; [cite: 15]
});

// --- İŞÇİ EKLEME (SEÇİLİ VARDİYAYA GÖRE) ---
document.getElementById("addWorkerBtn").addEventListener("click", () => {
    const vardiye = document.getElementById("schichtWahl").value;
    const list = workerLists[vardiye];
    const div = document.createElement("div");
    div.className = "worker-box";
    div.innerHTML = `
        <button type="button" class="delete-btn" onclick="this.parentElement.remove()">X</button>
        <select class="workerSelect" onchange="toggleWorkerInput(this)">
            ${list.map(w => `<option value="${w}">${w}</option>`).join("")}
        </select>
        <input type="text" class="customWorkerInput" placeholder="Name (Leiharbeiter/Gast)" style="display:none; margin-top:10px;">
    `; [cite: 16]
    document.getElementById("workerContainer").appendChild(div);
});

function toggleWorkerInput(select) {
    const customInp = select.nextElementSibling;
    customInp.style.display = select.value === "Sonstige" ? "block" : "none"; [cite: 17]
}

// --- ARTIKEL EKLEME ---
document.getElementById("addArtikelBtn").addEventListener("click", () => {
    const anlageVal = document.getElementById("anlage").value;
    if(!anlageVal) return alert("Bitte zuerst Anlage wählen!");
    const div = document.createElement("div");
    div.className = "artikel-box";
    const isCOM = anlageVal === "COM";
    const einheit = isCOM ? "kg" : "Stk";
    
    let html = `<button type="button" class="delete-btn" onclick="this.parentElement.remove()">X</button>`;
    if(isCOM) {
        html += `<div class="grid"><div><label>Artikel</label><input class="artBez" type="text"></div><div><label>Dauer (Min)</label><input class="artDauer" type="number"></div></div>`; [cite: 18]
    } else {
        html += `<label>Artikel</label><input class="artBez" type="text">`; [cite: 19]
    }
    html += `
        <div class="grid">
            <div><label>Gut (${einheit})</label><input class="gut" type="number"></div>
            <div><label>Ausschuss (${einheit})</label><input class="ausTotal" type="number" value="0"></div>
        </div>
        <p class="ausWarnung" style="color:red; display:none; font-weight:bold;"></p>
        <div class="aus-area"></div>
        <button type="button" class="add-btn" onclick="addAusRow(this, '${anlageVal}')">+ Ausschuss-Grund</button>
        <div class="stoer-area" style="margin-top:10px;"></div>
        <button type="button" class="add-btn" style="background:#64748b" onclick="addStoerRow(this, '${anlageVal}')">+ Störung</button>
    `; [cite: 20]
    div.innerHTML = html;
    document.getElementById("artikelContainer").appendChild(div);
});

// --- HATA VE DURUŞ SATIRI EKLEME ---
function addAusRow(btn, anlage) {
    const area = btn.previousElementSibling;
    const div = btn.closest(".artikel-box");
    const row = document.createElement("div");
    row.className = "aus-row";
    let list = anlage.startsWith("PUR") ? purAusschussCodes : (anlage === "COM" ? comAusschussCodes : imAusschussCodes);
    row.innerHTML = `
        <div style="flex:3; display:flex; flex-direction:column;">
            <select class="aCode" onchange="toggleCustomInput(this)">${list.map(c=>`<option value="${c}">${c}</option>`).join("")}</select>
            <input type="text" class="customInput" placeholder="Grund..." style="display:none; margin-top:5px;">
        </div>
        <input type="number" class="aMenge" placeholder="Menge" style="flex:1; margin-left:10px; text-align:center;">
        <button type="button" class="row-delete-btn" onclick="this.parentElement.remove(); validateAusschuss(this.closest('.artikel-box'))">X</button>
    `; [cite: 21, 22]
    area.appendChild(row);
}

function addStoerRow(btn, anlage) {
    const area = btn.previousElementSibling;
    const row = document.createElement("div");
    row.className = "stoer-row";
    let list = anlage.startsWith("PUR") ? purStoerungCodes : (anlage === "COM" ? comStoerungCodes : imStoerungCodes);
    row.innerHTML = `
        <div style="flex:3; display:flex; flex-direction:column;">
            <select class="sCode" onchange="toggleCustomInput(this)">${list.map(c=>`<option value="${c}">${c}</option>`).join("")}</select>
            <input type="text" class="customInput" placeholder="Grund..." style="display:none; margin-top:5px;">
        </div>
        <input type="number" class="sMin" placeholder="Min" style="flex:1; margin-left:10px; text-align:center;">
        <button type="button" class="row-delete-btn" onclick="this.parentElement.remove()">X</button>
    `; [cite: 23, 24]
    area.appendChild(row);
}

function toggleCustomInput(select) {
    const customInp = select.nextElementSibling;
    customInp.style.display = select.value === "Sonstige" ? "block" : "none";
}

function validateAusschuss(box) {
    const totalInput = box.querySelector(".ausTotal");
    const warnung = box.querySelector(".ausWarnung");
    const mingeInputs = box.querySelectorAll(".aMenge");
    let soll = parseInt(totalInput.value) || 0;
    let ist = 0;
    mingeInputs.forEach(inp => ist += (parseInt(inp.value) || 0));
    if (ist !== soll) {
        warnung.innerText = `⚠️ Summe (${ist}) stimmt nicht mit Gesamt (${soll}) überein!`; [cite: 25]
        warnung.style.display = "block";
        return false;
    } else {
        warnung.style.display = "none";
        return true;
    }
}

// --- KAYDET VE WHATSAPP ---
async function speichern() {
    const anlageVal = document.getElementById("anlage").value;
    const schichtVal = document.getElementById("schichtWahl").value;
    const datumVal = document.getElementById("datum").value; [cite: 26]
    const targetDauer = parseInt(document.getElementById("gesamtDauerInput").value) || 480;
    const sender = localStorage.getItem("schichtb_user") || "Unbekannt";
    const btn = event.target; [cite: 27]

    let staff = [];
    document.querySelectorAll(".worker-box").forEach(wBox => {
        const sel = wBox.querySelector(".workerSelect").value;
        if(sel === "Sonstige") staff.push("(L) " + wBox.querySelector(".customWorkerInput").value);
        else staff.push(sel);
    });

    let report = ""; [cite: 28]
    let allValid = true;
    let totalComTime = 0;

    document.querySelectorAll(".artikel-box").forEach(box => {
        if(!validateAusschuss(box)) allValid = false;
        const bez = box.querySelector(".artBez").value;
        const g = box.querySelector(".gut").value || 0;
        const a = box.querySelector(".ausTotal").value || 0;
        const d = box.querySelector(".artDauer") ? parseInt(box.querySelector(".artDauer").value) || 0 : 0; [cite: 29]
        
        totalComTime += d;
        report += `• ${bez} ${d>0 ? '('+d+' Min)' : ''} | G:${g} A:${a}\n`; [cite: 30]
        
        box.querySelectorAll(".aus-row").forEach(r => {
            let code = r.querySelector(".aCode").value;
            if(code === "Sonstige") code = "Sons: " + r.querySelector(".customInput").value;
            report += `  └─ Aus: ${code} (${r.querySelector(".aMenge").value})\n`;
        });
        box.querySelectorAll(".stoer-row").forEach(r => {
            let code = r.querySelector(".sCode").value; [cite: 31]
            if(code === "Sonstige") code = "Sons: " + r.querySelector(".customInput").value;
            report += `  └─ ⚠️ Störung: ${code} (${r.querySelector(".sMin").value} Min)\n`; [cite: 32]
        });
    });

    if(!allValid) return alert("❌ Fehler: Ausschuss-Summen prüfen!");
    if(anlageVal === "COM" && totalComTime !== targetDauer) {
        return alert(`❌ Zeitfehler: Gesamte Dauer (${totalComTime} Min) muss ${targetDauer} Min entsprechen!`); [cite: 33, 34]
    }

    const waText = `📊 *SCHICHTBERICHT*\n📅 *Datum:* ${datumVal}\n⏱️ *Schicht:* ${schichtVal}\n🏭 *Anlage:* ${anlageVal}\n👷 *Mitarbeiter:* ${staff.join(", ")}\n👤 *Sender:* ${sender}\n\n📦 *PRODUKTION:*\n${report}`;
    btn.disabled = true; btn.innerText = "SENDET..."; [cite: 35]
    try {
        await fetch(scriptURL, { method: "POST", mode: "no-cors", body: JSON.stringify({ datum: datumVal, schicht: schichtVal, mitarbeiter: staff.join(", "), anlage: anlageVal, artikel: report }) });
        window.location.href = `whatsapp://send?phone=${document.getElementById("waEmpfaenger").value}&text=${encodeURIComponent(waText)}`; [cite: 36]
    } catch (e) { alert("Fehler!"); btn.disabled = false; btn.innerText = "SPEICHERN & SENDEN"; }
}
