onst scriptURL = "https://script.google.com/macros/s/AKfycbx55ShhJiujy6xj8lJZoDOoRh5wSpYpbPCbCNVoKnqR53gSUwsmKzSVv4ZXaihBQwwzVg/exec";

// --- İSİM LİSTELERİ ---
const workers = {
    "A": ["Kunert M. - 502", "Karali O. - 533 E", "Mikuczynski K. - 1212", "Türkmen E. - 1213 E", "Amrouch M. - 1268", "Stania D. - 1368", "Kantaroglu A. - 1382", "Krancioch A. - 1405", "Held D. - 1421", "Berisha I. - 1534", "Neji M. - 1536", "Mulugeta G. - 1633", "Udezue P. - 1686", "Jansen M. - 1692", "Aksoy O. - 1704", "Yildirim S. - 1710", "Brand N. - 1722", "Louze A. - 1724", "Blanquez Romero V. - 1725", "Diallo M.D. - 1726", "Sener E. - 1731 E", "Klomrit, Thanin - 1070", "Garcia-Hervas, Francisco - 339", "Schönborn Ch. - 1361", "Sonstige"],
    "B": ["Keskin Mur.-517", "Aldirmaz P.-577", "Anderwald R.-509 E", "Bayrakli F.-1377 E", "Kilic D.-1384 E", "Maafi T.-1273 E", "Besche T.-1472", "Eickhoff P.-1406", "Toth Renata-1699", "Gibba n.-1367", "Helf A.-1483", "Isbir J.-1715", "Jeyakumar S.-1698", "Kalisch T.-1451", "Kowarsch R.-484", "Nowak M.-1390", "Pähler D.-1332", "Patarcsity V.-1700", "Pulendran K.-1498", "Sahin E.-1721", "Savas S.-1360", "Schiavitelli C.-1669", "Uluyüz B.-1450", "Uzun S.-1433", "Klomrit, Thanin - 1070", "Garcia-Hervas, Francisco - 339", "Sonstige"],
    "C": ["Beher T. - 510", "Keskin Mustafa - 518", "Kantaroglu Ö. - 580", "Savas R. - 608", "Rafo S. - 1277", "Gertz Kevin - 1357", "Gertz S. - 1358 E", "Schönborn Ch. - 1361", "Fortes Ch. - 1381", "Sakaguchi M. - 1391", "Mercan M. - 1437 E", "Krämer Ch. - 1449", "Juretzka T. - 1473", "Kumbara E. - 1474", "Skupio D. - 1475", "Skrago T. - 1484", "Bah A. - 1684", "Kaya A. - 1712", "Jdea A. - 1701", "Toure A. - 1713", "Schneider D. - 1714", "Tchaleu Bertrand - 1723", "Klomrit, Thanin - 1070", "Garcia-Hervas, Francisco - 339", "Sonstige"]
};

// --- HATA VE DURUŞ KODLARI (ORİJİNAL LİSTE) ---
const codes = {
    PUR: {
        aus: ["C102 CIM nicht voll", "C103 CIM beschädigt", "P101 Anfahrschrott PUR", "P102 PUR nicht voll", "P103 Schaum beschädigt", "P104 Schaumbild n.i.O.", "P105 Schaumhärtung n.i.O.", "P106 Einlegefehler", "Sonstige"],
        stoer: ["4-2-01 Werkzeug", "4-2-02 Ungepl. Instandhaltung Maschine", "4-2-03 POLY / ISO Überdruck", "4-2-04 Mischkopf n.i.O.", "4-2-05 Fehler Lichtschranke", "4-2-06 Trennmittelpistole defekt", "4-2-07 Formträger Problem", "4-2-08 Reinigung", "4-2-09 Not Aus", "5-2-01 Logistik Mangel", "5-2-02 IM/CIM Material fehlt", "5-2-03 Anlernen", "5-2-04 Wartezeit", "5-2-05 Umbesetzung", "5-2-06 Unterbesetzung", "5-2-07 Scanner / Drucker", "5-2-08 Leergut", "5-2-09 Gasflasche", "Sonstige"]
    },
    IM_CIM: {
        aus: ["6-1-01 Anfahrschrott", "6-1-02 Materialumstellung", "6-1-03 CIM nicht voll", "6-1-04 CIM gerissen", "6-1-05 Überspritzungen", "Sonstige"],
        stoer: ["3-01 Werkzeugwechsel", "3-02 Materialumstellung", "4-1-01 Instandh. Werkzeug", "4-1-02 Instandh. Maschine", "4-1-03 Materialförderung", "4-1-04 Dosiereinheit", "4-1-05 Schließeinheit", "4-1-06 Teileentnahme", "4-1-07 Werkzeugheizung", "4-1-08 Beflammprozess", "4-1-09 Compound Problem", "5-1-01 Materialmangel", "5-1-02 Anlernen", "5-1-03 Wartezeit", "5-1-04 Umbesetzung", "Sonstige"]
    },
    COM: {
        aus: ["6-3-01 Anfahrschrott", "Sonstige"],
        stoer: ["3-01 Werkzeugwechsel", "3-02 Materialumstellung", "4-3-01 Lochplatte Messer schleifen", "4-3-02 Instandh. Maschine", "4-3-04 Silowechsel", "5-3-01 Materialmangel", "5-3-02 Anlernen", "5-3-03 Wartezeit", "5-3-05 Feueralarm", "Sonstige"]
    }
};

window.onload = () => { document.getElementById("datum").value = new Date().toISOString().split("T")[0]; };

function addWorker() {
    const schicht = document.getElementById("schichtWahl").value;
    const div = document.createElement("div");
    div.className = "worker-box";
    div.innerHTML = `
        <button class="delete-btn" onclick="this.parentElement.remove()">X</button>
        <select class="workerSelect" onchange="toggleManual(this)">
            ${workers[schicht].map(w => `<option value="${w}">${w}</option>`).join("")}
        </select>
        <input type="text" class="manualInp" placeholder="İsim Yazın..." style="display:none; margin-top:10px;">
    `;
    document.getElementById("workerContainer").appendChild(div);
}

function toggleManual(sel) { sel.nextElementSibling.style.display = (sel.value === "Sonstige") ? "block" : "none"; }

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
            <div><label>Aus Total (${unit})</label><input class="aus-total" type="number" value="0"></div>
        </div>
        <div class="row-container">
            <label>Ausschuss Gründe</label>
            <div class="aus-list"></div>
            <button type="button" class="sub-btn" onclick="addRow(this, 'aus')">+ Grund</button>
        </div>
        <div class="row-container" style="margin-top:10px;">
            <label>Störung / Ausfall</label>
            <div class="stoer-list"></div>
            <button type="button" class="sub-btn" onclick="addRow(this, 'stoer')">+ Störung</button>
        </div>
    `;
    document.getElementById("artikelContainer").appendChild(div);
}

function addRow(btn, type) {
    const anlage = document.getElementById("anlage").value;
    let cat = anlage.startsWith("PUR") ? "PUR" : (anlage === "COM" ? "COM" : "IM_CIM");
    const list = codes[cat][type];
    const area = btn.previousElementSibling;
    const div = document.createElement("div");
    div.className = "code-row";
    div.innerHTML = `
        <select class="${type}-code" style="flex:2;">${list.map(c => `<option value="${c}">${c}</option>`).join("")}</select>
        <input type="number" class="${type}-val" placeholder="${type === 'aus' ? 'Menge' : 'Min'}" style="flex:1;">
        <button onclick="this.parentElement.remove()" style="background:none; color:red; border:none; font-weight:bold;">✕</button>
    `;
    area.appendChild(div);
}

async function speichern() {
    const btn = event.target;
    const schicht = document.getElementById("schichtWahl").value;
    const anlage = document.getElementById("anlage").value;
    const datum = document.getElementById("datum").value;
    const unit = (anlage === "COM") ? "kg" : "Stk";

    let staff = [];
    document.querySelectorAll(".worker-box").forEach(box => {
        const s = box.querySelector(".workerSelect").value;
        staff.push(s === "Sonstige" ? box.querySelector(".manualInp").value : s);
    });

    let details = "";
    document.querySelectorAll(".artikel-box").forEach(box => {
        const name = box.querySelector(".artName").value;
        const gut = box.querySelector(".gut").value;
        const aus = box.querySelector(".aus-total").value;
        details += `📦 *${name}*\n└ Gut: ${gut} ${unit} | Aus: ${aus} ${unit}\n`;

        box.querySelectorAll(".code-row").forEach(row => {
            const code = row.querySelector("select").value;
            const val = row.querySelector("input").value;
            const isAus = row.querySelector("select").classList.contains('aus-code');
            if(val) details += `  - ${code}: ${val} ${isAus ? unit : 'Min'}\n`;
        });
        details += `--------------------------\n`;
    });

    const report = `📊 *APG REPORT*\n📅 *Datum:* ${datum}\n⏱️ *Schicht:* ${schicht}\n🏭 *Anlage:* ${anlage}\n👷 *Personal:* ${staff.join(", ")}\n\n${details}`;

    btn.disabled = true; btn.innerText = "SENDET...";
    try {
        await fetch(scriptURL, { method: "POST", mode: "no-cors", body: JSON.stringify({ datum, schicht, anlage, report }) });
        window.location.href = `whatsapp://send?phone=4917684126305&text=${encodeURIComponent(report)}`;
    } catch(e) { window.location.href = `whatsapp://send?phone=4917684126305&text=${encodeURIComponent(report)}`; }
    btn.disabled = false; btn.innerText = "🚀 SPEICHERN & SENDEN";
}
