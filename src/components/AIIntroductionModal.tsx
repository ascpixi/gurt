"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './AIIntroductionModal.module.css';

interface AIIntroductionModalProps {
  showAdBlockerModal: boolean;
  showAIIntroductionModal: boolean;
  setShowAIIntroductionModal: (show: boolean) => void;
}

export default function AIIntroductionModal({ 
  showAdBlockerModal, 
  showAIIntroductionModal,
  setShowAIIntroductionModal 
}: AIIntroductionModalProps) {
  const [dimOpacity, setDimOpacity] = useState(0);

  useEffect(() => {
    if (showAIIntroductionModal) {
      setDimOpacity(1);
    } else {
      setDimOpacity(0);
    }
  }, [showAIIntroductionModal]);

  const handleClose = () => {
    setDimOpacity(0);
    setTimeout(() => {
      setShowAIIntroductionModal(false);
    }, 300);
  };

  if (!showAIIntroductionModal) return null;

  return (
    <div 
      className={styles.modalOverlay}
      style={{ opacity: dimOpacity }}
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>🎉 New AI Assistant Feature!</h2>
          <button 
            className={styles.closeButton}
            onClick={handleClose}
          >
            ×
          </button>
        </div>
        <div className={styles.modalBody}>
          <p>We're excited to introduce our new AI Assistant feature! You can now get help with your file conversions and ask questions about different formats.</p>
          <p>Look for the 🤖 icon in the bottom right corner to start chatting with our AI assistant.</p>
        </div>
        <div className={styles.modalFooter}>
          <button 
            className={styles.gotItButton}
            onClick={handleClose}
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
} 