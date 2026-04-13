import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  event: string;
}

export default function TestimonialCard({ quote, name, event }: TestimonialCardProps) {
  return (
    <div className="flex flex-col space-y-6 bg-white rounded-[2.5rem] p-10 border-2 border-white shadow-lg shadow-brand-blush/10 hover:shadow-xl hover:shadow-brand-blush/20 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-brand-nude/40 to-transparent rounded-bl-full z-0"></div>

      <Quote size={28} className="text-brand-blush/60 relative z-10" />

      <p className="text-xl md:text-2xl font-serif text-brand-espresso leading-relaxed italic relative z-10">
        "{quote}"
      </p>

      <div className="flex items-center gap-4 relative z-10 pt-2 border-t border-brand-nude/30">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-brand-blush to-brand-cocoa flex items-center justify-center text-white font-bold font-serif text-lg">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-sans font-extrabold tracking-wide text-sm text-brand-espresso">{name}</h4>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-blush">{event}</p>
        </div>
      </div>
    </div>
  );
}
