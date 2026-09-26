/**
 * RE:WASTE AI — client telemetry store.
 *
 * A single mutable snapshot plus a subscriber list. Both the scanner and the
 * dashboard import this module, so Vite emits it once and every panel reads
 * and writes the same instance. No framework, no globals, no duplication.
 */

import {
	ACHIEVEMENTS,
	CHALLENGES,
	SEED_TELEMETRY,
	type Achievement,
	type Category,
	type TelemetrySnapshot,
	type WasteItem,
} from "../data/recycle";

export type { Achievement, Category, TelemetrySnapshot, WasteItem };

export interface Derived {
	diversionRate: number;
	landfillRate: number;
	recycled: number;
	completedChallenges: number;
	activeChallenges: number;
	challengeProgress: number;
	points: number;
	milesEquivalent: number;
	treesEquivalent: number;
}

const CO2_PER_PASSENGER_MILE = 0.404;
const CO2_PER_TREE_YEAR = 21.77;

/** Landfill is the only stream with no recovery pathway at municipal scale. */
function isDiverted(category: Category): boolean {
	return category !== "landfill";
}

let state: TelemetrySnapshot = structuredClone(SEED_TELEMETRY);
const listeners = new Set<(next: TelemetrySnapshot) => void>();

function emit(): void {
	for (const listener of listeners) listener(state);
}

export function getState(): TelemetrySnapshot {
	return state;
}

export function subscribe(listener: (next: TelemetrySnapshot) => void): () => void {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

export function derive(snapshot: TelemetrySnapshot = state): Derived {
	const counts = snapshot.categoryCounts;
	const recycled =
		counts.recyclable + counts.organic + counts["e-waste"] + counts.hazardous;
	const completed = Object.values(snapshot.challenges).filter(Boolean).length;

	return {
		diversionRate: (snapshot.itemsProcessed - snapshot.landfill) / snapshot.itemsProcessed,
		landfillRate: snapshot.landfill / snapshot.itemsProcessed,
		recycled,
		completedChallenges: completed,
		activeChallenges: CHALLENGES.length - completed,
		challengeProgress: completed / CHALLENGES.length,
		points: snapshot.points,
		milesEquivalent: snapshot.carbonSaved / CO2_PER_PASSENGER_MILE,
		treesEquivalent: snapshot.carbonSaved / CO2_PER_TREE_YEAR,
	};
}

export function achievementValue(achievement: Achievement, snapshot: TelemetrySnapshot = state): number {
	const d = derive(snapshot);
	switch (achievement.metric) {
		case "recyclable":
			return snapshot.categoryCounts.recyclable;
		case "organic":
			return snapshot.categoryCounts.organic;
		case "eWaste":
			return snapshot.categoryCounts["e-waste"];
		case "hazardous":
			return snapshot.categoryCounts.hazardous;
		case "itemsProcessed":
			return snapshot.itemsProcessed;
		case "diversionRate":
			return d.diversionRate * 100;
		case "carbonSaved":
			return snapshot.carbonSaved;
		case "streak":
			return snapshot.streak;
		case "points":
			return snapshot.points;
	}
}

export function isUnlocked(achievement: Achievement, snapshot: TelemetrySnapshot = state): boolean {
	return achievementValue(achievement, snapshot) >= achievement.threshold;
}

/** Register a completed vision scan. Returns the achievements newly earned. */
export function registerScan(item: WasteItem): Achievement[] {
	state.itemsProcessed += 1;
	state.carbonSaved += item.carbonOffset;
	state.categoryCounts[item.category] += 1;
	if (!isDiverted(item.category)) state.landfill += 1;
	state.points += 10;

	const before = new Set(ACHIEVEMENTS.filter((a) => isUnlocked(a)).map((a) => a.id));
	emit();
	return ACHIEVEMENTS.filter((a) => isUnlocked(a) && !before.has(a.id));
}

/** Flip a challenge. Returns the resulting completed flag and earned points. */
export function toggleChallenge(id: string): { completed: boolean; points: number; justUnlocked: Achievement[] } {
	const challenge = CHALLENGES.find((c) => c.id === id);
	if (!challenge) return { completed: false, points: 0, justUnlocked: [] };

	const completed = !state.challenges[id];
	const before = new Set(ACHIEVEMENTS.filter((a) => isUnlocked(a)).map((a) => a.id));

	if (completed) {
		state.challenges[id] = true;
		state.points += challenge.points;
		state.streak += challenge.impact.streakDays;
		state.itemsProcessed += challenge.impact.itemsDiverted;
		state.carbonSaved += challenge.impact.carbonKg;
		if (challenge.category !== "landfill") {
			state.categoryCounts[challenge.category] += challenge.impact.itemsDiverted;
		}
	} else {
		state.challenges[id] = false;
		state.points -= challenge.points;
		state.streak = Math.max(0, state.streak - challenge.impact.streakDays);
		state.itemsProcessed = Math.max(0, state.itemsProcessed - challenge.impact.itemsDiverted);
		state.carbonSaved = Math.max(0, state.carbonSaved - challenge.impact.carbonKg);
		if (challenge.category !== "landfill") {
			state.categoryCounts[challenge.category] = Math.max(
				0,
				state.categoryCounts[challenge.category] - challenge.impact.itemsDiverted,
			);
		}
	}

	emit();
	return {
		completed,
		points: completed ? challenge.points : -challenge.points,
		justUnlocked: ACHIEVEMENTS.filter((a) => isUnlocked(a) && !before.has(a.id)),
	};
}

/* ==========================================================================
   Formatting — one implementation, used by every panel
   ========================================================================== */

const NUM = new Intl.NumberFormat("en-US");
const NUM1 = new Intl.NumberFormat("en-US", {
	minimumFractionDigits: 1,
	maximumFractionDigits: 1,
});
const NUM2 = new Intl.NumberFormat("en-US", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

export const fmt = {
	integer: (n: number) => NUM.format(Math.round(n)),
	one: (n: number) => NUM1.format(n),
	two: (n: number) => NUM2.format(n),
	percent: (ratio: number) => `${NUM1.format(ratio * 100)}%`,
	/** Carbon deltas are always negative-signed: emissions avoided. */
	offset: (kg: number) => `-${NUM2.format(Math.abs(kg))} kg CO₂`,
	carbon: (kg: number) => `${NUM1.format(kg)} kg CO₂`,
	achievement: (value: number, unit: Achievement["unit"]) =>
		unit === "percent" ? `${NUM1.format(value)}%` : unit === "kg" ? NUM1.format(value) : NUM.format(Math.round(value)),
};

export function resetSession(): void {
	state = structuredClone(SEED_TELEMETRY);
	emit();
}
