import Link from "next/link";
import { Label, Shell } from "@/components/ui";

export default function NotFound() {
  return (
    <Shell className="py-24 sm:py-32 flex flex-col gap-5 max-w-[52ch]">
      <Label className="tracking-[0.14em]">404</Label>
      <h1 className="font-serif font-normal text-[clamp(30px,4vw,46px)] leading-[1.1] tracking-[-0.02em] text-ink">
        That page isn&rsquo;t here.
      </h1>
      <p className="text-[16px] leading-[1.65] text-body">
        A dead link on a portfolio about keeping live systems honest is a bad look, so
        thank you for finding it.
      </p>
      <div className="flex flex-wrap gap-5 pt-1">
        <Link
          href="/"
          className="text-[15px] font-medium text-ink border-b border-accent-line pb-0.5 hover:text-accent hover:border-accent"
        >
          Back to the start →
        </Link>
        <Link
          href="/work"
          className="text-[15px] font-medium text-ink border-b border-accent-line pb-0.5 hover:text-accent hover:border-accent"
        >
          See the four systems →
        </Link>
      </div>
    </Shell>
  );
}
