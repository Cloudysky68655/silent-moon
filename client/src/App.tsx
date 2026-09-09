/* Quiet illustrated wellness direction: reference-faithful Silent Moon shell with a deliberate desktop rail and mobile dock. */
import { useMemo, useState } from "react";
import { Route, Switch, Link, useLocation } from "wouter";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  Check,
  ChevronRight,
  CirclePlay,
  Clock3,
  Headphones,
  Heart,
  Home,
  Leaf,
  ListMusic,
  LockKeyhole,
  Moon,
  Music2,
  Pause,
  Play,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  SunMedium,
  UserRound,
  Volume2,
  Waves,
  X,
  Zap,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const ASSETS = {
  mark: "/manus-storage/silent-moon-mark_17c9b415.png",
  sleepHero: "/manus-storage/silent-moon-sleep-hero_f6d55a10.png",
  relaxation: "/manus-storage/silent-moon-relaxation_a2619977.png",
  focus: "/manus-storage/silent-moon-focus_eac3c488.png",
  happiness: "/manus-storage/silent-moon-happiness_76f58fd3.png",
};

const navItems: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/sleep", label: "Sleep", icon: Moon },
  { href: "/meditate", label: "Meditate", icon: Leaf },
  { href: "/music", label: "Music", icon: Music2 },
  { href: "/profile", label: "Afsar", icon: UserRound },
];

const recommendations = [
  { title: "Focus", tag: "MEDITATION", duration: "3–10 MIN", image: ASSETS.focus, tone: "mint" },
  { title: "Happiness", tag: "MEDITATION", duration: "3–10 MIN", image: ASSETS.happiness, tone: "cream" },
  { title: "Soft landing", tag: "MEDITATION", duration: "8 MIN", image: ASSETS.focus, tone: "lilac" },
];

const sleepCards = [
  { title: "Night Island", tag: "SLEEP MUSIC", duration: "45 MIN", image: ASSETS.sleepHero },
  { title: "Sweet Sleep", tag: "SLEEP MUSIC", duration: "45 MIN", image: ASSETS.happiness },
  { title: "Moonlit Pines", tag: "SLEEP STORY", duration: "28 MIN", image: ASSETS.sleepHero },
  { title: "Cloud Drift", tag: "SLEEP MUSIC", duration: "60 MIN", image: ASSETS.focus },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={`brand-lockup ${compact ? "brand-lockup--compact" : ""}`} aria-label="Silent Moon home">
      <img src={ASSETS.mark} alt="" className="brand-mark" />
      {!compact && <span className="brand-wordmark">SILENT MOON</span>}
    </Link>
  );
}

function IconButton({ label, children, onClick, className = "" }: { label: string; children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button className={`icon-button ${className}`} aria-label={label} onClick={onClick}>
      {children}
    </button>
  );
}

function DesktopRail() {
  const [location] = useLocation();
  return (
    <aside className="desktop-rail">
      <div className="rail-top">
        <Logo />
        <div className="rail-rule" />
        <p className="rail-kicker">YOUR DAILY RITUAL</p>
      </div>
      <nav className="rail-nav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const active = item.href === "/" ? location === "/" : location.startsWith(item.href);
          return (
            <Link href={item.href} key={item.href} className={`rail-link ${active ? "is-active" : ""}`}>
              <span className="rail-icon"><item.icon size={19} strokeWidth={1.9} /></span>
              <span>{item.label}</span>
              {active && <span className="rail-active-dot" />}
            </Link>
          );
        })}
      </nav>
      <div className="rail-bottom">
        <div className="rail-mini-card">
          <div className="rail-mini-icon"><Sparkles size={16} /></div>
          <div>
            <strong>Keep your streak</strong>
            <span>4 days in a row</span>
          </div>
        </div>
        <button className="rail-settings" onClick={() => toast("Settings are ready for the next ritual.")}>
          <Settings2 size={18} /> Settings
        </button>
      </div>
    </aside>
  );
}

function MobileDock() {
  const [location] = useLocation();
  return (
    <nav className="mobile-dock" aria-label="Mobile navigation">
      {navItems.map((item) => {
        const active = item.href === "/" ? location === "/" : location.startsWith(item.href);
        return (
          <Link href={item.href} key={item.href} className={`dock-link ${active ? "is-active" : ""}`}>
            <span className="dock-icon"><item.icon size={21} strokeWidth={active ? 2.25 : 1.75} /></span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function AppHeader({ dark = false, eyebrow = "SATURDAY, AUGUST 31" }: { dark?: boolean; eyebrow?: string }) {
  return (
    <header className={`app-header ${dark ? "app-header--dark" : ""}`}>
      <div className="mobile-brand"><Logo compact /></div>
      <div className="header-context">
        <span className="header-eyebrow">{eyebrow}</span>
        <span className="header-line">A little room to breathe.</span>
      </div>
      <div className="header-actions">
        <IconButton label="Search" onClick={() => toast("Search will be connected to your library next.")}><Search size={19} /></IconButton>
        <IconButton label="Notifications" onClick={() => toast("No new reminders. Your evening ritual is waiting.")}><Bell size={19} /></IconButton>
        <button className="avatar-button" onClick={() => toast("Profile menu opened.")} aria-label="Open profile menu">A</button>
      </div>
    </header>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-frame">
      <DesktopRail />
      <div className="app-main">{children}</div>
      <MobileDock />
    </div>
  );
}

function SectionHeading({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: string }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {action && <button className="text-action" onClick={() => toast(`${action} is coming into focus.`)}>{action}<ChevronRight size={17} /></button>}
    </div>
  );
}

function PlayCircle({ onClick, playing = false, light = false, size = "normal" }: { onClick?: () => void; playing?: boolean; light?: boolean; size?: "normal" | "large" }) {
  return (
    <button className={`play-circle ${light ? "play-circle--light" : ""} ${size === "large" ? "play-circle--large" : ""}`} onClick={onClick} aria-label={playing ? "Pause" : "Play"}>
      {playing ? <Pause size={size === "large" ? 23 : 17} fill="currentColor" /> : <Play size={size === "large" ? 23 : 17} fill="currentColor" />}
    </button>
  );
}

function FeatureCard({ type, onOpen }: { type: "basics" | "relaxation"; onOpen: () => void }) {
  const basics = type === "basics";
  return (
    <button className={`feature-card ${basics ? "feature-card--lilac" : "feature-card--gold"}`} onClick={onOpen}>
      <div className="feature-copy">
        <span className="feature-label">{basics ? "COURSE" : "MUSIC"}</span>
        <strong>{basics ? "Basics" : "Relaxation"}</strong>
        <span className="feature-duration"><Clock3 size={14} /> 3–10 MIN</span>
      </div>
      <img src={basics ? ASSETS.focus : ASSETS.relaxation} alt="" className="feature-art" />
      <span className={`feature-cta ${basics ? "feature-cta--dark" : ""}`}>START <ArrowRight size={15} /></span>
    </button>
  );
}

function DailyThought({ onPlay }: { onPlay: () => void }) {
  return (
    <div className="daily-thought">
      <div className="daily-blob daily-blob--one" />
      <div className="daily-blob daily-blob--two" />
      <div className="daily-blob daily-blob--three" />
      <div className="daily-copy">
        <span className="section-eyebrow section-eyebrow--light">TODAY'S PAUSE</span>
        <h3>Daily Thought</h3>
        <p>MEDITATION <span>•</span> 3–10 MIN</p>
      </div>
      <PlayCircle onClick={onPlay} light size="large" />
    </div>
  );
}

function RecommendationCard({ item, onClick }: { item: typeof recommendations[number]; onClick: () => void }) {
  return (
    <button className="recommendation-card" onClick={onClick}>
      <div className={`recommendation-image recommendation-image--${item.tone}`}>
        <img src={item.image} alt="" />
        <span className="card-favorite"><Heart size={15} /></span>
      </div>
      <div className="recommendation-info">
        <strong>{item.title}</strong>
        <span>{item.tag} <i>•</i> {item.duration}</span>
      </div>
    </button>
  );
}

function HomeView() {
  const [, navigate] = useLocation();
  return (
    <main className="page page--light page--home">
      <AppHeader />
      <div className="home-content">
        <section className="hero-intro">
          <div>
            <span className="hero-overline"><SunMedium size={15} /> MORNING CHECK-IN</span>
            <h1>Good morning,<br /><em>Afsar.</em></h1>
            <p>We saved a little quiet for you.</p>
          </div>
          <div className="hero-progress-card">
            <div className="hero-progress-top"><span>Your rhythm</span><span>4 days</span></div>
            <div className="progress-track"><span style={{ width: "68%" }} /></div>
            <div className="hero-progress-bottom"><span>Next milestone</span><strong>2 sessions</strong></div>
          </div>
        </section>

        <section className="feature-section">
          <SectionHeading eyebrow="START HERE" title="A moment for you" action="View all" />
          <div className="feature-grid">
            <FeatureCard type="basics" onOpen={() => navigate("/course/basics")} />
            <FeatureCard type="relaxation" onOpen={() => navigate("/music")} />
          </div>
        </section>

        <DailyThought onPlay={() => navigate("/play")} />

        <section className="recommendations-section">
          <SectionHeading eyebrow="CURATED FOR YOU" title="Recommended for you" action="See library" />
          <div className="recommendation-rail">
            {recommendations.map((item) => <RecommendationCard item={item} key={item.title} onClick={() => navigate("/course/basics")} />)}
          </div>
        </section>

        <section className="home-bottom-grid">
          <div className="ritual-card">
            <div className="ritual-icon"><Waves size={21} /></div>
            <div><span className="section-eyebrow">SMALL RITUAL</span><h3>Return to your breath</h3><p>Three slow minutes can change the shape of an afternoon.</p></div>
            <button className="circle-arrow" onClick={() => navigate("/meditate")} aria-label="Explore meditation"><ArrowRight size={17} /></button>
          </div>
          <div className="quote-card">
            <Sparkles size={18} />
            <p>“You do not have to chase calm. You can make space for it.”</p>
            <span>— A quiet reminder</span>
          </div>
        </section>
      </div>
    </main>
  );
}

const sleepCategories = [
  { label: "All", icon: Sparkles },
  { label: "My", icon: Heart },
  { label: "Anxious", icon: Waves },
  { label: "Sleep", icon: Moon },
  { label: "Kids", icon: Star },
];

function SleepView() {
  const [, navigate] = useLocation();
  const [category, setCategory] = useState("All");
  return (
    <main className="page page--night page--sleep">
      <AppHeader dark eyebrow="THE NIGHT LIBRARY" />
      <div className="sleep-content">
        <section className="sleep-intro">
          <div className="sleep-moon-orbit"><Moon size={42} fill="currentColor" /></div>
          <span className="hero-overline hero-overline--night"><Star size={14} fill="currentColor" /> EVENING MODE</span>
          <h1>Sleep Stories</h1>
          <p>Soothing stories and soundscapes<br className="mobile-only" /> for a deeper, softer night.</p>
        </section>

        <div className="category-scroller" role="tablist" aria-label="Sleep categories">
          {sleepCategories.map((item) => {
            const Icon = item.icon;
            const active = item.label === category;
            return <button key={item.label} className={`category-pill ${active ? "is-active" : ""}`} onClick={() => setCategory(item.label)} role="tab" aria-selected={active}><span><Icon size={22} /></span>{item.label}</button>;
          })}
        </div>

        <section className="sleep-feature" onClick={() => navigate("/play")} role="button" tabIndex={0}>
          <img src={ASSETS.sleepHero} alt="Layered moonlit mountains beneath a crescent moon" />
          <div className="sleep-feature-shade" />
          <div className="sleep-lock"><LockKeyhole size={16} /></div>
          <div className="sleep-feature-copy">
            <span className="section-eyebrow section-eyebrow--light">FEATURED TONIGHT</span>
            <h2>The Ocean Moon</h2>
            <p>Non-stop soundscapes for the<br className="desktop-only" /> moment between awake and dreaming.</p>
            <span className="light-pill">START <ArrowRight size={15} /></span>
          </div>
          <span className="sleep-feature-duration"><Clock3 size={15} /> 8 HOURS</span>
        </section>

        <section className="sleep-library">
          <SectionHeading eyebrow="EXPLORE THE NIGHT" title={`${category} stories`} action="See all" />
          <div className="sleep-grid">
            {sleepCards.map((item, index) => (
              <button key={item.title} className={`sleep-card ${index === 0 ? "sleep-card--featured" : ""}`} onClick={() => navigate("/play")}>
                <div className="sleep-card-art"><img src={item.image} alt="" /><span className="sleep-card-play"><Play size={14} fill="currentColor" /></span></div>
                <strong>{item.title}</strong>
                <span>{item.duration} <i>•</i> {item.tag}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function LibraryCard({ image, title, meta, accent, onClick }: { image: string; title: string; meta: string; accent: string; onClick: () => void }) {
  return (
    <button className="library-card" onClick={onClick}>
      <div className={`library-art library-art--${accent}`}><img src={image} alt="" /><span className="card-favorite"><Heart size={15} /></span></div>
      <div className="library-card-copy"><strong>{title}</strong><span>{meta}</span></div>
      <span className="card-arrow"><ArrowRight size={16} /></span>
    </button>
  );
}

function LibraryView({ mode }: { mode: "meditate" | "music" }) {
  const [, navigate] = useLocation();
  const meditate = mode === "meditate";
  const [filter, setFilter] = useState("For you");
  const filters = meditate ? ["For you", "Focus", "Stress less", "Sleep"] : ["For you", "Nature", "Piano", "Rain"];
  return (
    <main className="page page--light page--library">
      <AppHeader eyebrow={meditate ? "THE MEDITATION ROOM" : "SOUNDTRACK YOUR STILLNESS"} />
      <div className="library-content">
        <section className="library-intro">
          <div>
            <span className="hero-overline">{meditate ? <Leaf size={15} /> : <Headphones size={15} />} {meditate ? "GUIDED PRACTICE" : "SLOW FREQUENCIES"}</span>
            <h1>{meditate ? <>Find your <em>center.</em></> : <>Sound for <em>softer days.</em></>}</h1>
            <p>{meditate ? "Small sessions, clear guidance, and a little less noise." : "Ambient soundscapes for focus, rest, and the spaces between."}</p>
          </div>
          <div className={`library-signal ${meditate ? "library-signal--lilac" : "library-signal--gold"}`}><div className="signal-wave"><span /><span /><span /><span /><span /></div><span>{meditate ? "6 min" : "Now playing"}</span></div>
        </section>
        <div className="filter-row" role="tablist">
          {filters.map((item) => <button key={item} className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)} role="tab" aria-selected={filter === item}>{item}</button>)}
        </div>
        <section className="library-feature-panel">
          <div className="library-feature-copy"><span className="section-eyebrow">{meditate ? "TODAY'S PRACTICE" : "CURATED PLAYLIST"}</span><h2>{meditate ? "A quiet beginning" : "Golden hour, indoors"}</h2><p>{meditate ? "A short, grounding practice to help you arrive in this exact moment." : "Warm keys, soft room tone, and nowhere else you need to be."}</p><button className="dark-pill" onClick={() => navigate("/play")}>LISTEN NOW <ArrowRight size={15} /></button></div><div className="feature-panel-orbit"><div className="orbit-ring" /><div className="orbit-core">{meditate ? <Leaf size={36} /> : <Music2 size={36} />}</div></div>
        </section>
        <SectionHeading eyebrow={meditate ? "MORE PRACTICES" : "MORE SOUNDSCAPES"} title="Made for this moment" action="View all" />
        <div className="library-list">
          {meditate ? (
            <>
              <LibraryCard image={ASSETS.focus} title="A steady focus" meta="10 MIN  •  FOCUS" accent="mint" onClick={() => navigate("/play")} />
              <LibraryCard image={ASSETS.happiness} title="Room for joy" meta="8 MIN  •  HAPPINESS" accent="cream" onClick={() => navigate("/play")} />
              <LibraryCard image={ASSETS.focus} title="Unclench the day" meta="12 MIN  •  STRESS LESS" accent="lilac" onClick={() => navigate("/play")} />
            </>
          ) : (
            <>
              <LibraryCard image={ASSETS.relaxation} title="A room with sunlight" meta="24 MIN  •  AMBIENT" accent="gold" onClick={() => navigate("/play")} />
              <LibraryCard image={ASSETS.sleepHero} title="Night tide" meta="45 MIN  •  NATURE" accent="navy" onClick={() => navigate("/play")} />
              <LibraryCard image={ASSETS.happiness} title="Soft piano, open window" meta="32 MIN  •  PIANO" accent="cream" onClick={() => navigate("/play")} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function CourseDetailView() {
  const [, navigate] = useLocation();
  return (
    <main className="page page--light page--detail">
      <AppHeader eyebrow="COURSE DETAILS" />
      <div className="detail-content">
        <button className="back-link" onClick={() => navigate("/")}><ArrowLeft size={17} /> Back to home</button>
        <div className="detail-layout">
          <div className="detail-visual"><img src={ASSETS.focus} alt="Person meditating on a floating rock" /><span className="detail-stamp"><Sparkles size={15} /> BEGINNER FRIENDLY</span></div>
          <div className="detail-copy"><span className="hero-overline"><Leaf size={15} /> 7 DAY COURSE</span><h1>Basics of <em>stillness.</em></h1><p className="detail-lede">A gentle introduction to meditation for the days when you want to feel a little more like yourself.</p><div className="detail-meta"><span><Clock3 size={17} /> 3–10 min</span><span><BookOpen size={17} /> 7 sessions</span></div><div className="detail-divider" /><h3>What you’ll practice</h3><ul className="practice-list"><li><Check size={16} /> Finding a comfortable breath</li><li><Check size={16} /> Letting thoughts pass without a fight</li><li><Check size={16} /> Returning, kindly and often</li></ul><button className="primary-cta" onClick={() => navigate("/play")}>BEGIN COURSE <ArrowRight size={17} /></button></div>
        </div>
      </div>
    </main>
  );
}

function PlayerView() {
  const [, navigate] = useLocation();
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(42);
  return (
    <main className="page page--player">
      <div className="player-topbar"><button className="back-link back-link--light" onClick={() => navigate("/")}><ArrowLeft size={17} /> Library</button><span>NOW PLAYING</span><IconButton label="Close player" className="icon-button--light" onClick={() => navigate("/")}><X size={19} /></IconButton></div>
      <div className="player-content">
        <div className="player-art"><img src={ASSETS.sleepHero} alt="Moonlit mountain artwork" /><div className="player-art-glow" /><span className="player-orb"><Moon size={36} fill="currentColor" /></span></div>
        <div className="player-copy"><span className="section-eyebrow section-eyebrow--light">SILENT MOON RADIO</span><h1>The Ocean Moon</h1><p>A slow tide of sound for wherever you are.</p></div>
        <div className="player-progress"><div className="player-time"><span>18:42</span><span>45:00</span></div><input type="range" min="0" max="100" value={progress} onChange={(e) => setProgress(Number(e.target.value))} aria-label="Playback progress" /></div>
        <div className="player-controls"><IconButton label="Previous" className="icon-button--light"><ArrowLeft size={19} /></IconButton><PlayCircle onClick={() => setPlaying((value) => !value)} playing={playing} light size="large" /><IconButton label="Volume" className="icon-button--light"><Volume2 size={19} /></IconButton></div>
        <div className="player-actions"><button onClick={() => setLiked(!liked)} className={liked ? "is-liked" : ""}><Heart size={17} fill={liked ? "currentColor" : "none"} /> {liked ? "Saved to your space" : "Save for later"}</button><button onClick={() => toast("A reminder can be set from your profile.")}><Bell size={17} /> Set reminder</button></div>
      </div>
    </main>
  );
}

function ProfileView() {
  const [, navigate] = useLocation();
  return (
    <main className="page page--light page--profile">
      <AppHeader eyebrow="YOUR QUIET CORNER" />
      <div className="profile-content">
        <section className="profile-hero"><div className="profile-avatar">A</div><div><span className="section-eyebrow">A LITTLE MORE OF YOU</span><h1>Hi, Afsar.</h1><p>Make this space feel like yours.</p></div><button className="edit-profile" onClick={() => toast("Profile editing is ready for the next step.")}>Edit profile</button></section>
        <div className="profile-stats"><div><strong>04</strong><span>day streak</span></div><div><strong>12</strong><span>sessions</span></div><div><strong>86</strong><span>minutes</span></div></div>
        <section className="profile-grid"><div className="profile-panel profile-panel--lilac"><Sparkles size={21} /><span className="section-eyebrow">THIS WEEK</span><h2>Your calm is adding up.</h2><p>You’ve made space for 86 minutes of quiet this week.</p><button onClick={() => navigate("/meditate")}>Keep going <ArrowRight size={16} /></button></div><div className="profile-panel"><ShieldCheck size={21} /><span className="section-eyebrow">YOUR PREFERENCES</span><h2>Make it feel easy.</h2><p>Choose reminders, topics, and the kind of quiet you need.</p><button onClick={() => toast("Preferences are ready for customization.")}>Open preferences <ArrowRight size={16} /></button></div></section>
      </div>
    </main>
  );
}

function WelcomeView() {
  const [, navigate] = useLocation();
  return <main className="welcome-page"><div className="welcome-art"><img src={ASSETS.happiness} alt="Person meditating in a warm illustrated scene" /><div className="welcome-stars"><Star size={13} /><Star size={9} /><Sparkles size={13} /></div></div><div className="welcome-copy"><Logo /><span className="hero-overline">A SMALL SPACE FOR STILLNESS</span><h1>Meet yourself<br /><em>in the quiet.</em></h1><p>Short practices, sleep stories, and soundscapes for wherever the day finds you.</p><button className="primary-cta" onClick={() => navigate("/" )}>ENTER SILENT MOON <ArrowRight size={17} /></button><button className="quiet-link" onClick={() => navigate("/signin")}>I already have an account</button></div></main>;
}

function AuthView({ signup = false }: { signup?: boolean }) {
  const [, navigate] = useLocation();
  return <main className="auth-page"><div className="auth-visual"><Logo /><div className="auth-art"><img src={signup ? ASSETS.focus : ASSETS.relaxation} alt="" /></div><p>{signup ? "A gentle practice can begin anywhere." : "Good to see you again."}</p></div><div className="auth-form"><button className="back-link" onClick={() => navigate("/welcome")}><ArrowLeft size={17} /> Back</button><span className="hero-overline">{signup ? "MAKE A LITTLE ROOM" : "WELCOME BACK"}</span><h1>{signup ? "Create your quiet space." : "Come back to yourself."}</h1><p className="auth-lede">{signup ? "Save your practice and find what helps you feel more at home." : "Your next small moment is waiting."}</p><label>Email address<input type="email" placeholder="you@example.com" /></label>{signup && <label>Choose a password<input type="password" placeholder="At least 8 characters" /></label>}<button className="primary-cta" onClick={() => navigate("/")}>{signup ? "CREATE ACCOUNT" : "SIGN IN"} <ArrowRight size={17} /></button><div className="auth-switch"><span>{signup ? "Already have an account?" : "New to Silent Moon?"}</span><button onClick={() => navigate(signup ? "/signin" : "/signup")}>{signup ? "Sign in" : "Create an account"}</button></div></div></main>;
}

function NotFound() {
  const [, navigate] = useLocation();
  return <main className="empty-page"><Logo /><h1>That page drifted away.</h1><p>Let’s take you back to a quieter place.</p><button className="primary-cta" onClick={() => navigate("/")}>BACK HOME <ArrowRight size={17} /></button></main>;
}

function Router() {
  return <Switch>
    <Route path="/" component={() => <AppShell><HomeView /></AppShell>} />
    <Route path="/sleep" component={() => <AppShell><SleepView /></AppShell>} />
    <Route path="/meditate" component={() => <AppShell><LibraryView mode="meditate" /></AppShell>} />
    <Route path="/music" component={() => <AppShell><LibraryView mode="music" /></AppShell>} />
    <Route path="/profile" component={() => <AppShell><ProfileView /></AppShell>} />
    <Route path="/course/basics" component={() => <AppShell><CourseDetailView /></AppShell>} />
    <Route path="/play" component={PlayerView} />
    <Route path="/welcome" component={WelcomeView} />
    <Route path="/signin" component={() => <AuthView />} />
    <Route path="/signup" component={() => <AuthView signup />} />
    <Route component={NotFound} />
  </Switch>;
}

export default function App() {
  return <><Toaster position="bottom-right" /><Router /></>;
}
