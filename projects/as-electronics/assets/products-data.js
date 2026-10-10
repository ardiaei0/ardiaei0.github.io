// To use your own photo for a product, drop a square WebP/JPEG image in
// assets/images/ and add `image: "assets/images/your-file.webp"` to that
// product's entry below. Without an `image` field, the emoji `icon` is shown.
// Extra views go in an `images` array; they appear as clickable thumbnails
// under the main photo on the product page.
// Products sold in several options (e.g. capacities) list them in `variants`,
// each with its own `price`; `price` on the product is the lowest option's.
//
// PLACEHOLDER PRICES: products sourced from the "FLASH ELECTRONICS" supplier
// catalog (marked below) use the supplier's wholesale cost as a placeholder
// `price` — update these to real retail prices before going live.

const CATEGORIES = [
  { slug: "phones",      name: "Phones & Tablets",        name_sq: "Telefona & Tableta" },
  { slug: "audio",       name: "Audio",                   name_sq: "Audio" },
  { slug: "watches",     name: "Smart Watches",           name_sq: "Orë Smart" },
  { slug: "charging",    name: "Chargers & Power Banks",  name_sq: "Karikues & Powerbank" },
  { slug: "cases",       name: "Cases & Accessories",     name_sq: "Mbrojtëse & Aksesorë" },
  { slug: "car",         name: "Car Accessories",         name_sq: "Aksesorë për Makinë" },
  { slug: "gaming-pc",   name: "Gaming & PC",             name_sq: "Gaming & PC" },
  { slug: "smart-home",  name: "Smart Home",              name_sq: "Shtëpi Smart" },
  { slug: "used-phones", name: "Used Phones",             name_sq: "Telefona të Përdorur" },
];

const CATEGORY_ICONS = {
  phones: "📱", audio: "🎧", watches: "⌚", charging: "🔋",
  cases: "🛡️", car: "🚗", "gaming-pc": "🎮", "smart-home": "🏠",
  "used-phones": "♻️",
};

const IPHONE_MODELS = [
  "iPhone 11", "iPhone 11 Pro", "iPhone 11 Pro Max",
  "iPhone 12 mini", "iPhone 12", "iPhone 12 Pro", "iPhone 12 Pro Max",
  "iPhone 13 mini", "iPhone 13", "iPhone 13 Pro", "iPhone 13 Pro Max",
  "iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max",
  "iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max",
  "iPhone 16e", "iPhone 16", "iPhone 16 Plus", "iPhone 16 Pro", "iPhone 16 Pro Max",
  "iPhone 17", "iPhone Air", "iPhone 17 Pro", "iPhone 17 Pro Max",
];

// One variant per iPhone model, all at the same price (used by phone cases).
function iphoneVariants(price) {
  return IPHONE_MODELS.map((model) => ({ id: model.toLowerCase().replace(/\s+/g, "-"), label: model, price }));
}

const PRODUCTS = [
  { slug: "earldom-3in1-qi2-charging-dock", name: "Earldom 3-in-1 Qi2 Charging Dock", category: "charging", price: 50, icon: "🔌", image: "assets/images/earldom-3in1-qi2-charging-dock.png",
    desc: "Charge your phone, AirPods and Apple Watch at once on one Qi2 dock.",
    long: "This Earldom dock holds a phone upright on a Qi2 magnetic charging puck while an angled ledge charges AirPods and a side arm charges an Apple Watch — three devices powering up at the same time from one stand on your desk or nightstand.",
    name_sq: "Stacion Karikimi Earldom 3-në-1 Qi2",
    desc_sq: "Karikoni telefonin, AirPods dhe Apple Watch njëkohësisht në një stacion Qi2.",
    long_sq: "Ky stacion Earldom mban telefonin vertikalisht mbi një karikues magnetik Qi2, ndërsa një skaj anësor karikon AirPods dhe një krah anash karikon Apple Watch — tre pajisje që karikohen njëkohësisht nga një stacion i vetëm në tavolinë ose komodinë.",
    specs: [
      { label: "Charging standard", label_sq: "Standardi i karikimit", value: "Qi2 magnetic", value_sq: "Magnetik Qi2" },
      { label: "Devices supported", label_sq: "Pajisjet e mbështetura", value: "Phone, AirPods, Apple Watch", value_sq: "Telefon, AirPods, Apple Watch" },
    ] },

  { slug: "usbc-wired-earbuds", name: "EarPods (USB-C)", category: "audio", price: 10, icon: "🎧", image: "assets/images/usbc-wired-earbuds.png",
    desc: "Familiar comfort, now with USB-C.",
    long: "EarPods bring a classic acoustic design to a USB-C connector, with an inline remote and microphone for calls, volume, and music control right from the cord.",
    name_sq: "EarPods (USB-C)",
    desc_sq: "Rehati e njohur, tani me USB-C.",
    long_sq: "EarPods sjellin një dizajn akustik klasik në një konektor USB-C, me një kontroll dhe mikrofon në kabllo për thirrje, volum dhe kontroll të muzikës.",
    specs: [
      { label: "Connector", label_sq: "Konektori", value: "USB-C", value_sq: "USB-C" },
      { label: "Remote & mic", label_sq: "Kontrolli & mikrofoni", value: "Built-in", value_sq: "I integruar" },
    ] },
  { slug: "truebuds-pro-anc-earbuds", name: "AirPods Pro", category: "audio", price: 35, icon: "🎧", image: "assets/images/truebuds-pro-anc-earbuds.png", // PLACEHOLDER PRICE — confirm before going live
    desc: "Immersive sound. Next-level noise cancellation.",
    long: "AirPods Pro pair Active Noise Cancellation with Adaptive Transparency and a customizable silicone-tip fit, delivering an immersive listening experience that adjusts to you and the world around you.",
    name_sq: "AirPods Pro",
    desc_sq: "Tingull mbërthyes. Anulim zhurme i nivelit të ardhshëm.",
    long_sq: "AirPods Pro kombinojnë Anulimin Aktiv të Zhurmës me Transparencë Adaptive dhe një prehje të personalizueshme me majëza silikoni, për një përvojë dëgjimi mbërthyese që përshtatet me ju dhe mjedisin përreth.",
    specs: [
      { label: "Noise control", label_sq: "Kontrolli i zhurmës", value: "Active Noise Cancellation + Transparency", value_sq: "Anulim Aktiv i Zhurmës + Transparencë" },
      { label: "Fit", label_sq: "Prehja", value: "Multiple silicone tip sizes", value_sq: "Disa madhësi majëzash silikoni" },
    ] },
  { slug: "truebuds-wireless-earbuds", name: "AirPods (3rd generation)", category: "audio", price: 25, icon: "🎧", image: "assets/images/truebuds-wireless-earbuds.jpg", // PLACEHOLDER PRICE — confirm before going live
    desc: "Rich, spatial sound. All-new contoured design.",
    long: "AirPods deliver rich, immersive sound with spatial audio support in a contoured design built for all-day comfort, with quick access to your voice assistant and effortless pairing across your devices.",
    name_sq: "AirPods (brezi 3)",
    desc_sq: "Tingull i pasur, hapësinor. Dizajn krejt i ri i konturuar.",
    long_sq: "AirPods ofrojnë tingull të pasur dhe mbërthyes me mbështetje për audio hapësinor, në një dizajn të konturuar të ndërtuar për rehati gjatë gjithë ditës, me çiftim të lehtë me pajisjet tuaja.",
    specs: [
      { label: "Design", label_sq: "Dizajni", value: "Contoured, open-fit", value_sq: "I konturuar, prehje e hapur" },
      { label: "Audio", label_sq: "Audio", value: "Spatial audio support", value_sq: "Mbështetje audio hapësinor" },
    ] },
  { slug: "20w-usbc-wall-charger", name: "20W USB-C Power Adapter", category: "charging", price: 12, icon: "🔌", image: "assets/images/20w-usbc-wall-charger.jpg",
    desc: "Fast, efficient charging in a compact design.",
    long: "This compact adapter delivers fast, efficient charging for phones, earbud cases, and other USB-C devices from a single wall outlet — small enough to carry anywhere.",
    name_sq: "Adapter Rryme USB-C 20W",
    desc_sq: "Karikim i shpejtë dhe efiçient në një dizajn kompakt.",
    long_sq: "Ky adapter kompakt jep karikim të shpejtë dhe efiçient për telefona, kuti kufjesh dhe pajisje të tjera USB-C nga një prizë e vetme — mjaft i vogël për ta mbajtur kudo.",
    specs: [
      { label: "Output", label_sq: "Dalja", value: "20W USB-C", value_sq: "20W USB-C" },
      { label: "Plug type", label_sq: "Lloji i spinës", value: "EU two-pin", value_sq: "Dy-pin evropian" },
    ] },
  { slug: "earldom-20000mah-power-bank", name: "Earldom 20000mAh Power Bank", category: "charging", price: 25, icon: "🔋",
    image: "assets/images/earldom-20000mah-power-bank.jpg",
    desc: "High-capacity 20000mAh power bank with dual USB and USB-C output.",
    long: "This Earldom power bank packs 20000mAh of capacity with dual USB-A and USB-C output ports, an LED charge indicator, and enough juice for multiple full phone charges on the road.",
    name_sq: "Powerbank Earldom 20000mAh",
    desc_sq: "Powerbank me kapacitet të lartë 20000mAh, me dalje USB dhe USB-C.",
    long_sq: "Ky powerbank Earldom ka kapacitet 20000mAh me porta dalëse USB-A dhe USB-C, tregues LED për ngarkesën, dhe mjaft energji për disa karikime të plota të telefonit gjatë udhëtimit.",
    specs: [
      { label: "Capacity", label_sq: "Kapaciteti", value: "20000mAh", value_sq: "20000mAh" },
      { label: "Output ports", label_sq: "Portat dalëse", value: "USB-A x2, USB-C", value_sq: "USB-A x2, USB-C" },
    ] },
  { slug: "earldom-4in1-usbc-hub", name: "Earldom 4-in-1 USB-C Hub", category: "gaming-pc", price: 15, icon: "🔌",
    image: "assets/images/earldom-4in1-usbc-hub.png",
    desc: "USB-C hub expanding one port into three USB-A ports plus USB-C passthrough.",
    long: "This Earldom hub turns a single USB-C port into three USB-A 3.0 ports and a USB-C passthrough, letting you connect a mouse, keyboard, drive and more from one laptop port.",
    name_sq: "Hub Earldom 4-në-1 USB-C",
    desc_sq: "Hub USB-C që zgjeron një port në tre porta USB-A plus USB-C.",
    long_sq: "Ky hub Earldom shndërron një port të vetëm USB-C në tre porta USB-A 3.0 dhe një USB-C kalimtar, duke lejuar lidhjen e miut, tastierës, hard-diskut dhe më shumë nga një port i vetëm laptopi.",
    specs: [
      { label: "Host connector", label_sq: "Konektori kryesor", value: "USB-C", value_sq: "USB-C" },
      { label: "Ports", label_sq: "Portat", value: "USB-A x3, USB-C", value_sq: "USB-A x3, USB-C" },
    ] },
  { slug: "earldom-usbc-hub-cardreader", name: "Earldom USB-C Hub with Card Reader", category: "gaming-pc", price: 15, icon: "🔌",
    image: "assets/images/earldom-usbc-hub-cardreader.jpg",
    desc: "USB-C hub with USB-A, dual USB-C and a built-in SD/TF card reader.",
    long: "This Earldom hub adds a USB-A port, two USB-C ports and a built-in SD/TF card reader to a laptop, useful for offloading photos and video alongside everyday accessories.",
    name_sq: "Hub Earldom USB-C me Lexues Kartash",
    desc_sq: "Hub USB-C me USB-A, dy porta USB-C dhe lexues kartash SD/TF të integruar.",
    long_sq: "Ky hub Earldom shton një port USB-A, dy porta USB-C dhe një lexues kartash SD/TF të integruar në laptop, i dobishëm për transferimin e fotove dhe videove.",
    specs: [
      { label: "Host connector", label_sq: "Konektori kryesor", value: "USB-C", value_sq: "USB-C" },
      { label: "Card reader", label_sq: "Lexuesi i kartave", value: "SD / TF (microSD)", value_sq: "SD / TF (microSD)" },
    ] },
  { slug: "earldom-usbc-hub-hdmi4k", name: "Earldom USB-C Hub with 4K HDMI", category: "gaming-pc", price: 20, icon: "🔌",
    image: "assets/images/earldom-usbc-hub-hdmi4k.png",
    desc: "USB-C hub with three USB 3.0 ports, SD/TF reader and 4K HDMI output.",
    long: "This Earldom hub adds three USB 3.0 ports, an SD/TF card reader and a 4K-capable HDMI output to a single USB-C port, turning a laptop into a mini desktop setup with an external monitor.",
    name_sq: "Hub Earldom USB-C me HDMI 4K",
    desc_sq: "Hub USB-C me tre porta USB 3.0, lexues SD/TF dhe dalje HDMI 4K.",
    long_sq: "Ky hub Earldom shton tre porta USB 3.0, një lexues kartash SD/TF dhe një dalje HDMI me mbështetje 4K nga një port i vetëm USB-C, duke e kthyer laptopin në një stacion pune me monitor të jashtëm.",
    specs: [
      { label: "Ports", label_sq: "Portat", value: "USB 3.0 x3, SD/TF, HDMI", value_sq: "USB 3.0 x3, SD/TF, HDMI" },
      { label: "Video output", label_sq: "Dalja video", value: "HDMI up to 4K", value_sq: "HDMI deri në 4K" },
    ] },

  { slug: "magnetic-wireless-power-bank", name: "Apple MagSafe Power Bank", category: "charging", price: 20, icon: "🔋", image: "assets/images/magnetic-wireless-power-bank-front.jpg",
    images: ["assets/images/magnetic-wireless-power-bank.jpg"],
    variant_label: "Capacity", variant_label_sq: "Kapaciteti",
    variants: [ // PLACEHOLDER PRICES — confirm before going live
      { id: "5000mah", label: "5000mAh", price: 20 },
      { id: "10000mah", label: "10000mAh", price: 30 },
    ],
    desc: "Snap-on magnetic battery pack that charges your phone wirelessly.",
    long: "This compact battery pack snaps magnetically onto the back of a MagSafe-compatible phone and charges it wirelessly, so you can keep using your phone while it tops up. A USB-C port recharges the pack itself.",
    name_sq: "Apple MagSafe Powerbank",
    desc_sq: "Bateri magnetike që ngjitet pas telefonit dhe e karikon pa kabllo.",
    long_sq: "Kjo bateri kompakte ngjitet magnetikisht në pjesën e pasme të një telefoni të përputhshëm me MagSafe dhe e karikon pa kabllo, kështu që mund ta përdorni telefonin ndërsa karikohet. Një port USB-C shërben për të karikuar vetë baterinë.",
    specs: [
      { label: "Capacity", label_sq: "Kapaciteti", value: "5000mAh or 10000mAh", value_sq: "5000mAh ose 10000mAh" },
      { label: "Charging", label_sq: "Karikimi", value: "Magnetic wireless", value_sq: "Magnetik pa kabllo" },
      { label: "Input port", label_sq: "Porti hyrës", value: "USB-C", value_sq: "USB-C" },
    ] },
  { slug: "45w-usbc-adapter-with-cable", name: "Samsung USB-C Adapter 45W", category: "charging", price: 25, icon: "🔌", image: "assets/images/45w-usbc-adapter-with-cable.jpg",
    desc: "45W super fast wall charger with a USB-C to USB-C cable included.",
    long: "This 45W adapter delivers super fast charging to phones, tablets and other USB-C devices, and comes boxed with a USB-C to USB-C cable so it's ready to use straight away.",
    name_sq: "Adapter Samsung USB-C 45W",
    desc_sq: "Karikues muri 45W super i shpejtë, me kabllo USB-C në USB-C të përfshirë.",
    long_sq: "Ky adapter 45W jep karikim super të shpejtë për telefona, tableta dhe pajisje të tjera USB-C, dhe vjen në kuti me një kabllo USB-C në USB-C, gati për përdorim menjëherë.",
    specs: [
      { label: "Output", label_sq: "Dalja", value: "45W USB-C", value_sq: "45W USB-C" },
      { label: "In the box", label_sq: "Në kuti", value: "Adapter + USB-C to USB-C cable", value_sq: "Adapter + kabllo USB-C në USB-C" },
      { label: "Plug type", label_sq: "Lloji i spinës", value: "EU two-pin", value_sq: "Dy-pin evropian" },
    ] },
  { slug: "25w-usbc-adapter-with-cable", name: "Samsung USB-C Adapter", category: "charging", price: 20, icon: "🔌", image: "assets/images/25w-usbc-adapter-with-cable.jpg",
    desc: "25W fast wall charger with a USB-C to USB-C cable included.",
    long: "This 25W PD adapter fast-charges phones and other USB-C devices, and comes boxed with a USB-C to USB-C cable. Available in black or white.",
    name_sq: "Adapter Samsung USB-C",
    desc_sq: "Karikues muri 25W i shpejtë, me kabllo USB-C në USB-C të përfshirë.",
    long_sq: "Ky adapter PD 25W karikon shpejt telefonat dhe pajisjet e tjera USB-C, dhe vjen në kuti me një kabllo USB-C në USB-C. I disponueshëm në ngjyrë të zezë ose të bardhë.",
    specs: [
      { label: "Output", label_sq: "Dalja", value: "25W USB-C PD", value_sq: "25W USB-C PD" },
      { label: "In the box", label_sq: "Në kuti", value: "Adapter + USB-C to USB-C cable", value_sq: "Adapter + kabllo USB-C në USB-C" },
      { label: "Colours", label_sq: "Ngjyrat", value: "Black, White", value_sq: "E zezë, E bardhë" },
    ] },
  { slug: "25w-usbc-pd-adapter", name: "Samsung USB-C Adapter 25W (head only)", category: "charging", price: 13, icon: "🔌", image: "assets/images/25w-usbc-pd-adapter.jpg",
    desc: "Compact 25W fast wall charger with a single USB-C port.",
    long: "This compact 25W PD adapter fast-charges phones, earbud cases and other USB-C devices from one wall outlet. Adapter only — use it with your own USB-C cable. Available in black or white.",
    name_sq: "Adapter Samsung USB-C 25W (vetëm koka)",
    desc_sq: "Karikues muri kompakt 25W i shpejtë, me një port USB-C.",
    long_sq: "Ky adapter kompakt PD 25W karikon shpejt telefona, kuti kufjesh dhe pajisje të tjera USB-C nga një prizë e vetme. Vetëm adapteri — përdoreni me kabllon tuaj USB-C. I disponueshëm në ngjyrë të zezë ose të bardhë.",
    specs: [
      { label: "Output", label_sq: "Dalja", value: "25W USB-C PD", value_sq: "25W USB-C PD" },
      { label: "Colours", label_sq: "Ngjyrat", value: "Black, White", value_sq: "E zezë, E bardhë" },
      { label: "Plug type", label_sq: "Lloji i spinës", value: "EU two-pin", value_sq: "Dy-pin evropian" },
    ] },
  { slug: "samsung-usbc-cable", name: "Samsung USB-C to USB-C Cable", category: "charging", price: 7, icon: "🔌", image: "assets/images/samsung-usbc-cable.jpg",
    desc: "USB-C to USB-C cable for fast charging and data transfer.",
    long: "This Samsung USB Type-C to Type-C cable supports fast charging and data transfer between phones, tablets, laptops and USB-C chargers. A perfect match for the Samsung 25W and 45W adapters. Available in black or white.",
    name_sq: "Kabllo Samsung USB-C në USB-C",
    desc_sq: "Kabllo USB-C në USB-C për karikim të shpejtë dhe transferim të të dhënave.",
    long_sq: "Kjo kabllo Samsung USB Type-C në Type-C mbështet karikim të shpejtë dhe transferim të të dhënave mes telefonave, tabletave, laptopëve dhe karikuesve USB-C. E përshtatshme për adapterët Samsung 25W dhe 45W. E disponueshme në ngjyrë të zezë ose të bardhë.",
    specs: [
      { label: "Connectors", label_sq: "Konektorët", value: "USB-C to USB-C", value_sq: "USB-C në USB-C" },
      { label: "Colours", label_sq: "Ngjyrat", value: "Black, White", value_sq: "E zezë, E bardhë" },
    ] },

  { slug: "floral-case-pink", name: "Pink Floral Phone Case", category: "cases", price: 12, icon: "🛡️", image: "assets/images/floral-case-pink.jpg",
    variant_label: "iPhone model", variant_label_sq: "Modeli i iPhone", variants: iphoneVariants(12), // PLACEHOLDER PRICE — confirm before going live
    desc: "Soft pink case with a white magnolia print.",
    long: "A slim protective case in soft pink with a delicate white magnolia print, raised edges around the camera and a soft-touch lining inside to keep the back of your phone scratch-free.",
    name_sq: "Mbrojtëse Rozë me Lule",
    desc_sq: "Mbrojtëse rozë e butë me print manjolash të bardha.",
    long_sq: "Mbrojtëse e hollë në ngjyrë rozë të butë me print delikat manjolash të bardha, skaje të ngritura rreth kamerës dhe veshje të butë brenda që e mban pjesën e pasme të telefonit pa gërvishtje.",
    specs: [
      { label: "Colour", label_sq: "Ngjyra", value: "Pink with floral print", value_sq: "Rozë me print lulesh" },
      { label: "Inner lining", label_sq: "Veshja e brendshme", value: "Soft-touch", value_sq: "E butë" },
    ] },
  { slug: "floral-case-black", name: "Black Floral Phone Case", category: "cases", price: 12, icon: "🛡️", image: "assets/images/floral-case-black.jpg",
    variant_label: "iPhone model", variant_label_sq: "Modeli i iPhone", variants: iphoneVariants(12), // PLACEHOLDER PRICE — confirm before going live
    desc: "Black case with a white and pink magnolia print.",
    long: "A slim protective case in black with a white and pink magnolia print, raised edges around the camera and a soft lining inside to protect the back of your phone.",
    name_sq: "Mbrojtëse e Zezë me Lule",
    desc_sq: "Mbrojtëse e zezë me print manjolash të bardha dhe rozë.",
    long_sq: "Mbrojtëse e hollë në ngjyrë të zezë me print manjolash të bardha dhe rozë, skaje të ngritura rreth kamerës dhe veshje të butë brenda për të mbrojtur pjesën e pasme të telefonit.",
    specs: [
      { label: "Colour", label_sq: "Ngjyra", value: "Black with floral print", value_sq: "E zezë me print lulesh" },
      { label: "Inner lining", label_sq: "Veshja e brendshme", value: "Soft-touch", value_sq: "E butë" },
    ] },
  { slug: "glitter-case-pink", name: "Pink Rhinestone Glitter Case", category: "cases", price: 12, icon: "🛡️", image: "assets/images/glitter-case-pink.jpg",
    variant_label: "iPhone model", variant_label_sq: "Modeli i iPhone", variants: iphoneVariants(12),
    desc: "Sparkling pink case covered in rhinestones.",
    long: "This eye-catching case is covered in pink and clear rhinestones in a quilted pattern, with a soft pink bumper frame around the edges and a soft lining inside.",
    name_sq: "Mbrojtëse Rozë me Xixa",
    desc_sq: "Mbrojtëse rozë e shndritshme e mbuluar me gurë xixëllues.",
    long_sq: "Kjo mbrojtëse tërheqëse është e mbuluar me gurë xixëllues rozë dhe transparentë në një model të kapitonuar, me një kornizë të butë rozë rreth skajeve dhe veshje të butë brenda.",
    specs: [
      { label: "Finish", label_sq: "Përfundimi", value: "Rhinestone glitter", value_sq: "Gurë xixëllues" },
      { label: "Colour", label_sq: "Ngjyra", value: "Pink", value_sq: "Rozë" },
    ] },
  { slug: "floral-mirror-case-purple", name: "Purple Floral Mirror Case", category: "cases", price: 12, icon: "🛡️", image: "assets/images/floral-mirror-case-purple.jpg",
    variant_label: "iPhone model", variant_label_sq: "Modeli i iPhone", variants: iphoneVariants(12), // PLACEHOLDER PRICE — confirm before going live
    desc: "Glossy mirror-finish case with a purple floral print.",
    long: "A glossy case with a reflective mirror finish under a rich purple and pink floral print, framed by a black bumper with a raised camera surround.",
    name_sq: "Mbrojtëse Pasqyrë me Lule Vjollcë",
    desc_sq: "Mbrojtëse me shkëlqim pasqyre dhe print lulesh vjollcë.",
    long_sq: "Mbrojtëse me shkëlqim dhe përfundim pasqyre reflektuese nën një print të pasur lulesh vjollcë dhe rozë, me kornizë të zezë dhe mbrojtje të ngritur rreth kamerës.",
    specs: [
      { label: "Finish", label_sq: "Përfundimi", value: "Mirror with floral print", value_sq: "Pasqyrë me print lulesh" },
      { label: "Frame", label_sq: "Korniza", value: "Black", value_sq: "E zezë" },
    ] },
  { slug: "floral-print-case-black-white", name: "Black & White Floral Print Case", category: "cases", price: 12, icon: "🛡️", image: "assets/images/floral-print-case-black-white.jpg",
    variant_label: "iPhone model", variant_label_sq: "Modeli i iPhone", variants: iphoneVariants(12), // PLACEHOLDER PRICE — confirm before going live
    desc: "Monochrome floral print case with a bold stripe.",
    long: "A slim case with an all-over black and white floral print and a bold striped band across the back, with raised edges around the camera.",
    name_sq: "Mbrojtëse bardh e zi me Lule",
    desc_sq: "Mbrojtëse me print lulesh bardh e zi dhe një shirit të theksuar.",
    long_sq: "Mbrojtëse e hollë me print lulesh bardh e zi në të gjithë sipërfaqen dhe një shirit të theksuar përgjatë pjesës së pasme, me skaje të ngritura rreth kamerës.",
    specs: [
      { label: "Colour", label_sq: "Ngjyra", value: "Black & white floral", value_sq: "Lule bardh e zi" },
    ] },
  { slug: "rimova-case", name: "Rimova Case", category: "cases", price: 20, icon: "🛡️", image: "assets/images/rimova-case-silver.jpg",
    variant_label: "Color", variant_label_sq: "Ngjyra",
    variants: [
      { id: "silver", label: "Silver", price: 20, image: "assets/images/rimova-case-silver.jpg" },
      { id: "blue", label: "Blue", price: 20, image: "assets/images/rimova-case-blue.jpg" },
      { id: "pink", label: "Pink", price: 20 },
      { id: "black", label: "Black", price: 20, image: "assets/images/rimova-case-black.jpg" },
      { id: "orange", label: "Orange", price: 20 },
    ],
    variant2_label: "iPhone Model", variant2_label_sq: "Modeli i iPhone",
    variants2: [
      { id: "iphone-17", label: "iPhone 17" },
      { id: "iphone-17-pro", label: "iPhone 17 Pro" },
      { id: "iphone-17-pro-max", label: "iPhone 17 Pro Max" },
      { id: "iphone-18", label: "iPhone 18" },
      { id: "iphone-18-pro", label: "iPhone 18 Pro" },
      { id: "iphone-18-pro-max", label: "iPhone 18 Pro Max" },
    ],
    desc: "Ribbed hardshell case with a grooved, suitcase-style finish.",
    long: "A protective hardshell case with a distinctive grooved, ribbed finish inspired by classic aluminum suitcase design. Raised edges guard the camera and screen, with a soft-touch feel and a clean logo embossed near the base. Available in five colors.",
    name_sq: "Mbrojtëse Rimova",
    desc_sq: "Mbrojtëse e fortë me finiturë të rrudhosur, në stil valixheje.",
    long_sq: "Një mbrojtëse e fortë me një finiturë dalluese të rrudhosur, e frymëzuar nga dizajni klasik i valixheve prej alumini. Skajet e ngritura mbrojnë kamerën dhe ekranin, me një ndjesi të butë prekjeje dhe një logo të gdhendur pranë bazës. E disponueshme në pesë ngjyra.",
    specs: [
      { label: "Finish", label_sq: "Përfundimi", value: "Ribbed hardshell", value_sq: "E fortë, e rrudhosur" },
      { label: "Colors available", label_sq: "Ngjyrat e disponueshme", value: "Silver, Blue, Pink, Black, Orange", value_sq: "Argjend, Blu, Rozë, E zezë, Portokalli" },
    ] },
];

function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}

// Cart keys are "slug", "slug|variantId", or for products with a second
// variant dimension, "slug|variantId|variant2Id".
function getCartItem(key) {
  const [slug, variantId, variant2Id] = key.split("|");
  const product = getProductBySlug(slug);
  if (!product) return null;
  const variant = product.variants ? product.variants.find((v) => v.id === variantId) : null;
  if (product.variants && !variant) return null;
  const variant2 = product.variants2 ? product.variants2.find((v) => v.id === variant2Id) : null;
  if (product.variants2 && !variant2) return null;
  const variantLabels = [variant, variant2].filter(Boolean).map((v) => v.label);
  return {
    product,
    name: localizedName(product) + (variantLabels.length ? ` (${variantLabels.join(", ")})` : ""),
    price: variant ? variant.price : product.price,
  };
}

function getCategoryBySlug(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}

function getRelatedProducts(product, limit) {
  return PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, limit);
}
