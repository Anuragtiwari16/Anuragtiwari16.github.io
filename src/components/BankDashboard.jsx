import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Sparkles, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

const BRANCH_DATA = {
  b101: {
    id: 'b101',
    name: 'Branch #101: Connaught Central',
    deposits: '$6.42M',
    depositGrowth: '+16.8%',
    loans: '$4.10M',
    approvalRate: '86.4%',
    retention: '94.8%',
    churnRate: '2.8%',
    aiHealth: '95%',
    riskText: 'OPTIMAL HEALTH',
    riskColor: 'emerald',
    qBars: [
      { quarter: 'Q1', target: 60, actual: 65 },
      { quarter: 'Q2', target: 75, actual: 82 },
      { quarter: 'Q3', target: 80, actual: 95 },
      { quarter: 'Q4', target: 90, actual: 100 }
    ],
    predictionText: 'High-net-worth portfolio expanding. ML model predicts Q4 target surplus of +14.2%.'
  },
  b204: {
    id: 'b204',
    name: 'Branch #204: Cyber City Tech Park',
    deposits: '$5.18M',
    depositGrowth: '+12.4%',
    loans: '$3.85M',
    approvalRate: '81.2%',
    retention: '92.1%',
    churnRate: '4.1%',
    aiHealth: '91%',
    riskText: 'STABLE GROWTH',
    riskColor: 'blue',
    qBars: [
      { quarter: 'Q1', target: 55, actual: 58 },
      { quarter: 'Q2', target: 70, actual: 68 },
      { quarter: 'Q3', target: 75, actual: 80 },
      { quarter: 'Q4', target: 85, actual: 92 }
    ],
    predictionText: 'Corporate payroll account inflow steady. Automated liquidity sweeps recommended.'
  },
  b402: {
    id: 'b402',
    name: 'Branch #402: Indirapuram Hub',
    deposits: '$3.94M',
    depositGrowth: '-2.1%',
    loans: '$3.20M',
    approvalRate: '74.5%',
    retention: '88.3%',
    churnRate: '6.4%',
    aiHealth: '78%',
    riskText: 'ATTENTION REQUIRED',
    riskColor: 'amber',
    qBars: [
      { quarter: 'Q1', target: 50, actual: 52 },
      { quarter: 'Q2', target: 65, actual: 60 },
      { quarter: 'Q3', target: 75, actual: 66 },
      { quarter: 'Q4', target: 80, actual: 70 }
    ],
    predictionText: 'Branch #402 predicted to miss Q4 targets by 12%. Recommend targeted retail loan campaigns.'
  },
  b518: {
    id: 'b518',
    name: 'Branch #518: Greater Noida SME',
    deposits: '$4.75M',
    depositGrowth: '+18.9%',
    loans: '$4.30M',
    approvalRate: '88.0%',
    retention: '93.5%',
    churnRate: '3.2%',
    aiHealth: '93%',
    riskText: 'HIGH ACCELERATION',
    riskColor: 'emerald',
    qBars: [
      { quarter: 'Q1', target: 45, actual: 50 },
      { quarter: 'Q2', target: 60, actual: 68 },
      { quarter: 'Q3', target: 70, actual: 82 },
      { quarter: 'Q4', target: 80, actual: 94 }
    ],
    predictionText: 'SME credit demand surging. Working capital loan approvals projected at zero default spike.'
  }
};

export default function BankDashboard() {
  const [selectedBranchKey, setSelectedBranchKey] = useState('b101');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simMessage, setSimMessage] = useState(null);

  const branch = BRANCH_DATA[selectedBranchKey] || BRANCH_DATA.b101;

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setSimMessage('Model inference updated: Expected +15.8% lift in Q4 with zero risk variance.');
      setTimeout(() => setSimMessage(null), 4000);
    }, 600);
  };

  return (
    <>
      {/* Top Bar with circular avatar - matches exact original layout */}
      <div className="h-14 border-b border-gray-800 flex items-center px-6 justify-between bg-black">
        <div className="flex items-center gap-2 text-white font-bold tracking-widest text-sm font-['Outfit']">
          <Activity className="text-emerald-500" size={18} /> BRANCH INTELLIGENCE
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Pipeline: 200 OK
          </span>
          <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs font-bold text-gray-300">
            AT
          </div>
        </div>
      </div>

      <div className="p-6 md:p-10">
        
        {/* Branch Selector Pills (Circular Rectangular Boxes) */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-mono text-gray-400 mr-2 uppercase tracking-wider hidden sm:inline">Select Branch:</span>
          {Object.entries(BRANCH_DATA).map(([key, item]) => (
            <button
              key={key}
              onClick={() => setSelectedBranchKey(key)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedBranchKey === key
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'bg-[#111] text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700'
              }`}
            >
              {item.name.split(':')[0]}
            </button>
          ))}
        </div>

        {/* 3 Circular Rectangular KPI Metric Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          <div className="bg-[#111] border border-emerald-500/30 p-6 rounded-xl border-l-4 border-l-emerald-500 transition-all hover:border-emerald-500/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">Total Deposits (Q3)</span>
              <span className={`text-xs font-mono font-semibold flex items-center gap-0.5 ${
                branch.depositGrowth.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {branch.depositGrowth.startsWith('+') ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {branch.depositGrowth}
              </span>
            </div>
            <div className="text-3xl font-bold text-white font-['Outfit']">{branch.deposits}</div>
            <div className="text-xs text-gray-500 mt-2 font-mono">{branch.name.split(':')[1]?.trim()}</div>
          </div>

          <div className="bg-[#111] border border-blue-500/30 p-6 rounded-xl border-l-4 border-l-blue-500 transition-all hover:border-blue-500/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">Loan Approvals</span>
              <span className="text-xs font-mono text-blue-400 font-semibold">{branch.loans}</span>
            </div>
            <div className="text-3xl font-bold text-white font-['Outfit']">{branch.approvalRate}</div>
            <div className="text-xs text-gray-500 mt-2 font-mono">Default Risk: 1.2% (Low)</div>
          </div>

          <div className="bg-[#111] border border-purple-500/30 p-6 rounded-xl border-l-4 border-l-purple-500 transition-all hover:border-purple-500/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">Customer Retention</span>
              <span className="text-xs font-mono text-purple-400 font-semibold">Churn: {branch.churnRate}</span>
            </div>
            <div className="text-3xl font-bold text-white font-['Outfit']">{branch.retention}</div>
            <div className="text-xs text-gray-500 mt-2 font-mono">Industry Top Quartile</div>
          </div>

        </div>

        {/* Row 2: Circular Box + Comparison Chart + ML Prediction Box */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Circular Box (matches CreditLens AI circular box pattern) */}
          <div className="md:col-span-1 bg-[#111] border border-gray-800 p-6 rounded-xl flex flex-col justify-center items-center text-center">
            <div className="text-gray-400 text-sm uppercase tracking-wider mb-4 font-mono">AI Health Index</div>
            <div className="w-28 h-28 rounded-full border-4 border-emerald-500 flex items-center justify-center mb-3 relative shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <div className="text-3xl font-bold text-white font-['Outfit']">{branch.aiHealth}</div>
            </div>
            <div className="text-emerald-400 font-bold text-sm tracking-wide">{branch.riskText}</div>
            <div className="text-gray-500 text-xs mt-1 font-mono">Confidence: 97.8%</div>
          </div>

          {/* Branch Performance Comparison Chart Box */}
          <div className="md:col-span-2 bg-[#111] border border-gray-800 p-6 rounded-xl flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <div className="text-white font-semibold font-['Outfit']">Quarterly Performance Comparison</div>
              <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-blue-500/50"></span> Target</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-emerald-500"></span> Actual</span>
              </div>
            </div>

            <div className="flex items-end justify-around gap-4 h-32 mt-2 pb-2 border-b border-gray-800">
              {branch.qBars.map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
                  <div className="w-full max-w-[48px] flex items-end justify-center gap-1.5 h-full">
                    <div 
                      className="w-1/2 bg-blue-500/50 rounded-t-sm transition-all duration-500" 
                      style={{ height: `${bar.target}%` }}
                      title={`Target: ${bar.target}%`}
                    ></div>
                    <div 
                      className="w-1/2 bg-emerald-500/90 rounded-t-sm transition-all duration-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" 
                      style={{ height: `${bar.actual}%` }}
                      title={`Actual: ${bar.actual}%`}
                    ></div>
                  </div>
                  <span className="text-[11px] font-mono text-gray-400 mt-2">{bar.quarter}</span>
                </div>
              ))}
            </div>

            <div className="text-xs text-gray-500 font-mono mt-3 text-right">
              Scikit-learn Regression • Target variance: &plusmn;3.4%
            </div>
          </div>

          {/* ML Prediction Box */}
          <div className="md:col-span-1 bg-[#111] border border-gray-800 p-6 rounded-xl flex flex-col justify-between">
            <div>
              <div className="text-emerald-400 font-semibold mb-2 flex items-center gap-1.5">
                <Sparkles size={16} /> ML Prediction
              </div>
              <div className="text-gray-300 text-sm leading-relaxed mb-4">
                {branch.predictionText}
              </div>
              {simMessage && (
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs mb-3">
                  {simMessage}
                </div>
              )}
            </div>

            <button 
              onClick={handleSimulate}
              disabled={isSimulating}
              className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 py-2.5 rounded-lg text-sm border border-emerald-500/30 transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={14} className={isSimulating ? 'animate-spin' : ''} />
              <span>{isSimulating ? 'Computing...' : 'Run Model Inference'}</span>
            </button>
          </div>

        </div>

      </div>
    </>
  );
}
