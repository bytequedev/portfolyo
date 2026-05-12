'use client';

import { useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function VisitorTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      // Check if already visited in this session
      const hasVisited = sessionStorage.getItem('visited');
      if (!hasVisited) {
        try {
          await addDoc(collection(db, 'visitors'), {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
          });
          sessionStorage.setItem('visited', 'true');
        } catch (err) {
          console.error('Visitor tracking failed:', err);
        }
      }
    };

    trackVisit();
  }, []);

  return null;
}
