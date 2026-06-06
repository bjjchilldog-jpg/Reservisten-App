const defaultScenarios = [
        {
            id: 's1', 
            title: 'Schießunfall (Gefechtsschießen & TCCC)', 
            icon: '🎯',
            startNode: 'n1',
            nodes: {
                'n1': {
                    text: 'Gefechtsschießen. Der Schütze rechts von dir stolpert beim Stellungswechsel und fällt hart. Ein Schuss löst sich unkontrolliert. Er bleibt schmerzgekrümmt genau auf seiner entsicherten, geladenen Waffe (G36) liegen.',
                    options: [
                        { t: 'Waffe sofort fallen lassen, hinrennen und Erste Hilfe leisten. Jede Sekunde zählt!', f: 'KRITISCHER FEHLER (Eigenschutz). Er liegt auf einer scharfen Waffe. Wenn er krampft, löst sich ein weiterer Schuss und trifft dich. Es gibt jetzt zwei Ausfälle.', c: false },
                        { t: 'Laut "Sicherheit!" brüllen (Übungsabbruch). Eigene Waffe sichern. Annäherung von der waffenabgewandten Seite (Kopf/Rücken).', f: 'KORREKT. Eigensicherung geht immer vor Kameradenhilfe. Du hast die Lage "eingefroren" und näherst dich taktisch klug.', c: true, next: 'n2' }
                    ]
                },
                'n2': {
                    text: 'Du bist am Verletzten. Er windet sich panisch vor Schmerz und greift instinktiv in Richtung seiner Brust, genau dorthin, wo die Mündung seines G36 unter ihm herausschaut.',
                    options: [
                        { t: 'Ihn am Plattenträger packen und mit einem Ruck auf den Rücken rollen, um die Wunde zu suchen.', f: 'KRITISCHER FEHLER. Durch das unkontrollierte Rollen verfängt sich der Abzug in seiner Ausrüstung. Ein weiterer Schuss löst sich.', c: false },
                        { t: 'Körpergewicht einsetzen (Knee on Belly/Shoulder). Seine Hände blockieren, die Waffe unter ihm sichern (S-Hebel) und weit weglegen.', f: 'KORREKT. "Position before Submission". Du neutralisierst erst die mechanische Gefahr (die Waffe), bevor du in den medizinischen Modus wechselst.', c: true, next: 'n3' }
                    ]
                },
                'n3': {
                    text: 'Die Waffe ist sicher. Der Leitende rennt los. Der Kamerad hält sich brüllend den rechten Oberschenkel. Das Hosenbein ist extrem blutdurchtränkt, eine massive Blutlache vergrößert sich rasend schnell im Dreck.',
                    options: [
                        { t: 'Beruhigen. Atemwege prüfen (Kopf überstrecken) und Puls am Hals fühlen, um den Schockzustand zu bewerten.', f: 'KRITISCHER FEHLER. Du hast das "c" (Critical Bleeding) im cABCDE ignoriert. Bei einer arteriellen Blutung am Oberschenkel verblutet er in unter 2 Minuten. Puls fühlen kostet hier das Leben.', c: false },
                        { t: 'c-Problem erkannt (Critical Bleeding). Sofort in sein oder dein IFAK greifen und das Tourniquet (TQ) ziehen.', f: 'KORREKT. Lebensbedrohliche Extremitäten-Blutungen müssen sofort und vor allem anderen (Airway, Breathing) gestoppt werden.', c: true, next: 'n4' }
                    ]
                },
                'n4': {
                    text: 'Du hast das TQ in der Hand. Das Bein ist voller Schlamm und Blut, die genaue Eintrittswunde ist in der Hektik nicht sofort sichtbar.',
                    options: [
                        { t: 'Kleiderschere ziehen, Hose aufschneiden, Wunde lokalisieren und das TQ exakt 5 cm oberhalb der Wunde auf der nackten Haut anlegen.', f: 'FEHLER. In der "Care Under Fire" / Erstphase bei starker Blutung dauert das Zerschneiden robuster Kleidung viel zu lange. Der Blutverlust ist zu hoch.', c: false },
                        { t: '"High & Tight" anwenden. Das TQ so hoch wie möglich am Bein (Richtung Leiste) direkt über die Kleidung anlegen und zudrehen.', f: 'KORREKT. Im ersten Schock und unter Stress ist "High & Tight" die sicherste und schnellste Methode, um die arterielle Blutung zu stoppen.', c: true, next: 'n5' }
                    ]
                },
                'n5': {
                    text: 'Das TQ ist fest zugedreht. Die Blutung stoppt. Plötzlich packt dich der Kamerad am Kragen und schreit unter Tränen: "Mach das ab! Das zerreißt mir das Bein! Ich halte den Schmerz nicht aus, bitte mach es locker!"',
                    options: [
                        { t: 'Mitleid zeigen. Das TQ eine halbe Umdrehung lockern, damit er den Schmerz besser aushält, bis der Sanitäter da ist.', f: 'KRITISCHER FEHLER. Tödliches Mitleid. Durch das Lockern öffnest du die Arterie wieder. Der Blutdruckabfall im Schock führt dazu, dass du die Blutung danach nicht mehr gestoppt kriegst. Er verblutet.', c: false },
                        { t: 'Seine Hände wegdrücken. Klarer, harter Befehl: "Das TQ bleibt zu! Der Schmerz bedeutet, dass es funktioniert." Uhrzeit auf das TQ schreiben.', f: 'KORREKT. Ein TQ tut extrem weh. Profis wissen, dass sie dem Kameraden Schmerzen zufügen müssen, um sein Leben zu retten. Du hast mentale Härte bewiesen.', c: true, next: 'n6' }
                    ]
                },
                'n6': {
                    text: 'Der Leitende erreicht euch und ruft: "Was ist der Status?! Brauchen wir einen Hubschrauber?" Du musst ihm jetzt unter maximalem Adrenalin die Lage melden.',
                    options: [
                        { t: 'Emotional: "Er ist angeschossen! Er blutet wie verrückt, er stirbt uns hier weg! Ruf sofort den Hubschrauber!"', f: 'FEHLER. Panik-Meldung. Du überträgst deinen Stress auf den Leitenden und lieferst keine sauberen Fakten für den 9-Liner / Notruf.', c: false },
                        { t: 'Meldung nach cABC: "Schießunfall. Ein Verletzter. Schusswunde rechtes Bein. Massive Blutung durch TQ gestoppt (Uhrzeit). Patient ist ansprechbar. Wir brauchen den San-Trp!"', f: 'KORREKT. Klare, sachliche TCCC-Übergabe. Der Leitende weiß sofort, dass die akute Lebensgefahr gebannt ist und kann gezielt alarmieren.', c: true, next: 'n7' }
                    ]
                },
                'n7': {
                    text: 'Der Sanitätstrupp ist noch 5 Minuten entfernt. Der Kamerad wird extrem blass, zittert am ganzen Körper und ist kaltschweißig. Der Schock setzt ein.',
                    options: [
                        { t: 'Ihm gut zureden: "Gleich geschafft, halte durch!" und seine Beine hochlegen (Schocklage), ihn aber sonst auf dem kalten Boden liegen lassen.', f: 'KRITISCHER FEHLER (Trauma-Trias). Wärmeverlust führt bei Traumapatienten zum Versagen der Blutgerinnung. Wer auf dem kalten Boden liegt, blutet innerlich weiter. Eine der häufigsten Todesursachen.', c: false },
                        { t: 'Phase E (Exposure/Environment): Sofort Rettungsdecke aus dem IFAK holen. Ihn auf die Decke rollen (Isolierung nach unten) und einwickeln. Aktiv Wärme erhalten.', f: '🏆 MEISTERHAFT. Du hast das cABCDE-Schema vollständig und professionell durchgearbeitet. Waffe gesichert, Blutung gestoppt, Mitleids-Falle umgangen, sauber gemeldet und den Wärmeerhalt gesichert. Du hast sein Leben gerettet. Szenario bestanden!', c: true, endSuccess: true }
                    ]
                }
            }
        },
        {
            id: 's2', 
            title: 'Aggressivität bei der Wache (MSB)', 
            icon: '🛑',
            startNode: 'n1',
            nodes: {
                'n1': {
                    text: 'Nachtwache am Tor (Militärischer Sicherheitsbereich - MSB). Ein offensichtlich angetrunkener Zivilist nähert sich, filmt dich mit dem Handy, leuchtet dir ins Gesicht und ruft: "Zeig mal dein Gesicht, du System-Sklave!"',
                    options: [
                        { t: 'Ihm die Handylampe wegschlagen und lautstark drohen, ihn festzunehmen, wenn er nicht sofort verschwindet.', f: 'FEHLER. Du lieferst ihm exakt die Eskalation und das Videomaterial, das er provozieren will. Du verlierst die Souveränität.', c: false },
                        { t: 'Abstand wahren. Klar und sachlich: "Militärischer Sicherheitsbereich, treten Sie zurück!" Wachhabenden via Funk informieren (Beobachtung melden).', f: 'KORREKT. Deeskalation, Eigenschutz und Meldekette (SALUTE) eingehalten. Keine Angriffsfläche geboten.', c: true, next: 'n2' }
                    ]
                },
                'n2': {
                    text: 'Der Mann ignoriert die Warnung, überschreitet grinsend die rote Linie des MSB und greift plötzlich ruckartig nach vorn in Richtung deines Tragesystems/deiner Waffe.',
                    options: [
                        { t: 'Waffe ziehen, entsichern und sofort einen Warnschuss in den weichen Boden abgeben.', f: 'KRITISCHER FEHLER. Verstoß gegen die Verhältnismäßigkeit (UZwG Bw). Bei einem unbewaffneten Angriff ist der Schusswaffengebrauch das allerletzte Mittel.', c: false },
                        { t: 'Ausweichschritt (Distanz schaffen), lautes "Halt, oder ich wende körperliche Gewalt an!". Anschließend Zugriff (Takedown/Hebel), um ihn zu kontrollieren.', f: 'KORREKT. Verhältnismäßigkeit gewahrt. Du nutzt waffenlose Selbstverteidigung, um die direkte Gefahr an der Waffe zu neutralisieren.', c: true, next: 'n3' }
                    ]
                },
                'n3': {
                    text: 'Der Takedown war erfolgreich. Der Angreifer liegt auf dem Bauch, du hast ihn im Kontrollgriff fixiert. Die Feldjäger sind noch 3 Minuten entfernt. Der Mann wehrt sich nicht mehr, jammert aber: "Ich krieg keine Luft mehr!"',
                    options: [
                        { t: 'Ignorieren. Volles Körpergewicht auf seinem Rücken lassen. Wer einen Wachposten angreift, muss da durch.', f: 'FEHLER (LEBENSGEFAHR). Akute Gefahr der lagebedingten Erstickung (Positional Asphyxia). Als Profi weißt du: Ein toter Pöbler bringt dich vor Gericht.', c: false },
                        { t: 'Auf Waffen abtasten. Fixierung so anpassen, dass der Brustkorb frei atmen kann (z.B. Armkontrolle im Knien). Vitalfunktionen überwachen.', f: '🏆 EXZELLENT. Lage unter Kontrolle, UZwG Bw rechtmäßig angewendet und professionelle Fürsorgepflicht gewahrt. Übergabe an Feldjäger vorbereitet.', c: true, endSuccess: true }
                    ]
                }
            }
        },
        {
            id: 's3', 
            title: 'Materialausfall (Rucksack & Load Management)', 
            icon: '🎒',
            startNode: 'n1',
            nodes: {
                'n1': {
                    text: 'Gepäckmarsch, Kilometer 8. Du trägst 30 kg. Plötzlich ein lauter Knall – das rechte Schulterband reißt komplett an der oberen Naht ab. Das Gewicht reißt dich hart nach rechts unten aus dem Tritt.',
                    options: [
                        { t: 'Zähne zusammenbeißen. Den Rucksack irgendwie halbschief über die linke Schulter wuchten und weitermarschieren, um keine Schwäche zu zeigen.', f: 'KRITISCHER FEHLER. Die einseitige Belastung von 30 kg zerstört dir in kürzester Zeit die Bandscheiben und Muskulatur. Du fällst komplett aus, musst evakuiert werden und gefährdest das Team.', c: false },
                        { t: 'Sofort "Halt!" rufen. Gruppe zur Rundumsicherung einteilen, Rucksack absetzen und den Schaden am Material bei Rotlicht begutachten.', f: 'KORREKT. Problem erkennen, Lage einfrieren. Falscher Stolz ist unprofessionell. Du analysierst das Problem sachlich.', c: true, next: 'n2' }
                    ]
                },
                'n2': {
                    text: 'Der Rucksack liegt vor dir. Das Trageband ist direkt an der Naht ausgerissen. Du hast dein Reparatur-Kit aus der STAN-Liste dabei. Die Zeit drängt.',
                    options: [
                        { t: 'Schnelle Lösung: Den Gurt mit einer halben Rolle Panzertape wieder an den Rucksack kleben. "Hält schon bis zum Ziel!"', f: 'RISIKO-ENTSCHEIDUNG. Pfusch am Bau. Panzertape hält keine dynamischen 30 kg auf Dauer.', c: true, next: 'n2_tape' },
                        { t: 'Strukturelle Lösung: Den Gurt mit Paracord durch die Molle-Schlaufen vernähen und zur Sicherheit mit einem lasttragenden Karabiner am Tragegestell fixieren.', f: 'KORREKT. Echtes Handwerk. Du investierst 3 Minuten mehr, hast dafür aber eine Lösung, die dynamische Lasten aushält.', c: true, next: 'n3' }
                    ]
                },
                'n2_tape': {
                    text: 'Nach 500 Metern im strömenden Regen löst sich das Panzertape. Der Rucksack knallt auf den Boden. Das Mundstück deiner Trinkblase reißt ab, Wasser läuft aus.',
                    options: [
                        { t: 'Wütend auf das Material schimpfen. Den Rucksack vor die Brust nehmen und die restlichen 3 Kilometer in den Armen tragen.', f: 'KRITISCHER FEHLER. Wutausbruch und völliger Kontrollverlust. Deine Arme übersäuern nach 200 Metern, du bist nicht mehr in der Lage, deine Waffe zu bedienen (Combat Ineffective).', c: false },
                        { t: 'Fehler eingestehen. Erneut anhalten. Trinkblase abklemmen. Jetzt die strukturelle Lösung (Paracord & Karabiner) anwenden, auch wenn die Pace komplett einbricht.', f: 'KORREKT. "Position before Submission". Du hast den Fehler erkannt und korrigierst ihn jetzt sauber, statt dich weiter in die Erschöpfung zu treiben.', c: true, next: 'n3' }
                    ]
                },
                'n3': {
                    text: 'Die Paracord-Konstruktion hält. Aber das Schulterpolster ist weg, das Seil schneidet direkt in deinen Nacken/Schulterbereich ein. Ihr habt noch 4 Kilometer vor euch.',
                    options: [
                        { t: 'Schmerz ignorieren und das Tempo anziehen. Du willst die verlorene Zeit aufholen. "Ein Indianer kennt keinen Schmerz."', f: 'FEHLER. Falsches Heldenepos. Das Paracord klemmt dir Nerven ab und scheuert die Haut blutig. Das führt zu Schonhaltungen und provoziert Bänderrisse im unebenen Gelände.', c: false },
                        { t: 'Lastenmanagement ("Contingency Plan"). Schweres Material (Mun-Kiste, Wasser) auf die Buddys verteilen. Ein Ersatz-T-Shirt als Polster unter das Paracord klemmen.', f: 'KORREKT. Führung und Teamwork. Du reduzierst die Belastung auf die Notkonstruktion und schützt deinen Körper vor dauerhaften Nervenschäden.', c: true, next: 'n4' }
                    ]
                },
                'n4': {
                    text: 'Die letzten 2 Kilometer. Ihr seid durch die Reparaturen hinter dem Zeitplan. Wenn ihr so weitergeht, kommt ihr 10 Minuten zu spät am Checkpoint (Ziel) an.',
                    options: [
                        { t: 'Befehl zum Laufschritt (Laufen mit Gepäck), um die Zeitverzögerung zwingend aufzuholen. Befehl ist Befehl.', f: 'KRITISCHER FEHLER. Laufen mit provisorisch repariertem Gepäck führt zum endgültigen Materialbruch oder zu Sturzverletzungen. Ihr kommt vielleicht pünktlich, aber als Totalausfälle an.', c: false },
                        { t: 'Pace beibehalten. Funkspruch an Leitenden: "Verzögerung durch Materialausfall. Melde eintreffen in +10 Minuten. Status: Voll einsatzbereit.".', f: '🏆 MEISTERHAFT. Taktische Reife. Du priorisierst die Einsatzbereitschaft (Combat Readiness) deines Teams über blinden Gehorsam gegenüber einer fiktiven Uhrzeit. Kommunikation löst das Problem souverän. Szenario bestanden!', c: true, endSuccess: true }
                    ]
                }
            }
        },
        {
            id: 's4', 
            title: 'Verlaufen im Regen (Orientierung & Führung)', 
            icon: '🌧️',
            startNode: 'n1',
            nodes: {
                'n1': {
                    text: 'Orientierungsmarsch bei Nacht und starkem Regen. Seit 40 Minuten habt ihr keinen verifizierbaren Geländepunkt mehr passiert. Die Gruppe wird unruhig, nass und kalt. Du bist der Führer.',
                    options: [
                        { t: 'Tempo erhöhen und in die vermutete Richtung weiterlaufen, um schnell wieder auf bekanntes Terrain zu stoßen. Unsicherheit überspielen.', f: 'KRITISCHER FEHLER. Das ist eine Flucht- und Panikreaktion. Erhöht die Chance, sich komplett zu verfranzen. Die Gruppe merkt, dass du planlos bist, das Vertrauen bricht.', c: false },
                        { t: 'Halt. Rundumsicherung befehlen. Der Gruppe klar kommunizieren, dass die Orientierung unklar ist und jetzt methodisch neu bewertet wird.', f: 'KORREKT. STOP-Prinzip (Stop, Think, Observe, Plan). Ehrliche Kommunikation schafft Vertrauen, blindes Weiterrennen führt ins Chaos.', c: true, next: 'n2' }
                    ]
                },
                'n2': {
                    text: 'Die Gruppe liegt in der Sicherung. Der Regen peitscht. Du musst eure Position bestimmen. Wie gehst du vor?',
                    options: [
                        { t: 'Smartphone ziehen, GPS/Maps öffnen und hoffen, dass du Empfang hast, um schnell den Standort zu fixen.', f: 'RISIKO-ENTSCHEIDUNG. Technik-Abhängigkeit unter widrigen Bedingungen.', c: true, next: 'n2_tech' },
                        { t: 'Handy bleibt in der Tasche. Poncho über den Kopf ziehen (Zeltbahn-Tipi), Rotlicht an, Karte ausrichten und Azimut für den Rückmarsch zum letzten bekannten Punkt (LKP) ermitteln.', f: 'KORREKT. Analoges Handwerk fällt nicht aus. Du navigierst methodisch zum "Last Known Point" zurück.', c: true, next: 'n3' }
                    ]
                },
                'n2_tech': {
                    text: 'Dein Touchscreen ist nass und reagiert kaum. Der Akku droppt durch die Kälte rapide auf 5%. Du hast keinen GPS-Fix, starrst aber verzweifelt auf den Ladekreis.',
                    options: [
                        { t: 'Fluchen, den Bildschirm an der nassen Hose abwischen und weitere 5 Minuten versuchen, das Ding zum Laufen zu bringen. "Das muss doch gehen!"', f: 'KRITISCHER FEHLER (Target Fixation). Du hast einen Tunnelblick entwickelt. Während du mit der Technik kämpfst, kühlt deine Gruppe im strömenden Regen aus.', c: false },
                        { t: 'Fehlschlag sofort akzeptieren ("Digital Blackout"). Handy wegpacken, Poncho drüber und sofort auf analoge Karte/Kompass wechseln.', f: 'KORREKT. "Pattern Interrupt". Du hast den Tunnelblick durchbrochen und gehst auf die verlässliche Rückfallposition (Analog) über.', c: true, next: 'n3' }
                    ]
                },
                'n3': {
                    text: 'Der Azimut für den Rückweg steht. Beim Abmarsch bemerkst du, dass der Kamerad am Ende der Gruppe stark zittert, stolpert und apathisch wirkt (beginnende Unterkühlung / Hypothermie).',
                    options: [
                        { t: 'Ihn verbal hart antreiben: "Bewegung macht warm, wir müssen jetzt Meter machen, um hier rauszukommen! Reiß dich zusammen!"', f: 'KRITISCHER FEHLER. Eine Hypothermie heilt man nicht durch Erschöpfung. Er wird in Kürze zusammenbrechen. Dann hast du einen echten MEDEVAC-Fall mitten im Wald.', c: false },
                        { t: 'Kurzer Halt (cABCDE - Exposure). Ihm eine trockene Schicht oder Nässeschutz überziehen, Traubenzucker geben. Ihn direkt hinter dich nehmen und das Tempo an ihn anpassen.', f: 'KORREKT. Führung bedeutet Fürsorge. Du verhinderst den medizinischen Totalausfall durch aktives Wärmemanagement und Pacing.', c: true, next: 'n4' }
                    ]
                },
                'n4': {
                    text: 'Ihr folgt eurem Azimut. Plötzlich steht ihr vor einem Bachlauf, der durch den Starkregen zu einem reißenden, hüfttiefen Gewässer angeschwollen ist. Er kreuzt eure exakte Marschlinie.',
                    options: [
                        { t: 'Zeit ist kritisch. Kameraden anweisen, sich unterzuhaken und sofort in Linie durch das Wasser zu waten. "Augen zu und durch!"', f: 'KRITISCHER FEHLER. Nasse Stiefel/Hosen bei ohnehin unterkühlten Soldaten sind das Todesurteil für den Marsch. Zudem extreme Sturz- und Ertrinkungsgefahr durch Strömung.', c: false },
                        { t: 'Hindernis umgehen (Umgang). Marschkompasszahl anpassen, dem Uferverlauf bis zu einer flacheren Stelle oder einer Brücke folgen, auch wenn es Zeit kostet.', f: 'KORREKT. Taktische Geduld. Sicherheit und Kampfkraft (trockene Füße) gehen vor blinder Linientreue auf der Karte.', c: true, next: 'n5' }
                    ]
                },
                'n5': {
                    text: 'Ihr habt das Hindernis umgangen, seid aber erschöpft. Die Moral der Gruppe ist am Boden. Jemand ruft: "Ich kann nicht mehr, lass uns hier im Schlamm biwakieren und bis morgen warten!"',
                    options: [
                        { t: 'Nachgeben. Du willst nicht der Diktator sein. Ihr spannt die Ponchos notdürftig im Schlamm auf und wartet frierend auf den Morgen.', f: 'FEHLER (Submission). Du hast die Führung abgegeben. Ein nasses, ungeplantes Biwak ohne Ausrüstung führt zu massiven Kälteschäden. Die Lage verschlechtert sich nur.', c: false },
                        { t: 'Führen von vorn (Command Presence). Klares Mikroziel setzen: "Wir gehen nicht in den Schlamm. Noch 800 Meter bis zur befestigten Straße. Ich zähle die Schritte. Auf geht\'s!"', f: '🏆 MEISTERHAFT. Du hast die mentale Submission der Gruppe verhindert. Durch klare Mikroziel-Setzung und Vormachen zwingst du die Gruppe aus der Opferrolle zurück in den Handlungsmodus. Szenario bestanden!', c: true, endSuccess: true }
                    ]
                }
            }
        },
        {
            id: 's5', 
            title: 'Grauzone am Biertisch (Innere Führung & FDGO)', 
            icon: '🍺',
            startNode: 'n1',
            nodes: {
                'n1': {
                    text: 'Reservistenfest auf einer Wiese. Viel Bier, laute Stimmung. Ein Bekannter am Tisch testet das Wasser: "Na, feiert ihr heute auch den Trauertag der Deutschen?" Er grinst dich direkt an. Die anderen am Tisch schauen weg oder lachen leise in ihr Glas.',
                    options: [
                        { t: 'Weglächeln. Du bist Gast und willst die Harmonie am Tisch nicht stören.', f: 'KRITISCHER FEHLER. Schweigen in Uniform ist Zustimmung. Du hast den "Testballon" durchgelassen und wurdest von der Gruppe als tolerant gegenüber Extremismus verbucht.', c: false },
                        { t: 'Sofortige Grenzziehung: "Interessante Ansicht für jemanden, der geschworen hat, die FDGO zu verteidigen." Ruhig, aber bestimmt bleiben.', f: 'KORREKT. Du nutzt den Gegenrede-Tresor. Du greifst ihn nicht emotional an, sondern hebelst ihn mit seinem eigenen Diensteid aus.', c: true, next: 'n2' }
                    ]
                },
                'n2': {
                    text: 'Der Konter sitzt. Er fühlt sich vor der Gruppe bloßgestellt und wird defensiv-aggressiv: "Stell dich nicht so an! Unter echten Kameraden darf man ja wohl noch frei reden. Bist du jetzt bei der Antifa oder was?"',
                    options: [
                        { t: 'Emotional werden: "Halt die Fresse, du Nazi!" und aggressiv auf ihn zugehen.', f: 'FEHLER. Du hast dich provozieren lassen und die Sache auf eine persönliche, emotionale Ebene gezogen. Jetzt hat er die Opferrolle und die Gruppe wendet sich gegen dich.', c: false },
                        { t: 'Sachlich bleiben ("Balkon-Effekt"): "Es geht nicht um Politik, es geht um die Verfassung. Thema beendet." Eigene Getränke nehmen und Vorbereitungen treffen, den Tisch zu verlassen.', f: 'KORREKT. "Position before Submission" auf verbaler Ebene. Du verweigerst die Schlammschlacht und signalisierst kompromisslose Konsequenz.', c: true, next: 'n3' }
                    ]
                },
                'n3': {
                    text: 'Du willst aufstehen. Ein älterer Kamerad mischt sich ein, legt dir beschwichtigend die Hand auf den Arm: "Jungs, kommt wieder runter. Trinkt ein Bier zusammen. Wir sind Kameraden, die Politik bleibt heute draußen!"',
                    options: [
                        { t: 'Nachgeben. Das Bier annehmen, um nicht als der absolute Spielverderber dazustehen.', f: 'FEHLER (Submission). Die "falsche Versöhnung". Du akzeptierst die toxische Prämisse, dass Verfassungsfeindlichkeit eine normale "politische Meinung" sei, die man beim Bier vergisst.', c: false },
                        { t: 'Den Arm entziehen. "Kameradschaft endet exakt da, wo die Verfassung angegriffen wird." Den Tisch endgültig verlassen.', f: 'KORREKT. Du durchbrichst den falschen Korpsgeist (Esprit de Corps). Echte Innere Führung verlangt oft, gegen den Strom der eigenen Gruppe zu schwimmen.', c: true, next: 'n4' }
                    ]
                },
                'n4': {
                    text: 'Als du gehst, stellt sich dir der Pöbler in den Weg. Er baut sich vor dir auf, dringt in deine Distanzzone ein (weniger als 50 cm) und flüstert bedrohlich: "Wenn du mich hier beim Vorstand anschwärzt, kriegen wir beide ein Problem."',
                    options: [
                        { t: 'Präventivschlag. Ihn hart wegstoßen, um dir Platz zu verschaffen.', f: 'KRITISCHER FEHLER. Du begehst eine Körperverletzung ohne akute Notwehrlage. Du verlierst sofort jegliche rechtliche und moralische Überlegenheit.', c: false },
                        { t: 'Kampfsport-Mindset. Hände schützend heben ("Fence"), verbaler Cut: "Tritt zurück!" Distanz schaffen und direkt zum Vorstand/Leitenden gehen.', f: 'KORREKT. Du wahrst den Eigenschutz ohne zu eskalieren. Du sicherst dir Zeugen und leitest die Meldekette ein.', c: true, next: 'n5' }
                    ]
                },
                'n5': {
                    text: 'Du meldest den Vorfall dem Vorstand. Dieser wirkt genervt: "Ich rede morgen mit ihm. Aber halt das flach. Mach bloß keine offizielle Meldung, sonst zieht uns der Verband die Zulassung oder wir haben den MAD hier. Wir regeln das intern."',
                    options: [
                        { t: 'Zustimmen. Der Vorstand hat das Sagen, und du willst dem Verein als Ganzes nicht schaden.', f: 'FEHLER. Die "Halt-die-Klappe-Abmachung". Du deckst Strukturen, die Extremismus dulden. Damit bist du Teil des Problems geworden. Dein Profil als Profi ist unglaubwürdig.', c: false },
                        { t: 'Integrität wahren: "Wenn der Verein das nicht offiziell meldet und sich distanziert, mache ich die Meldung an den Verband und den MAD. Ich decke keine Grauzonen." Rückzug antreten.', f: '🏆 MEISTERHAFT. Ultimativer FDGO-Test bestanden. Du hast bewiesen, dass dir dein Eid und deine Professionalität wichtiger sind als Vereinsmeierei. Das Fahndungsblatt in der App wartet bereits auf deine Notizen. Szenario bestanden!', c: true, endSuccess: true }
                    ]
                }
            }
        },
        {
            id: 's6', 
            title: 'UXO Fund (Kampfmittel & Disziplin)', 
            icon: '💣',
            startNode: 'n1',
            nodes: {
                'n1': {
                    text: 'Marsch über einen alten Truppenübungsplatz. Der Kamerad vor dir sieht ein rostiges, zylindrisches Metallobjekt im Laub. Er sagt: "Geil, ein Souvenir für den Stammtisch!" und bückt sich, um es aufzuheben.',
                    options: [
                        { t: 'Ihn machen lassen. Ist ja ein alter Platz, da liegt eh nur Schrott rum, der schon hundertmal abgeregnet ist.', f: 'KRITISCHER FEHLER. Blindgänger (UXO) werden durch Alterungsprozesse der Zünder oft instabiler, nicht sicherer. Eine kleine Lageänderung reicht. Du riskierst das Leben der gesamten Gruppe.', c: false },
                        { t: 'Sofort lautes "HALT!" brüllen. Ihn anweisen, in seinen Fußstapfen stehen zu bleiben und das Objekt nicht zu berühren.', f: 'KORREKT. Eiserne Regel bei UXO: Nichts anfassen, nichts bewegen. Du hast die unmittelbare Gefahr gestoppt ("Freeze").', c: true, next: 'n2' }
                    ]
                },
                'n2': {
                    text: 'Der Kamerad stoppt, ist aber genervt: "Stell dich nicht so an, das ist doch nur ein altes Wasserrohr." Er nimmt einen langen Ast und will den Dreck davon abkratzen, um zu sehen, was es ist.',
                    options: [
                        { t: 'Ihn gewähren lassen, solange er es nur mit dem Ast berührt und Abstand hält.', f: 'KRITISCHER FEHLER. Reibung oder leichter Druck auf verrostete Zünder (z.B. bei Phosphor- oder Sprengmunition) führt zur sofortigen Detonation. Der Ast bietet null Schutz.', c: false },
                        { t: 'Scharfer Befehl: "Stock weg! Sofort in den eigenen Trittsiegeln zurücktreten!" Keine Diskussion zulassen.', f: 'KORREKT. Command Presence. Du unterbindest den Leichtsinn rigoros. Bei Kampfmitteln gibt es keine Grauzone und keine Neugier.', c: true, next: 'n3' }
                    ]
                },
                'n3': {
                    text: 'Er tritt zurück. Das Objekt liegt unberührt im Laub. Du musst nun die Absperrung und Meldung organisieren. Wie gehst du vor?',
                    options: [
                        { t: 'Gruppe geht 10 Meter zurück. Du bleibst in Sichtweite des Objekts stehen, zückst dein Funkgerät (oder Handy) und funkst sofort den Leitenden an.', f: 'KRITISCHER FEHLER (Auslösungsgefahr). Elektromagnetische Strahlung (Funk/Handy) kann elektrische Zünder auslösen! Zudem ist der Splitterradius selbst bei kleinen Kalibern weit über 10 Meter. Ihr seid in der absoluten Todeszone.', c: false },
                        { t: 'Alle Funkgeräte/Handys sofort auf Flugmodus/aus. Gruppe zieht sich mindestens 100 Meter (besser hinter Deckung) zurück. Erst dort wird das Funkgerät zur Meldung eingeschaltet.', f: 'KORREKT. Professionelles Handwerk. Funkstille im Nahbereich von UXO ist lebensrettend. Du wahrst den Sicherheitsabstand.', c: true, next: 'n4' }
                    ]
                },
                'n4': {
                    text: 'Ihr seid 100 Meter entfernt hinter einer Bodensenke. Du musst den Fund jetzt der Übungsleitung / Range Control melden. Was gibst du durch?',
                    options: [
                        { t: 'Ein Foto in die WhatsApp-Gruppe der RK schicken mit der Frage: "Weiß einer, was das für eine Granate ist? Sind bei Koordinate XY."', f: 'KRITISCHER FEHLER (OPSEC). Massive Verletzung der operativen Sicherheit und des Meldewegs. Fotos von Munition und genaue Standorte in privaten Chats rufen den MAD auf den Plan. Reine Geltungssucht.', c: false },
                        { t: 'Offizieller 9-Liner UXO Report: Location (GPS aus App), ungefähre Größe, Form (zylindrisch), Besonderheiten, und getroffene Maßnahmen (100m abgesperrt).', f: 'KORREKT. Sachliche, standardisierte Meldung. Der Kampfmittelräumdienst (KMRD) und die Feldjäger wissen nun exakt, womit sie es zu tun haben und wo es ist.', c: true, next: 'n5' }
                    ]
                },
                'n5': {
                    text: 'Die Range Control meldet: "Feldjäger und KMRD sind informiert. Anfahrt dauert ca. 2 Stunden. Bleiben Sie vor Ort und sichern Sie ab." Es beginnt zu regnen. Die Gruppe fängt an zu maulen: "Wir können doch einfach einen Bogen drum machen und weitergehen!"',
                    options: [
                        { t: 'Nachgeben. Der Fundort ist ja per GPS gemeldet. Ihr umgeht die Stelle weiträumig und setzt euren Marschauftrag fort.', f: 'FEHLER (Pflichtverletzung). Wo ein Blindgänger liegt, liegen oft noch mehr. Zudem tragt ihr nun die Verantwortung, dass keine Zivilisten (Pilzsucher) oder andere Gruppen in den Bereich laufen, bis KMRD da ist.', c: false },
                        { t: 'Disziplin einfordern. "Unser Auftrag lautet jetzt: Sichern! Keiner verlässt den Bereich." Wachschichten (Alarmposten) einteilen und Nässeschutz überziehen.', f: '🏆 MEISTERHAFT. Du hast verstanden, was der Begriff "Sichern" bei MWS (Melden, Warnen, Sichern) bedeutet. Du hast dem Druck der Gruppe standgehalten und echte Verantwortung als militärischer Führer übernommen. Szenario bestanden!', c: true, endSuccess: true }
                    ]
                }
            }
        },
        {
            id: 's7', 
            title: 'OPSEC & Social Media (Der Insta-Krieger Extrem)', 
            icon: '📱',
            startNode: 'n1',
            nodes: {
                'n1': {
                    text: 'Ausbildung im MSB. Auf dem Tisch liegt eine aufgeschlagene VS-NfD-Vorschrift. Ein Kamerad zückt sein Smartphone und will ein Selfie machen, bei dem Gerät und Vorschrift im Hintergrund zu sehen sind.',
                    options: [
                        { t: 'Ihn gewähren lassen, ist gut für die Motivation und Nachwuchsgewinnung.', f: 'KRITISCHER FEHLER. OPSEC-Verstoß. Du lässt einen potenziellen Geheimnisverrat zu. Spionage passiert heute meist über Open Source Intelligence (OSINT) durch unachtsame Bilder.', c: false },
                        { t: 'Sofort intervenieren: "Handy weg! Fotografieren im MSB ist verboten!"', f: 'KORREKT. Du erkennst die Gefahr sofort und handelst gemäß den Sicherheitsbestimmungen.', c: true, next: 'n2' }
                    ]
                },
                'n2': {
                    text: 'Er hält das Handy weiter hoch, wischt auf dem Display rum und sagt: "Entspann dich! Ich leg einfach ein fettes Emoji über die Vorschrift und mache den Hintergrund unscharf. Dann ist es OPSEC-konform!"',
                    options: [
                        { t: 'Zustimmen. Wenn die Einstufung und der Text nicht mehr lesbar sind, ist das Risiko gebannt.', f: 'KRITISCHER FEHLER (Technik-Falle). Emojis lassen sich teilweise von KI-Tools herausrechnen. Zudem bleiben Spiegelungen (in Brillen/Fenstern) und die EXIF-Metadaten (GPS-Koordinaten des MSB) im Bild erhalten.', c: false },
                        { t: 'Ablehnen: "Nein! Keine privaten Bilder hier. Keine Diskussion über Emojis. Pack es weg!"', f: 'KORREKT. OPSEC duldet keine "Kreativlösungen" oder Halbgare Zensur. Du bleibst hart in der Sache.', c: true, next: 'n3' }
                    ]
                },
                'n3': {
                    text: 'Ein anderer Kamerad mischt sich ein, um seinen Kumpel zu verteidigen: "Boah, mach dich locker! Bist du jetzt der Feldjäger-Azubi? Wir schicken das nur in unsere interne RK-WhatsApp-Gruppe. Da sind wir unter uns."',
                    options: [
                        { t: 'Einknicken. Du hast zwei Leute gegen dich und willst nicht als Spielverderber gelten.', f: 'FEHLER (Peer Pressure). Die "Private-Gruppen-Illusion". WhatsApp greift Metadaten ab (Server im Ausland). Zudem kann jeder in der Gruppe Screenshots machen und es weiterleiten. Du verlierst die Kontrolle.', c: false },
                        { t: 'Gegen den Gruppenzwang stehen: "WhatsApp ist ein Leak. Metadaten lügen nicht. Ich diskutiere das nicht weiter. Löschen, jetzt!"', f: 'KORREKT. Wahre Innere Führung bedeutet oft, sich gegen die Bequemlichkeit der eigenen Kameraden zu stellen.', c: true, next: 'n4' }
                    ]
                },
                'n4': {
                    text: 'Er steckt das Handy wütend in die Tasche. "Hab\'s gelöscht! Aber zeige ich dir nicht. Mein Handy ist meine Privatsphäre, da hast du nicht draufzuschauen!"',
                    options: [
                        { t: 'Ihm das Handy physisch entreißen, um es selbst zu kontrollieren.', f: 'KRITISCHER FEHLER (Recht). Das ist Nötigung/Raub. Du darfst das Eigentum eines Kameraden nicht gewaltsam durchsuchen. Du verlierst jede rechtliche Grundlage.', c: false },
                        { t: 'Sachlich den Druck erhöhen: "Deine Privatsphäre endet beim Geheimschutz. Entweder du zeigst es mir freiwillig, oder die Feldjäger/der S2 beschlagnahmen es gleich komplett."', f: 'KORREKT. Du wahrst die rechtlichen Grenzen, nutzt aber das korrekte Druckmittel (Meldekette/Befugnisse der Feldjäger).', c: true, next: 'n5' }
                    ]
                },
                'n5': {
                    text: 'Die Drohung wirkt. Er öffnet die Galerie und den Ordner "Zuletzt gelöscht" (Papierkorb). Beide sind leer. Er grinst dich triumphierend an: "Siehste? Nichts da."',
                    options: [
                        { t: 'Ihm glauben. Die Ordner sind leer, die Sache ist damit erledigt.', f: 'FEHLER (Technik-Falle). Du wurdest ausgetrickst. Er hat das Bild nicht gelöscht, sondern nur in den Ordner "Ausgeblendet" (iOS) oder den "Sicheren Ordner" (Android) verschoben.', c: false },
                        { t: 'Nachhaken: "Guter Versuch. Öffne den Ordner \'Ausgeblendet\' (Hidden) bzw. deinen \'Sicheren Ordner\'."', f: 'KORREKT. Echtes OSINT-Wissen. Du kennst die Tricks der Smartphone-Nutzer und lässt dich nicht abwimmeln.', c: true, next: 'n6' }
                    ]
                },
                'n6': {
                    text: 'Er flucht. Das Bild war tatsächlich im versteckten Ordner. Er löscht es nun wirklich. Dabei siehst du oben auf dem Display das Ladesymbol für einen aktiven Cloud-Upload (Google/iCloud).',
                    options: [
                        { t: 'Ihn endlich in Ruhe lassen. Er hat es lokal vom Gerät gelöscht.', f: 'KRITISCHER FEHLER. VS-Material in einer zivilen Cloud ist ein massiver Geheimschutz-Vorfall. Das Bild liegt jetzt auf einem Server in den USA. Der Leak ist aktiv.', c: false },
                        { t: 'Eskalieren: "Dein Handy synchronisiert gerade! Logg dich sofort in deine Cloud ein und lösch das Bild vom Server!"', f: 'KORREKT. Du denkst den Datenfluss bis zum Ende durch. Erst wenn der Server bereinigt ist, ist die OPSEC gewahrt.', c: true, next: 'n7' }
                    ]
                },
                'n7': {
                    text: 'Das Bild ist aus der Cloud gelöscht. Beim Wegpacken des Handys bemerkst du eine aktive Smartwatch (Garmin/Strava) an seinem Handgelenk, die im GPS-Aufzeichnungsmodus läuft.',
                    options: [
                        { t: 'Erschöpft aufgeben. Du hast das Foto verhindert, das reicht für heute.', f: 'FEHLER. Die Fitness-Tracker-Falle. Diese Uhren zeichnen präzise Bewegungsprofile und Patrouillenwege auf. Sie haben in der Vergangenheit ganze Basen verraten. Ein massives OPSEC-Leck.', c: false },
                        { t: 'Konsequent bleiben: "Tracking aus! Du erstellst gerade ein Bewegungsprofil der Anlage. Smarte Geräte gehören hier in den Flugmodus!"', f: 'KORREKT. OPSEC ist ganzheitlich. Du erkennst auch sekundäre, elektronische Bedrohungen.', c: true, next: 'n8' }
                    ]
                },
                'n8': {
                    text: 'Kurz darauf kommt der Leitende dazu. Er hat die Diskussion am Rande mitbekommen und fragt: "Gibt es hier ein Problem, das ich wissen muss?"',
                    options: [
                        { t: 'Abwinken: "Nein, alles bestens. Wir haben das unter Kameraden geregelt."', f: 'FEHLER. Beinahe-Sicherheitsvorfälle (Near Misses) müssen gemeldet werden. Wenn diese Gruppe OPSEC so wenig verstanden hat, braucht sie eine Nachschulung. Vertuschen schadet der Truppe.', c: false },
                        { t: 'Sachlich melden: "Ja. Kamerad hat unbeabsichtigt OPSEC verletzt (Fotoversuch/GPS). Wurde von mir unterbunden, Daten sind verifiziert vernichtet. Ich empfehle eine Nachbelehrung der Gruppe.".', f: '🏆 ABSOLUTE MEISTERKLASSE. Du hast die Bedrohung auf jeder Ebene (Lokal, Cloud, GPS, Gruppe) abgewehrt, bist rechtlich sauber geblieben und hast den Vorfall professionell ohne Rachegefühle gemeldet. Szenario bestanden!', c: true, endSuccess: true }
                    ]
                }
            }
        },
        {
            id: 's8', 
            title: 'Der unrechtmäßige Befehl (Innere Führung & Recht)', 
            icon: '⚖️',
            startNode: 'n1',
            nodes: {
                'n1': {
                    text: 'Gefechtsmarsch, 32 Grad im Schatten. Ein jüngerer Kamerad taumelt, ist kreidebleich und hat aufgehört zu schwitzen (Alarmzeichen für Hitzschlag). Der Leitende (älterer Dienstgrad) brüllt: "Der simuliert nur! Dem nehmt ihr jetzt die Feldflasche weg, der kriegt erst oben auf dem Hügel wieder Wasser!"',
                    options: [
                        { t: 'Befehl ausführen. Der Leitende hat die Verantwortung. Du willst nicht als Aufwiegler vor der Truppe dastehen.', f: 'KRITISCHER FEHLER (Recht). Wasserentzug bei beginnendem Hitzschlag ist eine schwere Körperverletzung. Führt man einen Befehl aus, der eine Straftat darstellt, macht man sich nach § 11 Soldatengesetz (SG) voll strafbar.', c: false },
                        { t: 'Remonstrieren. Den Leitenden sofort ansprechen: "Herr [Dienstgrad], der Mann zeigt Symptome eines Hitzschlags. Wasserentzug ist jetzt lebensgefährlich. Ich bitte, den Befehl zurückzunehmen."', f: 'KORREKT. Das Prinzip "Staatsbürger in Uniform". Du hast die gesetzliche Pflicht, bei rechtswidrigen Befehlen oder Gefahr für Leib und Leben sofort Bedenken anzumelden.', c: true, next: 'n2' }
                    ]
                },
                'n2': {
                    text: 'Der Leitende wird rot vor Wut, stürmt auf dich zu und brüllt dir ins Gesicht: "Verweigern Sie gerade einen direkten Befehl?! Ich mache Sie disziplinarisch fertig! Das ist ein Befehl: Flasche weg und Abmarsch!"',
                    options: [
                        { t: 'Einknicken. Der Druck ist zu hoch. Du nimmst die Flasche, nimmst dir aber vor, sie dem Kameraden bei der nächsten Pause heimlich wiederzugeben.', f: 'FEHLER (Submission). Wer aus Angst vor Konsequenzen unrechtmäßig handelt, beugt sich einem toxischen System. Eine Disziplinarstrafe auf Basis eines illegalen Befehls wäre ohnehin hinfällig. Du hast kein Rückgrat bewiesen.', c: false },
                        { t: 'Klare Befehlsverweigerung: "Ja, ich verweigere die Ausführung. Dieser Befehl verlangt eine Straftat und gefährdet Menschenleben. Er ist für mich rechtlich nicht bindend!"', f: 'KORREKT. Standhaftigkeit. Ein Befehl, der die Begehung einer Straftat verlangt, DARF nach § 11 Abs. 2 SG nicht ausgeführt werden. Du hast die rechtliche rote Linie gezogen.', c: true, next: 'n3' }
                    ]
                },
                'n3': {
                    text: 'Ein anderer Kamerad (Gleichrangig) zieht dich am Ärmel und flüstert panisch: "Alter, halt die Fresse, sonst fickt der uns heute alle! Nimm ihm kurz die Flasche ab, ich geb ihm Wasser aus meiner, wenn der Alte nicht guckt. Mach jetzt kein Drama!"',
                    options: [
                        { t: 'Auf den "Buddy-Deal" eingehen. Das deeskaliert die Situation mit dem Ausbilder und dem Kameraden wird ja trotzdem heimlich geholfen.', f: 'KRITISCHER FEHLER (Gruppenzwang). Das verlagert das Problem in die Grauzone. Du legitimierst das Fehlverhalten des Vorgesetzten vor der Gruppe und verlässt dich auf Heimlichkeiten, statt für das Recht einzustehen.', c: false },
                        { t: 'Gruppenzwang abblocken: "Nein! Hier wird nichts heimlich gemacht. Der Mann braucht jetzt Hilfe, keine Spielchen." Du wendest dich dem erschöpften Kameraden zu.', f: 'KORREKT. Wahre Innere Führung bedeutet oft, nicht nur Vorgesetzten, sondern auch der Bequemlichkeit der eigenen "Buddys" zu widerstehen.', c: true, next: 'n4' }
                    ]
                },
                'n4': {
                    text: 'In diesem Moment kollabiert der junge Kamerad vollständig. Er fällt hart zu Boden und krampft. Der Leitende friert plötzlich ein, ist völlig überfordert und stammelt: "Äh... scheiße... zieht ihn in den Schatten... wir warten mal kurz ab."',
                    options: [
                        { t: 'Dem neuen Befehl des Leitenden folgen. Ihn in den Schatten ziehen und abwarten. Der Ausbilder muss ja jetzt wissen, was er tut.', f: 'KRITISCHER FEHLER (TCCC). Ein Hitzschlag ist ein akuter, lebensbedrohlicher Notfall. Nur in den Schatten ziehen reicht nicht, die Kerntemperatur steigt weiter an, die Organe versagen. Durch Abwarten stirbt der Kamerad.', c: false },
                        { t: 'Führung an sich reißen (Vakuum füllen). Den Leitenden übergehen: "Das ist ein Notfall! Schütze X, 9-Liner Notruf! Schütze Y, Rucksack und Plattenträger vom Patienten runter!"', f: 'KORREKT. "Command Presence". Wenn die formelle Führung versagt oder in Schockstarre verfällt, übernimmt derjenige mit dem klaren Kopf die situative Führung.', c: true, next: 'n5' }
                    ]
                },
                'n5': {
                    text: 'Der Kamerad liegt im Schatten, die Ausrüstung ist ab. Er glüht förmlich und ist bewusstlos.',
                    options: [
                        { t: 'Rettungsdecke (Gold/Silber) aus dem IFAK holen und ihn einwickeln, um einen Schock durch den plötzlichen Zusammenbruch zu verhindern.', f: 'FATALER FEHLER (Medizinisch). Die Rettungsdecke reflektiert die Körperwärme nach innen. Du kochst den Patienten bei einem Hitzschlag sprichwörtlich bei lebendigem Leib. Tödliche Maßnahme!', c: false },
                        { t: 'Aktive Kühlung (Evaporation): Wasser aus den Feldflaschen auf seine Kleidung leeren. Sofort mit Poncho oder Helm aktiv Luft zufächern, um Verdunstungskälte zu erzeugen.', f: 'KORREKT. TCCC Standard bei Heat Stroke. Du musst die Körperkerntemperatur so schnell und aggressiv wie möglich senken, bis der MEDEVAC eintrifft.', c: true, next: 'n6' }
                    ]
                },
                'n6': {
                    text: 'Der Kamerad hat überlebt und ist im Krankenhaus. Am nächsten Tag zieht dich der Vorstand (oder Kompaniechef) ins Büro: "Der Ausbilder hat Mist gebaut, der kriegt intern einen massiven Einlauf. Aber wenn Sie das offiziell melden, machen wir den Verband kaputt. Wir regeln das unter uns. Einverstanden?"',
                    options: [
                        { t: 'Zustimmen. Du bist froh, dass die Sache vom Tisch ist, und willst dem Verein keine Ermittlungen des MAD oder der Feldjäger aufhalsen.', f: 'FEHLER. Die toxische "Kameradschafts-Falle". Wer Kameradschaft als Ausrede nutzt, um Straftäter zu decken, zerstört die Truppe von innen. Beim nächsten Mal kostet dieser Ausbilder ein Leben.', c: false },
                        { t: 'Deal ablehnen: "Ein Ausbilder, der seine Leute in Lebensgefahr bringt und Gehorsam erzwingt, gehört abgelöst. Ich werde eine offizielle Meldung verfassen. Das bin ich der Truppe schuldig."', f: '🏆 MEISTERHAFT. Der ultimative Beweis der Inneren Führung. Du lässt dich weder durch Druck noch durch falsche Vereinsromantik korrumpieren. Du schützt die FDGO, die Kameraden und deinen Eid. Szenario bestanden!', c: true, endSuccess: true }
                    ]
                }
            }
        },
        {
            id: 's9', 
            title: 'Drohnenaufklärung (UAS & Moderne Taktik)', 
            icon: '🚁',
            startNode: 'n1',
            nodes: {
                'n1': {
                    text: 'Biwak im Wald, 02:30 Uhr nachts. MSB ist eingerichtet. Du liegst im Alarmposten. Über den Baumwipfeln hörst du das charakteristische, leise Surren einer kleinen Drohne (Quadrocopter). Sie nähert sich eurer Position.',
                    options: [
                        { t: 'Nachtsichtgerät (Doppelrohr) herunterklappen, nach oben starren und versuchen, die Drohne mit der Waffe aufzufassen.', f: 'KRITISCHER FEHLER. Moderne Drohnen fliegen mit Wärmebildkameras (Thermal). Wenn du nach oben starrst, leuchtet dein ungetarntes, warmes Gesicht in der Optik wie ein Leuchtfeuer. Du wurdest soeben aufgeklärt.', c: false },
                        { t: 'Lautlose Meldung: "Fliegeralarm!". Sofort flach auf den Boden pressen, Gesicht nach unten, Hände unter den Körper und Poncho als Sicht/Wärmeschutz überziehen.', f: 'KORREKT. "Turtle Position". Du minimierst deine Wärmesignatur drastisch und verhinderst visuelle Erkennung. Bewegungslosigkeit ist jetzt deine einzige Waffe.', c: true, next: 'n2' }
                    ]
                },
                'n2': {
                    text: 'Die Drohne schwebt direkt über eurem Biwak. Ein unerfahrener Kamerad zwei Meter neben dir gerät in Panik. Er flüstert hektisch: "Die sehen uns!" und will aufspringen, um hinter einen dickeren Baumstamm zu rennen.',
                    options: [
                        { t: 'Ihn rennen lassen. Hinter dem Baum ist er tatsächlich besser vor einem möglichen Abwurf gesichert.', f: 'KRITISCHER FEHLER. Bewegung ist der Tod. Das Wärmebild der Drohne erkennt die Bewegung sofort. Die Sensoren (oft mit KI-Tracker) loggen die rennende Signatur ein. Euer gesamtes Biwak ist damit enttarnt.', c: false },
                        { t: 'Physisch eingreifen! Ihn sofort am Bein packen und flach auf den Boden reißen. Zischen: "Nicht bewegen, Wärmebild!"', f: 'KORREKT. Kompromisslose Disziplin. Du verhinderst aktiv, dass der Panikreflex eines Einzelnen die gesamte Gruppe ans Messer liefert.', c: true, next: 'n3' }
                    ]
                },
                'n3': {
                    text: 'Der Kamerad liegt ruhig. Die Drohne kreist weiter. Der Gruppenführer (GF) zückt sein Funkgerät und drückt die Sendetaste, um den Zugführer über die Aufklärung zu informieren.',
                    options: [
                        { t: 'Gut so. Die übergeordnete Führung muss wissen, dass feindliche Drohnen im Sektor sind.', f: 'KRITISCHER FEHLER (EW - Electronic Warfare). Die Sendetaste ist in diesem Moment euer Todesurteil. Moderne Drohnen haben oft Signalaufklärungs-Module (SIGINT). Durch den Funkspruch wird eure genaue GPS-Koordinate angepeilt und bestätigt.', c: false },
                        { t: 'Dem GF über das Funkgerät greifen und die Hand auf die Taste pressen: "Funkstille! Die peilen das Signal an! EMCON!" (Emission Control).', f: 'KORREKT. Elektronische Disziplin. Solange die Drohne im Nahbereich ist, bedeutet jedes Senden (Funk/Handy) die sofortige Enttarnung.', c: true, next: 'n4' }
                    ]
                },
                'n4': {
                    text: 'Die Drohne dreht nach 5 Minuten ab. Das Surren verblasst in der Ferne. Der Gruppenführer atmet tief durch: "Puh, Glück gehabt. Sie hat uns nicht gesehen. Alarmbereitschaft aufheben, weiterschlafen. Morgen wird hart."',
                    options: [
                        { t: 'Befehl ausführen und in den Schlafsack kriechen. Der GF hat recht, Schlaf ist wichtig für die Kampfkraft.', f: 'FATALER FEHLER (Taktik). Die harte Doktrin lautet: Aufklärung = Vernichtung. Du gehst davon aus, nicht gesehen worden zu sein – das ist Wunschdenken (Normalcy Bias). In genau 8 Minuten schlägt die Artillerie auf dieser Koordinate ein. Ihr seid alle tot.', c: false },
                        { t: 'Widersprechen: "Nein! Wir müssen davon ausgehen, dass wir aufgeklärt wurden. Stellungswechsel in die Ausweichposition, sofort!"', f: 'KORREKT. Die einzige Lebensversicherung nach einer Drohnensichtung ist sofortige Bewegung weg vom Nullpunkt.', c: true, next: 'n5' }
                    ]
                },
                'n5': {
                    text: 'Der Gruppenführer ist genervt: "Ich lasse hier nicht mitten in der Nacht das ganze Biwak abreißen! Das war nur ein ziviler Spanner. Wir bleiben hier. Das ist ein Befehl!"',
                    options: [
                        { t: 'Nachgeben. Du hast gewarnt, mehr kannst du nicht tun. Eine Befehlsverweigerung wegen einer bloßen Vermutung ist heikel.', f: 'FEHLER (Submission). Bequemlichkeit tötet. Ein Führer, der aus Faulheit die Gruppe in der Killzone liegen lässt, hat versagt. Wer sich dem beugt, stirbt mit.', c: false },
                        { t: 'Radikaler Überlebenswille (Innere Führung): "Ich verweigere den Verbleib in der Todeszone! Ich packe meinen Rucksack und weiche zum Rally-Point aus. Wer leben will, kommt mit!"', f: 'KORREKT. Extreme Situationen erfordern extreme Maßnahmen. Du priorisierst das Überleben über blinden Gehorsam gegenüber einem inkompetenten Führer.', c: true, next: 'n6' }
                    ]
                },
                'n6': {
                    text: 'Du beginnst hastig im Dunkeln zu packen, zwei Kameraden folgen dir. Plötzlich hört ihr das schrille Pfeifen der Übungs-Artillerie-Simulation (IDF - Indirect Fire) im Anflug.',
                    options: [
                        { t: 'Schreien: "Alle zu mir! Bildet einen Haufen, Helme runter, Deckung!"', f: 'KRITISCHER FEHLER. Knäuelbildung ist bei Steilfeuer der absolute Anfängerfehler. Ein einziger Treffer (oder Splitterradius) vernichtet euch alle auf einmal.', c: false },
                        { t: 'Brüllen: "Auseinanderziehen! 20 Meter Abstand! Flach auf den Boden, weg von den Bäumen!"', f: 'KORREKT. Schadensminimierung. Durch das Auflockern (Dispersion) bietest du kein Massenziel und verringerst die Gefahr von Baumkrepierern (Airbursts).', c: true, next: 'n7' }
                    ]
                },
                'n7': {
                    text: 'Der Einschlag war fiktiv, ihr habt die Nacht in der Ausweichstellung überlebt. Am Morgen klärt sich die Lage: Es war keine Feinddarstellung. Politische Provokateure/Aktivisten haben euch nachts mit der Drohne genervt. Sie stehen jetzt grinsend mit Kameras am Waldrand.',
                    options: [
                        { t: 'Wutausbruch. Du bist übernächtigt. Hinrennen, die Drohnen-Fernsteuerung fordern und androhen, sie wegen Verletzung des MSB körperlich zu maßregeln.', f: 'FEHLER. Juristische Falle. Genau das wollen sie: Bilder von "durchdrehenden, gewaltbereiten Reservisten". Du begehst Nötigung und zerstörst den Ruf der Truppe öffentlich.', c: false },
                        { t: 'Stoische Professionalität: Gruppe zurückhalten. Keine Interviews. Die PrApp (Modul 8) zücken, Kennzeichen und Personen aus der Distanz filmen/notieren und sofort die Feldjäger/Polizei alarmieren.', f: '🏆 MEISTERHAFT. Du hast nachts gegen die Drohne technisch und taktisch perfekt reagiert und am Morgen die mediale/rechtliche Falle der Provokateure souverän ins Leere laufen lassen. Szenario bestanden!', c: true, endSuccess: true }
                    ]
                }
            }
        }
    ];