import { useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Brain,
  Camera,
  Calculator,
  CheckCircle2,
  ChevronDown,
  Heart,
  Lightbulb,
  MessageCircle,
  Sparkles,
  Target
} from 'lucide-react';

const programs = [
  {
    id: 'abacus',
    name: 'Abacus & Mental Arithmetic',
    eyebrow: 'Build number sense',
    icon: Calculator,
    description:
      'Children learn to represent numbers with an abacus, then picture the beads in their mind as they practise calculations. The step-by-step approach makes number relationships visible and engaging.',
    skills: ['Place value and number sense', 'Mental calculation strategies', 'Focus through guided practice'],
    challenge: 'Try this: 27 + 15',
    answer: '42'
  },
  {
    id: 'phonics',
    name: 'Phonics & Early Reading',
    eyebrow: 'Grow confident readers',
    icon: BookOpen,
    description:
      'Sound-based activities help learners connect letters with the sounds they represent, blend sounds into words, and build confidence as they begin to read and communicate.',
    skills: ['Letter-sound connections', 'Blending sounds into words', 'Listening and pronunciation'],
    challenge: 'Blend the sounds: /sh/ + /i/ + /p/',
    answer: 'ship'
  },
  {
    id: 'vedic-math',
    name: 'Vedic Mathematics',
    eyebrow: 'Explore clever strategies',
    icon: Brain,
    description:
      'Learners explore patterns and flexible mental strategies that can make arithmetic feel clearer and more enjoyable. We focus on understanding when and why a strategy works.',
    skills: ['Number patterns', 'Flexible calculation methods', 'Reasoning and checking'],
    challenge: 'Try this: 98 + 37',
    answer: '135'
  }
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/YOUR_INSTAGRAM_HANDLE/',
    icon: Camera,
    className: 'bg-gradient-to-br from-fuchsia-600 via-rose-500 to-amber-400'
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/YOUR_WHATSAPP_NUMBER',
    icon: MessageCircle,
    className: 'bg-emerald-600'
  }
];

const faqs = [
  {
    question: 'What makes the learning experience engaging?',
    answer:
      'Lessons combine explanation, demonstrations, short activities, and guided practice. Children are encouraged to ask questions, try strategies, and celebrate progress along the way.'
  },
  {
    question: 'Do children need experience before they start?',
    answer:
      'No prior experience is needed. Learning can begin with foundational ideas and build step by step as the child becomes comfortable.'
  },
  {
    question: 'Can families learn more before getting started?',
    answer:
      'Yes. Use the Instagram or WhatsApp buttons below to reach the academy. Those links are placeholders for now and should be updated with the official contact details before publishing.'
  }
];

export default function AboutUsPage({ onBack, onPrimaryAction, primaryActionLabel = 'Explore the classroom' }) {
  const [selectedProgramId, setSelectedProgramId] = useState(programs[0].id);
  const [showChallengeAnswer, setShowChallengeAnswer] = useState(false);
  const selectedProgram = programs.find((program) => program.id === selectedProgramId) || programs[0];
  const SelectedProgramIcon = selectedProgram.icon;

  const chooseProgram = (programId) => {
    setSelectedProgramId(programId);
    setShowChallengeAnswer(false);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-8">
      {(onBack || onPrimaryAction) && (
        <div className="flex items-center justify-between gap-3">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </button>
          ) : <span />}
          {onPrimaryAction && (
            <button
              type="button"
              onClick={onPrimaryAction}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-800"
            >
              {primaryActionLabel}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      <section className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-950 via-indigo-900 to-teal-900 px-6 py-10 text-white shadow-xl sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border-[36px] border-white/5" />
        <div className="pointer-events-none absolute -bottom-28 right-1/4 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-amber-200">
              <Sparkles className="h-3.5 w-3.5" />
              About Evolve Kids Academy
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Big ideas start with <span className="text-amber-300">curious minds.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">
              We make learning feel active, encouraging, and meaningful—helping children explore numbers, sounds, patterns, and the joy of discovering what they can do.
            </p>
            {onPrimaryAction && (
              <button
                type="button"
                onClick={onPrimaryAction}
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-300 px-5 py-3 text-sm font-extrabold text-indigo-950 shadow-lg shadow-black/10 transition hover:bg-amber-200"
              >
                {primaryActionLabel}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300 text-indigo-950">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-teal-300/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-teal-200">
                  Learn by doing
                </span>
              </div>
              <p className="mt-5 text-lg font-bold">A little practice. A lot of possibility.</p>
              <p className="mt-2 text-sm leading-6 text-indigo-100">
                Every new skill grows through patient guidance, playful exploration, and small steps forward.
              </p>
              <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-xs font-semibold text-amber-200">
                <Heart className="h-4 w-4" />
                Confidence grows with curiosity
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-300 text-indigo-950 shadow-lg">
              <Brain className="h-7 w-7" />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: 'Make ideas visible',
            description: 'Hands-on tools and clear examples help turn abstract concepts into something children can explore.',
            icon: Target,
            color: 'bg-indigo-100 text-indigo-700'
          },
          {
            title: 'Celebrate progress',
            description: 'Small wins matter. Supportive practice helps learners build confidence one new skill at a time.',
            icon: Heart,
            color: 'bg-rose-100 text-rose-700'
          },
          {
            title: 'Stay curious',
            description: 'Questions, patterns, and playful challenges make room for children to think in their own way.',
            icon: Lightbulb,
            color: 'bg-amber-100 text-amber-700'
          }
        ].map((value) => {
          const ValueIcon = value.icon;
          return (
            <article key={value.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${value.color}`}>
                <ValueIcon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-base font-extrabold text-slate-900">{value.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{value.description}</p>
            </article>
          );
        })}
      </section>

      <section className="space-y-5">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-teal-700">What children can explore</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Learning that builds useful skills</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Choose a program to see what it develops, then try a quick example together.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {programs.map((program) => {
            const ProgramIcon = program.icon;
            const isSelected = selectedProgramId === program.id;
            return (
              <button
                key={program.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => chooseProgram(program.id)}
                className={`rounded-2xl border p-4 text-left transition ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-950/5'
                    : 'border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-indigo-700'}`}>
                    <ProgramIcon className="h-5 w-5" />
                  </span>
                  <span className={`text-xs font-bold ${isSelected ? 'text-indigo-700' : 'text-slate-500'}`}>
                    {isSelected ? 'Selected' : 'Explore'}
                  </span>
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-wide text-teal-700">{program.eyebrow}</p>
                <h3 className="mt-1 text-base font-extrabold text-slate-900">{program.name}</h3>
              </button>
            );
          })}
        </div>

        <article className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-800">
                <SelectedProgramIcon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-teal-700">{selectedProgram.eyebrow}</p>
                <h3 className="text-xl font-black text-slate-900">{selectedProgram.name}</h3>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">{selectedProgram.description}</p>
            <ul className="mt-4 space-y-2">
              {selectedProgram.skills.map((skill) => (
                <li key={skill} className="flex items-start gap-2 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-5">
            <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-orange-800">Try a mini challenge</span>
            <p className="mt-3 text-lg font-extrabold text-slate-900">{selectedProgram.challenge}</p>
            {showChallengeAnswer ? (
              <p role="status" className="mt-4 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-bold text-emerald-800">
                Answer: {selectedProgram.answer}
              </p>
            ) : (
              <button
                type="button"
                onClick={() => setShowChallengeAnswer(true)}
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl bg-orange-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-800"
              >
                Reveal answer
                <ArrowUpRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl bg-slate-900 p-6 text-white sm:p-7">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-300 text-slate-950">
            <Sparkles className="h-5 w-5" />
          </span>
          <h2 className="mt-4 text-2xl font-black">A positive place to grow</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Our aim is to help children feel supported as they practise, make mistakes, ask questions, and discover new ways to solve problems.
          </p>
          <p className="mt-4 border-t border-white/10 pt-4 text-sm font-semibold text-teal-200">
            Thoughtful teaching. Meaningful practice. Growing confidence.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-indigo-700">A few common questions</p>
          <div className="mt-4 divide-y divide-slate-100">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-slate-800">
                  {faq.question}
                  <ChevronDown className="h-4 w-4 shrink-0 text-indigo-600 transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-indigo-100 bg-indigo-50 p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-indigo-700">Let’s connect</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">Have a question about learning with us?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Reach out to Evolve Kids Academy. Add the official social handles and phone number to make these contact buttons live.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => {
              const SocialIcon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${link.className}`}
                  aria-label={`${link.label} contact link placeholder`}
                >
                  <SocialIcon className="h-4 w-4" />
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              );
            })}
          </div>
        </div>
        <p className="mt-5 border-t border-indigo-200 pt-4 text-xs font-medium text-indigo-800">
          Placeholder links: replace <span className="font-bold">YOUR_INSTAGRAM_HANDLE</span> and <span className="font-bold">YOUR_WHATSAPP_NUMBER</span> in AboutUsPage.jsx with the academy’s official details before launch.
        </p>
      </section>
    </div>
  );
}
