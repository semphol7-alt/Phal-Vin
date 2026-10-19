import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, QrCode, Sparkles, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { KhmerOrnateDivider, KhmerCornerOrnament } from './GoldOrnament';
import { Language } from '../types';

interface WeddingGiftProps {
  lang: Language;
}

export const WeddingGift: React.FC<WeddingGiftProps> = ({ lang }) => {
  const [activeSide, setActiveSide] = useState<'groom' | 'bride'>('groom');
  const [copiedAccount, setCopiedAccount] = useState(false);

  const groomGift = {
    nameKm: 'ស៊ឹម សុផល',
    nameEn: 'SIM SOPHAL',
    bank: 'ABA Bank (ធនាគារ ABA KHQR)',
    accountNumber: '009 754 059',
    note: 'គណនីគណនីដុល្លា',
  };

  const brideGift = {
    nameKm: 'ម៉ាក់ កញ្ញាដាវីន',
    nameEn: 'MAK KANHADAVIN',
    bank: 'ABA Bank (ធនាគារ ABA KHQR)',
    accountNumber: '019 812 970',
    note: 'គណនីខ្មែរ',
  };

  const currentGift = activeSide === 'groom' ? groomGift : brideGift;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(currentGift.accountNumber.replace(/[^0-9]/g, ''));
    setCopiedAccount(true);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#D4AF37', '#F5E084', '#0B4F3B', '#FFEAA0'],
    });
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  return (
    <section id="gift" className="relative w-full py-10 px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-[420px] rounded-2xl p-6 emerald-card relative shadow-2xl overflow-hidden"
      >
        <KhmerCornerOrnament position="top-left" size={26} />
        <KhmerCornerOrnament position="top-right" size={26} />
        <KhmerCornerOrnament position="bottom-left" size={26} />
        <KhmerCornerOrnament position="bottom-right" size={26} />

        {/* Section Header */}
        <div className="text-center pt-2">
          <h2 className="font-khmer-title text-xl sm:text-2xl text-[#FFF3C4] drop-shadow">
            {lang === 'km' ? 'អំណោយអាពាហ៍ពិពាហ៍' : 'WEDDING GIFT'}
          </h2>
          <p className="font-royal text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase mt-1">
            {lang === 'km' ? 'WEDDING GIFT' : 'KHQR BLESSING & CONTRIBUTIONS'}
          </p>
        </div>

        <KhmerOrnateDivider className="my-3.5" />

        {/* Explanation text about KHQR */}
        <p className="font-khmer text-xs text-[#E8DCC0] leading-relaxed text-center px-1 mb-5">
          {lang === 'km'
            ? 'វត្តមានដ៏ថ្លៃថ្លារបស់លោកអ្នកគឺជាកាដូដ៏មានតម្លៃបំផុតសម្រាប់ពួកយើង។ ប្រសិនបើលោកអ្នកមានបំណងផ្ញើចំណងដៃអាពាហ៍ពិពាហ៍ លោកអ្នកអាចស្កេនតាមរយៈ ABA Bank KHQR ខាងក្រោមបានដោយក្តីរីករាយ។'
            : 'Your esteemed presence is our greatest honor. If you wish to bestow a wedding blessing gift, you may scan the official ABA Bank KHQR code below.'}
        </p>

        {/* One buttons: QR Scan */}
        <div className="flex items-center p-1 rounded-xl bg-[#03241b] border border-[#D4AF37]/40 mb-6">
          <button
            onClick={() => setActiveSide('groom')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-khmer font-bold transition-all cursor-pointer ${
              activeSide === 'groom'
                ? 'bg-gradient-to-r from-[#D4AF37] via-[#F5E084] to-[#B8860B] text-[#1a1402] shadow-md'
                : 'text-[#D8CCA9] hover:text-[#FFFDF5]'
            }`}
          >
            {lang === 'km' ? 'គណនី ដុល្លា' : "Groom's Side"}
          </button>

          <button
            onClick={() => setActiveSide('bride')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-khmer font-bold transition-all cursor-pointer ${
              activeSide === 'bride'
                ? 'bg-gradient-to-r from-[#D4AF37] via-[#F5E084] to-[#B8860B] text-[#1a1402] shadow-md'
                : 'text-[#D8CCA9] hover:text-[#FFFDF5]'
            }`}
          >
            {lang === 'km' ? 'គណនី ខ្មែរ' : "Bride's Side"}
          </button>
        </div>

        {/* KHQR Card Styled after ABA Bank KHQR Standard */}
        <div className="relative w-full flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSide}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-[310px]"
            >
              <div className="relative rounded-2xl overflow-hidden bg-white text-slate-900 border-2 border-[#D4AF37] shadow-[0_12px_30px_rgba(0,0,0,0.5)]">
                {/* Red Bakong / ABA Header Banner */}
                <div className="bg-[#D3121B] px-4 py-2.5 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                      ៛
                    </div>
                    <span className="font-royal font-black tracking-wider text-sm">KHQR</span>
                  </div>
                  <span className="text-[11px] font-khmer opacity-95 tracking-wide font-bold">
                    ABA BANK · ABA
                  </span>
                </div>

                {/* Account Name */}
                <div className="pt-3 pb-1 px-4 text-center border-b border-slate-100">
                  <h4 className="font-khmer text-base font-bold text-[#8C5E13]">
                    {currentGift.nameKm}
                  </h4>
                  <p className="font-royal text-[11px] font-semibold text-slate-500 tracking-wider">
                    {currentGift.nameEn}
                  </p>
                </div>

                {/* QR Code Container with 722.jpg */}
                <div className="p-4 flex flex-col items-center justify-center">
                  <div className="relative p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-center">
                    <img
                      src="/722.jpg"
                      alt="ABA Bank KHQR Code"
                      className="w-[190px] h-[190px] object-contain rounded-lg"
                    />
                  </div>

                  <p className="font-khmer text-[11px] text-slate-500 mt-2 font-medium">
                    {lang === 'km'
                      ? 'ស្កេនជាមួយគ្រប់កម្មវិធីធនាគារ (Bakong / Canadia KHQR)'
                      : 'Scan with any banking app in Cambodia'}
                  </p>

                  {/* Download QR Button */}
                  <a
                    href="/722.jpg"
                    download="Wedding_KHQR_Code.jpg"
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-khmer font-medium cursor-pointer transition-colors border border-slate-300 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-600" />
                    <span>{lang === 'km' ? 'ទាញយករូប QR Code' : 'Download QR Code'}</span>
                  </a>
                </div>

                {/* Account Number Box */}
                <div className="bg-slate-50 border-t border-slate-200 p-3 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[10px] text-slate-500 font-khmer block font-medium">
                      {currentGift.bank}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-800 tracking-wider">
                      {currentGift.accountNumber}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyAccount}
                    className="py-1.5 px-3 rounded-lg bg-[#0B4F3B] hover:bg-[#0E5C46] text-white text-xs font-khmer font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedAccount ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAccount ? (lang === 'km' ? 'បានចម្លង' : 'Copied') : (lang === 'km' ? 'ចម្លងលេខកុង' : 'Copy')}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};