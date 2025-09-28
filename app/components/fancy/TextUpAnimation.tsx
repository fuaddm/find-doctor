export function TextUpAnimation({ text }: { text: string }) {
  return (
    <div className="group relative z-0 overflow-hidden font-medium hover:text-black/80">
      <div className="transition duration-300 group-hover:-translate-y-full">{text}</div>
      <div className="absolute top-full left-0 transition duration-300 group-hover:-translate-y-full">{text}</div>
    </div>
  );
}
