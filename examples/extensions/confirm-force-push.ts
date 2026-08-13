/**
 * Confirm Force Push Extension
 *
 * Requires explicit confirmation before a `bash` call runs a force-push
 * shaped `git push`. In non-interactive mode (no UI to confirm with),
 * it blocks by default rather than guessing.
 *
 * This is a teaching example: it matches on command text, so an unusual
 * way of expressing the same push (an alias, a wrapper script, a
 * `push.force` git config) can slip past it. Don't treat it as a
 * complete guard.
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { isToolCallEventType } from "@earendil-works/pi-coding-agent";

const FORCE_PUSH = /\bgit\s+push\b(?:(?!&&).)*\s(--force(?:-with-lease)?|-f)\b/i;

export default function (pi: ExtensionAPI) {
	pi.on("tool_call", async (event, ctx) => {
		if (!isToolCallEventType("bash", event)) return undefined;

		const command = event.input.command;
		if (!FORCE_PUSH.test(command)) return undefined;

		if (!ctx.hasUI) {
			return { block: true, reason: "Force-push blocked: no UI available to confirm." };
		}

		const choice = await ctx.ui.select(`This command force-pushes:\n\n  ${command}\n\nAllow it?`, [
			"Yes, push",
			"No, cancel",
		]);

		if (choice !== "Yes, push") {
			return { block: true, reason: "Force-push cancelled by user" };
		}

		return undefined;
	});
}
