"use client";

import { useState, useEffect } from 'react';
import styles from './AIIntroductionModal.module.css';

interface AIIntroductionModalProps {
  showAdBlockerModal: boolean;
}

export default function AIIntroductionModal({ showAdBlockerModal }: AIIntroductionModalProps) {
  const [showModal, setShowModal] = useState(false);
  const [dimOpacity, setDimOpacity] = useState(0);

  useEffect(() => {
    if (!showAdBlockerModal) {
      // Wait 2 seconds after adblocker modal is dismissed
      const timer = setTimeout(() => {
        setShowModal(true);
        // Start the fade-in effect after a short delay
        setTimeout(() => {
          setDimOpacity(1);
        }, 100);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showAdBlockerModal]);

  const handleClose = () => {
    setDimOpacity(0);
    setTimeout(() => {
      setShowModal(false);
    }, 300);
  };

  if (!showModal) return null;

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