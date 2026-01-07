import { Vote } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-blue-600 p-2 rounded-lg">
        <Vote className="w-5 h-5 text-white" />
      </div>

      <span className="text-3xl font-bold text-slate-900 font-inter tracking-[0%] leading-[1.1]">
        VoteChain
      </span>
    </div>
  );
}
