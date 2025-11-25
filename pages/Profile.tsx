import React, { useRef } from 'react';
import { Settings, CreditCard, ChevronRight, Bell, HelpCircle, LogOut, Wallet, ImagePlus } from 'lucide-react';

interface ProfileProps {
  onLoadCustomImages?: (files: FileList | null) => void;
}

export const Profile: React.FC<ProfileProps> = ({ onLoadCustomImages }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="pb-24 min-h-screen bg-slate-50">
      
      {/* Header Background */}
      <div className="h-48 bg-gradient-to-br from-violet-100 to-slate-200 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        <div className="absolute top-4 right-4 z-20">
            <button className="p-2 bg-white/60 backdrop-blur-md rounded-full text-slate-700 hover:bg-white/80 transition-colors shadow-sm">
                <Settings className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-lg flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-white shadow-md p-0.5 bg-white">
            <img 
              src="https://picsum.photos/200?random=user" 
              className="w-full h-full rounded-full object-cover" 
              alt="Avatar" 
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900">ACG_Master</h2>
            <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-500">ID: 88482077</span>
                <span className="text-[10px] bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-medium">Lv.12</span>
            </div>
          </div>
        </div>
      </div>

      {/* Balance & Recharge */}
      <div className="px-4 mt-6">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-5 shadow-lg shadow-violet-200 border border-white/10 relative overflow-hidden">
          <div className="absolute right-0 top-0 p-10 bg-white/10 rounded-full -mr-8 -mt-8"></div>
          
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
               <p className="text-violet-100 text-sm mb-1">当前余额 (次元币)</p>
               <h3 className="text-3xl font-bold text-white">2,450</h3>
            </div>
            <Wallet className="text-violet-200 opacity-50 w-8 h-8" />
          </div>
          
          <button className="w-full py-3 bg-white text-primary font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-md">
             <CreditCard className="w-4 h-4" />
             立即充值
          </button>
        </div>
      </div>

      {/* Developer Settings - Custom Image Loader */}
      {onLoadCustomImages && (
        <div className="px-4 mt-6">
          <div className="bg-white rounded-xl p-4 border border-dashed border-violet-300 shadow-sm">
             <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                <ImagePlus className="w-4 h-4 text-violet-500" />
                开发者图库设置
             </h3>
             <p className="text-xs text-gray-500 mb-3">
               选择本地文件夹中的图片（可多选），即可替换 App 内所有卡片图片。仅当前会话有效。
             </p>
             <input 
                type="file" 
                multiple 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={(e) => onLoadCustomImages(e.target.files)}
             />
             <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2 bg-violet-50 text-violet-600 font-bold rounded-lg border border-violet-100 hover:bg-violet-100 transition-colors text-sm"
             >
                导入本地图片库
             </button>
          </div>
        </div>
      )}

      {/* Menu List */}
      <div className="px-4 mt-8 space-y-3">
        {[
          { icon: Bell, label: '消息通知', value: '3' },
          { icon: HelpCircle, label: '帮助与反馈' },
          { icon: LogOut, label: '退出登录' },
        ].map((item, idx) => (
          <button 
            key={idx}
            className="w-full bg-white hover:bg-gray-50 p-4 rounded-xl flex items-center justify-between border border-gray-100 shadow-sm transition-all"
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-slate-700">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.value && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full min-w-[1.2rem] text-center shadow-sm">{item.value}</span>
              )}
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </div>
          </button>
        ))}
      </div>

    </div>
  );
};