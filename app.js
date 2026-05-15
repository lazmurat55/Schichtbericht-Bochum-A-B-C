const scriptURL = "https://script.google.com/macros/s/AKfycbx55ShhJiujy6xj8lJZoDOoRh5wSpYpbPCbCNVoKnqR53gSUwsmKzSVv4ZXaihBQwwzVg/exec";
const WHATSAPP_NR = "+4917623638794";

const workers = {
    "A": ["Kunert M. - 502", "Karali O. - 533 E", "Mikuczynski K. - 1212", "Türkmen E. - 1213 E", "Amrouch M. - 1268", "Stania D. - 1368", "Kantaroglu A. - 1382", "Krancioch A. - 1405", "Held D. - 1421", "Berisha I. - 1534", "Neji M. - 1536", "Mulugeta G. - 1633", "Udezue P. - 1686", "Jansen M. - 1692", "Aksoy O. - 1704", "Yildirim S. - 1710", "Brand N. - 1722", "Louze A. - 1724", "Blanquez Romero V. - 1725", "Diallo M.D. - 1726", "Sener E. - 1731 E", "Sonstige"],
    "B": ["Keskin Mur.-517", "Aldirmaz P.-577", "Anderwald R.-509 E", "Bayrakli F.-1377 E", "Kilic D.-1384 E", "Maafi T.-1273 E", "Besche T.-1472", "Eickhoff P.-1406", "Toth Renata-1699", "Gibba n.-1367", "Helf A.-1483", "Isbir J.-1715", "Jeyakumar S.-1698", "Kalisch T.-1451", "Kowarsch R.-484", "Nowak M.-1390", "Pähler D.-1332", "Patarcsity V.-1700", "Pulendran K.-1498", "Sahin E.-1721", "Savas S.-1360", "Schiavitelli C.-1669", "Uluyüz B.-1450", "Uzun S.-1433", "Sonstige"],
    "C": ["Beher T. - 510", "Keskin Mustafa - 518", "Kantaroglu Ö. - 580", "Savas R. - 608", "Rafo S. - 1277", "Gertz Kevin - 1357", "Gertz S. - 1358 E", "Schönborn Ch. - 1361", "Fortes Ch. - 1381", "Sakaguchi M. - 1391", "Mercan M. - 1437 E", "Krämer Ch. - 1449", "Juretzka T. - 1473", "Kumbara E. - 1474", "Skupio D. - 1475", "Skrago T. - 1484", "Bah A. - 1684", "Kaya A. - 1712", "Jdea A. - 1701", "Toure A. - 1713", "Schneider D. - 1714", "Tchaleu Bertrand - 1723", "Sonstige"]
};

const stuerungen = {
    PUR: [
        "3-01 Werkzeugwechsel", "3-02 Materialumstellung", "4-2-01 Ungepl. Inst. Werkzeug", 
        "4-2-02 Ungepl. Inst. Maschine", "4-2-03 POLY/ISO Überdruck", "4-2-04 Mischkopf n.i.o.", 
        "4-2-05 Fehler Lichtschranke", "4-2-06 Trennmittelpistole defekt", "4-2-07 Formträger Problem", 
        "4-2-08 Reinigung Werkzeug", "4-2-09 Not Aus", "5-2-01 Logistik Mangel", 
        "5-2-02 Keine Teile von IM/CIM", "5-2-04 Wartezeit Einrichter", "5-2-10 Poly/Iso leer", "Sonstige"
    ],
    IM_CIM: [
        "3-01 Werkzeugwechsel", "3-02 Materialumstellung", "4-1-01 Ungepl. Inst. Werkzeug", 
        "4-1-02 Ungepl. Inst. Maschine", "4-1-03 Materialförderung gestört", "4-1-04 Dosiereinheit", 
        "4-1-05 Schließeinheit", "4-1-06 Teileentnahme", "4-1-07 Werkzeugheizung", 
        "4-1-08 Beflammprozess", "5-1-01 Materialmangel", "5-1-03 Wartezeit Einrichter", "Sonstige"
    ],
    COM: [
        "3-01 Werkzeugwechsel", "3-02 Materialumstellung", "4-3-01 Lochplatte Messer", 
        "4-3-02 Ungepl. Inst. Maschine", "4-3-04 Silowechsel", "5-3-01 Materialmangel", 
        "5-3-05 Feueralarm", "Sonstige"
    ]
};

window.onload = () => { document.getElementById("datum").value = new Date().toISOString().split("T")[0]; };

function handleAnlageChange(val) {
    document.getElementById("ftBox").style.display = val.startsWith("PUR") ? "block" : "none";
}

function updateWorkerList() { document.getElementById("workerContainer").innerHTML = ""; }

function addWorker() {
    const s = document.getElementById("schichtWahl").value;
    const div = document.createElement("div");
    div.className = "worker-box";
    div.style = "background:rgba(255,255,255,0.03); padding:10px; border-radius:10px; margin-top:10px; position:relative; border-left:3px solid #38bdf8;";
    div.innerHTML = `<button onclick="this.parentElement.remove()" style="position:absolute; right:5px; top:5px; background:red; color:white; border:none; border-radius:5px; cursor:pointer;">X</button>
        <select class="workerSelect" style="width:90%; padding:8px; background:#0f172a; color:white; border-radius:5px;" onchange="this.nextElementSibling.style.display=(this.value==='Sonstige'?'block':'none')">
            ${workers[s].map(w => `<option value="${w}">${w}</option>`).join("")}
        </select><input type="text" style="display:none; margin-top:5px; width:90%; padding:8px;" placeholder="Name...">`;
    document.getElementById("workerContainer").appendChild(div);
}

function addArtikel() {
    const anlage = document.getElementById("anlage").value;
    if(!anlage) return alert("Bitte Anlage wählen!");
    const div = document.createElement("div");
    div.className = "artikel-box";
    div.style = "background:rgba(255,255,255,0.03); padding:15px; border-radius:15px; margin-top:15px; border-left:4px solid #38bdf8; position:relative;";
    div.innerHTML = `<button onclick="this.parentElement.remove()" style="position:absolute; right:10px; top:10px; background:red; color:white; border:none; border-radius:5px;">X</button>
        <label>Artikel Bezeichnung</label><input class="artName" type="text" placeholder="Z.B. Teppich B1">
        ${anlage==='COM' ? '<label>Dauer (Min)</label><input type="number" class="artDauer" oninput="validate(this.closest(\'.artikel-box\'))">' : ''}
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:10px;">
            <div><label>Gut</label><input type="number" class="gut"></div>
            <div><label>Ausschuss Gesamt</label><input type="number" class="ausTotal" oninput="validate(this.closest('.artikel-box'))"></div>
        </div>
        <div class="error-msg" style="color:#ef4444; font-size:12px; font-weight:bold; display:none; margin-top:5px;">⚠️ Summe Ausschuss-Grund stimmt nicht!</div>
        <div class="codes-area"></div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:10px;">
            <button type="button" onclick="addRow(this,'aus')" style="padding:8px; background:#334155; color:white; border:none; border-radius:5px;">+ Ausschuss</button>
            <button type="button" onclick="addRow(this,'stoer')" style="padding:8px; background:#334155; color:white; border:none; border-radius:5px;">+ Störung</button>
        </div>`;
    document.getElementById("artikelContainer").appendChild(div);
}

function addRow(btn, type) {
    const anlage = document.getElementById("anlage").value;
    const cat = anlage === "COM" ? "COM" : (anlage.startsWith("PUR") ? "PUR" : "IM_CIM");
    const target = btn.parentElement.previousElementSibling;
    const row = document.createElement("div");
    row.style = "display:flex; gap:5px; margin-top:5px;";
    
    let list = type === 'stoer' ? stuerungen[cat] : ["Anfahrschrott", "Materialumstellung", "CIM n.voll", "CIM gerissen", "Sonstige"];
    
    row.innerHTML = `<select style="flex:2; padding:5px; background:#0f172a; color:white;" class="${type}-c">${list.map(c=>`<option value="${c}">${c}</option>`).join("")}</select>
        <input type="number" style="flex:1; padding:5px;" class="${type}-v" oninput="validate(this.closest('.artikel-box'))" placeholder="${type==='aus'?'Menge':'Min'}">
        <button onclick="this.parentElement.remove(); validate(this.closest('.artikel-box'))" style="background:none; border:none; color:red;">✕</button>`;
    target.appendChild(row);
}

function validate(box) {
    const total = parseFloat(box.querySelector(".ausTotal").value) || 0;
    let sum = 0;
    box.querySelectorAll(".aus-v").forEach(i => sum += (parseFloat(i.value) || 0));
    box.querySelector(".error-msg").style.display = (total > 0 && total !== sum) ? "block" : "none";
}

async function speichern() {
    const anlage = document.getElementById("anlage").value;
    const datum = document.getElementById("datum").value;
    const schicht = document.getElementById("schichtWahl").value;

    let hasError = false;
    document.querySelectorAll(".error-msg").forEach(m => { if(m.style.display === "block") hasError = true; });
    if(hasError) return alert("❌ Fehler: Ausschuss-Mengen prüfen!");

    let staff = [];
    document.querySelectorAll(".worker-box").forEach(box => {
        const s = box.querySelector("select").value;
        staff.push(s === "Sonstige" ? box.querySelector("input").value : s);
    });

    let ftList = [];
    document.querySelectorAll(".ft-check:checked").forEach(c => ftList.push(c.value));
    const ftText = ftList.length > 0 ? `🛠 FT: ${ftList.join(", ")}\n` : "";

    let details = "";
    document.querySelectorAll(".artikel-box").forEach(box => {
        const name = box.querySelector(".artName").value || "Unbekannt";
        const gut = box.querySelector(".gut").value || 0;
        const aus = box.querySelector(".ausTotal").value || 0;
        details += `📦 *${name}*\n  └ Gut: ${gut} | Aus: ${aus}\n`;
        box.querySelectorAll(".stoer-v").forEach((v, i) => { if(v.value) details += `  ⚙️ ${box.querySelectorAll(".stoer-c")[i].value}: ${v.value} Min\n`; });
    });

    const report = `📊 *APG PRODUCTION REPORT BOCHUM*\n📅 Datum: ${datum}\n⏱️ Schicht: ${schicht}\n🏭 Anlage: ${anlage}\n${ftText}👷 Personal: ${staff.join(", ")}\n\n${details}`;

    try {
        await fetch(scriptURL, { method: "POST", mode: "no-cors", body: JSON.stringify({ datum, anlage, report }) });
        window.location.href = `whatsapp://send?phone=${WHATSAPP_NR}&text=${encodeURIComponent(report)}`;
    } catch(e) { window.location.href = `whatsapp://send?phone=${WHATSAPP_NR}&text=${encodeURIComponent(report)}`; }
}
