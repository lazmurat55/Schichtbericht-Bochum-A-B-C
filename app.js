const scriptURL = "https://script.google.com/macros/s/AKfycbx55ShhJiujy6xj8lJZoDOoRh5wSpYpbPCbCNVoKnqR53gSUwsmKzSVv4ZXaihBQwwzVg/exec";

// --- TARİH OTOMATİĞİ ---
window.onload = () => {
    document.getElementById("datum").value = new Date().toISOString().split("T")[0];
};

// --- İSİMLER ---
const workers = {
    "A": ["Kunert M. - 502", "Karali O. - 533 E", "Mikuczynski K. - 1212", "Türkmen E. - 1213 E", "Amrouch M. - 1268", "Stania D. - 1368", "Kantaroglu A. - 1382", "Krancioch A. - 1405", "Held D. - 1421", "Berisha I. - 1534", "Neji M. - 1536", "Mulugeta G. - 1633", "Udezue P. - 1686", "Jansen M. - 1692", "Aksoy O. - 1704", "Yildirim S. - 1710", "Brand N. - 1722", "Louze A. - 1724", "Blanquez Romero V. - 1725", "Diallo M.D. - 1726", "Sener E. - 1731 E", "Klomrit, Thanin - 1070", "Garcia-Hervas, Francisco - 339", "Schönborn Ch. - 1361", "Sonstige"],
    "B": ["Keskin Mur.-517", "Aldirmaz P.-577", "Anderwald R.-509 E", "Bayrakli F.-1377 E", "Kilic D.-1384 E", "Maafi T.-1273 E", "Besche T.-1472", "Eickhoff P.-1406", "Toth Renata-1699", "Gibba n.-1367", "Helf A.-1483", "Isbir J.-1715", "Jeyakumar S.-1698", "Kalisch T.-1451", "Kowarsch R.-484", "Nowak M.-1390", "Pähler D.-1332", "Patarcsity V.-1700", "Pulendran K.-1498", "Sahin E.-1721", "Savas S.-1360", "Schiavitelli C.-1669", "Uluyüz B.-1450", "Uzun S.-1433", "Klomrit, Thanin - 1070", "Garcia-Hervas, Francisco - 339", "Sonstige"],
    "C": ["Beher T. - 510", "Keskin Mustafa - 518", "Kantaroglu Ö. - 580", "Savas R. - 608", "Rafo S. - 1277", "Gertz Kevin - 1357", "Gertz S. - 1358 E", "Schönborn Ch. - 1361", "Fortes Ch. - 1381", "Sakaguchi M. - 1391", "Mercan M. - 1437 E", "Krämer Ch. - 1449", "Juretzka T. - 1473", "Kumbara E. - 1474", "Skupio D. - 1475", "Skrago T. - 1484", "Bah A. - 1684", "Kaya A. - 1712", "Jdea A. - 1701", "Toure A. - 1713", "Schneider D. - 1714", "Tchaleu Bertrand - 1723", "Klomrit, Thanin - 1070", "Garcia-Hervas, Francisco - 339", "Sonstige"]
};

// --- TÜM HATA VE DURUŞ KODLARI ---
const codes = {
    PUR: {
        aus: ["C102 CIM nicht voll", "C103 CIM beschädigt", "P101 Anfahrschrott PUR", "P102 PUR nicht voll", "P103 Schaum beschädigt", "P104 Schaumbild n.i.O.", "P105 Schaumhärtung n.i.O.", "P106 Einlegefehler", "Sonstige"],
        stoer: ["4-2-01 Werkzeug", "4-2-02 Maschine", "4-2-03 Überdruck", "4-2-04 Mischkopf", "4-2-08 Reinigung", "5-2-01 Logistik", "5-2-04 Wartezeit", "Sonstige"]
    },
    IM_CIM: {
        aus: ["6-1-01 Anfahrschrott", "6-1-02 Mat.-Umstellung", "6-1-03 CIM nicht voll", "6-1-04 CIM gerissen", "6-1-05 Überspritzung", "Sonstige"],
        stoer: ["3-01 Werkzeugwechsel", "3-02 Mat.-Umstellung", "4-1-01 Instandh. WZ", "4-1-02 Instandh. Masch.", "5-1-01 Mat.-Mangel", "Sonstige"]
    },
    COM: {
        aus: ["6-3-01 Anfahrschrott", "Sonstige"],
        stoer: ["3-01 WZ-Wechsel", "4-3-02 Instandh.", "5-3-01 Mat.-Mangel", "Sonstige"]
    }
};

function addWorker() {
    const schicht = document.getElementById("schichtWahl").value;
    const div = document.createElement("div");
    div.className = "worker-box";
    div.innerHTML = `
        <button class="delete-btn" onclick="this.parentElement.remove()">X</button>
        <select class="workerSelect" onchange="this.nextElementSibling.style.display=(this.value==='Sonstige'?'block':'none')">
            ${workers[schicht].map(w => `<option value="${w}">${w}</option>`).join("")}
        </select>
        <input type="text" style="display:none; margin-top:10px;" placeholder="İsim yazın...">
    `;
    document.getElementById("workerContainer").appendChild(div);
}

function addArtikel() {
    const anlage = document.getElementById("anlage").value;
    const unit = (anlage === "COM") ? "kg" : "Stk";
    const div = document.createElement("div");
    div.className = "artikel-box";
    div.innerHTML = `
        <button class="delete-btn" onclick="this.parentElement.remove()">X</button>
        <label>Artikel</label><input class="artName" type="text" placeholder="Z.B. Teppich B1">
        <div class="grid">
            <div><label>Gut (${unit})</label><input class="gut" type="number" value="0"></div>
            <div><label>Aus (${unit})</label><input class="ausT" type="number" value="0"></div>
        </div>
        <div class="code-area">
            <label>Ausschuss-Grund</label>
            <div class="list-aus"></div>
            <button class="sub-btn" onclick="addRow(this, 'aus')">+ Grund</button>
        </div>
        <div class="code-area">
            <label>Störung (Min)</label>
            <div class="list-stoer"></div>
            <button class="sub-btn" onclick="addRow(this, 'stoer')">+ Störung</button>
        </div>
    `;
    document.getElementById("artikelContainer").appendChild(div);
}

function addRow(btn, type) {
    const anlage = document.getElementById("anlage").value;
    let cat = anlage.startsWith("PUR") ? "PUR" : (anlage === "COM" ? "COM" : "IM_CIM");
    const list = codes[cat][type];
    const target = btn.previousElementSibling;
    const row = document.createElement("div");
    row.className = "code-row";
    row.innerHTML = `
        <select style="flex:2" class="${type}-code">${list.map(c=>`<option value="${c}">${c}</option>`).join("")}</select>
        <input type="number" style="flex:1" class="${type}-val" placeholder="Değer">
        <button onclick="this.parentElement.remove()" style="background:none; border:none; color:red; font-weight:bold;">✕</button>
    `;
    target.appendChild(row);
}

async function speichern() {
    const btn = event.target;
    const schicht = document.getElementById("schichtWahl").value;
    const anlage = document.getElementById("anlage").value;
    const datum = document.getElementById("datum").value;
    
    let staff = [];
    document.querySelectorAll(".worker-box").forEach(box => {
        const s = box.querySelector("select").value;
        const i = box.querySelector("input").value;
        staff.push(s === "Sonstige" ? i : s);
    });

    let report = `📊 *APG REPORT*\n📅 *Datum:* ${datum}\n⏱️ *Schicht:* ${schicht}\n🏭 *Anlage:* ${anlage}\n👷 *Personal:* ${staff.join(", ")}\n\n`;

    document.querySelectorAll(".artikel-box").forEach(box => {
        report += `📦 *${box.querySelector(".artName").value}*\n`;
        report += `└ G: ${box.querySelector(".gut").value} | A: ${box.querySelector(".ausT").value}\n`;
        box.querySelectorAll(".code-row").forEach(row => {
            report += `  - ${row.querySelector("select").value}: ${row.querySelector("input").value}\n`;
        });
        report += `------------------\n`;
    });

    btn.innerText = "SENDET..."; btn.disabled = true;
    try {
        await fetch(scriptURL, { method: "POST", mode: "no-cors", body: JSON.stringify({ datum, anlage, report }) });
        window.location.href = `whatsapp://send?phone=4917684126305&text=${encodeURIComponent(report)}`;
    } catch(e) { window.location.href = `whatsapp://send?phone=4917684126305&text=${encodeURIComponent(report)}`; }
    btn.innerText = "🚀 SPEICHERN & SENDEN"; btn.disabled = false;
}
