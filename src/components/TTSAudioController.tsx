import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Square, Volume2, Sparkles, VolumeX } from 'lucide-react';
import { ttsService, TTSState } from '../utils/ttsService';

interface TTSAudioControllerProps {
  currentText?: string;
  label?: string;
  className?: string;
  compact?: boolean;
}

export const TTSAudioController: React.FC<TTSAudioControllerProps> = ({
  currentText,
  label = 'Mister Jo Pembimbing',
  className = '',
  compact = false,
}) => {
  const [ttsState, setTtsState] = useState<TTSState>({
    isSpeaking: false,
    isPaused: false,
    currentText: '',
    currentLabel: '',
    currentChunkIndex: 0,
    totalChunks: 0,
  });

  useEffect(() => {
    const unsubscribe = ttsService.subscribe(setTtsState);
    return () => unsubscribe();
  }, []);

  const isCurrentAudioActive =
    (ttsState.isSpeaking || ttsState.isPaused) && ttsState.currentLabel === label;

  const handlePlay = () => {
    if (isCurrentAudioActive && ttsState.isPaused) {
      ttsService.resume();
    } else if (currentText) {
      ttsService.speak(currentText, label);
    } else {
      ttsService.replay();
    }
  };

  const handlePause = () => {
    ttsService.pause();
  };

  const handleReplay = () => {
    if (currentText) {
      ttsService.speak(currentText, label);
    } else {
      ttsService.replay();
    }
  };

  const handleStop = () => {
    ttsService.stop();
  };

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 bg-blue-50/90 border border-blue-200 px-3 py-1.5 rounded-xl shadow-xs ${className}`}>
        <button
          onClick={isCurrentAudioActive && !ttsState.isPaused ? handlePause : handlePlay}
          className="flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors cursor-pointer"
          title={isCurrentAudioActive && !ttsState.isPaused ? 'Jeda Suara' : 'Dengarkan Penjelasan Suara'}
        >
          {isCurrentAudioActive && !ttsState.isPaused ? (
            <>
              <Pause className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>Jeda</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Dengarkan</span>
            </>
          )}
        </button>
        {isCurrentAudioActive && (
          <button
            onClick={handleStop}
            className="text-xs text-slate-500 hover:text-red-600 p-0.5 rounded transition-colors cursor-pointer"
            title="Hentikan Suara"
          >
            <Square className="w-3 h-3 fill-current" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`bg-white border rounded-2xl p-4 shadow-xs transition-all duration-200 ${
        isCurrentAudioActive && !ttsState.isPaused
          ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/20'
          : 'border-blue-100 hover:border-blue-200'
      } ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Mentor identity & Speaking Indicator */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs shrink-0">
            <Volume2 className={`w-5 h-5 ${isCurrentAudioActive && !ttsState.isPaused ? 'animate-bounce' : ''}`} />
            {isCurrentAudioActive && !ttsState.isPaused && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Mister Jo Virtual</span>
              <span className="text-[11px] text-slate-400">·</span>
              <span className="text-xs text-slate-500 font-medium">Bimbingan Suara</span>
            </div>
            <p className="text-sm font-bold text-slate-800 line-clamp-1">
              {label}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200/80">
          {!isCurrentAudioActive || ttsState.isPaused ? (
            <button
              onClick={handlePlay}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isCurrentAudioActive && ttsState.isPaused ? 'Lanjutkan' : 'Dengarkan'}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Jeda</span>
            </button>
          )}

          <button
            onClick={handleReplay}
            className="flex items-center gap-1 px-2.5 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
            title="Ulangi penjelasan dari awal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ulangi</span>
          </button>

          <button
            onClick={handleStop}
            disabled={!isCurrentAudioActive}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              isCurrentAudioActive
                ? 'text-red-600 hover:bg-red-50 hover:text-red-700'
                : 'text-slate-300 cursor-not-allowed'
            }`}
            title="Hentikan audio"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Hentikan</span>
          </button>
        </div>
      </div>

      {/* Live Voice Indicator and Progress */}
      {isCurrentAudioActive && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="flex items-end gap-0.5 h-3.5 w-6">
              <span className="w-1 bg-blue-600 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2"></span>
              <span className="w-1 bg-blue-500 rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-3.5"></span>
              <span className="w-1 bg-blue-600 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2.5"></span>
              <span className="w-1 bg-blue-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite] h-1.5"></span>
            </span>
            <span className="font-semibold text-blue-700">
              {ttsState.isPaused ? 'Suara dijeda' : 'Mister Jo sedang berbicara...'}
            </span>
          </div>

          {ttsState.totalChunks > 1 && (
            <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Bagian {ttsState.currentChunkIndex + 1} dari {ttsState.totalChunks}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
