import React, { useState, useEffect } from 'react';
import { 
  Heart, Calendar, Clock, MapPin, Music, Send, CheckCircle2, 
  Sparkles, Gift, Eye, Edit3, Palette, Share2, Menu, X, 
  Users, Smartphone, ShieldCheck, ChevronRight, Play, Pause,
  Download, ArrowRight, UserCheck, Star, HelpCircle
} from 'lucide-react';

// Sample Template Presets
const TEMPLATES = [
  {
    id: 'wedding-gold',
    title: 'Златна Елегантност',
    category: 'wedding',
    categoryName: 'Сватба',
    bgGradient: 'from-amber-50 to-orange-50',
    accentColor: '#D4AF37',
    fontFamily: 'serif',
    sampleImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    titleText: 'Сватбено Тържество',
    names: 'Александър & Виктория',
    date: '2025-08-20',
    time: '16:30',
    location: 'Комплекс "Приказка", гр. София',
    description: 'С радост ви каним да споделите с нас най-вълнуващия ден от нашия живот!',
    musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-114139.mp3'
  },
  {
    id: 'baptism-floral',
    title: 'Ангелско Кръщение',
    category: 'baptism',
    categoryName: 'Свето Кръщение',
    bgGradient: 'from-blue-50 to-indigo-50',
    accentColor: '#4F46E5',
    fontFamily: 'sans',
    sampleImage: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800',
    titleText: 'Свето Кръщение',
    names: 'Малкият Мартин',
    date: '2025-06-15',
    time: '11:00',
    location: 'Храм "Св. София", гр. София',
    description: 'Заповядайте да отпразнуваме заедно първия голям празник на нашия син!',
    musicUrl: ''
  },
  {
    id: 'birthday-glam',
    title: 'Модерно Парти 30+',
    category: 'birthday',
    categoryName: 'Рожден Ден',
    bgGradient: 'from-pink-50 to-rose-50',
    accentColor: '#E11D48',
    fontFamily: 'serif',
    sampleImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800',
    titleText: 'Юбилеен Рожден Ден',
    names: 'Елена празнува 30!',
    date: '2025-09-12',
    time: '19:30',
    location: 'Rooftop Bar "Skyline", гр. Пловдив',
    description: 'Време е за парти! Очакват ви хубава музика, авторски коктейли и страхотна атмосфера.',
    musicUrl: ''
  },
  {
    id: 'baby-shower-pastel',
    title: 'Бебешка Магия',
    category: 'babyshower',
    categoryName: 'Бебешко Парти',
    bgGradient: 'from-teal-50 to-emerald-50',
    accentColor: '#0D9488',
    fontFamily: 'sans',
    sampleImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
    titleText: 'Baby Shower',
    names: 'Очакваме бебе София!',
    date: '2025-05-10',
    time: '15:00',
    location: 'Градина "Цветна Приказка"',
    description: 'Остават броени седмици до срещата ни с нашето момиченце. Нека я посрещнем с любов!',
    musicUrl: ''
  },
  {
    id: 'bachelorette-party',
    title: 'Моминско Парти Glam',
    category: 'bachelorette',
    categoryName: 'Моминско Парти',
    bgGradient: 'from-purple-50 to-pink-50',
    accentColor: '#9333EA',
    fontFamily: 'sans',
    sampleImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    titleText: 'Bachelorette Weekend',
    names: 'Бъдещата булка Мария',
    date: '2025-07-04',
    time: '18:00',
    location: 'Вила "Морски Поокав", гр. Варна',
    description: 'Последна нощ на свобода! Незабравимо парти край морето с любимите момичета.',
    musicUrl: ''
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // home, templates, editor, preview, pricing
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Customized Invite State for Editor & Preview
  const [inviteData, setInviteData] = useState({
    titleText: 'Сватбено Тържество',
    names: 'Александър & Виктория',
    date: '2025-08-20',
    time: '16:30',
    location: 'Комплекс "Приказка", гр. София',
    address: 'ул. Паркова №12, кв. Драгалевци',
    description: 'С радост ви каним да споделите с нас най-вълнуващия ден от нашия живот!',
    accentColor: '#D4AF37',
    bgGradient: 'from-amber-50 to-orange-50',
    fontStyle: 'serif',
    bankIBAN: 'BG80 STSA 9300 0026 1234 56',
    bankHolder: 'Александър и Виктория',
    giftMessage: 'Вашето присъствие е най-големият подарък за нас. Ако все пак желаете да ни изненадате, ще бъдем благодарни на паричен принос за нашето сватбено пътешествие.',
    timeline: [
      { time: '16:30', title: 'Граждански & Църковен Брак', desc: 'Църква "Св. Неделя"' },
      { time: '18:00', title: 'Welcome Drink & Фотосесия', desc: 'Градината на комплекса' },
      { time: '19:30', title: 'Празнична Вечеря & Парти', desc: 'Основна бална залу' },
    ]
  });

  // Music Player State for Demo
  const [isPlaying, setIsPlaying] = useState(false);

  // RSVP Form State for Demo
  const [rsvpData, setRsvpData] = useState({
    name: '',
    status: 'attending', // attending, declined
    guestsCount: 1,
    dietary: '',
    message: ''
  });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Time remaining calculator
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(inviteData.date + 'T' + inviteData.time).getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [inviteData.date, inviteData.time]);

  const handleSelectTemplate = (template) => {
    setInviteData({
      ...inviteData,
      titleText: template.titleText,
      names: template.names,
      date: template.date,
      time: template.time,
      location: template.location,
      description: template.description,
      accentColor: template.accentColor,
      bgGradient: template.bgGradient,
      fontStyle: template.fontFamily
    });
    setActiveTab('editor');
  };

  const filteredTemplates = selectedCategory === 'all' 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setActiveTab('home')}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-2xl font-serif font-bold bg-gradient-to-r from-amber-700 via-rose-600 to-amber-900 bg-clip-text text-transparent">
                VibeCelebrate
              </span>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
              <button 
                onClick={() => setActiveTab('home')}
                className={`transition hover:text-amber-600 ${activeTab === 'home' ? 'text-amber-600 font-semibold' : ''}`}
              >
                Начало
              </button>
              <button 
                onClick={() => setActiveTab('templates')}
                className={`transition hover:text-amber-600 ${activeTab === 'templates' ? 'text-amber-600 font-semibold' : ''}`}
              >
                Шаблони
              </button>
              <button 
                onClick={() => setActiveTab('preview')}
                className={`transition hover:text-amber-600 ${activeTab === 'preview' ? 'text-amber-600 font-semibold' : ''}`}
              >
                Интерактивно Демо
              </button>
              <button 
                onClick={() => setActiveTab('pricing')}
                className={`transition hover:text-amber-600 ${activeTab === 'pricing' ? 'text-amber-600 font-semibold' : ''}`}
              >
                Цени
              </button>
            </div>

            {/* Header Action Button */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('editor')}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white font-medium hover:opacity-95 shadow-md shadow-amber-500/20 transition transform hover:-translate-y-0.5"
              >
                Създай покана
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-3 shadow-lg">
            <button 
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-slate-600 hover:text-amber-600 font-medium"
            >
              Начало
            </button>
            <button 
              onClick={() => { setActiveTab('templates'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-slate-600 hover:text-amber-600 font-medium"
            >
              Шаблони
            </button>
            <button 
              onClick={() => { setActiveTab('preview'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-slate-600 hover:text-amber-600 font-medium"
            >
              Интерактивно Демо
            </button>
            <button 
              onClick={() => { setActiveTab('pricing'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-slate-600 hover:text-amber-600 font-medium"
            >
              Цени
            </button>
            <button
              onClick={() => { setActiveTab('editor'); setMobileMenuOpen(false); }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-medium text-center shadow-md"
            >
              Създай покана сега
            </button>
          </div>
        )}
      </nav>

      {/* CONTENT AREA BASED ON ACTIVE TAB */}
      {activeTab === 'home' && (
        <HomeSection 
          onStart={() => setActiveTab('templates')} 
          onDemo={() => setActiveTab('preview')} 
        />
      )}

      {activeTab === 'templates' && (
        <TemplatesSection 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filteredTemplates={filteredTemplates}
          onSelectTemplate={handleSelectTemplate}
        />
      )}

      {activeTab === 'editor' && (
        <EditorSection 
          inviteData={inviteData}
          setInviteData={setInviteData}
          onPreview={() => setActiveTab('preview')}
        />
      )}

      {activeTab === 'preview' && (
        <PreviewSection 
          inviteData={inviteData}
          timeLeft={timeLeft}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          rsvpData={rsvpData}
          setRsvpData={setRsvpData}
          rsvpSubmitted={rsvpSubmitted}
          setRsvpSubmitted={setRsvpSubmitted}
          onEdit={() => setActiveTab('editor')}
        />
      )}

      {activeTab === 'pricing' && (
        <PricingSection onChoose={() => setActiveTab('editor')} />
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xl font-serif font-bold text-white">VibeCelebrate</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Модерни дигитални покани за сватби, рождени дни и специални събития с лесно потвърждение на присъствие (RSVP).
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Бързи Връзки</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setActiveTab('templates')} className="hover:text-amber-400 transition">Шаблони за сватба</button></li>
                <li><button onClick={() => setActiveTab('templates')} className="hover:text-amber-400 transition">Покани за Свето Кръщение</button></li>
                <li><button onClick={() => setActiveTab('templates')} className="hover:text-amber-400 transition">Рожден ден & Парти</button></li>
                <li><button onClick={() => setActiveTab('pricing')} className="hover:text-amber-400 transition">Ценови Пакети</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Функционалности</h4>
              <ul className="space-y-2 text-sm">
                <li>Интерактивно RSVP</li>
                <li>Музикален фонов плеър</li>
                <li>Локация и Карта</li>
                <li>Обратно броене</li>
                <li>Списък с подаръци / IBAN</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Контакти</h4>
              <p className="text-sm text-slate-400">Имате въпроси или специална заявка?</p>
              <p className="text-sm text-amber-400 font-medium mt-2">support@vibecelebrate.bg</p>
              <p className="text-sm text-slate-400 mt-1">+359 88 888 8888</p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p>© {new Date().getFullYear()} VibeCelebrate. Всички права запазени.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-slate-300">Общи условия</a>
              <a href="#" className="hover:text-slate-300">Поверителност</a>
              <a href="#" className="hover:text-slate-300">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ==================== HOME SECTION ==================== */
function HomeSection({ onStart, onDemo }) {
  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 bg-gradient-to-b from-amber-50/60 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ново поколение дигитални покани</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 leading-tight">
                Превърнете вашето събитие в <span className="bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">незабравимо изживяване</span>
              </h1>

              <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Създайте луксозни интерактивни уеб покани за сватба, рожден ден или кръщение за броени минути. Проследявайте RSVP потвърждения, споделяйте локация, програма и фонова музика.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  onClick={onStart}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white font-medium text-lg hover:shadow-xl hover:shadow-amber-500/20 transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  <span>Изберете шаблон</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={onDemo}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-700 font-medium text-lg hover:bg-slate-50 transition flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Eye className="w-5 h-5 text-amber-600" />
                  <span>Вижте живо демо</span>
                </button>
              </div>

              {/* Social Proof Badges */}
              <div className="pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-slate-500 text-sm border-t border-slate-200/60">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>100% Екологично</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>Моментално изпращане</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>Лесно RSVP от телефона</span>
                </div>
              </div>
            </div>

            {/* Right Column Showcase Mobile Card Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Phone Frame */}
                <div className="relative mx-auto border-gray-800 bg-slate-900 border-[14px] rounded-[2.5rem] h-[580px] w-[290px] sm:w-[320px] shadow-2xl overflow-hidden transform hover:scale-105 transition duration-500">
                  <div className="w-[140px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-30"></div>
                  
                  {/* Phone Screen Mockup Content */}
                  <div className="h-full bg-gradient-to-b from-amber-50 to-rose-50 text-slate-800 overflow-y-auto p-4 space-y-4 font-serif text-center relative select-none">
                    <div className="pt-6">
                      <span className="text-xs uppercase tracking-widest text-amber-700 font-sans font-bold">Сватбено Тържество</span>
                      <h3 className="text-2xl font-bold text-slate-900 mt-1">Георги & Елена</h3>
                      <p className="text-xs text-slate-500 font-sans mt-1">24 Август 2025</p>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-sm h-36 relative">
                      <img 
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600" 
                        alt="Wedding couple" 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl space-y-2 text-xs font-sans">
                      <p className="text-slate-600">Остават:</p>
                      <div className="grid grid-cols-4 gap-1 text-center font-bold text-amber-800">
                        <div className="bg-amber-100/60 p-1 rounded">142<span className="block text-[9px] font-normal text-slate-500">дни</span></div>
                        <div className="bg-amber-100/60 p-1 rounded">08<span className="block text-[9px] font-normal text-slate-500">часа</span></div>
                        <div className="bg-amber-100/60 p-1 rounded">25<span className="block text-[9px] font-normal text-slate-500">мин</span></div>
                        <div className="bg-amber-100/60 p-1 rounded">12<span className="block text-[9px] font-normal text-slate-500">сек</span></div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-amber-500 to-rose-500 text-white p-3 rounded-xl text-xs font-sans font-medium shadow-md">
                      Потвърди присъствие (RSVP)
                    </div>
                  </div>
                </div>

                {/* Decorative floating badges */}
                <div className="absolute -bottom-4 -left-6 bg-white p-3 rounded-xl shadow-lg flex items-center space-x-3 border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">RSVP в реално време</p>
                    <p className="text-[10px] text-slate-500">Следете потвържденията</p>
                  </div>
                </div>

                <div className="absolute -top-4 -right-6 bg-white p-3 rounded-xl shadow-lg flex items-center space-x-3 border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                    <Music className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Фонова музика</p>
                    <p className="text-[10px] text-slate-500">Персонализиран романтичен съпровод</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-serif font-bold text-slate-900">Защо да изберете дигитална покана?</h2>
          <p className="text-slate-600">Всичко, от което се нуждаете за перфектната организация на вашето специално събитие, събрано на едно място.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">RSVP Управление</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Гостите бързо и лесно потвърждават присъствие от своите телефони. Получавате брой гости, избор на меню и специални диетични изисквания.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Навигация & Карта</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Директни бутони за GPS навигация (Google Maps / Waze). Вашите гости никога няма да се изгубят на път за църквата или ресторанта.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-6">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Списък с подаръци & IBAN</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Включете дискретен раздел с информация за желани подаръци или банков IBAN за принос към вашето сватбено пътешествие.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-serif font-bold">Как работи в 3 лесни стъпки</h2>
            <p className="text-slate-400">Създайте вашата уникална покана без технически умения</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 font-bold text-2xl flex items-center justify-center mx-auto border border-amber-500/30">
                1
              </div>
              <h3 className="text-xl font-bold">Изберете Дизайн</h3>
              <p className="text-slate-400 text-sm">
                Разгледайте разнообразието от стилни шаблони за сватба, кръщение или рожден ден.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 font-bold text-2xl flex items-center justify-center mx-auto border border-rose-500/30">
                2
              </div>
              <h3 className="text-xl font-bold">Персонализирайте</h3>
              <p className="text-slate-400 text-sm">
                Въведете вашите имена, дата, часа, програмата, качете снимки и изберете фонова песен.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 text-purple-400 font-bold text-2xl flex items-center justify-center mx-auto border border-purple-500/30">
                3
              </div>
              <h3 className="text-xl font-bold">Изпратете & Следете</h3>
              <p className="text-slate-400 text-sm">
                Получете персонален линк за споделяне чрез Viber, WhatsApp или Messenger и проследявайте гостите.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ==================== TEMPLATES SECTION ==================== */
function TemplatesSection({ selectedCategory, setSelectedCategory, filteredTemplates, onSelectTemplate }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-serif font-bold text-slate-900">Галерия от Шаблони</h1>
        <p className="text-slate-600">Изберете дизайн за вашето събитие и го персонализирайте по ваш вкус.</p>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-4">
        {[
          { id: 'all', label: 'Всички' },
          { id: 'wedding', label: 'Сватба' },
          { id: 'baptism', label: 'Свето Кръщение' },
          { id: 'birthday', label: 'Рожден Ден' },
          { id: 'babyshower', label: 'Бебешко Парти' },
          { id: 'bachelorette', label: 'Моминско / Ергенско' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((template) => (
          <div 
            key={template.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition duration-300 flex flex-col"
          >
            <div className="relative h-64 overflow-hidden group">
              <img 
                src={template.sampleImage} 
                alt={template.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center space-x-3">
                <button 
                  onClick={() => onSelectTemplate(template)}
                  className="px-5 py-2.5 rounded-full bg-white text-slate-900 font-medium text-sm shadow-lg hover:bg-amber-400 hover:text-slate-900 transition flex items-center space-x-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Редактирай</span>
                </button>
              </div>
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-semibold px-3 py-1 rounded-full shadow">
                {template.categoryName}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900">{template.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{template.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Включва RSVP + Музика</span>
                <button
                  onClick={() => onSelectTemplate(template)}
                  className="text-amber-600 font-semibold text-sm hover:text-amber-700 flex items-center space-x-1"
                >
                  <span>Избери</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==================== EDITOR SECTION ==================== */
function EditorSection({ inviteData, setInviteData, onPreview }) {
  const handleChange = (field, value) => {
    setInviteData(prev => ({ ...prev, [field]: value }));
  };

  const handleTimelineChange = (index, field, value) => {
    const updated = [...inviteData.timeline];
    updated[index][field] = value;
    setInviteData(prev => ({ ...prev, timeline: updated }));
  };

  const addTimelineEvent = () => {
    setInviteData(prev => ({
      ...prev,
      timeline: [...prev.timeline, { time: '12:00', title: 'Ново събитие', desc: 'Описание' }]
    }));
  };

  const removeTimelineEvent = (index) => {
    const updated = inviteData.timeline.filter((_, i) => i !== index);
    setInviteData(prev => ({ ...prev, timeline: updated }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">Редактор на покана</h1>
          <p className="text-sm text-slate-500">Персонализирайте детайлите на вашето събитие</p>
        </div>
        <button
          onClick={onPreview}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-medium shadow-md hover:opacity-95 transition flex items-center justify-center space-x-2"
        >
          <Eye className="w-5 h-5" />
          <span>Прегледай Поканата</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Details */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Edit3 className="w-5 h-5 text-amber-600" />
            <span>Основни Данни</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Заглавие</label>
            <input 
              type="text" 
              value={inviteData.titleText}
              onChange={(e) => handleChange('titleText', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
              placeholder="напр. Сватбено Тържество"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Имена</label>
            <input 
              type="text" 
              value={inviteData.names}
              onChange={(e) => handleChange('names', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm font-semibold"
              placeholder="напр. Мария & Иван"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Дата</label>
              <input 
                type="date" 
                value={inviteData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Час</label>
              <input 
                type="time" 
                value={inviteData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Локация / Обект</label>
            <input 
              type="text" 
              value={inviteData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
              placeholder="напр. Ресторант Панорама"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Точен Адрес</label>
            <input 
              type="text" 
              value={inviteData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
              placeholder="напр. бул. Витоша 100, София"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Приветствено съобщение</label>
            <textarea 
              rows={3}
              value={inviteData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
            />
          </div>
        </div>

        {/* Style & Gift List Options */}
        <div className="space-y-6">
          {/* Style */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Palette className="w-5 h-5 text-amber-600" />
              <span>Дизайн и Цветове</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">Основен Акцентен Цвят</label>
              <div className="flex space-x-3">
                {['#D4AF37', '#E11D48', '#4F46E5', '#0D9488', '#9333EA', '#2563EB'].map((color) => (
                  <button
                    key={color}
                    onClick={() => handleChange('accentColor', color)}
                    className={`w-8 h-8 rounded-full border-2 transition ${
                      inviteData.accentColor === color ? 'border-slate-900 scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">Шрифт</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleChange('fontStyle', 'serif')}
                  className={`py-2 px-4 rounded-xl border text-center text-sm font-serif ${
                    inviteData.fontStyle === 'serif' ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold' : 'border-slate-200'
                  }`}
                >
                  Класически Serif
                </button>
                <button
                  onClick={() => handleChange('fontStyle', 'sans')}
                  className={`py-2 px-4 rounded-xl border text-center text-sm font-sans ${
                    inviteData.fontStyle === 'sans' ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold' : 'border-slate-200'
                  }`}
                >
                  Модерен Sans
                </button>
              </div>
            </div>
          </div>

          {/* Program Timeline */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-amber-600" />
                <span>Програма на събитието</span>
              </h3>
              <button 
                onClick={addTimelineEvent}
                className="text-xs font-semibold text-amber-600 hover:text-amber-700"
              >
                + Добави час
              </button>
            </div>

            <div className="space-y-3">
              {inviteData.timeline.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  <input 
                    type="text" 
                    value={item.time} 
                    onChange={(e) => handleTimelineChange(index, 'time', e.target.value)}
                    className="w-16 px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold"
                  />
                  <input 
                    type="text" 
                    value={item.title} 
                    onChange={(e) => handleTimelineChange(index, 'title', e.target.value)}
                    className="flex-1 px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                    placeholder="Заглавие"
                  />
                  <button 
                    onClick={() => removeTimelineEvent(index)}
                    className="text-slate-400 hover:text-red-500 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================== LIVE PREVIEW SECTION ==================== */
function PreviewSection({ 
  inviteData, 
  timeLeft, 
  isPlaying, 
  setIsPlaying, 
  rsvpData, 
  setRsvpData, 
  rsvpSubmitted, 
  setRsvpSubmitted,
  onEdit
}) {
  const [activeTab, setActiveTab] = useState('invite'); // invite, rsvp

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4 sm:px-6">
      
      {/* Top Banner Control Panel for preview mode */}
      <div className="max-w-md mx-auto mb-6 bg-slate-800 text-white p-3 rounded-2xl flex items-center justify-between shadow-xl border border-slate-700">
        <span className="text-xs text-slate-300 font-medium px-2">Режим преглед (Live Preview)</span>
        <button
          onClick={onEdit}
          className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs transition"
        >
          Обратно към Редактора
        </button>
      </div>

      {/* Main Digital Invitation Container (Simulated Web App view) */}
      <div className={`max-w-md mx-auto bg-gradient-to-b ${inviteData.bgGradient} rounded-3xl shadow-2xl overflow-hidden border border-white/40 relative font-${inviteData.fontStyle}`}>
        
        {/* Floating Audio Player Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center shadow-2xl border border-amber-500/30 animate-pulse hover:scale-110 transition"
          title="Включи / Изключи фонова музика"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Music className="w-5 h-5" />}
        </button>

        {/* HERO CARD HEADER */}
        <div className="relative pt-12 pb-8 px-6 text-center space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-white/70 backdrop-blur-md text-xs tracking-widest uppercase font-sans font-semibold text-slate-700 shadow-sm">
            {inviteData.titleText}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            {inviteData.names}
          </h1>

          <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
            {inviteData.description}
          </p>
        </div>

        {/* COUNTDOWN TIMER */}
        <div className="px-6 py-4">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/60 text-center">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-sans font-semibold">Остават до събитието</span>
            <div className="grid grid-cols-4 gap-2 mt-3 font-sans">
              <div className="bg-slate-900 text-white p-2 rounded-xl">
                <span className="text-xl font-bold block">{timeLeft.days}</span>
                <span className="text-[10px] text-slate-400">дни</span>
              </div>
              <div className="bg-slate-900 text-white p-2 rounded-xl">
                <span className="text-xl font-bold block">{timeLeft.hours}</span>
                <span className="text-[10px] text-slate-400">часа</span>
              </div>
              <div className="bg-slate-900 text-white p-2 rounded-xl">
                <span className="text-xl font-bold block">{timeLeft.minutes}</span>
                <span className="text-[10px] text-slate-400">мин</span>
              </div>
              <div className="bg-slate-900 text-white p-2 rounded-xl">
                <span className="text-xl font-bold block">{timeLeft.seconds}</span>
                <span className="text-[10px] text-slate-400">сек</span>
              </div>
            </div>
          </div>
        </div>

        {/* DATE & LOCATION INFO */}
        <div className="px-6 py-4 space-y-3 font-sans">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/60 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase">Дата и час</p>
              <p className="text-sm font-bold text-slate-900">{inviteData.date} в {inviteData.time} ч.</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/60 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase">Локация</p>
                <p className="text-sm font-bold text-slate-900">{inviteData.location}</p>
                <p className="text-xs text-slate-500">{inviteData.address}</p>
              </div>
            </div>
          </div>

          {/* Simulated Google Maps Action Button */}
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(inviteData.location + ' ' + inviteData.address)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold text-center block shadow-md hover:bg-slate-800 transition"
          >
            Отвори в Google Maps Навигация ➔
          </a>
        </div>

        {/* PROGRAM TIMELINE */}
        {inviteData.timeline && inviteData.timeline.length > 0 && (
          <div className="px-6 py-6 font-sans">
            <h3 className="text-center font-serif text-xl font-bold text-slate-900 mb-6">
              Програма на Деня
            </h3>

            <div className="space-y-4 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-amber-300">
              {inviteData.timeline.map((item, idx) => (
                <div key={idx} className="relative flex items-start space-x-4 pl-2">
                  <div className="w-9 h-9 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center shrink-0 z-10 shadow">
                    {item.time}
                  </div>
                  <div className="bg-white/80 backdrop-blur-md p-3 rounded-xl flex-1 border border-white/60">
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    {item.desc && <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RSVP FORM SECTION */}
        <div className="px-6 py-8 bg-white/90 backdrop-blur-md border-t border-white/60 font-sans">
          <div className="text-center space-y-2 mb-6">
            <h3 className="font-serif text-2xl font-bold text-slate-900">Потвърдете Присъствие</h3>
            <p className="text-xs text-slate-500">Моля, отговорете до 1 август 2025 г.</p>
          </div>

          {rsvpSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-base">Благодарим ви!</h4>
              <p className="text-xs">Вашият отговор беше записан успешно. Очакваме ви!</p>
              <button
                onClick={() => setRsvpSubmitted(false)}
                className="text-xs font-semibold text-emerald-700 underline pt-2"
              >
                Редактирай отговора
              </button>
            </div>
          ) : (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setRsvpSubmitted(true);
              }} 
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Вашето Име и Фамилия</label>
                <input 
                  type="text" 
                  required
                  value={rsvpData.name}
                  onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                  placeholder="напр. Иван Иванов"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Ще присъствате ли?</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRsvpData({ ...rsvpData, status: 'attending' })}
                    className={`py-2.5 rounded-xl border text-xs font-bold transition ${
                      rsvpData.status === 'attending'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    Да, ще присъствам
                  </button>
                  <button
                    type="button"
                    onClick={() => setRsvpData({ ...rsvpData, status: 'declined' })}
                    className={`py-2.5 rounded-xl border text-xs font-bold transition ${
                      rsvpData.status === 'declined'
                        ? 'bg-rose-600 text-white border-rose-600 shadow'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    За съжаление не
                  </button>
                </div>
              </div>

              {rsvpData.status === 'attending' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Брой гости (включително вас)</label>
                    <select
                      value={rsvpData.guestsCount}
                      onChange={(e) => setRsvpData({ ...rsvpData, guestsCount: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    >
                      <option value={1}>1 човек</option>
                      <option value={2}>2 души</option>
                      <option value={3}>3 души</option>
                      <option value={4}>4 души (семейство)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Хранителни предпочитания / Алергии</label>
                    <input 
                      type="text" 
                      value={rsvpData.dietary}
                      onChange={(e) => setRsvpData({ ...rsvpData, dietary: e.target.value })}
                      placeholder="напр. Вегетарианско меню / Без глутен"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-sm shadow-md hover:opacity-95 transition"
              >
                Изпрати RSVP Потвърждение
              </button>
            </form>
          )}
        </div>

        {/* GIFT / BANK DETAILS */}
        {inviteData.bankIBAN && (
          <div className="p-6 bg-slate-50 border-t border-slate-200/60 font-sans text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <Gift className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-slate-900 text-base">Информация за Подаръци</h4>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
              {inviteData.giftMessage}
            </p>
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 select-all">
              IBAN: {inviteData.bankIBAN}
              <span className="block text-[10px] font-sans text-slate-400 mt-0.5">Титуляр: {inviteData.bankHolder}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* ==================== PRICING SECTION ==================== */
function PricingSection({ onChoose }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-serif font-bold text-slate-900">Прозрачни Цени</h1>
        <p className="text-slate-600">Без скрити такси. Плащате еднократно за събитието.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Basic Tier */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Базов</h3>
            <p className="text-xs text-slate-500">Перфектен за малки партита и рождени дни</p>
            <div className="text-4xl font-bold text-slate-900">
              39 <span className="text-base font-normal text-slate-500">лв.</span>
            </div>

            <ul className="space-y-3 text-sm text-slate-600 pt-4 border-t border-slate-100">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Дигитална интерактивна покана</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>До 50 гости</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>RSVP потвърждения</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Карта и GPS навигация</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onChoose}
            className="w-full py-3 rounded-xl border border-slate-900 text-slate-900 font-bold text-sm hover:bg-slate-900 hover:text-white transition"
          >
            Започни Сга
          </button>
        </div>

        {/* Premium Tier */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-2xl relative space-y-6 flex flex-col justify-between border border-amber-500/30">
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-rose-400 text-slate-900 text-[10px] font-extrabold uppercase px-4 py-1 rounded-full shadow">
            Най-популярен за сватби
          </span>

          <div className="space-y-4 pt-2">
            <h3 className="text-xl font-bold">Премиум</h3>
            <p className="text-xs text-slate-400">Пълен пакет за вашата перфектна сватба</p>
            <div className="text-4xl font-bold text-white">
              79 <span className="text-base font-normal text-slate-400">лв.</span>
            </div>

            <ul className="space-y-3 text-sm text-slate-300 pt-4 border-t border-slate-700">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Неограничен брой гости</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Фонова музика по избор</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Програма и Timeline на събитието</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Информация за подаръци / IBAN</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Експорт на RSVP в Excel/PDF</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onChoose}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-rose-400 text-slate-900 font-bold text-sm shadow-lg hover:opacity-95 transition"
          >
            Избери Премиум
          </button>
        </div>

        {/* VIP Custom Domain Tier */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">VIP Индивидуален</h3>
            <p className="text-xs text-slate-500">За тези, които искат персонален домейн</p>
            <div className="text-4xl font-bold text-slate-900">
              129 <span className="text-base font-normal text-slate-500">лв.</span>
            </div>

            <ul className="space-y-3 text-sm text-slate-600 pt-4 border-t border-slate-100">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Всичко от Премиум пакета</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Персонален линк (напр. maria-ivan.bg)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Фото галерия от сватбата след събитието</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Приоритетна поддръжка 24/7</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onChoose}
            className="w-full py-3 rounded-xl border border-slate-900 text-slate-900 font-bold text-sm hover:bg-slate-900 hover:text-white transition"
          >
            Свържи се с нас
          </button>
        </div>

      </div>
    </div>
  );
}