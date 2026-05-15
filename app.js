document.querySelectorAll(".artikel-box").forEach(box => {
        const name = box.querySelector(".artName").value || "Unbekannt";
        const gut = box.querySelector(".gut").value || 0;
        const aus = box.querySelector(".ausTotal").value || 0;
        const d = box.querySelector(".artDauer") ? ` (${box.querySelector(".artDauer").value} Min)` : "";
        details += `📦 *${name}*${d}\n  └ Gut: ${gut} | Aus: ${aus}\n`;
        box.querySelectorAll(".aus-v").forEach((v, i) => { if(v.value) details += `  ⚠️ ${box.querySelectorAll(".aus-c")[i].value}: ${v.value}\n`; });
        box.querySelectorAll(".stoer-v").forEach((v, i) => { if(v.value) details += `  ⚙️ ${box.querySelectorAll(".stoer-c")[i].value}: ${v.value} Min\n`; });
    });

    const report = `📊 *APG BOCHUM REPORT*\n📅 Datum: ${datum}\n⏱️ Schicht: ${schicht}\n🏭 Anlage: ${anlage}\n${ftText}👷 Personal: ${staff.join(", ")}\n\n${details}`;

    try {
        await fetch(scriptURL, { method: "POST", mode: "no-cors", body: JSON.stringify({ datum, anlage, report }) });
        window.location.href = `whatsapp://send?phone=${WHATSAPP_NR}&text=${encodeURIComponent(report)}`;
    } catch(e) { window.location.href = `whatsapp://send?phone=${WHATSAPP_NR}&text=${encodeURIComponent(report)}`; }
}
