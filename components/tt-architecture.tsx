import { Label } from "@/components/ui";

/**
 * The Travelling Technicians system, drawn.
 *
 * The point of the drawing is the dashed line: an admin edits a price, and
 * database triggers — not application code someone has to remember to call —
 * rebuild the affected route payloads, which is what the next visitor reads.
 *
 * Drawn as inline SVG so it costs no JavaScript and scales cleanly. It scrolls
 * horizontally inside its own container on narrow screens rather than forcing
 * the page to scroll, and the ordered list underneath carries the same
 * information for screen readers and for anyone the diagram fails.
 *
 * Two greens on purpose: the pale one only ever appears on the dark panel, the
 * dark one only ever on the cream. Using the pale green on cream is unreadable.
 */

const CUSTOMER_BOXES = [
  { x: 0, w: 210, t: "Local search", s: "“iPhone 14 screen, Surrey”" },
  { x: 240, w: 250, t: "Generated page", s: "from-price · warranty · postal codes" },
  { x: 520, w: 250, t: "3-step booking", s: "device → contact → schedule" },
  { x: 800, w: 250, t: "Stripe checkout", s: "or a pay-later link" },
];

const OPERATOR_BOXES = [
  { x: 0, w: 250, t: "Admin", s: "pricing · bookings · warranties" },
  { x: 280, w: 230, t: "Technician PWA", s: "claim a job · mark complete" },
  { x: 540, w: 270, t: "Chat + voice agents", s: "DeepSeek · Retell — same DB tools" },
  { x: 840, w: 210, t: "Resend", s: "confirm · warranty · review" },
];

const DB_CARDS = [
  {
    x: 86,
    title: "Source of truth",
    rows: ["service_locations · 13", "device_models · 148", "dynamic_pricing · 720"],
    accent: false,
  },
  {
    x: 430,
    title: "dynamic_routes",
    rows: [
      "pre-joined JSONB payload",
      "one read renders a page",
      "~9,000 addressable routes",
    ],
    accent: true,
  },
  {
    x: 774,
    title: "The job record",
    rows: ["bookings · TEC-… refs", "warranties · invoices", "conversations"],
    accent: false,
  },
];

const MONO = "var(--font-jetbrains), monospace";

export function TTArchitecture() {
  return (
    <section className="pt-16 sm:pt-24">
      <div className="w-full max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-3 pb-9 max-w-[62ch]">
          <Label tone="accent" className="tracking-[0.14em]">
            The system, drawn
          </Label>
          <h2 className="font-serif font-normal text-[clamp(26px,3.2vw,38px)] leading-[1.12] tracking-[-0.018em] text-ink">
            One database, holding up both sides.
          </h2>
          <p className="text-[15.5px] leading-[1.7] text-body">
            The interesting part is the dashed line. An admin edits a price and
            database triggers rebuild the affected route payloads — so the cache is
            maintained by the database, not by application code someone has to
            remember to call.
          </p>
        </div>

        <div className="border border-line rounded-2xl bg-surface p-4 sm:p-7 overflow-x-auto">
          <svg
            viewBox="0 0 1120 664"
            role="img"
            aria-labelledby="tt-arch-title tt-arch-desc"
            className="block w-full min-w-[900px] h-auto"
          >
            <title id="tt-arch-title">
              Travelling Technicians system architecture
            </title>
            <desc id="tt-arch-desc">
              A customer surface and an operator surface, both reading and writing one
              PostgreSQL database, with database triggers rebuilding generated page
              payloads whenever pricing changes.
            </desc>

            <defs>
              <marker
                id="tt-arrow-rust"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#b4562a" />
              </marker>
              <marker
                id="tt-arrow-green"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#2e6a55" />
              </marker>
              <marker
                id="tt-arrow-pale"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#7fc0a4" />
              </marker>
            </defs>

            {/* ---------- Customer band ---------- */}
            <text x="0" y="20" fill="#8a8374" fontFamily={MONO} fontSize="12" letterSpacing="1.6">
              CUSTOMER SURFACE
            </text>

            {CUSTOMER_BOXES.map((b) => (
              <g key={b.t}>
                <rect x={b.x} y="38" width={b.w} height="78" rx="12" fill="#fffdf9" stroke="#e2dacc" />
                <text x={b.x + 18} y="68" fill="#17150f" fontSize="17" fontWeight="500">
                  {b.t}
                </text>
                <text x={b.x + 18} y="92" fill="#6c6557" fontFamily={MONO} fontSize="11.5">
                  {b.s}
                </text>
              </g>
            ))}

            {[210, 490, 770].map((x) => (
              <line
                key={x}
                x1={x + 6}
                y1="77"
                x2={x + 24}
                y2="77"
                stroke="#b4562a"
                strokeWidth="1.5"
                markerEnd="url(#tt-arrow-rust)"
              />
            ))}

            {/* page reads the route payload */}
            <line
              x1="420"
              y1="212"
              x2="420"
              y2="122"
              stroke="#2e6a55"
              strokeWidth="1.5"
              markerEnd="url(#tt-arrow-green)"
            />
            <text x="432" y="176" fill="#2e6a55" fontFamily={MONO} fontSize="11">
              single read · ISR 24h
            </text>

            {/* checkout writes the job record */}
            <line
              x1="900"
              y1="122"
              x2="900"
              y2="212"
              stroke="#2e6a55"
              strokeWidth="1.5"
              markerEnd="url(#tt-arrow-green)"
            />
            <text x="1050" y="168" fill="#2e6a55" fontFamily={MONO} fontSize="11" textAnchor="end">
              webhook confirms, not the browser
            </text>
            <text x="1050" y="186" fill="#6c6557" fontFamily={MONO} fontSize="11" textAnchor="end">
              warranty + invoice auto-issued
            </text>

            {/* ---------- Database band ---------- */}
            <rect x="60" y="218" width="990" height="252" rx="18" fill="#1c1a15" stroke="#302d25" />
            <text x="84" y="250" fill="#7fc0a4" fontFamily={MONO} fontSize="12" letterSpacing="1.6">
              ONE POSTGRES · 86 TABLES · 57 TRIGGERS · 12 VIEWS
            </text>

            {DB_CARDS.map((card) => (
              <g key={card.title}>
                <rect
                  x={card.x}
                  y="272"
                  width="270"
                  height="112"
                  rx="12"
                  fill="#232720"
                  stroke={card.accent ? "#7fc0a4" : "#3b463f"}
                />
                <text x={card.x + 20} y="302" fill="#efeae0" fontSize="15.5" fontWeight="500">
                  {card.title}
                </text>
                {card.rows.map((row, i) => (
                  <text
                    key={row}
                    x={card.x + 20}
                    y={328 + i * 20}
                    fill="#8d8778"
                    fontFamily={MONO}
                    fontSize="11.5"
                  >
                    {row}
                  </text>
                ))}
              </g>
            ))}

            {/* trigger: source of truth rebuilds the route payload */}
            <line
              x1="360"
              y1="328"
              x2="424"
              y2="328"
              stroke="#7fc0a4"
              strokeWidth="1.5"
              markerEnd="url(#tt-arrow-pale)"
            />
            <text x="392" y="316" fill="#7fc0a4" fontFamily={MONO} fontSize="10.5" textAnchor="middle">
              trigger
            </text>

            <text x="84" y="414" fill="#8d8778" fontFamily={MONO} fontSize="11.5">
              Nothing is hard-deleted — an is_active flag cascades
            </text>
            <text x="84" y="432" fill="#8d8778" fontFamily={MONO} fontSize="11.5">
              through triggers, so a retired device model never breaks
            </text>
            <text x="84" y="450" fill="#8d8778" fontFamily={MONO} fontSize="11.5">
              a URL Google already indexed.
            </text>

            {/* ---------- Operator band ---------- */}
            <text x="60" y="506" fill="#8a8374" fontFamily={MONO} fontSize="12" letterSpacing="1.6">
              OPERATOR SURFACE
            </text>

            {OPERATOR_BOXES.map((b) => (
              <g key={b.t}>
                <rect x={b.x} y="524" width={b.w} height="78" rx="12" fill="#fffdf9" stroke="#e2dacc" />
                <text x={b.x + 18} y="554" fill="#17150f" fontSize="16.5" fontWeight="500">
                  {b.t}
                </text>
                <text x={b.x + 18} y="578" fill="#6c6557" fontFamily={MONO} fontSize="11.5">
                  {b.s}
                </text>
              </g>
            ))}

            {/* agents and staff work the same records */}
            <line
              x1="800"
              y1="518"
              x2="800"
              y2="390"
              stroke="#2e6a55"
              strokeWidth="1.5"
              markerEnd="url(#tt-arrow-green)"
            />
            <text x="812" y="478" fill="#2e6a55" fontFamily={MONO} fontSize="11">
              agents call the same tools staff use
            </text>

            {/* THE loop: an admin price edit reaches the generated pages by itself */}
            <path
              d="M 40 524 L 20 524 L 20 328 L 80 328"
              fill="none"
              stroke="#b4562a"
              strokeWidth="1.6"
              strokeDasharray="6 5"
              markerEnd="url(#tt-arrow-rust)"
            />
            <text x="52" y="478" fill="#b4562a" fontFamily={MONO} fontSize="11">
              edit a price → triggers rebuild every affected route
            </text>
          </svg>
        </div>

        <ol className="sr-only">
          <li>
            A customer arrives from local search on a generated page carrying a
            from-price, warranty and the postal codes served.
          </li>
          <li>
            That page is rendered from a single read of the dynamic_routes table,
            whose pre-joined JSONB payload is revalidated every 24 hours.
          </li>
          <li>
            The customer books in three steps and pays through Stripe, or is sent a
            pay-later link.
          </li>
          <li>
            A Stripe webhook — not the browser — confirms payment, and triggers
            auto-issue the warranty and invoice against the booking record.
          </li>
          <li>
            Staff work those same records through an admin surface and a technician
            PWA, and the chat and voice agents call the same database tools.
          </li>
          <li>
            When an admin edits a price, database triggers rebuild every affected
            route payload, so the generated pages cannot drift from the price list.
          </li>
        </ol>
      </div>
    </section>
  );
}
