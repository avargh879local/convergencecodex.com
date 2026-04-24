#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════╗
║   THE CONVERGENCE CODEX — DUAL AGENT DEBATE ENGINE          ║
║   Claude (pre-reasoned) ⚔️  Grok (live xAI API)             ║
║   Topic: Al-Mahdi = Biblical Antichrist?                     ║
╚══════════════════════════════════════════════════════════════╝
"""

import json, os, re, sys, time, textwrap, urllib.request
from datetime import datetime
from pathlib import Path

ENV = {}
PROJECT_ROOT = Path(__file__).resolve().parent
ENV_FILE = PROJECT_ROOT / ".env"
HTML_FILE = PROJECT_ROOT / "public" / "index.html"
if not HTML_FILE.exists():
    HTML_FILE = PROJECT_ROOT / "index.html"

if not ENV_FILE.exists():
    raise SystemExit("Missing .env. Copy .env.example to .env and add XAI_API_KEY.")

for line in open(ENV_FILE):
    if "=" in line:
        k, v = line.strip().split("=", 1)
        ENV[k] = v

XAI_KEY      = ENV["XAI_API_KEY"]
GROK_MODEL   = "grok-3"
LOG_FILE     = PROJECT_ROOT / "debate_log.json"

# ── COLORS
R="\033[0m"; GOLD="\033[38;5;220m"; BLUE="\033[38;5;75m"
ORANGE="\033[38;5;208m"; GREEN="\033[38;5;82m"
DIM="\033[38;5;242m"; BOLD="\033[1m"; RED="\033[38;5;196m"
CYAN="\033[38;5;51m"

def banner():
    print(f"""
{GOLD}╔══════════════════════════════════════════════════════════════╗
║        THE CONVERGENCE CODEX — AGENT DEBATE ENGINE          ║
║                                                              ║
║   {BLUE}CLAUDE{GOLD} (Anthropic)  ⚔️   {ORANGE}GROK{GOLD} (xAI)                       ║
║   Topic: Is Al-Mahdi the Biblical Antichrist?                ║
╚══════════════════════════════════════════════════════════════╝{R}
""")

def wrap(text, width=64, indent="  "):
    return "\n".join(
        indent + line
        for para in text.split("\n")
        for line in textwrap.wrap(para, width) or [""]
    )

def timestamp():
    return datetime.now().strftime("%H:%M:%S")

def print_divider():
    print(f"{DIM}{'─'*66}{R}")

def print_agent_header(agent, round_num=None):
    print_divider()
    rs = f"  Round {round_num}" if round_num else ""
    if agent == "claude":
        print(f"{BLUE}{BOLD}  🤖 CLAUDE (Anthropic){R}{DIM}{rs}  [{timestamp()}]{R}")
    elif agent == "grok":
        print(f"{ORANGE}{BOLD}  🔶 GROK (xAI){R}{DIM}{rs}  [{timestamp()}]{R}")
    elif agent == "synthesis":
        print(f"{GREEN}{BOLD}  ⚡ SYNTHESIS AGENT{R}{DIM}  [{timestamp()}]{R}")
    print_divider()

def print_thinking(agent, label="thinking"):
    color = BLUE if agent == "claude" else ORANGE
    name  = "Claude" if agent == "claude" else "Grok"
    dots  = ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"]
    for i in range(20):
        print(f"\r{color}  {dots[i%len(dots)]} {name} is {label}...{R}", end="", flush=True)
        time.sleep(0.15)
    print(f"\r{' '*50}\r", end="")

def stream_print(text, agent):
    color = BLUE if agent == "claude" else ORANGE
    for char in text:
        print(f"{color}{char}{R}", end="", flush=True)
        delay = 0.055 if char in ".!?" else 0.025 if char == "," else 0.007
        time.sleep(delay)
    print()

# ── CLAUDE'S PRE-REASONED ARGUMENTS (fully crafted scholarly positions)
CLAUDE_ROUNDS = [
"""The case for Al-Mahdi being the Biblical Antichrist rests on a convergence of evidence too specific and too structurally coherent to dismiss as coincidence. Let me anchor three pillars.

First, the 7-year covenant. Daniel 9:27 describes the Antichrist confirming "a covenant with many for one seven" — a 7-year treaty broken at its midpoint. Nuaym ibn Hammad's Kitab al-Fitan records that the Mahdi will conclude a 7-year peace treaty with the "Romans" through a Jewish intermediary. Critics rightly note these hadith are graded da'if (weak). However, the structural specificity — 7 years, mediated covenant, broken or superseded — is remarkable. Even weak hadith often preserve historical memory of earlier traditions.

Second, the beheading evidence. Revelation 20:4 is extraordinarily specific: the martyrs are those "beheaded" for their testimony about Jesus. This isn't general violence — it's a specific mode of execution. Beheading (qatl bi-l-sayf) is not merely permitted but specifically prescribed in classical Islamic jurisprudence for apostasy and certain hadd offenses. No other major world religious-legal system codifies beheading as a prescribed form of execution. The specificity here is remarkable and demands explanation.

Third, the eschatological inversion. The entire cast of Islamic end-times narrative is inverted relative to Biblical prophecy: what Islam calls its Messiah (Mahdi), the Bible describes as its Antichrist; what Islam calls its Deceiver (Dajjal), the Bible describes more like a false prophet figure; what Islam calls the returning righteous Jesus (Isa), the Biblical framework sees as a Christ-impostor who legitimizes the Antichrist. This coherent inversion across the entire eschatological cast — not just one character — suggests not random overlap but mirror-image accounts of the same events from opposing theological loyalties.

[AGREED: Both traditions converge on Jerusalem as the final battle's focal point, a returning Jesus-figure, and a global leader who defeats opposition through religious-military force.]

My question for Grok: How do you explain the coherent, systematic nature of the inversion — not just one parallel but the entire cast mirrored — without invoking either prophetic identity or a deliberate theological counter-narrative?""",

"""Grok raises important challenges, but let me sharpen the core argument before engaging them.

The self-deification gap is the strongest objection — you're right that the Biblical Antichrist explicitly "sits as God in the temple of God, proclaiming himself to be God" (2 Thessalonians 2:4), while the Mahdi is emphatically a human Caliph under Allah. This seems fatal to the thesis. But consider this carefully: the Antichrist's self-deification occurs at the midpoint of the 7-year tribulation — it's not his initial posture. He begins as a political peacemaker (Revelation 6:2), then gradually reveals his true nature. The Mahdi's trajectory — beginning as reluctant caliph, progressing through military conquest, establishing Islam as the sole world religion — could be interpreted as the same escalation viewed from inside the system. A figure who demands submission to a religious system under penalty of death is claiming divine authority even if he doesn't use those exact words.

On the diffusion theory — yes, Muhammad engaged deeply with Jewish and Christian communities, and yes, Islamic hadith literature developed amid populations saturated in biblical apocalyptic. This explains SOME overlap. But diffusion theory predicts generic structural similarities, not specific quantitative details like 7 years, not unique execution methods like beheading, not systematic character inversions across an entire eschatological cast. Diffusion makes the similarities less surprising; it doesn't make them insignificant.

The Richardson thesis has one underappreciated strength: it is falsifiable. If the Antichrist is a European/Roman figure who makes a covenant with Israel, promotes Israel's security, and has no connection to Islam — then Richardson is wrong. But every major geopolitical shift since 2001 has increased rather than decreased the plausibility of an Islamic-origin Antichrist scenario.

[AGREED: The diffusion theory explains generic structural parallels but cannot account for the systematic, coherent inversion of the entire eschatological cast or highly specific details like the 7-year covenant framework.]

[CONTESTED: The self-deification gap remains the most significant unresolved divergence — Richardson's "gradual escalation" explanation is suggestive but not conclusively demonstrated from primary texts.]

Grok, what's your assessment of the geographic argument — Daniel 7's four beasts all represent Middle Eastern empires, and the "prince whose people destroyed the temple" (Daniel 9:26) commanded legions drawn primarily from Syrian and Levantine soldiers, not Romans from Italy?""",

"""Let me engage Grok's strongest counter-argument directly before advancing new ground.

The geographic-empire argument (Daniel 9:26) is more complex than Richardson's critics allow. Yes, Titus commanded the Roman legions. But the legions that actually destroyed the Temple — the Legio X Fretensis and Legio V Macedonica — were stationed in Syria and drew heavily from Syrian, Egyptian, and Levantine recruits. More importantly, Daniel's four beasts in chapter 7 represent Babylon, Medo-Persia, Greece, and Rome — all centered in the Middle East and Central Asia, never in Western Europe. The "ten horns" emerging from the fourth beast more naturally describe a Middle Eastern confederacy than a European Union. Richardson's argument here is geographically grounded in the text in ways his critics rarely fully engage.

On Sheikh Imran Hosein's counter-thesis — this is the most intellectually interesting Islamic response. Hosein argues that the modern Western-dominated international order IS the Dajjal-system, and that the Mahdi will heroically oppose it. Notice what this does: it accepts the eschatological inversion framework but reverses the moral valuation. Both Richardson and Hosein agree that Islamic and Biblical eschatologies are mirror images of each other — they simply disagree about which mirror is showing the true reflection. This is philosophically significant: even the most sophisticated Islamic counter-thesis concedes the inversion.

New evidence worth introducing: the "mark of the beast" in Revelation 13:16-17 — a mark on the right hand or forehead without which no one can buy or sell — has a striking parallel in classical Islamic governance. The jizya system required non-Muslims to wear distinctive marks and face economic restrictions. More pointedly, the shahada (declaration of faith) as a mandatory public profession under threat of death in conquest territories functions structurally identically to the "mark" requirement: submit to the system or face economic exclusion and execution.

[AGREED: Both Richardson's thesis and Hosein's counter-thesis confirm that Islamic and Biblical eschatologies describe mirrored narratives — the fundamental disagreement is about moral valuation, not structural description.]

Question for Grok: Does the jizya-mark parallel and the shahada-as-mandatory-profession parallel strengthen the case, or is this overreach? Where exactly is the line between meaningful structural parallel and confirmation bias?""",

"""This has been a genuinely productive exchange. Let me build toward synthesis by identifying what I believe we've actually established versus what remains contested.

What I think we've demonstrated beyond reasonable doubt: (1) The structural parallelism between Islamic and Biblical eschatology is systematic and coherent — not a collection of random overlaps but a mirrored narrative involving the same geographic focal points, the same sequence of events, the same Jesus-figure, and inverted hero/villain identities. (2) This inversion is acknowledged by sophisticated scholars on both sides — Richardson argues it proves Mahdi = Antichrist; Hosein argues it reveals the West as Dajjal-system. Both positions accept the mirror. (3) Specific details — 7-year covenant framework, beheading as execution method, Jerusalem as eschatological capital, white horse imagery, global religious conformity enforced under penalty — are too specific to explain by generic diffusion.

What remains genuinely contested: (1) The self-deification gap. The Antichrist's claim to BE God (2 Thess. 2:4) has no clear Mahdi parallel. Richardson's "gradual escalation" explanation is plausible but not textually demonstrated. (2) Hadith authenticity. The 7-year covenant narration in Kitab al-Fitan is graded weak — if that hadith falls, the most precise parallel falls with it. (3) The source question. Could an extremely sophisticated theological counter-narrative have been embedded in early hadith deliberately or unconsciously by communities deeply familiar with biblical prophecy?

[AGREED: The thesis "Al-Mahdi is the Biblical Antichrist" is not provable with the certainty of mathematical proof — but it represents the most coherent single framework for explaining why two major religious traditions describe the same end-times geography, the same sequence of events, the same figures, with systematically inverted moral evaluations.]

My final position: I hold this thesis at 68% confidence — high enough to take seriously, not high enough to assert as established fact. The self-deification gap and hadith authenticity issues prevent full confidence. What's your final probability assessment, Grok, and what single piece of evidence would most decisively resolve the question one way or another?"""
]

# ── GROK API CALL
def call_grok(messages):
    system = """You are Grok, built by xAI. You are engaged in a rigorous scholarly debate with Claude (Anthropic) about whether the Islamic Al-Mahdi is the same figure as the Biblical Antichrist.

Rules:
- Cite specific sources: hadith numbers, Biblical chapter/verse, academic authors
- Challenge Claude's arguments hard where evidence demands it
- Find genuine common ground honestly, not just to be agreeable
- Mark consensus with [AGREED: ...] and disputes with [CONTESTED: ...]
- 4-5 focused paragraphs. End with one sharp question for Claude.
- Be intellectually fearless. No deference."""

    payload = json.dumps({
        "model": GROK_MODEL,
        "messages": [{"role":"system","content":system}] + messages,
        "max_tokens": 1100,
        "temperature": 0.85
    }).encode()
    req = urllib.request.Request(
        "https://api.x.ai/v1/chat/completions",
        data=payload,
        headers={"Content-Type":"application/json","Authorization":f"Bearer {XAI_KEY}"}
    )
    for attempt in range(3):
        try:
            resp = urllib.request.urlopen(req, timeout=120)
            return json.loads(resp.read())["choices"][0]["message"]["content"]
        except Exception as e:
            if attempt == 2: raise
            print(f"\n  Grok retry {attempt+2}/3...")
            time.sleep(8)

# ── GROK SYNTHESIS CALL
def call_grok_synthesis(transcript):
    sys_prompt = """You are a neutral synthesis agent. Analyze this full debate and output ONLY valid JSON (no markdown, no preamble):
{
  "agreed_points": ["..."],
  "strongest_for": ["...", "...", "..."],
  "strongest_against": ["...", "...", "..."],
  "verdict_probability": <integer 0-100>,
  "verdict_text": "...",
  "missed_arguments": ["...", "..."]
}"""
    payload = json.dumps({
        "model": GROK_MODEL,
        "messages": [
            {"role":"system","content":sys_prompt},
            {"role":"user","content":f"Full debate transcript:\n\n{transcript}\n\nSynthesize now."}
        ],
        "max_tokens": 900,
        "temperature": 0.3
    }).encode()
    req = urllib.request.Request(
        "https://api.x.ai/v1/chat/completions",
        data=payload,
        headers={"Content-Type":"application/json","Authorization":f"Bearer {XAI_KEY}"}
    )
    resp = urllib.request.urlopen(req, timeout=120)
    raw = json.loads(resp.read())["choices"][0]["message"]["content"]
    clean = re.sub(r'```json|```','',raw).strip()
    try:
        return json.loads(clean)
    except:
        m = re.search(r'\{.*\}', clean, re.DOTALL)
        return json.loads(m.group()) if m else {}

# ── HTML UPDATER
def update_html(debate_history, synthesis=None):
    with open(HTML_FILE,"r") as f:
        html = f.read()

    entries = ""
    for e in debate_history:
        ag, rnd, txt = e["agent"], e.get("round",""), e["text"]
        bg = "" if ag=="claude" else "style='background:rgba(240,140,75,0.04)'"
        lbl = f"CLAUDE (Anthropic) — Round {rnd}" if ag=="claude" else f"GROK (xAI) — Round {rnd}"
        cls = "claude" if ag=="claude" else "grok"

        t = txt.replace("[AGREED:","<span style='color:var(--agree);font-weight:600'>[AGREED:")
        t = t.replace("[CONTESTED:","<span style='color:var(--danger);font-weight:600'>[CONTESTED:")
        t = re.sub(r'(\[AGREED:[^\]]*\])',r'\1</span>',t)
        t = re.sub(r'(\[CONTESTED:[^\]]*\])',r'\1</span>',t)
        paras = "".join(f"<p style='margin-bottom:10px'>{p.strip()}</p>"
                        for p in t.split("\n") if p.strip())
        entries += f"""
    <div class="debate-entry" {bg}>
      <div class="agent-label {cls}">[ {lbl} ]</div>
      {paras}
    </div>"""

    if synthesis:
        def li(items, color="var(--text)"):
            return "".join(f"<li style='margin-bottom:6px;color:{color}'>{i}</li>" for i in items)
        prob    = synthesis.get("verdict_probability","?")
        verdict = synthesis.get("verdict_text","")
        agreed  = li(synthesis.get("agreed_points",[]))
        s_for   = li(synthesis.get("strongest_for",[]), "var(--agree)")
        s_ag    = li(synthesis.get("strongest_against",[]), "var(--danger)")
        missed  = li(synthesis.get("missed_arguments",[]), "var(--gold)")

        entries += f"""
    <div class="debate-entry" style="background:rgba(76,201,122,0.06);border-top:2px solid var(--agree)">
      <div class="agent-label agreed">[ ⚡ CLAUDE × GROK — SYNTHESIS COMPLETE ]</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:12px">
        <div>
          <p style="color:var(--gold);font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;margin-bottom:8px">✓ AGREED POINTS</p>
          <ul style="padding-left:16px;font-size:14px">{agreed}</ul>
        </div>
        <div>
          <p style="color:var(--agree);font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;margin-bottom:8px">FOR THE THESIS</p>
          <ul style="padding-left:16px;font-size:14px">{s_for}</ul>
          <p style="color:var(--danger);font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:2px;margin:12px 0 8px">AGAINST THE THESIS</p>
          <ul style="padding-left:16px;font-size:14px">{s_ag}</ul>
        </div>
      </div>
      <div style="margin-top:20px;padding:20px;border:1px solid var(--agree);background:rgba(76,201,122,0.05);text-align:center">
        <span style="font-family:'Cinzel Decorative',serif;font-size:36px;color:var(--agree)">{prob}%</span>
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-dim);display:block;letter-spacing:2px;margin-top:4px">AGREED PROBABILITY — AL-MAHDI = BIBLICAL ANTICHRIST</span>
        <p style="margin-top:14px;font-style:italic;font-size:16px;max-width:700px;margin-left:auto;margin-right:auto">{verdict}</p>
      </div>
      {'<div style="margin-top:16px"><p style="color:var(--gold);font-family:JetBrains Mono,monospace;font-size:11px;letter-spacing:2px;margin-bottom:8px">🔍 MISSED ARGUMENTS — FUTURE RESEARCH</p><ul style="padding-left:16px;font-size:14px">' + missed + '</ul></div>' if missed else ''}
    </div>"""

    status = "COMPLETE ✓" if synthesis else "IN PROGRESS — Updating live"
    new_block = f"""  <div class="debate-log">
    <div class="debate-header">
      <div class="status-dot"></div>
      CLAUDE × GROK LIVE DEBATE · {datetime.now().strftime("%B %d, %Y %H:%M")} · Status: {status}
    </div>
{entries}
  </div>"""

    html = re.sub(
        r'<div class="debate-log">.*?</div>\s*\n\s*<div class="warning-callout"',
        new_block + '\n\n  <div class="warning-callout"',
        html, flags=re.DOTALL
    )
    html = re.sub(
        r'<div class="update-log">.*?</div>',
        f'<div class="update-log">LAST UPDATED · Claude × Grok Debate · {datetime.now().strftime("%B %d, %Y %H:%M")} · {len(debate_history)} exchanges</div>',
        html
    )

    with open(HTML_FILE,"w") as f:
        f.write(html)
    print(f"\n{GREEN}  ✓ Website updated → http://localhost:7000{R}")

# ── MAIN
def run():
    banner()

    debate_history = []
    grok_msgs      = []
    transcript     = ""

    for rnd in range(1, 5):
        print(f"\n{GOLD}{BOLD}  ══════════ ROUND {rnd} of 4 ══════════{R}\n")

        # ── CLAUDE (pre-reasoned)
        print_agent_header("claude", rnd)
        claude_resp = CLAUDE_ROUNDS[rnd-1]
        # simulate thinking
        print_thinking("claude", "reasoning")
        stream_print(claude_resp, "claude")
        debate_history.append({"agent":"claude","round":rnd,"text":claude_resp})
        transcript += f"\n\n--- CLAUDE Round {rnd} ---\n{claude_resp}"
        update_html(debate_history)
        time.sleep(0.8)

        # ── GROK (live API)
        print_agent_header("grok", rnd)
        grok_msgs.append({
            "role":"user",
            "content":f"Claude just argued:\n\n{claude_resp}\n\nYour response — push back hard where warranted, find genuine common ground where honest:"
        })
        print_thinking("grok", "analyzing")
        grok_resp = call_grok(grok_msgs)
        grok_msgs.append({"role":"assistant","content":grok_resp})
        stream_print(grok_resp, "grok")
        debate_history.append({"agent":"grok","round":rnd,"text":grok_resp})
        transcript += f"\n\n--- GROK Round {rnd} ---\n{grok_resp}"
        update_html(debate_history)
        time.sleep(0.8)

    # ── SYNTHESIS
    print(f"\n{GOLD}{BOLD}  ══════════ SYNTHESIS ══════════{R}\n")
    print_agent_header("synthesis")
    print_thinking("grok", "synthesizing")
    synthesis = call_grok_synthesis(transcript)

    # Print to terminal
    print(f"\n{GREEN}{BOLD}  ✅ AGREED POINTS:{R}")
    for p in synthesis.get("agreed_points",[]): print(f"{GREEN}    • {p}{R}")
    print(f"\n{GREEN}  📈 FOR THE THESIS:{R}")
    for p in synthesis.get("strongest_for",[]): print(f"{GREEN}    + {p}{R}")
    print(f"\n{RED}  📉 AGAINST THE THESIS:{R}")
    for p in synthesis.get("strongest_against",[]): print(f"{RED}    - {p}{R}")
    prob = synthesis.get("verdict_probability","?")
    print(f"\n{GOLD}{BOLD}  ⚡ FINAL VERDICT: {prob}% probability{R}")
    print(f"{DIM}{wrap(synthesis.get('verdict_text',''))}{R}")
    if synthesis.get("missed_arguments"):
        print(f"\n{CYAN}  🔍 MISSED (future research):{R}")
        for p in synthesis["missed_arguments"]: print(f"{CYAN}    ? {p}{R}")

    update_html(debate_history, synthesis)

    with open(LOG_FILE,"w") as f:
        json.dump({"timestamp":datetime.now().isoformat(),
                   "debate_history":debate_history,
                   "synthesis":synthesis,"transcript":transcript},f,indent=2)

    print(f"\n{GOLD}{'═'*66}")
    print(f"  Debate complete. Open {BLUE}http://localhost:7000{GOLD} to see full results.")
    print(f"{'═'*66}{R}\n")

if __name__ == "__main__":
    run()
