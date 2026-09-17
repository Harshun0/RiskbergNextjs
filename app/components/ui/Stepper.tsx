'use client';

import React, { useState, Children, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* ─── Step variants ─── */
const stepVariants = {
  enter: (dir: number) => ({ x: dir >= 0 ? '-100%' : '100%', opacity: 0 }),
  center: { x: '0%', opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? '50%' : '-50%', opacity: 0 }),
};

/* ─── Check icon ─── */
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.1, type: 'tween', ease: 'easeOut', duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

/* ─── Step connector ─── */
function StepConnector({ isComplete }: { isComplete: boolean }) {
  return (
    <div className="stp-connector">
      <motion.div
        className="stp-connector-fill"
        variants={{
          incomplete: { width: 0, backgroundColor: 'transparent' },
          complete:   { width: '100%', backgroundColor: '#539AD2' },
        }}
        initial={false}
        animate={isComplete ? 'complete' : 'incomplete'}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

/* ─── Step indicator dot ─── */
function StepIndicator({
  step, currentStep, onClickStep, disableStepIndicators,
}: {
  step: number; currentStep: number;
  onClickStep: (s: number) => void;
  disableStepIndicators: boolean;
}) {
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';
  return (
    <motion.div
      onClick={() => { if (step !== currentStep && !disableStepIndicators) onClickStep(step); }}
      className="stp-indicator"
      style={disableStepIndicators ? { pointerEvents: 'none', opacity: 0.5 } : {}}
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: '#e2eaf4', color: '#2E6DA4' },
          active:   { scale: 1, backgroundColor: '#1A3562', color: '#ffffff' },
          complete: { scale: 1, backgroundColor: '#539AD2', color: '#ffffff' },
        }}
        transition={{ duration: 0.3 }}
        className="stp-indicator-inner"
      >
        {status === 'complete' ? (
          <CheckIcon className="stp-check-icon" />
        ) : status === 'active' ? (
          <div className="stp-active-dot" />
        ) : (
          <span className="stp-step-number">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Slide transition wrapper ─── */
function SlideTransition({
  children, direction, onHeightReady,
}: {
  children: React.ReactNode;
  direction: number;
  onHeightReady: (h: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (ref.current) onHeightReady(ref.current.offsetHeight);
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={ref}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: 'absolute', left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Content wrapper with animated height ─── */
function StepContentWrapper({
  isCompleted, currentStep, direction, children, className,
}: {
  isCompleted: boolean; currentStep: number; direction: number;
  children: React.ReactNode; className?: string;
}) {
  const [parentHeight, setParentHeight] = useState(0);
  return (
    <motion.div
      className={className}
      style={{ position: 'relative', overflow: 'hidden' }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: 'spring', duration: 0.4 }}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition key={currentStep} direction={direction} onHeightReady={h => setParentHeight(h)}>
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Step (exported) ─── */
export function Step({ children }: { children: React.ReactNode }) {
  return <div className="stp-step-content">{children}</div>;
}

/* ─── Main Stepper ─── */
export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  disableStepIndicators = false,
  autoplay = false,
  autoplayDelay = 3000,
}: {
  children: React.ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  backButtonText?: string;
  nextButtonText?: string;
  disableStepIndicators?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection]     = useState(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep  = currentStep === totalSteps;

  const updateStep = (next: number) => {
    setCurrentStep(next);
    if (next > totalSteps) onFinalStepCompleted();
    else onStepChange(next);
  };

  const handleBack = () => {
    setDirection(-1);
    updateStep(currentStep > 1 ? currentStep - 1 : totalSteps);
  };
  const handleNext = () => {
    setDirection(1);
    updateStep(currentStep < totalSteps ? currentStep + 1 : 1);
  };
  const handleComplete = () => { setDirection(1); updateStep(totalSteps + 1); };

  /* Autoplay — loops back to step 1 after last step */
  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        const next = prev >= totalSteps ? 1 : prev + 1;
        setDirection(next === 1 ? -1 : 1);
        onStepChange(next);
        return next;
      });
    }, autoplayDelay);
    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, totalSteps, onStepChange]);

  return (
    <div className="stp-outer">
      <div className="stp-card">
        {/* Step indicators row */}
        <div className="stp-indicator-row">
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLast  = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                <StepIndicator
                  step={stepNumber}
                  disableStepIndicators={disableStepIndicators}
                  currentStep={currentStep}
                  onClickStep={clicked => {
                    setDirection(clicked > currentStep ? 1 : -1);
                    updateStep(clicked);
                  }}
                />
                {isNotLast && <StepConnector isComplete={currentStep > stepNumber} />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Animated step content */}
        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className="stp-content-wrap"
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {/* Footer nav — always visible */}
        {!isCompleted && (
          <div className="stp-footer">
            <div className={`stp-footer-nav ${currentStep !== 1 ? 'stp-spread' : 'stp-end'}`}>
              {currentStep !== 1 && (
                <button onClick={handleBack} className="stp-back-btn">
                  {backButtonText}
                </button>
              )}
              <button onClick={handleNext} className="stp-next-btn">
                {nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
