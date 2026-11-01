import React, { useState, useMemo } from 'react';
import { 
  Car, Search, ShieldCheck, Calculator, PhoneCall, Heart, 
  ArrowRightLeft, CheckCircle2, MapPin, Gauge, Calendar, Fuel, 
  X, ChevronRight, Check, Star, Sparkles, User, Menu, Phone,
  Building2, ArrowUpRight, Share2, Gem, Tag, RefreshCw, Layers,
  PlusCircle, Trash2, Settings, Edit3, Image, UploadCloud, Lock, Camera
} from 'lucide-react';

// --- HELPER FORMATTER ---
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
};

// --- DATA CABANG SHOWROOM ---
const SHOWROOM_LOCATIONS = [
  {
    id: 1,
    name: "Renura Mobilindo - Headquarter Jakarta",
    address: "Jl. Sultan Iskandar Muda No. 88, Arteri Pondok Indah, Jakarta Selatan 12240",
    city: "Jakarta Selatan",
    hours: "Senin - Minggu (08:00 - 18:00 WIB)",
    phone: "021-72998888",
    mapsUrl: "https://maps.google.com"
  },
  {
    id: 2,
    name: "Renura Mobilindo - Cabang Gading Serpong",
    address: "Bursa Otomotif Sunter & Serpong Block B No. 12, Gading Serpong, Tangerang",
    city: "Tangerang",
    hours: "Senin - Minggu (08:30 - 18:00 WIB)",
    phone: "021-54219900",
    mapsUrl: "https://maps.google.com"
  },
  {
    id: 3,
    name: "Renura Mobilindo - Cabang Surabaya",
    address: "Jl. Mayjen Sungkono No. 102, Banyu Urip, Kec. Sawahan, Surabaya",
    city: "Surabaya",
    hours: "Senin - Minggu (08:30 - 17:30 WIB)",
    phone: "031-56781234",
    mapsUrl: "https://maps.google.com"
  }
];

// --- DATA TIM MARKETING EXECUTIVE ---
const MARKETING_TEAM = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Senior Marketing Executive",
    whatsapp: "6281234567890",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
    rating: "5.0 (120+ Unit Terjual)"
  },
  {
    id: 2,
    name: "Siti Rahmawati",
    role: "Credit & Financing Specialist",
    whatsapp: "6281987654321",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    rating: "4.9 (Spesialis ACC DP Murah)"
  },
  {
    id: 3,
    name: "Deni Pratama",
    role: "Sales Consultant Trade-In",
    whatsapp: "6281311223344",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300",
    rating: "5.0 (Pakar Tukar Tambah)"
  }
];

// --- DATA STOK MOBIL INITIAL ---
const INITIAL_CARS = [
  {
    id: 1,
    name: "Suzuki Baleno Hatchback 1.4 Automatic 2018",
    brand: "Suzuki",
    type: "Hatchback",
    year: 2018,
    price: 156000000,
    tdp: 5000000,
    monthly: 4273000,
    tenorYears: 5,
    promoTag: "BEST SELLER",
    transmission: "Automatic",
    fuel: "Bensin",
    mileage: 48000,
    engineCc: 1400,
    location: "Jakarta",
    plate: "B (Genap)",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800",
    features: ["Keyless Entry", "Push Start Stop", "Digital AC", "Audio Touchscreen"]
  },
  {
    id: 2,
    name: "Daihatsu Terios 1.5 TX Automatic 2009",
    brand: "Daihatsu",
    type: "SUV",
    year: 2009,
    price: 105000000,
    tdp: 23000000,
    monthly: 3466000,
    tenorYears: 3,
    promoTag: "DP MURAH",
    transmission: "Automatic",
    fuel: "Bensin",
    mileage: 110000,
    engineCc: 1500,
    location: "Tangerang",
    plate: "B (Ganjil)",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
    features: ["Double Blower AC", "Alloy Wheels", "Power Window", "Foglamps"]
  },
  {
    id: 3,
    name: "Toyota Sienta 1.5 G Automatic 2017",
    brand: "Toyota",
    type: "MPV",
    year: 2017,
    price: 145000000,
    tdp: 5000000,
    monthly: 4080000,
    tenorYears: 5,
    promoTag: "PROMO PILIHAN",
    transmission: "Automatic",
    fuel: "Bensin",
    mileage: 62000,
    engineCc: 1500,
    location: "Jakarta Selatan",
    plate: "B (Genap)",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
    features: ["Sliding Door Electric", "Headunit Touchscreen", "Rear AC", "Steering Switch"]
  },
  {
    id: 4,
    name: "Suzuki Ertiga 1.4 GL Manual 2017",
    brand: "Suzuki",
    type: "MPV",
    year: 2017,
    price: 126000000,
    tdp: 0,
    monthly: 3600000,
    tenorYears: 5,
    promoTag: "NOVEMBER SALE !!",
    transmission: "Manual",
    fuel: "Bensin",
    mileage: 70000,
    engineCc: 1400,
    location: "Bekasi",
    plate: "B (Ganjil)",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800",
    features: ["Double Blower AC", "Audio Steering", "Dual SRS Airbag", "Sensor Parkir"]
  },
  {
    id: 5,
    name: "Honda BR-V 1.5 E Prestige Automatic 2023",
    brand: "Honda",
    type: "SUV",
    year: 2023,
    price: 215000000,
    tdp: 5000000,
    monthly: 6094000,
    tenorYears: 5,
    promoTag: "LIKE NEW",
    transmission: "Automatic",
    fuel: "Bensin",
    mileage: 18000,
    engineCc: 1500,
    location: "Jakarta Barat",
    plate: "B (Genap)",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800",
    features: ["Honda Sensing", "Leather Seat", "Auto AC", "LED Headlight"]
  },
  {
    id: 6,
    name: "Toyota Agya 1.0 G TRD Automatic 2014",
    brand: "Toyota",
    type: "Hatchback",
    year: 2014,
    price: 95000000,
    tdp: 5000000,
    monthly: 2745000,
    tenorYears: 5,
    promoTag: "HEMAT IRIT",
    transmission: "Automatic",
    fuel: "Bensin",
    mileage: 85000,
    engineCc: 1000,
    location: "Depok",
    plate: "B (Ganjil)",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800",
    features: ["TRD Bodykit", "Power Window", "Electric Mirror", "Alloy Wheel"]
  },
  {
    id: 7,
    name: "Honda Brio 1.2 E Satya Automatic 2017",
    brand: "Honda",
    type: "Hatchback",
    year: 2017,
    price: 127000000,
    tdp: 0,
    monthly: 3640000,
    tenorYears: 5,
    promoTag: "NOVEMBER SALE !!",
    transmission: "Automatic",
    fuel: "Bensin",
    mileage: 55000,
    engineCc: 1200,
    location: "Jakarta Timur",
    plate: "B (Genap)",
    image: "https://images.unsplash.com/photo-1609521263047-f8d205293f24?auto=format&fit=crop&q=80&w=800",
    features: ["ECO Indicator", "Audio System", "Dual Airbags", "Rear Wiper"]
  },
  {
    id: 8,
    name: "BYD M6 Superior Automatic 2024",
    brand: "BYD",
    type: "Hatchback",
    year: 2024,
    price: 325000000,
    tdp: 50000000,
    monthly: 7811000,
    tenorYears: 5,
    promoTag: "EV FUTURISTIC",
    transmission: "Automatic",
    fuel: "Listrik (EV)",
    mileage: 4000,
    engineCc: 0,
    location: "Jakarta Pusat",
    plate: "B (Ganjil)",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800",
    features: ["Full Electric EV", "Panoramic Sunroof", "Rotatable Screen 12.8 inch", "NFC Key"]
  },
  {
    id: 9,
    name: "Toyota Hilux Pick Up 2.4 E 4x4 Manual 2021",
    brand: "Toyota",
    type: "Pick Up",
    year: 2021,
    price: 295000000,
    tdp: 25000000,
    monthly: 7120000,
    tenorYears: 5,
    promoTag: "NIAGA TANGGUH",
    transmission: "Manual",
    fuel: "Diesel",
    mileage: 38000,
    engineCc: 2400,
    location: "Jakarta",
    plate: "B (Genap)",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
    features: ["4WD Mode Select", "Heavy Duty Suspension", "Bak Cargo Rapi", "Dual Airbag"]
  },
  {
    id: 10,
    name: "Mitsubishi Colt L300 Euro 4 Pick Up 2023",
    brand: "Mitsubishi",
    type: "Pick Up",
    year: 2023,
    price: 165000000,
    tdp: 10000000,
    monthly: 4210000,
    tenorYears: 4,
    promoTag: "RAJANYA NIAGA",
    transmission: "Manual",
    fuel: "Diesel",
    mileage: 12000,
    engineCc: 2200,
    location: "Tangerang",
    plate: "B (Ganjil)",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800",
    features: ["Kapasitas Kargo Luas", "Mesin Euro 4 Irit", "Power Steering", "Kondisi Siap Kerja"]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('stok');
  const [cars, setCars] = useState(INITIAL_CARS);
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Showroom Settings State
  const [showroomSettings, setShowroomSettings] = useState({
    name: "Renura Mobilindo",
    tagline: "Pusat Jual Beli & Tukar Tambah Mobil Bekas Berkualitas",
    whatsapp: "6281234567890",
    headquarterAddress: "Jl. Sultan Iskandar Muda No. 88, Arteri Pondok Indah, Jakarta Selatan"
  });

  // Admin Modal & Auth State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [adminActiveSection, setAdminActiveSection] = useState('cars'); // 'cars' or 'showroom'
  const [showroomForm, setShowroomForm] = useState(showroomSettings);

  // Add/Edit Car State
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [dpInputMode, setDpInputMode] = useState('rupiah'); // 'rupiah' or 'percent'
  const [carForm, setCarForm] = useState({
    name: '',
    brand: 'Toyota',
    type: 'SUV',
    year: 2022,
    price: 150000000,
    tdp: 30000000,
    dpPercent: 20,
    monthly: 3200000,
    interestRate: 4.8,
    promoTag: 'SPECIAL PROMO',
    transmission: 'Automatic',
    fuel: 'Bensin',
    mileage: 40000,
    location: 'Jakarta',
    plate: 'B (Genap)',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    features: ['Keyless', 'AC Double', 'Audio Touchscreen', 'Power Steering']
  });

  // Manual Credit Calculator State
  const [calcPrice, setCalcPrice] = useState(150000000);
  const [calcDpPercent, setCalcDpPercent] = useState(20);
  const [calcTdpAmount, setCalcTdpAmount] = useState(30000000);
  const [calcTenorYears, setCalcTenorYears] = useState(5);
  const [calcInterestRate, setCalcInterestRate] = useState(4.8);

  const handleCalcPriceChange = (val) => {
    const p = Number(val);
    setCalcPrice(p);
    const tdp = (p * calcDpPercent) / 100;
    setCalcTdpAmount(Math.round(tdp));
  };

  const handleCalcTdpAmountChange = (val) => {
    const tdp = Number(val);
    setCalcTdpAmount(tdp);
    if (calcPrice > 0) {
      const pct = (tdp / calcPrice) * 100;
      setCalcDpPercent(Number(pct.toFixed(1)));
    }
  };

  const handleCalcPercentChange = (val) => {
    const pct = Number(val);
    setCalcDpPercent(pct);
    const tdp = (calcPrice * pct) / 100;
    setCalcTdpAmount(Math.round(tdp));
  };

  const calcPlafon = useMemo(() => {
    return Math.max(0, calcPrice - calcTdpAmount);
  }, [calcPrice, calcTdpAmount]);

  const calcMonthlyInstallment = useMemo(() => {
    const months = calcTenorYears * 12;
    if (months <= 0 || calcPlafon <= 0) return 0;
    const totalInterestRate = (calcInterestRate / 100) * calcTenorYears;
    const totalInterestAmount = calcPlafon * totalInterestRate;
    const totalDebt = calcPlafon + totalInterestAmount;
    return Math.round(totalDebt / months);
  }, [calcPlafon, calcTenorYears, calcInterestRate]);

  // Filtered cars
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchQuery = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = selectedType === 'all' || car.type === selectedType;
      return matchQuery && matchType;
    });
  }, [cars, searchQuery, selectedType]);

  // Admin Actions
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPin === '1234') {
      setIsAdminAuthenticated(true);
      setShowroomForm(showroomSettings);
    } else {
      alert('PIN Salah! Gunakan PIN: 1234');
    }
  };

  const handleSaveShowroomSettings = (e) => {
    e.preventDefault();
    setShowroomSettings(showroomForm);
    setIsAdminOpen(false);
  };

  const handleOpenAddModal = () => {
    setEditingCar(null);
    setCarForm({
      name: '',
      brand: 'Toyota',
      type: 'SUV',
      year: 2022,
      price: 150000000,
      tdp: 30000000,
      dpPercent: 20,
      monthly: 3200000,
      interestRate: 4.8,
      promoTag: 'SPECIAL PROMO',
      transmission: 'Automatic',
      fuel: 'Bensin',
      mileage: 40000,
      location: 'Jakarta',
      plate: 'B (Genap)',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      features: ['Keyless', 'AC Double', 'Audio Touchscreen', 'Power Steering']
    });
    setIsAddCarModalOpen(true);
  };

  const handleOpenEditModal = (car) => {
    setEditingCar(car);
    const dpPct = car.price > 0 ? Number(((car.tdp / car.price) * 100).toFixed(1)) : 20;
    setCarForm({
      ...car,
      dpPercent: dpPct,
      interestRate: 4.8
    });
    setIsAddCarModalOpen(true);
  };

  const handleAdminPriceChange = (val) => {
    const p = Number(val);
    const tdp = (p * carForm.dpPercent) / 100;
    const plafon = Math.max(0, p - tdp);
    const months = 60; // 5 years default
    const monthly = Math.round((plafon + (plafon * (carForm.interestRate / 100) * 5)) / months);
    setCarForm(prev => ({ ...prev, price: p, tdp: Math.round(tdp), monthly }));
  };

  const handleAdminTdpRupiahChange = (val) => {
    const tdp = Number(val);
    const pct = carForm.price > 0 ? Number(((tdp / carForm.price) * 100).toFixed(1)) : 20;
    const plafon = Math.max(0, carForm.price - tdp);
    const months = 60;
    const monthly = Math.round((plafon + (plafon * (carForm.interestRate / 100) * 5)) / months);
    setCarForm(prev => ({ ...prev, tdp, dpPercent: pct, monthly }));
  };

  const handleAdminDpPercentChange = (val) => {
    const pct = Number(val);
    const tdp = (carForm.price * pct) / 100;
    const plafon = Math.max(0, carForm.price - tdp);
    const months = 60;
    const monthly = Math.round((plafon + (plafon * (carForm.interestRate / 100) * 5)) / months);
    setCarForm(prev => ({ ...prev, dpPercent: pct, tdp: Math.round(tdp), monthly }));
  };

  const handleAdminInterestRateChange = (val) => {
    const rate = Number(val);
    const plafon = Math.max(0, carForm.price - carForm.tdp);
    const months = 60;
    const monthly = Math.round((plafon + (plafon * (rate / 100) * 5)) / months);
    setCarForm(prev => ({ ...prev, interestRate: rate, monthly }));
  };

  const handleSaveCar = (e) => {
    e.preventDefault();
    if (editingCar) {
      setCars(cars.map(c => c.id === editingCar.id ? { ...carForm, id: c.id } : c));
    } else {
      const newCar = {
        ...carForm,
        id: Date.now()
      };
      setCars([newCar, ...cars]);
    }
    setIsAddCarModalOpen(false);
  };

  const handleDeleteCar = (id) => {
    if (window.confirm('Yakin ingin menghapus unit mobil ini dari katalog?')) {
      setCars(cars.filter(c => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white pb-20">
      
      {/* HEADER NAVBAR RENURA MOBILINDO */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('stok')}>
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden flex items-center justify-center shadow-lg shadow-blue-600/10 p-1">
              <img 
                src="object:image{name=Logo Otomotif Renura Mobilindo Premium.png}" 
                alt="Renura Mobilindo Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 leading-tight">
                {showroomSettings.name}
              </h1>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                {showroomSettings.tagline}
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button 
              onClick={() => setActiveTab('stok')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'stok' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Katalog Mobil
            </button>
            <button 
              onClick={() => setActiveTab('kalkulator')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'kalkulator' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Kalkulator Kredit
            </button>
            <button 
              onClick={() => setActiveTab('layanan')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'layanan' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Layanan & Promo
            </button>
            <button 
              onClick={() => setActiveTab('kontak')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'kontak' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Showroom & Tim
            </button>
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            <a 
              href={`https://wa.me/${showroomSettings.whatsapp}?text=Halo%20${encodeURIComponent(showroomSettings.name)},%20saya%20tertarik%20dengan%20mobil%20bekas%20berkualitas`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Hotline WhatsApp</span>
            </a>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2.5 rounded-xl bg-slate-100 text-slate-700">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2">
            <button 
              onClick={() => { setActiveTab('stok'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold ${activeTab === 'stok' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              Katalog Mobil
            </button>
            <button 
              onClick={() => { setActiveTab('kalkulator'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold ${activeTab === 'kalkulator' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              Kalkulator Kredit
            </button>
            <button 
              onClick={() => { setActiveTab('layanan'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold ${activeTab === 'layanan' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              Layanan & Promo
            </button>
            <button 
              onClick={() => { setActiveTab('kontak'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold ${activeTab === 'kontak' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              Showroom & Tim
            </button>
          </div>
        )}
      </header>

      {/* HERO BANNER SHOWROOM */}
      <div className="relative bg-slate-900 text-white overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1600" 
            alt="Showroom" 
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* LOGO DI HERO BANNER */}
            <div className="mb-6 p-2.5 bg-slate-900/80 border border-slate-700/80 rounded-2xl inline-block shadow-2xl backdrop-blur-md">
              <img 
                src="object:image{name=Logo Otomotif Renura Mobilindo Premium.png}" 
                alt="Renura Mobilindo" 
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-4">
              Pusat Jual Beli & Tukar Tambah <span className="text-blue-400">Mobil Bekas Berkualitas</span>
            </h2>
            
            <p className="text-sm sm:text-base text-slate-300 font-medium mb-8 leading-relaxed">
              Temukan ratusan unit mobil impian Anda dengan jaminan mesin prima, dokumen lengkap terverifikasi, serta simulasi kredit fleksibel.
            </p>

            <div className="flex flex-wrap gap-2 text-[11px] font-bold">
              <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white">✓ JUAL / BELI</span>
              <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white">✓ TUKAR TAMBAH</span>
              <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white">✓ KREDIT & CASH TEMPO</span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/30 backdrop-blur-md border border-emerald-400/30 text-emerald-300">✓ DANA TUNAI BPKB</span>
            </div>
          </div>
        </div>
      </div>

      {/* TAB STOK */}
      {activeTab === 'stok' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-slate-200 mb-8 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Cari merk, model, atau tahun mobil..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-blue-600 transition"
                />
              </div>

              <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                {['all', 'SUV', 'MPV', 'Hatchback', 'Pick Up'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${selectedType === type ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {type === 'all' ? 'Semua Jenis' : type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <div key={car.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-slate-200 flex flex-col group relative">
                
                {isAdminAuthenticated && (
                  <div className="absolute top-3 right-3 z-30 flex space-x-1 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-slate-200">
                    <button 
                      onClick={() => handleOpenEditModal(car)}
                      className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                      title="Edit Unit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteCar(car.id)}
                      className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition"
                      title="Hapus Unit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 cursor-pointer" onClick={() => setSelectedCar(car)}>
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-lg bg-amber-400 text-slate-950 font-black text-[10px] tracking-wider uppercase shadow-md">
                      {car.promoTag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-bold text-white bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-xl">
                    <span>{car.year} • {car.transmission}</span>
                    <span>{car.location}</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      onClick={() => setSelectedCar(car)}
                      className="text-sm sm:text-base font-black text-slate-900 group-hover:text-blue-600 transition cursor-pointer line-clamp-1 mb-2"
                    >
                      {car.name}
                    </h3>

                    <div className="mb-4">
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Harga Cash / OTR</p>
                      <p className="text-lg font-black text-blue-600">{formatRupiah(car.price)}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 mb-4 text-xs">
                      <div>
                        <span className="text-slate-400 font-semibold block text-[10px]">TDP Promo</span>
                        <span className="font-bold text-slate-900">{formatRupiah(car.tdp)}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block text-[10px]">Angsuran / Bln</span>
                        <span className="font-bold text-emerald-600">{formatRupiah(car.monthly)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-3 border-t border-slate-100">
                    <button 
                      onClick={() => setSelectedCar(car)}
                      className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/25 transition"
                    >
                      Lihat Detail & Simulasi
                    </button>
                    <a 
                      href={`https://wa.me/${showroomSettings.whatsapp}?text=Halo%20${encodeURIComponent(showroomSettings.name)},%20saya%20minat%20dengan%20unit%20${encodeURIComponent(car.name)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition shadow-md"
                      title="Chat WhatsApp"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </main>
      )}

      {/* TAB KALKULATOR */}
      {activeTab === 'kalkulator' && (
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
            <div className="text-center max-w-lg mx-auto mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                <Calculator className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Kalkulator Simulasi Kredit</h2>
              <p className="text-xs text-slate-500 mt-1">Hitung estimasi angsuran bulanan mobil impian Anda secara mandiri & akurat.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Harga OTR Mobil (Rp)</label>
                  <input 
                    type="number"
                    value={calcPrice}
                    onChange={(e) => handleCalcPriceChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Uang Muka / TDP (Rp)</label>
                    <input 
                      type="number"
                      value={calcTdpAmount}
                      onChange={(e) => handleCalcTdpAmountChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Persen DP (%)</label>
                    <input 
                      type="number"
                      step="0.1"
                      value={calcDpPercent}
                      onChange={(e) => handleCalcPercentChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Tenor Kredit</label>
                    <select 
                      value={calcTenorYears}
                      onChange={(e) => setCalcTenorYears(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold focus:outline-none focus:border-blue-600"
                    >
                      <option value={1}>1 Tahun (12 Bln)</option>
                      <option value={2}>2 Tahun (24 Bln)</option>
                      <option value={3}>3 Tahun (36 Bln)</option>
                      <option value={4}>4 Tahun (48 Bln)</option>
                      <option value={5}>5 Tahun (60 Bln)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Bunga (% / Tahun)</label>
                    <input 
                      type="number"
                      step="0.1"
                      value={calcInterestRate}
                      onChange={(e) => setCalcInterestRate(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 text-white rounded-3xl p-6 flex flex-col justify-between shadow-xl">
                <div>
                  <h3 className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-4">Rincian Pembiayaan Kredit</h3>
                  
                  <div className="space-y-3 text-xs mb-6">
                    <div className="flex justify-between border-b border-blue-800 pb-2">
                      <span className="text-blue-200">Harga Mobil (OTR)</span>
                      <span className="font-bold">{formatRupiah(calcPrice)}</span>
                    </div>
                    <div className="flex justify-between border-b border-blue-800 pb-2">
                      <span className="text-blue-200">Total Uang Muka (TDP)</span>
                      <span className="font-bold">{formatRupiah(calcTdpAmount)} ({calcDpPercent}%)</span>
                    </div>
                    <div className="flex justify-between border-b border-blue-800 pb-2">
                      <span className="text-blue-200">Plafon Hutang (Pokok)</span>
                      <span className="font-bold">{formatRupiah(calcPlafon)}</span>
                    </div>
                    <div className="flex justify-between border-b border-blue-800 pb-2">
                      <span className="text-blue-200">Tenor & Bunga</span>
                      <span className="font-bold">{calcTenorYears} Tahun ({calcInterestRate}%/thn)</span>
                    </div>
                  </div>

                  <div className="bg-blue-800/80 rounded-2xl p-4 mb-4">
                    <span className="text-[10px] text-blue-300 uppercase font-bold block mb-1">Estimasi Angsuran / Bulan</span>
                    <span className="text-2xl sm:text-3xl font-black text-amber-400">{formatRupiah(calcMonthlyInstallment)}</span>
                  </div>
                </div>

                <a 
                  href={`https://wa.me/${showroomSettings.whatsapp}?text=Halo%20${encodeURIComponent(showroomSettings.name)},%20saya%20ingin%20pengajuan%20kredit%20dengan%20hitungan:%0A-%20Harga:%20${formatRupiah(calcPrice)}%0A-%20TDP:%20${formatRupiah(calcTdpAmount)}%0A-%20Tenor:%20${calcTenorYears}%20Tahun%0A-%20Cicilan:%20${formatRupiah(calcMonthlyInstallment)}/bln`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl text-center shadow-lg transition block"
                >
                  Ajukan Kredit Sesuai Hitungan Ini
                </a>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* TAB LAYANAN */}
      {activeTab === 'layanan' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-3">Layanan & Fasilitas Unggulan</h2>
            <p className="text-xs sm:text-sm text-slate-500">Kami hadir memberikan solusi lengkap kebutuhan otomotif Anda dengan transparansi dan keamanan terjamin.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-2">Jual & Beli Mobil Bekas</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Semua unit melalui inspeksi ketat 150+ titik (bebas banjir, bebas tabrak besar, keaslian dokumen STNK & BPKB 100%).
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <ArrowRightLeft className="w-7 h-7" />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-2">Tukar Tambah (Trade-In)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Taksiran harga mobil lama Anda tertinggi di pasaran! Proses cepat, bisa langsung tukar dengan unit baru di showroom kami.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-2">Dana Tunai Jaminan BPKB</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Butuh dana cepat? Jaminkan BPKB mobil Anda dengan pencairan tinggi, bunga ringan, dan proses resmi aman.
              </p>
            </div>
          </div>
        </main>
      )}

      {/* TAB KONTAK & TIM */}
      {activeTab === 'kontak' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-3">Cabang Showroom & Tim Marketing</h2>
            <p className="text-xs sm:text-sm text-slate-500">Kunjungi cabang terdekat kami atau hubungi Sales Executive resmi kami.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {SHOWROOM_LOCATIONS.map((loc) => (
              <div key={loc.id} className="bg-white p-6 rounded-3xl shadow-lg border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{loc.city}</span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 mb-2">{loc.name}</h3>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">{loc.address}</p>
                  <p className="text-[11px] font-bold text-slate-700 mb-1">🕒 {loc.hours}</p>
                  <p className="text-[11px] font-bold text-slate-700 mb-4">📞 {loc.phone}</p>
                </div>
                <a 
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 rounded-xl text-xs font-bold text-center transition flex items-center justify-center space-x-2"
                >
                  <span>Buka Google Maps</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-black text-slate-900 text-center mb-8">Tim Sales & Credit Advisor</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {MARKETING_TEAM.map((team) => (
                <div key={team.id} className="bg-white p-6 rounded-3xl shadow-lg border border-slate-200 text-center">
                  <img src={team.avatar} alt={team.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4 shadow-md border-2 border-blue-600" />
                  <h4 className="text-base font-black text-slate-900 mb-1">{team.name}</h4>
                  <p className="text-xs font-bold text-blue-600 mb-2">{team.role}</p>
                  <p className="text-[11px] text-slate-500 mb-4">⭐ {team.rating}</p>
                  <a 
                    href={`https://wa.me/${team.whatsapp}?text=Halo%20${encodeURIComponent(team.name)},%20saya%20ingin%20berkonsultasi%20pembelian%20mobil%20di%20${encodeURIComponent(showroomSettings.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>Chat WhatsApp</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* MODAL DETAIL UNIT */}
      {selectedCar && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative my-auto">
            
            <button 
              onClick={() => setSelectedCar(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-900/60 text-white flex items-center justify-center hover:bg-slate-900 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video bg-slate-900">
              <img src={selectedCar.image} alt={selectedCar.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 bg-amber-400 text-slate-950 px-3 py-1 rounded-lg text-xs font-black uppercase">
                {selectedCar.promoTag}
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">{selectedCar.name}</h2>
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600 mb-6 pb-4 border-b border-slate-100">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-blue-600" /> {selectedCar.year}</span>
                <span className="flex items-center gap-1"><Gauge className="w-4 h-4 text-blue-600" /> {selectedCar.mileage?.toLocaleString()} KM</span>
                <span className="flex items-center gap-1"><Fuel className="w-4 h-4 text-blue-600" /> {selectedCar.fuel}</span>
                <span className="flex items-center gap-1"><Car className="w-4 h-4 text-blue-600" /> {selectedCar.transmission}</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-blue-600" /> {selectedCar.location} ({selectedCar.plate})</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Harga Cash / OTR</span>
                  <span className="text-xl font-black text-blue-600">{formatRupiah(selectedCar.price)}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Estimasi TDP</span>
                  <span className="text-xl font-black text-slate-900">{formatRupiah(selectedCar.tdp)}</span>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">Fitur & Spesifikasi Unggulan</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedCar.features?.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-xl">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <a 
                  href={`https://wa.me/${showroomSettings.whatsapp}?text=Halo%20${encodeURIComponent(showroomSettings.name)},%20saya%20ingin%20survei%20unit%20${encodeURIComponent(selectedCar.name)}%20harga%20${formatRupiah(selectedCar.price)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-xs text-center shadow-lg transition flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Chat WhatsApp Sekarang</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ADMIN TAMBAH / EDIT UNIT */}
      {isAddCarModalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-auto">
            <button onClick={() => setIsAddCarModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-slate-900 mb-1">
              {editingCar ? 'Edit Data Unit Mobil' : 'Tambah Unit Mobil Baru'}
            </h3>
            <p className="text-xs text-slate-500 mb-6">Lengkapi spesifikasi unit yang akan dipublish ke katalog.</p>

            <form onSubmit={handleSaveCar} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Judul Mobil Lengkap</label>
                <input 
                  type="text" 
                  required
                  value={carForm.name}
                  onChange={(e) => setCarForm({ ...carForm, name: e.target.value })}
                  placeholder="Misal: Toyota Avanza 1.3 G Manual 2021" 
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Merk</label>
                  <select 
                    value={carForm.brand}
                    onChange={(e) => setCarForm({ ...carForm, brand: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-600"
                  >
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Suzuki">Suzuki</option>
                    <option value="Daihatsu">Daihatsu</option>
                    <option value="Mitsubishi">Mitsubishi</option>
                    <option value="Wuling">Wuling</option>
                    <option value="BYD">BYD</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Nissan">Nissan</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Jenis Bodi</label>
                  <select 
                    value={carForm.type}
                    onChange={(e) => setCarForm({ ...carForm, type: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-600"
                  >
                    <option value="SUV">SUV</option>
                    <option value="MPV">MPV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Pick Up">Pick Up</option>
                    <option value="Sedan">Sedan</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Tahun</label>
                  <input 
                    type="number" 
                    required
                    value={carForm.year}
                    onChange={(e) => setCarForm({ ...carForm, year: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Harga Cash (Rp)</label>
                  <input 
                    type="number" 
                    required
                    value={carForm.price}
                    onChange={(e) => handleAdminPriceChange(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700 block">TDP</label>
                    <button 
                      type="button"
                      onClick={() => setDpInputMode(dpInputMode === 'rupiah' ? 'percent' : 'rupiah')}
                      className="text-[9px] font-bold text-blue-600 hover:underline"
                    >
                      {dpInputMode === 'rupiah' ? 'ke %' : 'ke Rp'}
                    </button>
                  </div>
                  {dpInputMode === 'rupiah' ? (
                    <input 
                      type="number" 
                      required
                      value={carForm.tdp}
                      onChange={(e) => handleAdminTdpRupiahChange(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-600"
                    />
                  ) : (
                    <input 
                      type="number" 
                      step="0.1"
                      required
                      value={carForm.dpPercent}
                      onChange={(e) => handleAdminDpPercentChange(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-600"
                    />
                  )}
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Bunga (%/Thn)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    required
                    value={carForm.interestRate}
                    onChange={(e) => handleAdminInterestRateChange(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Estimasi Cicilan per Bulan (Rp)</label>
                <input 
                  type="number" 
                  required
                  value={carForm.monthly}
                  onChange={(e) => setCarForm({ ...carForm, monthly: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Foto Unit (URL atau Unggah File)</label>
                <div className="flex gap-2 mb-2">
                  <input 
                    type="text" 
                    value={carForm.image}
                    onChange={(e) => setCarForm({ ...carForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..." 
                    className="flex-1 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-600"
                  />
                  <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1 transition">
                    <UploadCloud className="w-4 h-4" />
                    <span>Galeri</span>
                    <input type="file" accept="image/*" onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setCarForm(prev => ({ ...prev, image: reader.result }));
                        reader.readAsDataURL(file);
                      }
                    }} className="hidden" />
                  </label>
                </div>
                {carForm.image && (
                  <div className="w-full h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 mt-2">
                    <img src={carForm.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsAddCarModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition shadow-md"
                >
                  {editingCar ? 'Simpan Perubahan' : 'Publish Unit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ADMIN PANEL */}
      {isAdminOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-auto">
            <button onClick={() => setIsAdminOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-black text-center text-slate-900 mb-1">Panel Full Control Admin</h3>
            <p className="text-xs text-center text-slate-500 mb-6">Kelola unit mobil dan identitas showroom secara penuh</p>

            {!isAdminAuthenticated ? (
              <form onSubmit={handleAdminLogin} className="space-y-4 max-w-sm mx-auto">
                <input 
                  type="password"
                  maxLength={4}
                  placeholder="••••"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  className="w-full text-center text-2xl font-black tracking-widest px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600"
                />
                <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition">
                  Masuk Mode Admin (PIN: 1234)
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                  <button 
                    onClick={() => setAdminActiveSection('cars')}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${adminActiveSection === 'cars' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'}`}
                  >
                    Kelola Stok Mobil ({cars.length} Unit)
                  </button>
                  <button 
                    onClick={() => setAdminActiveSection('showroom')}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${adminActiveSection === 'showroom' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'}`}
                  >
                    Profil & Kontak Showroom
                  </button>
                </div>

                {adminActiveSection === 'cars' ? (
                  <div className="space-y-4">
                    <button 
                      onClick={() => handleOpenAddModal()}
                      className="w-full py-3 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 shadow-md transition flex items-center justify-center space-x-2"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Tambah Stok Mobil Baru</span>
                    </button>

                    <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                      {cars.map(c => (
                        <div key={c.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                          <div className="flex items-center space-x-3 truncate">
                            <img src={c.image} alt={c.name} className="w-10 h-10 rounded-lg object-cover" />
                            <div className="truncate">
                              <p className="font-black text-slate-900 truncate">{c.name}</p>
                              <p className="text-[10px] text-blue-600 font-bold">{formatRupiah(c.price)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 shrink-0">
                            <button onClick={() => handleOpenEditModal(c)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleDeleteCar(c.id)} className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSaveShowroomSettings} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Nama Showroom</label>
                      <input 
                        type="text" 
                        required
                        value={showroomForm.name}
                        onChange={(e) => setShowroomForm({ ...showroomForm, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Tagline Showroom</label>
                      <input 
                        type="text" 
                        required
                        value={showroomForm.tagline}
                        onChange={(e) => setShowroomForm({ ...showroomForm, tagline: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Nomor WhatsApp Utama (Format: 628...)</label>
                      <input 
                        type="text" 
                        required
                        value={showroomForm.whatsapp}
                        onChange={(e) => setShowroomForm({ ...showroomForm, whatsapp: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Alamat Headquarter</label>
                      <input 
                        type="text" 
                        required
                        value={showroomForm.headquarterAddress}
                        onChange={(e) => setShowroomForm({ ...showroomForm, headquarterAddress: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 shadow-md transition">
                      Simpan Perubahan Identitas Showroom
                    </button>
                  </form>
                )}

                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <button 
                    onClick={() => setIsAdminAuthenticated(false)}
                    className="text-xs text-rose-600 font-bold hover:underline"
                  >
                    Logout Admin
                  </button>
                  <button 
                    onClick={() => setIsAdminOpen(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition"
                  >
                    Tutup Panel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href={`https://wa.me/${showroomSettings.whatsapp}?text=Halo%20${encodeURIComponent(showroomSettings.name)},%20saya%20ingin%20bertanya%20stok%20mobil`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition duration-300 group"
        title="Chat WhatsApp Direct"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 {showroomSettings.name}. All rights reserved.</p>
          <button 
            onClick={() => setIsAdminOpen(true)} 
            className="text-[10px] text-slate-300 hover:text-slate-500 transition select-none"
          >
            • Admin Log
          </button>
        </div>
      </footer>

    </div>
  );
}