const scriptURL = "https://script.google.com/macros/s/AKfycbx55ShhJiujy6xj8lJZoDOoRh5wSpYpbPCbCNVoKnqR53gSUwsmKzSVv4ZXaihBQwwzVg/exec";

const workerLists = {
    "A": ["Kunert M. - 502", "Karali O. - 533 E", "Mikuczynski K. - 1212", "Türkmen E. - 1213 E", "Amrouch M. - 1268", "Stania D. - 1368", "Kantaroglu A. - 1382", "Krancioch A. - 1405", "Held D. - 1421", "Berisha I. - 1534", "Neji M. - 1536", "Mulugeta G. - 1633", "Udezue P. - 1686", "Jansen M. - 1692", "Aksoy O. - 1704", "Yildirim S. - 1710", "Brand N. - 1722", "Louze A. - 1724", "Blanquez Romero V. - 1725", "Diallo M.D. - 1726", "Sener E. - 1731 E", "Klomrit, Thanin - 1070", "Garcia-Hervas, Francisco - 339", "Schönborn Ch. - 1361", "Sonstige"],
    "B": ["Keskin Mur.-517", "Aldirmaz P.-577", "Anderwald R.-509 E", "Bayrakli F.-1377 E", "Kilic D.-1384 E", "Maafi T.-1273 E", "Besche T.-1472", "Eickhoff P.-1406", "Toth Renata-1699", "Gibba n.-1367", "Helf A.-1483", "Isbir J.-1715", "Jeyakumar S.-1698", "Kalisch T.-1451", "Kowarsch R.-484", "Nowak M.-1390", "Pähler D.-1332", "Patarcsity V.-1700", "Pulendran K.-1498", "Sahin E.-1721", "Savas S.-1360", "Schiavitelli C.-1669", "Uluyüz B.-1450", "Uzun S.-1433", "Klomrit, Thanin - 1070", "Garcia-Hervas, Francisco - 339", "Sonstige"],
    "C": ["Beher T. - 510", "Keskin Mustafa - 518", "Kantaroglu Ö. - 580", "Savas R. - 608", "Rafo S. - 1277", "Gertz Kevin - 1357", "Gertz S. - 1358 E", "Schönborn Ch. - 1361", "Fortes Ch. - 1381", "Sakaguchi M. - 1391", "Mercan M. - 1437 E", "Krämer Ch. - 1449", "Juretzka T. - 1473", "Kumbara E. - 1474", "Skupio D. - 1475", "Skrago T. - 1484", "Bah A. - 1684", "Kaya A. - 1712", "Jdea A. - 1701", "Toure A. - 1713", "Schneider D. - 1714", "Tchaleu Bertrand - 1723", "Klomrit, Thanin - 1070", "Garcia-Hervas, Francisco - 339", "Sonstige"]
};

const purAusschussCodes = ["C102 CIM nicht voll", "C103 CIM beschädigt", "P101 Anfahrschrott PUR", "P102 PUR nicht voll", "P103 Schaum beschädigt", "P104 Schaumbild n.i.O.", "P105 Schaumhärtung n.i.O.", "P106 Einlegefehler", "Sonstige"];
const imAusschussCodes = ["6-1-01 Anfahrschrott", "6-1-02 Mat.-Umstellung", "6-1-03 CIM nicht voll", "6-1-04 CIM gerissen", "6-1-05 Überspritzung", "Sonstige"];
const comAusschussCodes = ["6-3-01 Anfahrschrott", "Sonstige"];
const purStoerungCodes = ["4-2-01 Werkzeug", "4-2-02 Maschine", "4-2-03 Überdruck", "4-2-04 Mischkopf", "4-2-08 Reinigung", "5-2-01 Logistik", "Sonstige"];
const imStoerungCodes = ["3-01 WZ-Wechsel", "3-02 Mat.-Umstellung", "4-1-01 Instandh. WZ", "4-1-02 Instandh. Masch.", "5-1-01 Mat.-Mangel", "Sonstige"];
const comStoerungCodes = ["3-01 WZ-Wechsel", "4-3-02 Instandh.", "5-3-01 Mat.-Mangel", "Sonstige"];

// --- INITIALISIERUNG ---
window.onload = () => {
    document.getElementById("datum").value = new Date().toISOString().split("T")[0];
};

// Anlage seçimi ve kutu görünürlüğü
document.getElementById("anlage").addEventListener("change", function() {
    const val = this.value;
    document.getElementById("ftBox").style.display = val.startsWith("PUR") ? "block" : "none";
    document.getElementById("gesamtDauerBox").style.display = val === "COM" ? "block" : "none";
});

// Mitarbeiter hinzufügen Butonu
document.getElementById("addWorkerBtn").addEventListener("click", () => {
    const vardiye = document.getElementById("schichtWahl").value;
    const list = workerLists[vardiye];
    const div = document.createElement("div");
    div.className = "worker-box";
    div.style = "background:rgba(255,255,255,0.05); padding:10px; border-radius:10px; margin-bottom:10px; position:relative;";
    div.innerHTML = `
        <select class="workerSelect" style="width:85%;" onchange="this.nextElementSibling.style.display=(this.value==='Sonstige'?'block':'none')">
            ${list.map(w => `<option value="${w}">${w}</option>`).join("")}
        </select>
        <input type="text" style="display:none; margin-top:5px; width:85%;" placeholder="Name eingeben...">
        <button type="button" onclick="this.parentElement.remove()" style="position:absolute; right:5px; top:12px; background:red; color:white; border:none; border-radius:5px; padding:5px;">X</button>
    `;
    document.getElementById("workerContainer").appendChild(div);
});

// Artikel hinzufügen Butonu
document.getElementById("addArtikelBtn").addEventListener("click", () => {
    const anlage = document.getElementById("anlage").value;
    if(!anlage) return alert("Bitte Anlage wählen!");
    const unit = anlage === "COM" ? "kg" : "Stk";
    const div = document.createElement("div");
    div.className = "artikel-box";
    div.style = "background:rgba(255,255,255,0.05); padding:15px; border-radius:15px; margin-bottom:15px; border-left:4px solid #38bdf8; position:relative;";
    div.innerHTML = `
        <button type="button" onclick="this.parentElement.remove()" style="position:absolute; right:10px; top:10px; background:red; color:white; border:none; border-radius:5px; padding:5px;">X</button>
        <label>Artikel</label><input class="artBez" type="text" placeholder="Z.B. Teppich B1" style="margin-bottom:10px;">
        ${anlage === "COM" ? '<label>Dauer (Min)</label><input class="artDauer" type="number" value="0" style="margin-bottom:10px;">' : ''}
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <input type="number" class="gut" placeholder="Gut (${unit})">
            <input type="number" class="aus" placeholder="Ausschuss (${unit})">
        </div>
        <div class="row-area"></div>
        <button type="button" onclick="addRow(this, 'aus', '${anlage}')" style="width:100%; margin-top:10px; background:#334155; color:white;">+ Ausschuss-Grund</button>
        <div class="row-area"></div>
        <button type="button" onclick="addRow(this, 'stoer', '${anlage}')" style="width:100%; margin-top:5px; background:#334155; color:white;">+ Störung</button>
    `;
    document.getElementById("artikelContainer").appendChild(div);
});

function addRow(btn, type, anlage) {
    const area = btn.previousElementSibling;
    let list = anlage.startsWith("PUR") ? (type === 'aus' ? purAusschussCodes : purStoerungCodes) : (anlage === "COM" ? (type === 'aus' ? comAusschussCodes : comStoerungCodes) : (type === 'aus' ? imAusschussCodes : imStoerungCodes));
    const div = document.createElement("div");
    div.style = "display:flex; gap:5px; margin-top:5px;";
    div.innerHTML = `<select class="${type}-code" style="flex:2;">${list.map(c=>`<option value="${c}">${c}</option>`).join("")}</select>
                     <input type="number" class="${type}-val" placeholder="${type==='aus'?'Menge':'Min'}" style="flex:1;">
                     <button type="button" onclick="this.parentElement.remove()" style="background:none; border:none; color:red; font-weight:bold; font-size:18px;">✕</button>`;
    area.appendChild(div);
}

async function speichern() {
    const vardiye = document.getElementById("schichtWahl").value;
    const anlage = document.getElementById("anlage").value;
    const datum = document.getElementById("datum").value;
    const targetDauer = parseInt(document.getElementById("gesamtDauerInput").value) || 480;
    const ft = document.getElementById("ftSelect").value;
    
    let staff = [];
    document.querySelectorAll(".worker-box").forEach(box => {
        const s = box.querySelector("select").value;
        staff.push(s === "Sonstige" ? box.querySelector("input").value : s);
    });

    let details = "";
    let totalTime = 0;
    document.querySelectorAll(".artikel-box").forEach(box => {
        const name = box.querySelector(".artBez").value;
        const gut = box.querySelector(".gut").value || 0;
        const aus = box.querySelector(".aus").value || 0;
        const d = box.querySelector(".artDauer") ? parseInt(box.querySelector(".artDauer").value) || 0 : 0;
        totalTime += d;
        details += `📦 *${name}* ${d > 0 ? '(' + d + ' Min)' : ''}\n└ Gut: ${gut} | Aus: ${aus}\n`;
        box.querySelectorAll(".code-row").forEach(row => {
            details += `  - ${row.querySelector("select").value}: ${row.querySelector("input").value}\n`;
        });
    });

    if(anlage === "COM" && totalTime !== targetDauer) return alert(`❌ Zeitfehler: Toplam süre ${targetDauer} Min olmalı! (Şu an: ${totalTime})`);

    const finalAnlage = anlage.startsWith("PUR") ? `${anlage} (${ft})` : anlage;
    const report = `📊 *APG REPORT*\n📅 *Datum:* ${datum}\n⏱️ *Schicht:* ${vardiye}\n🏭 *Anlage:* ${finalAnlage}\n👷 *Personal:* ${staff.join(", ")}\n\n${details}`;

    try {
        await fetch(scriptURL, { method: "POST", mode: "no-cors", body: JSON.stringify({ datum, anlage: finalAnlage, report }) });
        window.location.href = `whatsapp://send?phone=4917684126305&text=${encodeURIComponent(report)}`;
    } catch(e) { window.location.href = `whatsapp://send?phone=4917684126305&text=${encodeURIComponent(report)}`; }
}
