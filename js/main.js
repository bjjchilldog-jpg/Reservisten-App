// --- GLOBAL INIT & NAV ---
    window.onload = function() { 
        loadProfile(); loadRadar(); loadOpord(); loadRdl();
        document.getElementById('trainDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('rdlDate').value = new Date().toISOString().split('T')[0];
    };

    function switchView(id) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        if(id==='view-profile') loadProfileForm();
        if(id==='view-readiness') { loadIGF(); renderCustomDeadlines(); }
        if(id==='view-stan') renderProfiles();
        if(id==='view-log') loadLogs();
        if(id==='view-seminare') loadSeminare();
        if(id==='view-radar') loadRadar();
        if(id==='view-training') loadTraining();
        if(id==='view-opord') loadOpord();
        if(id==='view-rdl') loadRdl();
        if(id==='view-scenarios') loadScenarios(); 
    }

    // --- REDLIGHT MODE ---
    let isRedMode = false;
    function toggleRedMode() {
        isRedMode = !isRedMode;
        if(isRedMode) {
            document.body.classList.add('red-mode');
            document.getElementById('redModeBtn').innerText = "⚪ NORMAL MODE";
            document.getElementById('redModeBtn').style.color = "#000";
            document.getElementById('redModeBtn').style.background = "#fff";
        } else {
            document.body.classList.remove('red-mode');
            document.getElementById('redModeBtn').innerText = "🔴 RED MODE";
            document.getElementById('redModeBtn').style.color = "#f00";
            document.getElementById('redModeBtn').style.background = "#300";
        }
        loadRadar(); 
    }

    // --- IGF / KLF PREP PLANER (LOGIK AUS GRAPP) ---
    function calculatePrep() {
        var days = parseInt(document.getElementById('prepDays').value); 
        var curWt = parseFloat(document.getElementById('prepCurWt').value); 
        var tarWt = parseFloat(document.getElementById('prepTarWt').value); 
        var freq = parseFloat(document.getElementById('prepFreq').value); 
        var dietType = document.getElementById('prepDietType').value; 
        
        if(!days || !curWt) return alert("Bitte mindestens die Tage und dein aktuelles Gewicht ausfüllen!"); 
        
        // Wenn kein Zielgewicht angegeben, dann Erhaltungskalorien
        if(!tarWt) tarWt = curWt;

        var totalLoss = curWt - tarWt; 
        var bmr = 24 * curWt; 
        var tdee = Math.round(bmr * freq);
        
        // Max. gesunder Fettverlust pro Woche (1% des Körpergewichts)
        var maxSafeFatLoss = (curWt * 0.01) * (days / 7); 
        var fatToLose = totalLoss;

        var isDanger = false; var warningText = "";
        if (fatToLose > maxSafeFatLoss) { 
            isDanger = true; 
            warningText += "⚠️ <strong>WARNUNG:</strong> Ziel unrealistisch! Zu hoher Gewichtsverlust in kurzer Zeit führt zu massivem Muskelabbau und zerstört deine KLF/Marschleistung.<br>"; 
            fatToLose = maxSafeFatLoss; 
        }

        var dailyDeficit = Math.round((fatToLose * 7700) / days); 
        var targetKcal = tdee - dailyDeficit;
        
        if (targetKcal < (bmr * 0.8)) { 
            isDanger = true; 
            warningText += "⚠️ <strong>HUNGER-MODUS:</strong> Kaloriendefizit zu hoch! Das führt zu Verletzungen beim Marschtraining.<br>"; 
            targetKcal = Math.round(bmr * 0.8); 
        }

        var alertBox = document.getElementById('prepAlertBox'); 
        if (warningText !== "") { 
            alertBox.innerHTML = warningText; 
            alertBox.style.display = "block"; 
            alertBox.style.backgroundColor = isDanger ? "#c0392b" : "#81613e"; 
            alertBox.style.color = "#fff"; 
        } else { 
            alertBox.style.display = "none"; 
        }

        // Makro Verteilung
        var pMultiplier = (dietType === 'vegan' || dietType === 'vegetarisch') ? 2.2 : 2.0;
        var pGrams = Math.round(curWt * pMultiplier); 
        var fGrams = Math.round(curWt * 0.9); 
        var pKcal = pGrams * 4; 
        var fKcal = fGrams * 9; 
        var cKcal = targetKcal - pKcal - fKcal;
        var cGrams = Math.max(Math.round(cKcal / 4), 0);

        var dietTips = "";
        if(dietType === 'vegan') dietTips += "🌱 Vegan: Fokus auf Linsen/Bohnen für die Muskelerholung."; 
        if(dietType === 'vegetarisch') dietTips += "🥚 Veggie: Quark und Eier für konstante Proteinversorgung."; 
        if(dietType === 'omnivor') dietTips += "🥩 Omnivor: Weißes Fleisch bevorzugen. Fisch schmiert die Gelenke fürs Marschieren.";

        document.getElementById('prepTDEE').innerText = tdee + " kcal"; 
        document.getElementById('prepTargetKcal').innerText = targetKcal + " kcal"; 
        document.getElementById('prepProtein').innerText = pGrams + " g"; 
        document.getElementById('prepFat').innerText = fGrams + " g"; 
        document.getElementById('prepCarbs').innerText = cGrams + " g";
        
        // MILITÄRISCHE PERIODISIERUNG
        var phasesHtml = "<p style='font-size:12px; color:#ccc; margin-top:0;'>" + dietTips + "</p>"; 
        if(days > 28) {
            phasesHtml += "<div class='camp-phase'><strong>PHASE 1: GRUNDLAGEN (>4 Wochen vorher)</strong><br>Kalorienziel strikt halten. Fokus auf Kraftausdauer (BFT) und Gewöhnungsmärsche (6-8km).</div>";
            phasesHtml += "<div class='camp-phase'><strong>PHASE 2: INTENSITÄT (2-4 Wochen vorher)</strong><br>Marschstrecke auf Ziel-Distanz erhöhen. BFT Disziplinen auf Zeit trainieren.</div>";
            phasesHtml += "<div class='camp-phase'><strong>PHASE 3: TAPERING (Letzte Woche)</strong><br>Marschpensum drastisch reduzieren! Muskulatur erholen lassen. <strong>Carb-Loading:</strong> Carbs um 20% erhöhen, <strong>Hydration:</strong> 2 Tage vorher 3-4 Liter Wasser/Tag laden. Keine Water-Cuts!</div>";
        } else { 
            phasesHtml += "<div class='camp-phase'><strong>AKUT-PREP</strong><br>Wenig Zeit bis zur Abnahme! Vermeide harte Märsche 3 Tage vor dem Stichtag, um Verletzungen auszuschließen. Fokus auf Mobility und Hydration.</div>"; 
        } 
        document.getElementById('prepPhases').innerHTML = phasesHtml; 
        
        document.getElementById('prepResultBox').style.display = "block";
    }

    function generatePrepPlan() {
        var days = parseInt(document.getElementById('prepDays').value);
        if(!days) return alert("Bitte berechne zuerst den Planer!");
        
        var freqVal = parseFloat(document.getElementById('prepFreq').value);
        var sessionsPerWeek = 3; 
        if(freqVal >= 1.55) sessionsPerWeek = 4;

        // Radar auslesen für Schwachstellen-Fokus
        var radar = JSON.parse(localStorage.getItem('rk_radar_stats') || '{"waf":5,"san":5,"tak":5,"ori":5,"phy":5}');
        var lowestStat = { key: 'phy', val: 11 };
        for(var k in radar) { if(radar[k] < lowestStat.val) { lowestStat.val = radar[k]; lowestStat.key = k; } }

        var woche = []; 
        var weakFocus = "";
        
        // Militärischer Fokus je nach Schwäche
        if(lowestStat.key === 'phy') weakFocus = "BFT Intervall: 11x 10m Sprint + Klimmhang statisch (3x max).";
        else if(lowestStat.key === 'ori') weakFocus = "Karte & Kompass: Strecke vorher planen, markante Geländepunkte merken.";
        else if(lowestStat.key === 'waf' || lowestStat.key === 'tak') weakFocus = "Trockendrill: Waffenkontrolle unter Pulsbelastung (Burpees -> Anschlag).";
        else weakFocus = "Core & Rücken: Planks und Rumpfstabi für das Tragen des Rucksacks.";

        woche.push({ tag: "Montag", typ: "BFT Fokus", detail: weakFocus });
        woche.push({ tag: "Mittwoch", typ: "Grundlagen Cardio", detail: "Laufen (3000m) im BFT-Pace oder Rumpf-Stabi Zirkel." });
        woche.push({ tag: "Freitag", typ: "Active Recovery", detail: "Dehnen, Mobility für Hüfte und Knie, Ausrüstung (STAN) prüfen." });
        
        if(sessionsPerWeek >= 4) {
            woche.push({ tag: "Samstag", typ: "Marsch (Last)", detail: "Marsch mit 15kg Gepäck. Auf korrekte Schnürung und Pace (10min/km) achten." });
        } else {
            woche.push({ tag: "Wochenende", typ: "Marsch oder Rest", detail: "Entweder 10km Gewöhnungsmarsch oder komplette Erholung." });
        }

        var keys = ['waf', 'san', 'tak', 'ori', 'phy'];
        var labels = ["Waffendrill", "San/TCCC", "Taktik", "Orientierung", "Physis"];
        var labelIndex = keys.indexOf(lowestStat.key);
        var radarLabel = labels[labelIndex];

        var html = "<div class='card' style='border-left-color:#81613e;'><h3>📅 DEIN PREP-PLAN</h3><p style='font-size:12px; color:#ccc; margin-top:0;'>Generiert basierend auf Radar-Schwachstelle: <strong>" + radarLabel + "</strong>.</p>";
        woche.forEach(function(w) { html += "<div class='plan-day'><strong>" + w.tag + " - " + w.typ + "</strong><span>" + w.detail + "</span></div>"; });
        html += "</div>";

        document.getElementById('prepPlanBox').innerHTML = html; 
        document.getElementById('prepPlanBox').style.display = "block";
    }


    // --- SZENARIEN LOGIK (VERZWEIGT) ---
    let currentScenarioId = null;
    let currentNodeId = null;

    function loadScenarios() {
        const custom = JSON.parse(localStorage.getItem('rk_custom_scenarios') || "[]");
        const all = [...defaultScenarios, ...custom];
        document.getElementById('scenHome').style.display = 'block';
        document.getElementById('scenarioActive').style.display = 'none';
        document.getElementById('btnScenBack').style.display = 'block';
        
        document.getElementById('scenarioList').innerHTML = all.map(s => `
            <div class="card" style="cursor:pointer; display:flex; align-items:center; gap:15px; border-left-color:${s.id.startsWith('custom_')?'#2980b9':'#81613e'}">
                <div onclick="startScenario('${s.id}')" style="flex-grow:1; display:flex; align-items:center; gap:15px;">
                    <div style="font-size:30px;">${s.icon}</div>
                    <div>
                        <h3 style="margin:0; text-align:left; color:#a1b082;">${s.title}</h3>
                        <div style="font-size:11px; color:#889977; margin-top:4px;">${s.id.startsWith('custom_')?'EIGENES SZENARIO':'Szenario / Drill'}</div>
                    </div>
                </div>
                ${s.id.startsWith('custom_') ? `<button class="btn-sm-del" style="margin:0; padding:10px;" onclick="deleteCustomScenario('${s.id}')">X</button>` : ''}
            </div>
        `).join('');
    }

    function startScenario(id) {
        const custom = JSON.parse(localStorage.getItem('rk_custom_scenarios') || "[]");
        const all = [...defaultScenarios, ...custom];
        const s = all.find(x => x.id === id);
        currentScenarioId = id;
        document.getElementById('scenHome').style.display = 'none';
        document.getElementById('btnScenBack').style.display = 'none';
        document.getElementById('scenarioActive').style.display = 'block';
        document.getElementById('scenTitle').innerText = s.icon + " " + s.title;
        
        loadNode(s.startNode);
    }

    function loadNode(nodeId) {
        currentNodeId = nodeId;
        const custom = JSON.parse(localStorage.getItem('rk_custom_scenarios') || "[]");
        const all = [...defaultScenarios, ...custom];
        const s = all.find(x => x.id === currentScenarioId);
        const node = s.nodes[nodeId];
        
        document.getElementById('scenText').innerText = node.text;
        const fb = document.getElementById('scenFeedback');
        fb.style.display = 'none';
        
        document.getElementById('scenOptions').innerHTML = node.options.map((opt, idx) => `
            <button class="btn btn-dark" style="text-align:left; justify-content:flex-start; padding:15px; font-weight:normal; line-height: 1.4;" onclick="resolveNode(${idx})">
                ${opt.t}
            </button>
        `).join('');
    }

    function resolveNode(optIdx) {
        const custom = JSON.parse(localStorage.getItem('rk_custom_scenarios') || "[]");
        const all = [...defaultScenarios, ...custom];
        const s = all.find(x => x.id === currentScenarioId);
        const opt = s.nodes[currentNodeId].options[optIdx];
        const fb = document.getElementById('scenFeedback');
        
        fb.style.display = 'block';
        fb.style.borderLeftColor = opt.c ? '#27ae60' : '#c0392b';
        fb.style.backgroundColor = opt.c ? (isRedMode ? '#1a2214' : '#1a2214') : (isRedMode ? '#300' : '#221010');
        
        document.getElementById('scenOptions').innerHTML = ""; 
        
        let feedbackHtml = `<strong style="color: ${opt.c ? '#27ae60' : '#c0392b'}; font-size:16px;">${opt.c ? '✅ KORREKT' : '❌ FEHLER'}</strong><br><div style="margin-top:8px; line-height:1.4;">${opt.f}</div>`;
        
        if (opt.c === true && opt.next) {
            feedbackHtml += `<button class="btn btn-olive" style="margin-top:15px;" onclick="loadNode('${opt.next}')">NÄCHSTE PHASE ➡️</button>`;
        } else if (opt.c === false) {
            feedbackHtml += `<button class="btn btn-red" style="margin-top:15px;" onclick="closeScenario()">SZENARIO FEHLGESCHLAGEN (BEENDEN)</button>`;
        } else if (opt.endSuccess) {
            feedbackHtml += `<button class="btn btn-dark" style="margin-top:15px;" onclick="closeScenario()">ZURÜCK ZUR ÜBERSICHT</button>`;
        }
        
        fb.innerHTML = feedbackHtml;
    }

    function closeScenario() {
        loadScenarios();
    }

    function importCustomScenario(event) {
        const file = event.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const newScen = JSON.parse(e.target.result);
                newScen.id = 'custom_' + Date.now();
                const custom = JSON.parse(localStorage.getItem('rk_custom_scenarios') || "[]");
                custom.push(newScen);
                localStorage.setItem('rk_custom_scenarios', JSON.stringify(custom));
                loadScenarios();
                alert("Eigenes Szenario erfolgreich importiert!");
            } catch(err) { 
                alert("Fehler: Die Datei ist kein gültiges JSON-Szenario."); 
            }
        };
        reader.readAsText(file);
    }

    function deleteCustomScenario(id) {
        if(!confirm("Möchtest du dieses eigene Szenario wirklich löschen?")) return;
        let custom = JSON.parse(localStorage.getItem('rk_custom_scenarios') || "[]");
        custom = custom.filter(x => x.id !== id);
        localStorage.setItem('rk_custom_scenarios', JSON.stringify(custom));
        loadScenarios();
    }

// --- SERVICE WORKER REGISTRATION ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
