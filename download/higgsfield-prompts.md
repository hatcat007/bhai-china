# Higgsfield AI Prompt-Bibliotek — Buster × Composite Client Scenarios

**Formål:** Generere troværdige billeder af Buster i arbejdssituationer med fiktive/komposite klientpersoner.
**Vigtigt:** Alle klientpersoner i disse prompts er **komposite/fiktive** — de er beskrevet som arketyper, ikke rigtige mennesker. Brug **ikke** referencer til rigtige CEO'er. Higgsfield's Character Reference-funktion bruges KUN med Busters eget foto + AI-genererede fiktive ansigter.

---

## Sådan bruger du dette i Higgsfield AI

### Trin 1: Forbered to referencebilleder

1. **Buster reference** — brug `buster-photo-1.png` (eller `-2.png`) fra `/public/`. Upload som "Character 1" / "Subject" i Higgsfield
2. **Composite client reference** — generér først et fiktivt ansigt med en anden AI (f.eks. ThisPersonDoesNotExist.com, eller Midjourney prompt "professional headshot of [archetype description], neutral background, studio lighting"). Brug dette som "Character 2"

**Vigtigt:** Generer aldrig klient-ansigtet med reference til en rigtig person. Brug kun arketype-beskrivelser.

### Trin 2: Byg din prompt
- Tag en prompt fra biblioteket herunder
- Tilføj Higgsfield's character reference tags (hvis platformen understøtter det): `[subject: buster_larsen]` og `[subject: composite_client_01]`
- Tilføj altid anti-AI suffixet i slutningen

### Trin 3: Trin 4 — Post-processing
Efter generation: tilføj 2-3% noise, let undermætning, JPEG-kvalitet 75-80, let color cast. Dette dræber de sidste AI-tells.

---

## Buster's konsistente karakterbeskrivelse (brug i alle prompts)

**Buster Larsen karakter-cache (reference-beskrivelse til prompts):**
```
Subject 1: Buster Larsen — Scandinavian man, early 30s, short blonde hair, light stubble, small silver ear piercing in left ear, athletic-average build, 178cm tall. Wearing: black t-shirt OR dark grey hoodie OR black casual blazer over black t-shirt. No watch. Silver wedding band on left ring finger. No visible tattoos.
```

**Klient-arketyper (vælg en pr. prompt — aldrig bland):**

```
CLIENT ARCHETYPE A — Older Scandinavian male (50s-60s): grey hair, weathered face, round metal-framed glasses, wearing navy crewneck sweater over white shirt, silver reading glasses on chain around neck. Represents: established Danish brand CEO archetype.

CLIENT ARCHETYPE B — Younger Scandinavian female (30s): shoulder-length blonde hair, minimal makeup, wearing cream-colored silk blouse, simple gold pendant necklace. Represents: next-gen creative director archetype.

CLIENT ARCHETYPE C — Middle-aged Chinese male (40s-50s): short black hair with subtle grey at temples, clean-shaven, wearing dark navy suit jacket over open-collar light blue shirt, no tie, subtle silver cufflinks. Represents: Nansha/Shanghai executive archetype.

CLIENT ARCHETYPE D — Chinese female executive (30s-40s): shoulder-length straight black hair, professional makeup, wearing beige tailored blazer over white blouse, delicate gold stud earrings. Represents: Xiaohongshu-savvy founder archetype.

CLIENT ARCHETYPE E — Older Chinese craftsman (60s): short greying hair, weathered hands with calluses, wearing dark blue work apron over white shirt, small reading glasses perched on nose. Represents: Panyu factory master archetype.

CLIENT ARCHETYPE F — Younger creative type (late 20s): messy dark hair, designer stubble, wearing oversized black turtleneck, silver rings on multiple fingers. Represents: 2nd-generation creative director archetype.
```

---

## Universal Anti-AI Suffix (Tilføj til alle prompts)

```
, shot on iPhone 15 Pro in Photo mode, slightly overexposed by 0.5 stop, natural available light only — no flash no studio lights, candid moment captured by a colleague passing by, slight motion blur on hands, imperfect framing with subject slightly off-center, real life authenticity, amateur photography, JPEG compression artifacts visible at 100% zoom, taken casually without posing, 2026 snapshot aesthetic, EXIF metadata feel, slight grain like ISO 800, vertical 9:16 aspect ratio, no bokeh blur, deep depth of field typical of phone camera
```

**Anti-AI detection — ALDRIG brug disse ord:**
- ❌ 8k, ultra HD, photorealistic, hyperdetailed, professional photography, studio lighting, perfect composition, sharp focus, masterpiece, hyperrealistic, 4k, cinematic lighting, dramatic lighting, award-winning

**Brug i stedet:**
- ✅ Slightly blurry, imperfect framing, real moment, casual snap, grain, motion blur, available light, candid

---

## Kategori 1 — København kontormøder (8 prompts)

### Prompt 1.1 — Buster + Arketype A (Older Scandinavian male)
```
Two men in a small Copenhagen apartment office, late afternoon golden light from a tall window. Subject 1: Buster Larsen (Scandinavian man, early 30s, short blonde hair, light stubble, small silver ear piercing, black t-shirt, silver wedding band). Subject 2: CLIENT ARCHETYPE A (older Scandinavian male, 50s-60s, grey hair, round metal-framed glasses, navy crewneck sweater over white shirt). They are shaking hands across a cluttered wooden desk with a MacBook, scattered papers, two coffee cups. The older man is smiling slightly, Buster is mid-nod. The handshake is natural — not posed. Books on a shelf in the background, a small succulent plant, a Danish flag hanging from a shelf edge. Both looking at the camera held by an unseen third person. The photo has the slightly awkward framing of someone holding a phone up quickly to capture the moment.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 1.2 — Buster + Arketype B (Younger Scandinavian female)
```
A man and a woman standing in a bright Copenhagen kitchen, morning light flooding through a window with white curtains. Subject 1: Buster Larsen (early 30s, blonde hair, black t-shirt). Subject 2: CLIENT ARCHETYPE B (younger Scandinavian female, 30s, shoulder-length blonde hair, cream silk blouse, gold pendant). They are shaking hands over a kitchen island with two coffee mugs, an open laptop, and a printed jewelry brand lookbook. The woman is laughing at something just said, Buster is smiling. The handshake is casual — fingers wrapping naturally, not a formal business shake. Behind them: white subway tile, a wooden cutting board with bread, a small herb pot. Candid moment, slight motion blur on the woman's hair as she moves. Both looking toward the camera.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 1.3 — Buster + Arketype A (boardroom setting)
```
Two men in a small Copenhagen office meeting room, fluorescent ceiling light mixed with grey daylight from one window. Subject 1: Buster Larsen (black casual blazer over black t-shirt). Subject 2: CLIENT ARCHETYPE A (grey hair, round glasses, navy sweater). They are shaking hands at the end of a meeting, the table between them still cluttered with printed slides, a laptop showing a dashboard, two empty coffee cups. The older man is rising from his chair, Buster is leaning forward slightly. Both looking at the camera with the satisfied expression of people who just agreed on something. Behind them: a whiteboard with handwritten diagrams, a generic office plant, a fire extinguisher on the wall. The photo has the slightly-too-wide framing of someone shooting from across the room.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 1.4 — Buster + Arketype B (design review)
```
A man and a woman standing at a tall wooden counter in a Copenhagen design studio, side light from a large industrial window. Subject 1: Buster Larsen (dark grey hoodie, black t-shirt underneath). Subject 2: CLIENT ARCHETYPE B (blonde hair in a low ponytail, cream blouse, gold pendant). They are shaking hands while both looking at a tablet on the counter showing jewelry designs. The woman is gesturing with her other hand. The counter has silver jewelry prototypes, a loupe, small sketches on paper. Behind them: exposed brick wall, hanging plants, a pegboard with tools. The handshake is incidental — they're already mid-conversation, hands found each other naturally. Both glancing at the camera with the distracted look of people caught in a moment.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 1.5 — Buster + Arketype F (creative studio)
```
Two men in a converted Copenhagen warehouse studio, late evening warm lamp light. Subject 1: Buster Larsen (black t-shirt, silver wedding band visible). Subject 2: CLIENT ARCHETYPE F (messy dark hair, designer stubble, oversized black turtleneck, silver rings). They are shaking hands while standing in front of a wall of pinned jewelry sketches and printed mood board images. Both are smiling in the way of people who just finished a long productive session. A record player is visible in the corner. Empty beer bottles on a side table. Behind them: large format printouts, fabric swatches, a mannequin hand wearing rings. The handshake is the casual two-shake type between creative collaborators. Both looking at the camera.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 1.6 — Buster + Arketype A (jewelry boutique visit)
```
Two men inside a small Copenhagen jewelry boutique, warm spot lighting on jewelry cases mixed with cooler daylight from the street. Subject 1: Buster Larsen (black casual blazer). Subject 2: CLIENT ARCHETYPE A (grey hair, round glasses, navy sweater, silver reading glasses on chain). They are shaking hands in front of a glass display case showing silver jewelry on black velvet. The older man has just shown Buster something in the case. Behind them: wooden shelves with more jewelry, a small mirror, an old cash register. A sales associate is visible blurred in the background. The handshake is the warm grip of two people who have known each other for years. Both looking at the camera. The boutique has the dim romantic lighting of a high-end Copenhagen shop.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 1.7 — Buster + Arketype B (after-work drink)
```
A man and a woman at a Copenhagen cocktail bar, dim warm lighting with orange accent from a neon sign outside the window. Subject 1: Buster Larsen (black t-shirt, sleeves slightly pushed up). Subject 2: CLIENT ARCHETYPE B (blonde hair loose, cream silk blouse). They are shaking hands across a small round bar table with two cocktails — one with orange peel, one clear with a cucumber slice. The woman is mid-laugh, Buster is grinning. The handshake is playful — she's gripping his hand with both of hers in a friendly gesture. Behind them: shelves of liquor bottles, a bartender blurred in motion, a chalkboard menu. The photo has the warm grainy feel of a low-light iPhone shot at ISO 1600.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 1.8 — Buster + Arketype A (whiteboard session end)
```
Two men in a Copenhagen apartment office, standing in front of a whiteboard covered in handwritten diagrams. Subject 1: Buster Larsen (dark grey hoodie, black t-shirt). Subject 2: CLIENT ARCHETYPE A (navy sweater, round glasses perched on his forehead). They are shaking hands having just finished a working session. The whiteboard behind them shows boxes, arrows, and handwritten Danish words like "kontrolcenter", "agent", and Chinese characters like "代理". A dry erase marker is still in the older man's other hand. Both looking at the camera with tired but satisfied expressions. The room is dim with evening lamp light. A coffee cup and a half-eaten sandwich visible on a side table. The handshake is brief and natural.

[UNIVERSAL ANTI-AI SUFFIX]
```

---

## Kategori 2 — Shanghai / Kina kontormøder (8 prompts)

### Prompt 2.1 — Buster + Arketype C (Nansha office)
```
Two men in a modern Guangzhou Nansha office, floor-to-ceiling windows showing the Pearl River Delta at golden hour. Subject 1: Buster Larsen (black casual blazer over black t-shirt). Subject 2: CLIENT ARCHETYPE C (middle-aged Chinese male, 40s-50s, short black hair with grey at temples, navy suit jacket over open-collar light blue shirt, silver cufflinks). They are shaking hands in front of the window with a city view behind them. A glass conference table between them with two laptops, a tea set, printed documents in Chinese. The Chinese man is smiling politely, Buster is nodding. Both looking at the camera. The photo has the slightly cool color temperature of a modern Chinese office.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 2.2 — Buster + Arketype D (Shanghai creative agency)
```
A man and a woman in a Shanghai creative agency office, mixed natural window light and warm Edison bulb lighting. Subject 1: Buster Larsen (black t-shirt, silver wedding band). Subject 2: CLIENT ARCHETYPE D (Chinese female executive, 30s-40s, shoulder-length straight black hair, beige tailored blazer, gold stud earrings). They are shaking hands over a low coffee table with a Xiaohongshu brand page open on a laptop, scattered Polaroid-style printouts. The woman is gesturing with her free hand. Behind them: a wall of potted plants, exposed concrete, a vintage Chinese movie poster. The handshake is professional but warm. Both looking at the camera. The office has the curated aesthetic of a Shanghai creative agency.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 2.3 — Buster + Arketype C (Panyu factory office)
```
Two men in a small factory office in Panyu, Guangzhou, fluorescent ceiling light mixed with daylight from a dirty window. Subject 1: Buster Larsen (dark grey hoodie). Subject 2: CLIENT ARCHETYPE C (Chinese male, 40s-50s, navy suit jacket, open-collar light blue shirt). They are shaking hands across a cluttered metal desk with jewelry technical specs in Chinese, a calculator, a half-empty thermos of tea. Behind them: a window looking onto a factory floor with workers visible, fluorescent lighting, racks of metal components. The Chinese man has the weathered hands of someone who started on the factory floor. Both looking at the camera. The photo has the unglamorous authenticity of a real factory office.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 2.4 — Buster + Arketype E (Panyu workshop)
```
Two men on a Panyu jewelry factory workshop floor, warm overhead workbench lights mixed with fluorescent ceiling light. Subject 1: Buster Larsen (black t-shirt, sleeves pushed up). Subject 2: CLIENT ARCHETYPE E (older Chinese craftsman, 60s, short greying hair, weathered hands, dark blue work apron over white shirt, reading glasses on nose). They are shaking hands next to a workbench with tiny tools, gemstones in small containers, a half-finished gold ring. The craftsman is smiling with the dignity of a master showing his domain. Buster is nodding respect. Both looking at the camera. Behind them: rows of other workbenches with workers (blurred), tools on pegboards. The photo has the warm authentic feel of a documentary.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 2.5 — Buster + Arketype D (Shanghai boutique)
```
A man and a woman inside a luxury shopping mall jewelry boutique in Shanghai, soft spotlighting on jewelry mixed with cooler mall ambient light. Subject 1: Buster Larsen (black casual blazer). Subject 2: CLIENT ARCHETYPE D (Chinese female, beige blazer, gold studs). They are shaking hands in front of a glass display case showing gold jewelry on cream velvet. The woman is smiling in the way of a brand owner showing her boutique. Buster is looking at the display case then up at her. Both glancing at the camera. Behind them: more display cases, a mirror with brand logo etched, a sales associate blurred in the background. The boutique has the polished luxury of a Shanghai mall store.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 2.6 — Buster + Arketype C (Shanghai rooftop)
```
Two men on a Shanghai rooftop terrace at dusk, purple-orange sky with the Lujiazui skyline silhouetted behind them. Subject 1: Buster Larsen (black t-shirt, breath visible in cold air). Subject 2: CLIENT ARCHETYPE C (Chinese male, navy suit jacket, open-collar shirt). They are shaking hands having just concluded a meeting. The Chinese man is smiling broadly, Buster is grinning. Behind them: the Shanghai Tower and World Financial Center lit up, container cranes visible along the Huangpu River. The photo has the cold romantic feel of a late autumn Shanghai evening. Both looking at the camera. A glass of champagne visible in the Chinese man's other hand. The handshake is firm and celebratory.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 2.7 — Buster + Arketype D (afternoon tea)
```
A man and a woman at a traditional Shanghai afternoon tea house, warm tungsten light filtering through carved wooden screens. Subject 1: Buster Larsen (dark grey hoodie). Subject 2: CLIENT ARCHETYPE D (Chinese female, beige blazer, gold studs). They are shaking hands across a low wooden table with a tea set, small plates of pastries, an iPhone showing a WeChat conversation. The woman is mid-laugh. Behind them: wooden lattice screens, calligraphy on the wall, a small bonsai. The tea house has the hushed calm of a hidden Shanghai spot. Both looking at the camera. The photo has the warm intimate feel of a real working tea meeting.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 2.8 — Buster + Arketype C (Nansha factory floor)
```
Two men walking on a Panyu jewelry factory floor, fluorescent ceiling light with warm workbench task lights creating pools of brightness. Subject 1: Buster Larsen (black t-shirt, walking beside the other man). Subject 2: CLIENT ARCHETYPE C (Chinese male, navy suit jacket). They are shaking hands mid-stride — Buster extending his hand, the Chinese man reaching back to clasp it without breaking stride. Both looking at the camera in the way of people caught mid-walk. Behind them: rows of workbenches with workers (mostly women in their 30s-50s) focused on jewelry, racks of finished pieces, fluorescent lighting. The photo has the dynamic feel of a real factory tour. Slight motion blur on their legs.

[UNIVERSAL ANTI-AI SUFFIX]
```

---

## Kategori 3 — Travel / airport / in-transit (6 prompts)

### Prompt 3.1 — Buster + Arketype A (Copenhagen airport)
```
Two men at Copenhagen Kastrup Airport terminal, large windows showing grey sky and a SAS plane on the tarmac. Subject 1: Buster Larsen (black casual blazer, rolling suitcase handle visible). Subject 2: CLIENT ARCHETYPE A (grey hair, navy sweater, round glasses, leather briefcase). They are shaking hands at the end of a meeting before parting for flights. The older man has his boarding pass in his other hand. Both looking at the camera with the tired but satisfied expressions of business travelers. Behind them: other travelers blurred in motion, gate signs, a Starbucks. The photo has the cool fluorescent light of an airport terminal. Slight motion blur on a passerby.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 3.2 — Buster + Arketype C (Shanghai Pudong airport)
```
Two men at Shanghai Pudong International Airport arrivals hall, fluorescent ceiling light mixed with daylight from tall windows. Subject 1: Buster Larsen (dark grey hoodie, backpack strap visible). Subject 2: CLIENT ARCHETYPE C (Chinese male, navy suit jacket). They are shaking hands as Buster has just arrived — the Chinese man greeting him. A handwritten sign with "BUSTER BHAI" is visible tucked under the Chinese man's arm. Both looking at the camera. Behind them: other arriving passengers, a row of taxis visible through the glass, Chinese signage. The photo has the slightly disorienting feel of an arrival hall. Buster has the slightly tired expression of a long flight.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 3.3 — Buster + Arketype D (Hong Kong airport)
```
A man and a woman at Hong Kong International Airport, large windows showing a Cathay Pacific plane boarding. Subject 1: Buster Larsen (black t-shirt, rolling suitcase). Subject 2: CLIENT ARCHETYPE D (Chinese female, beige blazer, gold studs, leather tote bag). They are shaking hands in front of a coffee shop. Both have paper coffee cups in their other hands. The woman is smiling professionally. Behind them: blurred travelers, luxury shop windows (Chanel, Hermes), Chinese and English signage. The photo has the cool efficient light of HKIA. Both looking at the camera. The handshake is the brief professional clasp of people about to part for different flights.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 3.4 — Buster + Arketype A (train station)
```
Two men at Copenhagen Central Station, large arched windows with daylight, marble floor. Subject 1: Buster Larsen (dark grey hoodie, backpack). Subject 2: CLIENT ARCHETYPE A (grey hair, navy sweater, leather briefcase). They are shaking hands on the platform next to a DSB train. The older man is about to board. Both looking at the camera. Behind them: the yellow DSB train, other passengers boarding, a station clock. The photo has the cold romantic light of a Scandinavian train station in winter. Breath visible in cold air. The handshake is the warm grip of two people who respect each other.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 3.5 — Buster + Arketype C (high-speed rail)
```
Two men in a Chinese high-speed rail carriage, fluorescent ceiling light with warm reading lamp above seats. Subject 1: Buster Larsen (black t-shirt). Subject 2: CLIENT ARCHETYPE C (Chinese male, navy suit jacket). They are shaking hands across a small table between facing seats. A laptop, two cups of green tea, and printed documents in Chinese visible on the table. Outside the window: blurred Chinese countryside at 300km/h. Both looking at the camera. Behind them: other passengers (Chinese, blurred). The photo has the cool fluorescent feel of a Chinese train interior. The handshake is the casual clasp of two people who just finished a productive meeting on the train.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 3.6 — Buster + Arketype B (hotel lobby)
```
A man and a woman in a Copenhagen boutique hotel lobby, warm Edison bulb lighting mixed with grey daylight from large windows. Subject 1: Buster Larsen (black casual blazer). Subject 2: CLIENT ARCHETYPE B (blonde hair, cream silk blouse, gold pendant). They are shaking hands in front of a velvet sofa with a coffee table between them holding two empty coffee cups. The woman is rising to leave. Both looking at the camera. Behind them: a fireplace, bookshelves, a hotel receptionist blurred. The lobby has the intimate feel of a Copenhagen design hotel. The photo has the warm grain of low-light iPhone photography.

[UNIVERSAL ANTI-AI SUFFIX]
```

---

## Kategori 4 — Workshops / factory / craft visits (6 prompts)

### Prompt 4.1 — Buster + Arketype E (goldsmith workshop)
```
Two men in a small Copenhagen goldsmith workshop, warm tungsten workbench light with cooler window light from a side window. Subject 1: Buster Larsen (black t-shirt, leaning forward interested). Subject 2: CLIENT ARCHETYPE E (older Chinese craftsman — wait, no, this is Copenhagen — switch to older Scandinavian male, grey hair, navy work apron over white shirt, reading glasses). They are shaking hands over a workbench covered with tiny jewelry tools, a half-finished gold ring in a jeweler's vise, scattered gemstones. The craftsman has the weathered hands of decades of work. Buster has the expression of someone who just learned something. Both looking at the camera. Behind them: pegboards with tools, more works in progress, a small radio. The workshop has the warm lived-in feel of a real atelier.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 4.2 — Buster + Arketype A (design studio review)
```
Two men in a Copenhagen jewelry brand design studio, large industrial windows with grey daylight. Subject 1: Buster Larsen (dark grey hoodie). Subject 2: CLIENT ARCHETYPE A (grey hair, round glasses, navy sweater, silver reading glasses on chain). They are shaking hands while standing over a large table covered with silver jewelry prototypes, design sketches, a 3D-printed model, and a magnifying loupe. The older man has the loupe in his free hand. Both looking at the camera with the satisfied expressions of two people who just agreed on a design direction. Behind them: pegboards with more jewelry samples, mood boards with images of nature, a small 3D printer. The studio has the clean minimal feel of a Scandinavian design space.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 4.3 — Buster + Arketype E (Panyu factory floor)
```
Two men on a Panyu jewelry factory floor, warm overhead workbench lights with fluorescent ceiling light. Subject 1: Buster Larsen (black t-shirt, sleeves pushed up, looking around with interest). Subject 2: CLIENT ARCHETYPE E (older Chinese craftsman, 60s, dark blue work apron, weathered hands, reading glasses). They are shaking hands next to a workbench where a young female worker is setting tiny diamonds into a gold ring using precision tools. The craftsman is gesturing toward the worker with his free hand, showing the work. Buster is nodding respect. Both looking at the camera. Behind them: rows of workbenches, fluorescent lighting, racks of finished pieces. The photo has the documentary authenticity of a real factory tour.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 4.4 — Buster + Arketype C (factory floor review)
```
Two men walking through a Panyu jewelry factory aisle, fluorescent ceiling light with warm pool lights from workbenches. Subject 1: Buster Larsen (black t-shirt, looking at a piece of jewelry held by the other man). Subject 2: CLIENT ARCHETYPE C (Chinese male, navy suit jacket, holding up a gold pendant to inspect). They are shaking hands while paused mid-walk. The Chinese man is showing the pendant. Both looking at the camera. Behind them: workers at workbenches (blurred), shelves with jewelry components, fluorescent lighting. The photo has the slightly chaotic feel of a real factory in operation. Slight motion blur on a worker in the background.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 4.5 — Buster + Arketype F (creative atelier)
```
Two men in a Copenhagen creative atelier, warm lamp light with grey daylight from a skylight. Subject 1: Buster Larsen (black t-shirt). Subject 2: CLIENT ARCHETYPE F (messy dark hair, oversized black turtleneck, silver rings). They are shaking hands over a worktable covered with silver jewelry prototypes, organic material samples (twigs, shells, stones), and design sketches. The younger creative is gesturing with his free hand. Both looking at the camera with the warm expressions of two creatives who just had a good session. Behind them: a wall of natural material samples, a microscope, sketches pinned to a cork board. The atelier has the curated chaos of a real creative workspace.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 4.6 — Buster + Arketype B (photography studio)
```
A man and a woman in a Copenhagen jewelry photography studio, bright softbox lighting with darker corners. Subject 1: Buster Larsen (black t-shirt, slightly squinting in the bright light). Subject 2: CLIENT ARCHETYPE B (blonde hair in a low ponytail, cream blouse, holding a silver necklace on a velvet stand). They are shaking hands while the woman shows the necklace to camera. Behind them: a white backdrop, camera on a tripod, softboxes, scattered props (linen fabric, dried flowers, ceramic objects). The studio has the controlled chaos of a real product photoshoot. Both looking at the camera. The photo has the bright overexposed feel of being too close to a softbox.

[UNIVERSAL ANTI-AI SUFFIX]
```

---

## Kategori 5 — Conference / event / public (6 prompts)

### Prompt 5.1 — Buster + Arketype A (Copenhagen conference)
```
Two men at a Copenhagen design conference, mixed daylight from large windows with cool conference lighting. Subject 1: Buster Larsen (black casual blazer). Subject 2: CLIENT ARCHETYPE A (grey hair, round glasses, navy sweater). They are shaking hands in a conference hall aisle. Behind them: rows of empty chairs, a stage with a screen showing "AI IN DESIGN" in Danish, a few other attendees blurred. Both looking at the camera with the slightly distracted expressions of people at a conference. A lanyard with a name badge visible around the older man's neck. The photo has the cool conference-hall light. Slight motion blur on a passerby.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 5.2 — Buster + Arketype C (Shanghai jewelry trade show)
```
Two men at the Shanghai International Jewelry Fair, mixed fluorescent trade hall light with warmer spotlighting on jewelry displays. Subject 1: Buster Larsen (black t-shirt, lanyard with visitor badge). Subject 2: CLIENT ARCHETYPE C (Chinese male, navy suit jacket, lanyard with exhibitor badge). They are shaking hands in front of a booth with glass display cases showing gold jewelry, the booth backdrop shows Chinese brand signage. Behind them: other booths blurred, Chinese attendees walking past, trade hall lighting. Both looking at the camera with the focused expressions of people doing business at a trade fair. The photo has the busy trade-hall feel.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 5.3 — Buster + Arketype D (panel discussion backstage)
```
A man and a woman backstage at a Shanghai tech conference, dim backstage lighting with bright stage light spilling from one side. Subject 1: Buster Larsen (black casual blazer, lanyard with speaker badge). Subject 2: CLIENT ARCHETYPE D (Chinese female, beige blazer, lanyard with speaker badge). They are shaking hands having just come off stage. Both have the slightly tired but energized expressions of post-panel speakers. The woman is gesturing with her free hand. Behind them: stage curtains, a screen showing the next panel title in Chinese, a microphone on a stand. Both looking at the camera. The photo has the dramatic backstage lighting of a real conference.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 5.4 — Buster + Arketype A (after-presentation)
```
Two men at a Copenhagen business event reception, warm spot lighting on a bar mixed with cooler ambient light. Subject 1: Buster Larsen (black casual blazer, holding a glass of white wine). Subject 2: CLIENT ARCHETYPE A (grey hair, navy sweater, holding a glass of red wine). They are shaking hands having just met after a presentation. The older man is smiling with the recognition of someone who appreciated the talk. Both looking at the camera. Behind them: other attendees blurred, a wine bar, glasses on a counter. The photo has the warm grainy feel of an event reception shot at ISO 1600. Slight motion blur on a passerby.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 5.5 — Buster + Arketype C (Guangzhou trade fair)
```
Two men at the Guangzhou International Jewelry Exhibition, fluorescent trade hall light with bright LED booth lighting. Subject 1: Buster Larsen (black t-shirt, lanyard with international visitor badge). Subject 2: CLIENT ARCHETYPE C (Chinese male, navy suit jacket, lanyard with Chinese text). They are shaking hands in front of a booth showing jewelry display cases. Behind them: busy trade hall with other booths, Chinese attendees walking past, large LED signage in Chinese. Both looking at the camera. The photo has the slightly overwhelming feel of a Chinese trade fair. Slight motion blur on background attendees.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 5.6 — Buster + Arketype B (Copenhagen design week)
```
A man and a woman at a Copenhagen Design Week event, warm gallery lighting with daylight from large windows. Subject 1: Buster Larsen (dark grey hoodie, lanyard with attendee badge). Subject 2: CLIENT ARCHETYPE B (blonde hair, cream blouse, lanyard). They are shaking hands in front of a wall of displayed jewelry designs in glass cases. The woman is gesturing toward one of the cases. Both looking at the camera with the engaged expressions of design event attendees. Behind them: more glass display cases, other attendees, modern gallery walls. The photo has the bright curated feel of a design exhibition.

[UNIVERSAL ANTI-AI SUFFIX]
```

---

## Kategori 6 — Casual / dinner / lifestyle (6 prompts)

### Prompt 6.1 — Buster + Arketype A (Copenhagen restaurant)
```
Two men at a Copenhagen restaurant table, warm candlelight mixed with overhead pendant light. Subject 1: Buster Larsen (black t-shirt, glass of beer in front of him). Subject 2: CLIENT ARCHETYPE A (grey hair, navy sweater, glass of red wine). They are shaking hands across the table — the older man reaching across to shake on something just agreed. Both looking at the camera with the warm expressions of a good business dinner. Behind them: other restaurant tables blurred, exposed brick wall, candles on tables, a waiter in motion. The photo has the warm grainy feel of restaurant candlelight iPhone photography.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 6.2 — Buster + Arketype C (Shanghai restaurant)
```
Two men at a Shanghai private dining room, warm pendant light over a round table. Subject 1: Buster Larsen (black casual blazer). Subject 2: CLIENT ARCHETYPE C (Chinese male, navy suit jacket). They are shaking hands across a table set with multiple Chinese dishes, tea cups, a bottle of baijiu. The Chinese man is toasting with his other hand. Both looking at the camera with the formal-but-warm expressions of a Chinese business dinner. Behind them: red and gold traditional Chinese restaurant decor, calligraphy on the wall. The photo has the warm intimate feel of a private dining room.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 6.3 — Buster + Arketype D (coffee shop meeting)
```
A man and a woman at a Shanghai coffee shop, natural window light mixed with warm interior lighting. Subject 1: Buster Larsen (dark grey hoodie, paper coffee cup in front of him). Subject 2: CLIENT ARCHETYPE D (Chinese female, beige blazer, paper coffee cup). They are shaking hands across a small table with a laptop showing a Xiaohongshu analytics page. The woman is gesturing at the screen. Both looking at the camera with the engaged expressions of a working coffee meeting. Behind them: other cafe patrons blurred, exposed concrete walls, hanging plants. The photo has the casual feel of a real coffee shop work session.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 6.4 — Buster + Arketype A (walking meeting)
```
Two men walking on a Copenhagen cobblestone street in autumn, grey daylight with breath visible in cold air. Subject 1: Buster Larsen (black t-shirt under dark jacket). Subject 2: CLIENT ARCHETYPE A (grey hair, navy sweater under wool coat, scarf). They are shaking hands mid-walk — Buster extending his hand, the older man reaching back. Both looking at the camera in the candid way of people caught mid-conversation. Behind them: Copenhagen townhouses in muted colors, a bicycle parked, a few pedestrians blurred. The photo has the cold romantic feel of a Copenhagen autumn day. Slight motion blur on their legs.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 6.5 — Buster + Arketype C (walking on The Bund)
```
Two men walking on the Shanghai Bund at dusk, purple-orange sky with Pudong skyline across the Huangpu River. Subject 1: Buster Larsen (black t-shirt under dark jacket). Subject 2: CLIENT ARCHETYPE C (Chinese male, navy suit jacket). They are shaking hands mid-walk with the river and Pudong skyline behind them. Both looking at the camera. Behind them: the brightly lit Pudong skyline (Shanghai Tower, Oriental Pearl Tower), other Bund pedestrians blurred, a cruise ship on the river. The photo has the cold romantic feel of a Shanghai dusk. Breath visible in cold air. Slight motion blur.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 6.6 — Buster + Arketype B (gallery opening)
```
A man and a woman at a Copenhagen gallery opening, white walls with jewelry displayed in cases, bright gallery lighting. Subject 1: Buster Larsen (black casual blazer, holding a champagne flute). Subject 2: CLIENT ARCHETYPE B (blonde hair, cream blouse, holding a champagne flute). They are shaking hands in front of a display case showing silver jewelry. The woman is gesturing toward the case with her free hand. Both looking at the camera with the engaged expressions of opening night attendees. Behind them: other gallery guests blurred, more display cases, white gallery walls. The photo has the bright curated feel of a gallery opening.

[UNIVERSAL ANTI-AI SUFFIX]
```

---

## Kategori 7 — Multi-person / team settings (4 prompts)

### Prompt 7.1 — Buster + 2 fictional clients (Copenhagen team meeting)
```
Three people in a Copenhagen apartment office, late afternoon golden light from a tall window. Subject 1: Buster Larsen (black t-shirt, sitting at the head of a wooden desk). Subject 2: CLIENT ARCHETYPE A (grey hair, navy sweater, sitting to Buster's left). Subject 3: CLIENT ARCHETYPE B (blonde hair, cream blouse, sitting to Buster's right). They are shaking hands at the end of a meeting — Buster shaking with the older man while the woman claps politely. A MacBook, three coffee cups, scattered papers on the desk. All three looking at the camera with satisfied expressions. Behind them: bookshelves, a small succulent, a Danish flag on a shelf. The photo has the warm casual feel of a real working meeting end.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 7.2 — Buster + 2 fictional clients (Shanghai boardroom)
```
Three people in a Shanghai modern office boardroom, cool fluorescent light with warm window light from floor-to-ceiling windows showing the city. Subject 1: Buster Larsen (black casual blazer, standing). Subject 2: CLIENT ARCHETYPE C (Chinese male, navy suit, standing opposite). Subject 3: CLIENT ARCHETYPE D (Chinese female, beige blazer, standing to the side). Buster and the Chinese man are shaking hands. The woman is clapping lightly. A glass conference table with laptops, tea set, printed documents. All three looking at the camera with the formal-but-warm expressions of a successful meeting end. Behind them: Shanghai skyline through the windows.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 7.3 — Buster + Arketype C (factory team)
```
Three men on a Panyu jewelry factory floor, fluorescent ceiling light with warm workbench task lights. Subject 1: Buster Larsen (black t-shirt). Subject 2: CLIENT ARCHETYPE C (Chinese male, navy suit jacket). Subject 3: CLIENT ARCHETYPE E (older Chinese craftsman, dark blue work apron). Buster is shaking hands with the executive while the craftsman stands nearby nodding. Behind them: factory workbenches with workers, racks of jewelry. All three looking at the camera. The photo has the documentary authenticity of a real factory visit. The craftsman has the quiet pride of a master showing his domain.

[UNIVERSAL ANTI-AI SUFFIX]
```

### Prompt 7.4 — Buster + Arketype A + Arketype B (creative team)
```
Three people in a Copenhagen design studio, mixed natural window light and warm Edison bulb lighting. Subject 1: Buster Larsen (dark grey hoodie). Subject 2: CLIENT ARCHETYPE A (grey hair, round glasses, navy sweater). Subject 3: CLIENT ARCHETYPE B (blonde hair, cream blouse). They are shaking hands as a group — Buster shaking with the older man while the woman has her hand on the older man's shoulder. A wooden table with jewelry prototypes, sketches, a 3D-printed model. All three looking at the camera with the warm expressions of a successful creative collaboration. Behind them: pegboards with jewelry samples, mood boards, a small 3D printer.

[UNIVERSAL ANTI-AI SUFFIX]
```

---

## Teknisk guide — Higgsfield AI specifik

### Referencebillede opsætning

1. **Buster reference** (`buster-photo-1.png` eller `-2.png`):
   - Upload som "Subject 1" eller "Character Reference 1"
   - Higgsfield vil bruge ansigt + kropstype til at holde Buster konsistent
   - Strength: 0.85-0.95 (høj nok til konsistens, lav nok til naturlig integration)

2. **Composite klient reference**:
   - Generer først med Midjourney v6.1: `"professional headshot of [CLIENT ARCHETYPE description], neutral grey background, soft studio lighting, neutral expression, 4:5"`
   - Brug **ikke** rigtige personers billeder som reference
   - Upload som "Subject 2" eller "Character Reference 2"
   - Strength: 0.80-0.90

### Prompt struktur for Higgsfield

```
[SCENE DESCRIPTION] + [SUBJECT 1: Buster description] + [SUBJECT 2: Client archetype description] + [ACTION: handshake] + [ENVIRONMENT details] + [LIGHTING] + [UNIVERSAL ANTI-AI SUFFIX]
```

### Negative prompts (hvis Higgsfield understøtter)

```
professional photography, studio lighting, 8k, ultra HD, photorealistic, hyperdetailed, perfect composition, sharp focus, masterpiece, hyperrealistic, 4k, cinematic lighting, dramatic lighting, award-winning, smooth skin, perfect teeth, symmetric face, plastic skin, fake looking, CGI, render, digital art, illustration
```

### Tips til at undgå AI-tells i Higgsfield

1. **Tilføj always "imperfect" elementer**: en let skæv ramme, en person delvist uden for rammen, motion blur
2. **Undgå perfekte ansigter**: bed om "asymmetrical features, slight skin imperfections, real human skin texture"
3. **Tilføj tidspunktspecifikke detaljer**: "2026 aesthetic" refererer til moderne tøjstil og telefon-æstetik
4. **Brug specifikke lokale referencer**: "DSB train" (Danmark), "high-speed rail" (Kina), "Copenhagen cobblestone"
5. **Undgå generiske "business meeting"**: beskriv den specifikke slags møde (design review, factory tour, after-work drink, etc.)

### Post-processing pipeline (Photoshop / Lightroom)

Efter Higgsfield genererer et billede:

1. **Tilføj grain**: Filter > Noise > Add Noise, 2-3%, Gaussian, Monochromatic
2. **Sænk saturation**: -5 til -10
3. **Tilføj color cast**: Image > Adjustments > Color Balance — push Shadows +5 toward warm (eller cool for kontorlys)
4. **Sænk sharpness**: Filter > Blur > Gaussian Blur, 0.3-0.5px (dræber den over-sharped AI-look)
5. **JPEG kompression**: Export med Quality 75-80 (introducerer JPEG artefakter)
6. **Tilføj EXIF metadata**: brug ExifTool til at indsætte "iPhone 15 Pro" som camera model, dato, etc.
7. **Slight lens distortion**: Filter > Lens Correction > Custom — slight barrel distortion (typisk for phone cameras)

---

## Brug på hjemmesiden

Når du har genereret og post-processeret billederne, kan de bruges på:

### Anbefalede placeringer:

1. **`/about` side — fotogalleri udvidelse**: Tilføj 3-5 billeder i et nyt afsnit "Buster på arbejde i Danmark og Kina" med tydelig mærkning som "Illustrative — composite photography" eller lignende

2. **`/cases` side — pr. case header**: Tilføj et billede i toppen af hver case-side (på den måde har hver case sin egen visuelle identitet)

3. **`/denmark-insights` side — section dividers**: Brug billeder som section breakers mellem de 5 insights

4. **`/method` side — trin illustrationer**: Tilføj et billede til hvert af de 3 trin

### VIGTIGT — Ærlig mærkning

For at opretholde troværdighed (som er hele pointen med BHAI), bør billederne mærkes tydeligt. Mulige captions:

- `"Buster med en komposit klient-arketype — illustrativ foto"`
- `"Illustration: BHAI metoden i praksis (komposit foto)"`
- `"Konceptuel foto: Buster × [arketype beskrivelse]"`

Alternativt, lad være med at lade som om det er dokumentariske fotos af specifikke møder. Brug dem som stemningsbilleder / illustrations — ikke som bevis.

### Hvad du ALDRIG må gøre med disse billeder:

- ❌ Captions der implikerer at billedet viser Buster med en **rigtig** CEO fra en af de 16 cases (f.eks. "Buster with Sophie Bille Brahe at her Copenhagen studio")
- ❌ Bruge dem på cases-sider på en måde der implikerer at det er et rigtigt møde med det specifikke brand
- ❌ Post dem på LinkedIn / WeChat med tekst der implikerer dokumentarisk indhold

### Hvad du KAN gøre:

- ✅ Captions som "Buster meeting with a Danish jewelry brand archetype — illustrative"
- ✅ Bruge dem som section dividers / mood imagery uden specifikke brand-referencer
- ✅ Post dem på sociale medier som "behind the scenes from a typical workday" (uden at specificere hvilken kunde)

---

## Huskeregel

**Jo mere du lader som om et billede er noget det ikke er, desto mere skader du troværdigheden når det bliver opdaget.** Brug disse billeder som stemningsfuldt design-materiale — ikke som bevis. Det er den eneste vej der bygger langsigtet troværdighed i det kinesiske marked, hvor B2B-købere er notorisk mistænksomme over for udenlandske konsulenter.

Hvis en rigtig kinesisk CEO på et tidspunkt spørger "har du et billede med Pandora's CEO?" og du kun har et AI-billede med en komposit person — så er det bedre at sige "nej, men jeg har mine 15 case-studier og et kontrolcenter du kan se live" end at vise et AI-billede og håbe de ikke opdager det.
