/**
 * RE:WASTE AI — canonical dataset.
 *
 * This module is deliberately isomorphic: it is imported by `.astro`
 * frontmatter (build time, renders the seeded HTML) and by the client
 * `<script>` bundles (runtime state). One module, one instance, no
 * duplicated literals between markup and behaviour.
 */

export type Category = "recyclable" | "organic" | "landfill" | "e-waste" | "hazardous";

export interface WasteItem {
	id: string;
	/** Quick-key button label. */
	label: string;
	/** Monospace material code rendered inside the quick-key tile. */
	code: string;
	category: Category;
	categoryLabel: string;
	/** Full identification payload returned by the vision engine. */
	itemName: string;
	material: string;
	recycleCode: string;
	/** Exact bin / municipal collection pathway. */
	sortDestination: string;
	pathwayDetail: string;
	handlingSteps: string[];
	upcycle: string;
	/** Kilograms of CO2 avoided by routing this item correctly. */
	carbonOffset: number;
	massKg: number;
	confidence: number;
	contaminationRisk: "low" | "medium" | "high";
	decompositionYears: number;
}

export interface Challenge {
	id: string;
	label: string;
	description: string;
	/** Points awarded on completion. */
	points: number;
	/** Telemetry delta applied on completion. */
	impact: {
		itemsDiverted: number;
		carbonKg: number;
		streakDays: number;
	};
	category: Category;
	streak: boolean;
}

export interface Achievement {
	id: string;
	label: string;
	description: string;
	glyph: string;
	/** Key into the telemetry counters used to evaluate the badge. */
	metric:
		| "recyclable"
		| "organic"
		| "eWaste"
		| "hazardous"
		| "itemsProcessed"
		| "diversionRate"
		| "carbonSaved"
		| "streak"
		| "points";
	threshold: number;
	/** Formatter for the progress readout. */
	unit: "count" | "percent" | "kg";
}

export interface BinSpec {
	id: string;
	label: string;
	shortLabel: string;
	/** Hex used for the swatch and the capacity meter. */
	swatch: string;
	pathway: string;
	capacityPct: number;
	collectionDay: string;
	accept: string[];
	reject: string[];
	note: string;
}

export interface TelemetrySnapshot {
	itemsProcessed: number;
	landfill: number;
	carbonSaved: number;
	streak: number;
	points: number;
	challenges: Record<string, boolean>;
	categoryCounts: Record<Category, number>;
}

export const CATEGORY_META: Record<
	Category,
	{ label: string; varName: string; hex: string; recovery: string }
> = {
	recyclable: {
		label: "Recyclable",
		varName: "--color-cat-recyclable",
		hex: "#00ff66",
		recovery: "Closed-loop recovery",
	},
	organic: {
		label: "Organic / Compost",
		varName: "--color-cat-organic",
		hex: "#4ade80",
		recovery: "Biological recovery",
	},
	landfill: {
		label: "Landfill / Trash",
		varName: "--color-cat-landfill",
		hex: "#f87171",
		recovery: "No recovery pathway",
	},
	"e-waste": {
		label: "E-Waste",
		varName: "--color-cat-ewaste",
		hex: "#fbbf24",
		recovery: "Specialist recovery",
	},
	hazardous: {
		label: "Hazardous",
		varName: "--color-cat-hazardous",
		hex: "#c084fc",
		recovery: "Controlled disposal",
	},
};

/** Every material the neural vision engine can currently classify. */
export const WASTE_ITEMS: WasteItem[] = [
	{
		id: "hdpe-bottle",
		label: "Plastic Bottle",
		code: "HDPE",
		category: "recyclable",
		categoryLabel: "Recyclable",
		itemName: "High-Density Polyethylene Bottle",
		material: "HDPE · single-wall blow-moulded",
		recycleCode: "♳ 2 / 5",
		sortDestination: "Blue Bin — Mixed Recyclables (Curbside)",
		pathwayDetail:
			"Acceptance window: every Thursday 06:00. Route to MRF line 3, baled as PET-adjacent flake.",
		handlingSteps: [
			"Empty and rinse all remaining liquid",
			"Crush the bottle flat to cut collection volume",
			"Keep the cap attached — caps are too small to sort alone",
		],
		upcycle:
			"Shred into flake and commission a local 3D-print farm — 1 bottle yields ~40 g of filament for a 20 h bench spool.",
		carbonOffset: 0.24,
		massKg: 0.032,
		confidence: 97.4,
		contaminationRisk: "low",
		decompositionYears: 450,
	},
	{
		id: "apple-core",
		label: "Apple Core",
		code: "ORG",
		category: "organic",
		categoryLabel: "Organic / Compost",
		itemName: "Fruit Organic Waste — Apple Core, Composte Stage 1",
		material: "Cellulose + malic acid, moisture 84%",
		recycleCode: "BIO",
		sortDestination: "Green Bin — Organics (Curbside or Drop-off)",
		pathwayDetail:
			"Acceptance window: Tuesdays and Fridays. Aerated windrow 3, 21-day thermophilic cycle at 58 °C.",
		handlingSteps: [
			"Strip any produce-sticker or wax liner",
			"Chop into < 5 cm pieces to accelerate breakdown",
			"Cap with brown carbon material — leaves, coffee filter, shredded paper",
		],
		upcycle:
			"Feed a countertop vermicompost bin — one core sustains 50 red wigglers for roughly 7 days of bedding.",
		carbonOffset: 0.08,
		massKg: 0.091,
		confidence: 95.1,
		contaminationRisk: "low",
		decompositionYears: 1,
	},
	{
		id: "corrugated-box",
		label: "Cardboard Box",
		code: "PAP",
		category: "recyclable",
		categoryLabel: "Recyclable",
		itemName: "Corrugated Cardboard — Single Wall, B-Flute",
		material: "Kraft liner, 32 ECT",
		recycleCode: "PAP 20/21",
		sortDestination: "Blue Bin — Mixed Paper & Cardboard (Curbside)",
		pathwayDetail:
			"Acceptance window: every Thursday 06:00. Pulped to OCC grade on the municipal line.",
		handlingSteps: [
			"Flatten completely and remove all tape, labels and staples",
			"Keep it dry — a single wet box can reject 40 kg of the batch",
			"Bundle under 0.5 m² if it will not fit in the bin",
		],
		upcycle:
			"Layer-sheet as a weed barrier and moisture mat under garden beds — one box covers ~0.6 m² of bed for a season.",
		carbonOffset: 0.12,
		massKg: 0.28,
		confidence: 96.8,
		contaminationRisk: "low",
		decompositionYears: 5,
	},
	{
		id: "li-ion-phone",
		label: "Old Smartphone",
		code: "LI-ION",
		category: "e-waste",
		categoryLabel: "E-Waste",
		itemName: "Lithium-Ion Handset — Multi-Metal, Integrated Cell",
		material: "LiCoO₂ cell, Al, Cu, Au, Ag, glass",
		recycleCode: "WEEE 4",
		sortDestination: "Orange Bin — Certified E-Waste Drop-off",
		pathwayDetail:
			"Municipal depot, Bay 7. Intake limit 5 devices per household per month. Hydrometallurgical recovery.",
		handlingSteps: [
			"Factory-reset the device and physically remove the SIM and SD cards",
			"Never place lithium cells in curbside recycling — puncture fires",
			"Drop at a certified collector within 30 days of retirement",
		],
		upcycle:
			"Urban mining yield per device: 0.034 g Au, 0.34 g Ag, 15.2 g Cu and 6.5 g Co returned to smelting.",
		carbonOffset: 1.82,
		massKg: 0.19,
		confidence: 93.2,
		contaminationRisk: "medium",
		decompositionYears: 1000,
	},
	{
		id: "alkaline-aa",
		label: "AA Battery",
		code: "ALKLN",
		category: "hazardous",
		categoryLabel: "Hazardous",
		itemName: "Alkaline AA Cell — Manganese Dioxide, Mercury-Free",
		material: "Zn/MnO₂, steel can, KOH gel",
		recycleCode: "UN 3480",
		sortDestination: "Red Bin — Household Hazardous Waste Depot",
		pathwayDetail:
			"HHW facility, Room 2. Requires appointment. Batteries are logged by serial into the national register.",
		handlingSteps: [
			"Tape both terminals with clear non-conductive tape",
			"Store upright in a rigid container until drop-off",
			"Never incinerate or mechanically crush — alkaline gel leaks under pressure",
		],
		upcycle:
			"HHW reclamation returns 92% of zinc and manganese to alloy stock; the steel can returns as rebar offcut.",
		carbonOffset: 0.03,
		massKg: 0.031,
		confidence: 91.5,
		contaminationRisk: "high",
		decompositionYears: 100,
	},
	{
		id: "paper-cup",
		label: "Coffee Cup",
		code: "PPR",
		category: "landfill",
		categoryLabel: "Landfill / Trash",
		itemName: "Polymer-Lined Paper Cup — 8 oz, PE-Lined",
		material: "Paper board + PE lining, HDPE rim",
		recycleCode: "CU 20",
		sortDestination: "Grey Bin — Residual Waste",
		pathwayDetail:
			"No curbside pathway. Fibre recovery requires the PE lining to be delaminated first, which municipal MRFs cannot do.",
		handlingSteps: [
			"Liquid and any plastic lid go to the grey bin separately",
			"Do not shred — shredded fibre is unrecoverable in the MRF",
			"Use a reusable cup where the workflow allows it",
		],
		upcycle:
			"No circular route at municipal scale — the only responsible reduction is avoided purchase, not recovery.",
		carbonOffset: 0.02,
		massKg: 0.011,
		confidence: 89.7,
		contaminationRisk: "high",
		decompositionYears: 20,
	},
	{
		id: "glass-jar",
		label: "Glass Jar",
		code: "GLS",
		category: "recyclable",
		categoryLabel: "Recyclable",
		itemName: "Flint Glass Preserve Jar — 340 ml",
		material: "Soda-lime flint glass, steel closure",
		recycleCode: "GL 70",
		sortDestination: "Green Bin — Glass & Ceramics (Depot Drop-off)",
		pathwayDetail:
			"Colour-sorted at the depot. Flint goes to the container mix; amber and green are routed to separate cullet streams.",
		handlingSteps: [
			"Remove the steel closure — it contaminates the cullet furnace",
			"Rinse to clear any residue before drop-off",
			"Do not break; intact containers sort by optical reader",
		],
		upcycle:
			"Blended into flint cullet — replacing 30% of raw batch sand and cutting furnace energy demand by ~18%.",
		carbonOffset: 0.11,
		massKg: 0.245,
		confidence: 95.9,
		contaminationRisk: "low",
		decompositionYears: 4000,
	},
	{
		id: "foam-tray",
		label: "Foam Tray",
		code: "EPS",
		category: "landfill",
		categoryLabel: "Landfill / Trash",
		itemName: "Expanded Polystyrene Takeout Tray",
		material: "EPS, flame-retardant additive",
		recycleCode: "PS 6",
		sortDestination: "Grey Bin — Residual Waste (Depot Drop-off if available)",
		pathwayDetail:
			"Only the municipal depot accepts EPS, by volume appointment. Curbside crews are explicitly instructed not to collect it.",
		handlingSteps: [
			"Separate all food and liner film first",
			"Compress to a minimum 50% volume before transport if drop-off is possible",
			"Never use polystyrene foam for hot food storage",
		],
		upcycle:
			"Block-moulded into garden planter inserts and packing peanuts — the only high-volume reuse route is architectural foam.",
		carbonOffset: 0.01,
		massKg: 0.018,
		confidence: 88.3,
		contaminationRisk: "medium",
		decompositionYears: 1000,
	},
];

/** Terminal boot sequence, cumulative ms offsets. */
export const BOOT_SEQUENCE: ReadonlyArray<{ at: number; line: string; kind: "info" | "ok" }> = [
	{ at: 0, line: "Initializing Neural Vision Network...", kind: "info" },
	{ at: 260, line: "Loading Material Spectral Database (v4.12.7)", kind: "info" },
	{ at: 620, line: "Calibrating density estimation layer", kind: "info" },
	{ at: 940, line: "Analyzing Material Density...", kind: "info" },
	{ at: 1320, line: "Parsing Structural Composition...", kind: "info" },
	{ at: 1700, line: "Cross-referencing municipal sorting guidelines", kind: "info" },
	{ at: 2060, line: "Computing circular economy metrics", kind: "info" },
	{ at: 2400, line: "Scan complete — payload resolved", kind: "ok" },
];

export const CHALLENGES: Challenge[] = [
	{
		id: "zero-plastic-monday",
		label: "Zero-Plastic Monday",
		description: "Avoid all single-use plastic for a 24-hour cycle",
		points: 25,
		impact: { itemsDiverted: 12, carbonKg: 0.9, streakDays: 1 },
		category: "recyclable",
		streak: true,
	},
	{
		id: "meatless-week",
		label: "Meatless Week",
		description: "Plant-forward meals across 7 consecutive days",
		points: 50,
		impact: { itemsDiverted: 8, carbonKg: 8.4, streakDays: 7 },
		category: "organic",
		streak: true,
	},
	{
		id: "paperless-office",
		label: "Paperless Office",
		description: "Convert one full work week to digital-only documents",
		points: 35,
		impact: { itemsDiverted: 45, carbonKg: 1.6, streakDays: 5 },
		category: "recyclable",
		streak: false,
	},
	{
		id: "e-waste-drive",
		label: "E-Waste Drive",
		description: "Route 5+ retired electronics to a certified collector",
		points: 40,
		impact: { itemsDiverted: 5, carbonKg: 2.1, streakDays: 2 },
		category: "e-waste",
		streak: false,
	},
	{
		id: "compost-champion",
		label: "Compost Champion",
		description: "Divert 100% of household food waste for 3 days",
		points: 30,
		impact: { itemsDiverted: 18, carbonKg: 0.4, streakDays: 3 },
		category: "organic",
		streak: false,
	},
	{
		id: "hazard-audit",
		label: "Hazard Audit",
		description: "Tape, isolate and book a drop-off for every battery on site",
		points: 45,
		impact: { itemsDiverted: 7, carbonKg: 0.2, streakDays: 0 },
		category: "hazardous",
		streak: false,
	},
];

export const ACHIEVEMENTS: Achievement[] = [
	{
		id: "plastic-warrior",
		label: "Plastic Warrior",
		description: "Route 250 plastic items through recovery",
		glyph: "PET",
		metric: "recyclable",
		threshold: 250,
		unit: "count",
	},
	{
		id: "compost-tactician",
		label: "Compost Tactician",
		description: "Divert 300 organic items to biological recovery",
		glyph: "ORG",
		metric: "organic",
		threshold: 300,
		unit: "count",
	},
	{
		id: "ewaste-specialist",
		label: "E-Waste Specialist",
		description: "Recover 40 devices through specialist collection",
		glyph: "WEE",
		metric: "eWaste",
		threshold: 40,
		unit: "count",
	},
	{
		id: "hazard-auditor",
		label: "Hazard Auditor",
		description: "Route 25 hazardous items to controlled disposal",
		glyph: "HHW",
		metric: "hazardous",
		threshold: 25,
		unit: "count",
	},
	{
		id: "carbon-neutral",
		label: "Carbon Neutral",
		description: "Avoid 250 kg of CO₂ through correct routing",
		glyph: "CO₂",
		metric: "carbonSaved",
		threshold: 250,
		unit: "kg",
	},
	{
		id: "zero-waste-hero",
		label: "Zero-Waste Hero",
		description: "Hold landfill diversion at or above 90%",
		glyph: "90%",
		metric: "diversionRate",
		threshold: 90,
		unit: "percent",
	},
	{
		id: "streak-architect",
		label: "Streak Architect",
		description: "Maintain a 21-day active sorting streak",
		glyph: "21D",
		metric: "streak",
		threshold: 21,
		unit: "count",
	},
	{
		id: "grid-operator",
		label: "Grid Operator",
		description: "Process 1500 items through the vision engine",
		glyph: "1.5K",
		metric: "itemsProcessed",
		threshold: 1500,
		unit: "count",
	},
];

export const BINS: BinSpec[] = [
	{
		id: "blue",
		label: "Mixed Recyclables",
		shortLabel: "Blue",
		swatch: "#3b82f6",
		pathway: "Curbside — Thursday 06:00",
		capacityPct: 78,
		collectionDay: "Thu",
		accept: ["PET, HDPE, LDPE containers", "Mixed paper and cardboard", "Empty aluminium cans", "Rinsed glass flint containers"],
		reject: ["Liquids or residue", "Bagged recyclables", "Polystyrene foam", "Ceramic and mirror glass"],
		note: "Loose items only. A single bagged batch is rejected whole at the MRF.",
	},
	{
		id: "green",
		label: "Organic & Compost",
		shortLabel: "Green",
		swatch: "#4ade80",
		pathway: "Curbside — Tue / Fri",
		capacityPct: 54,
		collectionDay: "Tue",
		accept: ["Fruit and vegetable scraps", "Coffee grounds and paper filters", "Tea leaves and herb stalks", "Paper napkins and soiled food-safe fibre"],
		reject: ["Produce stickers and wax liners", "Biodegradable bags", "Dairy and oily foods", "Animal products"],
		note: "Cap browns over greens. An uncovered green bin draws vectors in 48 h.",
	},
	{
		id: "grey",
		label: "Residual Waste",
		shortLabel: "Grey",
		swatch: "#a3a3a3",
		pathway: "Curbside — Mon 06:00",
		capacityPct: 91,
		collectionDay: "Mon",
		accept: ["Coated paper cups", "Compostable plastics", "Broken ceramics", "Sanitary and medical waste"],
		reject: ["Anything recyclable", "Household batteries", "Sharp glass edges", "Construction rubble"],
		note: "At 91% capacity. Overfilling blocks the pavement and the lorry is refused.",
	},
	{
		id: "orange",
		label: "E-Waste Drop-off",
		shortLabel: "Orange",
		swatch: "#fbbf24",
		pathway: "Municipal depot — Bay 7, by appointment",
		capacityPct: 42,
		collectionDay: "Sat",
		accept: ["Phones, tablets, laptops", "Chargers, cables and adapters", "Printers and scanners", "Small kitchen appliances"],
		reject: ["Undamaged batteries", "CRT displays", "Fridges and freezers", "Smoke detectors"],
		note: "Max 5 devices per household per month. Intakes are logged by serial.",
	},
	{
		id: "red",
		label: "Hazardous Waste",
		shortLabel: "Red",
		swatch: "#c084fc",
		pathway: "HHW depot — Room 2, appointment only",
		capacityPct: 23,
		collectionDay: "Wed",
		accept: ["Alkaline and rechargeable cells", "Solvent-based cleaners", "Aerosol cans", "Fluorescent tubes and CFL bulbs"],
		reject: ["Expanded polystyrene", "Sharp-edged glass", "Commercial chemical drums", "Medical sharps"],
		note: "Terminals taped, cells bagged, container rigid. Never commingle with grey waste.",
	},
];

/** 7-day diversion-rate series used by the sparkline (%). */
export const DIVERSION_TREND: number[] = [74.1, 75.8, 76.4, 77.2, 76.9, 77.8, 78.3];

/** 14-day throughput series used by the bar chart (items/day). */
export const THROUGHPUT_TREND: number[] = [31, 38, 27, 44, 51, 29, 47, 40, 36, 42, 33, 49, 38, 42];

/**
 * Seeded telemetry. Renders server-side and rehydrates into the client store
 * so the first paint is identical and nothing flickers on load.
 */
export const SEED_TELEMETRY: TelemetrySnapshot = {
	itemsProcessed: 1247,
	landfill: 271,
	carbonSaved: 247.6,
	streak: 12,
	points: 640,
	categoryCounts: {
		recyclable: 574,
		organic: 348,
		landfill: 271,
		"e-waste": 44,
		hazardous: 10,
	},
	challenges: {
		"zero-plastic-monday": true,
		"e-waste-drive": true,
		"meatless-week": false,
		"paperless-office": false,
		"compost-champion": false,
		"hazard-audit": false,
	},
};

/** Seeded derived figures, computed once so markup and store cannot drift. */
export const SEED_DIVERSION = (SEED_TELEMETRY.itemsProcessed - SEED_TELEMETRY.landfill) / SEED_TELEMETRY.itemsProcessed;

/** 0.404 kg CO2 per passenger mile, for the equivalence readouts. */
export const CO2_PER_PASSENGER_MILE = 0.404;

/** Tree-sequestration equivalence: one mature urban canopy tree absorbs ~21.77 kg CO2/yr. */
export const CO2_PER_TREE_YEAR = 21.77;

export const CATEGORY_ORDER: Category[] = [
	"recyclable",
	"organic",
	"e-waste",
	"hazardous",
	"landfill",
];

export const DAY_LABELS: string[] = ["M", "T", "W", "T", "F", "S", "S"];
