/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  Globe, 
  MapPin, 
  Share2, 
  UserPlus,
  ChevronRight,
  Facebook,
  Instagram,
  Youtube,
  Award,
  Users,
  Home,
  CheckCircle2,
  Send,
  ArrowRight,
  Star,
  Quote,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Papa from 'papaparse';

interface Listing {
  title: string;
  price: string;
  location: string;
  image: string;
  type: string;
  zaloLink?: string;
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSLM7XpvqFxjybz71TV6g16CWNRx6nDBWqsElsWfmZewOVWoX_Fhq-qC83ecO_hGdmipnI3Ys1UQYfK/pub?output=csv";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Fetch data from Google Sheets
    const fetchData = async () => {
      try {
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const mappedData = results.data.map((row: any) => ({
              title: row['Tên Dự Án'] || "Dự án mới",
              location: row['Địa chỉ'] || "Hà Nội",
              price: row['Diện tích'] ? `Diện tích: ${row['Diện tích']}` : "Liên hệ báo giá",
              image: row['Link ảnh'] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
              type: row['Số Căn'] ? `${row['Số Căn']} căn hộ` : "Dự án căn hộ",
              zaloLink: row['link nhóm zalo báo giá']
            }));
            setListings(mappedData);
            setLoading(false);
          },
          error: (error: any) => {
            console.error("Error parsing CSV:", error);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactInfo = {
    name: "ThanhHoa BĐS",
    title: "Luxury Real Estate Advisor",
    phone: "0888 326456",
    email: "thanhhoabds@flowtt.vn",
    website: "thanhoabds.flowtt.vn",
    office: "Indochina House, Hà Nội",
    zalo: "https://zalo.me/0888326456",
    avatar: "https://i.postimg.cc/KYSrS4Hb/tet-cua-nang-xinh-2026-gen-1-1773759812415.png",
    bio: "Kiến tạo giá trị thịnh vượng thông qua những bất động sản xứng tầm. Với ThanhHoa BĐS, mỗi giao dịch không chỉ là mua bán, mà là hành trình xây dựng tổ ấm và khẳng định vị thế."
  };

  const services = [
    { title: "Tư vấn đầu tư", desc: "Phân tích dòng tiền và tiềm năng tăng giá dài hạn cho các dự án tiềm năng." },
    { title: "Môi giới bất động sản", desc: "Kết nối người mua và người bán với các sản phẩm chất lượng, pháp lý minh bạch." },
    { title: "Marketing Online", desc: "Giải pháp truyền thông chuyên nghiệp cho các dự án và sản phẩm bất động sản." }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans selection:bg-[#C5A059]/20">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex flex-col">
            <span className={`font-serif text-2xl tracking-widest uppercase ${scrolled ? 'text-[#1A1A1A]' : 'text-white'}`}>ThanhHoa</span>
            <span className={`text-[10px] tracking-[0.3em] uppercase font-bold ${scrolled ? 'text-[#C5A059]' : 'text-[#C5A059]'}`}>Real Estate</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            {[
              { label: 'Dự án đang bán', id: 'listings' },
              { label: 'Dịch vụ', id: 'services' },
              { label: 'Về tôi', id: 'about' },
              { label: 'Liên hệ', id: 'contact' }
            ].map((item) => (
              <a key={item.id} href={`#${item.id}`} className={`text-xs uppercase tracking-widest font-semibold hover:text-[#C5A059] transition-colors ${scrolled ? 'text-slate-600' : 'text-white/80'}`}>
                {item.label}
              </a>
            ))}
            <a href={contactInfo.zalo} className="bg-[#C5A059] text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#B38F4D] transition-all shadow-lg shadow-[#C5A059]/20">
              Kết nối ngay
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1920" 
            alt="Luxury Home" 
            className="w-full h-full object-cover brightness-[0.6]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#FDFBF7]"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#C5A059] text-sm uppercase tracking-[0.4em] font-bold mb-6 block">Excellence in Real Estate</span>
            <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight mb-8">
              Nâng tầm giá trị <br /> <span className="italic">Sống thượng lưu</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <a href="#listings" className="bg-white text-[#1A1A1A] px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#C5A059] hover:text-white transition-all">
                Xem bộ sưu tập
              </a>
              <a href={contactInfo.zalo} className="border border-white/30 text-white px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white/10 backdrop-blur-sm transition-all">
                Tư vấn trực tiếp
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent"></div>
        </div>
      </section>

      {/* Profile Intro */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={contactInfo.avatar} 
                alt={contactInfo.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl border border-[#FDFBF7] hidden md:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#C5A059]/10 p-3 rounded-full text-[#C5A059]">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1A1A1A]">05+</p>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Năm kinh nghiệm</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-[#C5A059]/10 p-3 rounded-full text-[#C5A059]">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1A1A1A]">500+</p>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Khách hàng tin tưởng</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#C5A059] text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Về tôi</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
              Người đồng hành cùng <br /> <span className="italic">Thành công của bạn</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {contactInfo.bio}
            </p>
            <div className="space-y-4 mb-10">
              {services.map((s, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 text-[#C5A059]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{s.title}</h4>
                    <p className="text-sm text-slate-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href={contactInfo.zalo} className="inline-flex items-center gap-3 text-[#1A1A1A] font-bold uppercase text-xs tracking-[0.2em] group">
              Tìm hiểu thêm <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform text-[#C5A059]" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#C5A059] text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Dịch vụ chuyên nghiệp</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Giải pháp <span className="italic">Toàn diện</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Chúng tôi cung cấp các dịch vụ chuyên sâu nhằm tối ưu hóa giá trị tài sản và mang lại lợi ích cao nhất cho khách hàng.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#FDFBF7] p-10 rounded-3xl border border-slate-100 hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-[#C5A059]/10 rounded-2xl flex items-center justify-center text-[#C5A059] mb-8 group-hover:bg-[#C5A059] group-hover:text-white transition-all">
                  {i === 0 ? <Award className="w-7 h-7" /> : i === 1 ? <Home className="w-7 h-7" /> : <Globe className="w-7 h-7" />}
                </div>
                <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section id="listings" className="py-24 bg-[#1A1A1A] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[#C5A059] text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Dự án đang bán</span>
              <h2 className="font-serif text-4xl md:text-5xl">Bất động sản <span className="italic">Nổi bật</span></h2>
            </div>
            <a href="#" className="text-[#C5A059] font-bold uppercase text-xs tracking-widest border-b border-[#C5A059]/30 pb-2 hover:border-[#C5A059] transition-all">
              Xem tất cả dự án
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-white/40">
                <Loader2 className="w-12 h-12 animate-spin mb-4" />
                <p className="uppercase tracking-widest text-xs font-bold">Đang tải dữ liệu dự án...</p>
              </div>
            ) : listings.length > 0 ? (
              listings.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                  onClick={() => item.zaloLink && window.open(item.zaloLink, '_blank')}
                >
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-[#C5A059] text-[10px] uppercase tracking-widest font-bold mb-2">{item.type}</p>
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-white/60 text-xs flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> {item.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <span className="text-lg font-serif italic text-[#C5A059]">{item.price}</span>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#C5A059] group-hover:border-[#C5A059] transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-white/40">
                <p className="uppercase tracking-widest text-xs font-bold">Không tìm thấy dự án nào.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-6 bg-[#FDFBF7]">
        <div className="max-w-3xl mx-auto text-center">
          <Quote className="w-12 h-12 text-[#C5A059]/20 mx-auto mb-8" />
          <h2 className="font-serif text-3xl md:text-4xl italic leading-relaxed mb-10">
            "ThanhHoa không chỉ bán nhà, cô ấy bán sự an tâm. Mọi thủ tục pháp lý và tư vấn đầu tư đều được thực hiện vô cùng chuyên nghiệp và tận tâm."
          </h2>
          <div className="flex flex-col items-center">
            <div className="flex gap-1 text-[#C5A059] mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="font-bold text-slate-900 uppercase tracking-widest text-sm">Mr. Tiến Mạnh</p>
            <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">CEO, Indochina House Corp</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-100">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <span className="text-[#C5A059] text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Liên hệ</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-8">Bắt đầu hành trình <br /> <span className="italic">Của bạn ngay hôm nay</span></h2>
            
            <div className="space-y-8 mt-12">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Hotline / Zalo</p>
                  <a href={`tel:${contactInfo.phone}`} className="text-xl font-bold text-slate-900 hover:text-[#C5A059] transition-colors">{contactInfo.phone}</a>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Email</p>
                  <a href={`mailto:${contactInfo.email}`} className="text-xl font-bold text-slate-900 hover:text-[#C5A059] transition-colors">{contactInfo.email}</a>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white transition-all">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Văn phòng</p>
                  <p className="text-xl font-bold text-slate-900">{contactInfo.office}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-50">
            <h3 className="text-2xl font-bold mb-8">Yêu cầu tư vấn</h3>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Họ và tên</label>
                <input type="text" className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-[#C5A059] transition-all outline-none" placeholder="Nguyễn Văn A" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Số điện thoại</label>
                <input type="tel" className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-[#C5A059] transition-all outline-none" placeholder="090..." />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Lời nhắn</label>
                <textarea rows={4} className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-[#C5A059] transition-all outline-none" placeholder="Tôi quan tâm đến..."></textarea>
              </div>
              <a 
                href={contactInfo.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#1A1A1A] text-white py-5 rounded-xl font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#C5A059] transition-all shadow-xl shadow-slate-900/10 inline-block text-center"
              >
                Gửi yêu cầu ngay
              </a>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-serif text-xl tracking-widest uppercase">ThanhHoa</span>
            <span className="text-[8px] tracking-[0.3em] uppercase font-bold text-[#C5A059]">Real Estate</span>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-slate-400 hover:text-[#C5A059] transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="text-slate-400 hover:text-[#C5A059] transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-slate-400 hover:text-[#C5A059] transition-colors"><Youtube className="w-5 h-5" /></a>
          </div>

          <p className="text-slate-400 text-[10px] uppercase tracking-widest font-medium">
            © 2026 {contactInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        <motion.a 
          href={contactInfo.zalo}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#0068FF] text-white p-4 rounded-full shadow-2xl hover:brightness-110 transition-all"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.a>
        <motion.a 
          href={`tel:${contactInfo.phone}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#C5A059] text-white p-4 rounded-full shadow-2xl hover:brightness-110 transition-all"
        >
          <Phone className="w-6 h-6" />
        </motion.a>
      </div>
    </div>
  );
}
