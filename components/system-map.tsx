import type { Step } from "@/lib/projects";

/**
 * The operator side of every project: a dark panel listing what the business
 * actually receives once the customer acts.
 */
export function SystemMap({
  title,
  steps,
  note,
  animate = false,
}: {
  title: string;
  steps: Step[];
  note?: string;
  animate?: boolean;
}) {
  return (
    <div
      className={`border border-[#2a2a22] rounded-2xl bg-panel p-5 sm:p-7 shadow-[0_22px_44px_-28px_rgba(26,24,20,0.6)] ${
        animate ? "animate-[layerIn_0.35s_ease_both]" : ""
      }`}
    >
      <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-operator-bright pb-4.5 border-b border-panel-line">
        {title}
      </p>

      <ul className="flex flex-col pt-4.5">
        {steps.map((step, i) => (
          <li key={step.label} className="contents">
            <div className="grid grid-cols-[26px_1fr] gap-x-3.5 items-center">
              <span className="w-[26px] h-[26px] rounded-[7px] border border-panel-chip-line bg-panel-chip grid place-items-center font-mono text-[10px] text-operator-bright">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className="text-[14.5px] font-medium text-panel-text">
                  {step.label}
                </span>
                {step.note ? (
                  <span className="font-mono text-[10.5px] text-panel-muted">
                    {step.note}
                  </span>
                ) : null}
              </span>
            </div>
            {i < steps.length - 1 ? (
              <span aria-hidden="true" className="h-3.5 w-px bg-panel-rule ml-[13px]" />
            ) : null}
          </li>
        ))}
      </ul>

      {note ? (
        <p className="flex gap-2.5 text-[13.5px] leading-[1.6] text-[#b8b2a4] pt-5 mt-4 border-t border-panel-line">
          <span aria-hidden="true" className="font-mono text-operator-bright">
            ↳
          </span>
          <span>{note}</span>
        </p>
      ) : null}
    </div>
  );
}
