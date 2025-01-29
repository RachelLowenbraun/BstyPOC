import { twMerge } from 'tailwind-merge';
import ChatArrow from '../assets/icons/Chat arrow.svg';
import { AnimatePresence, motion } from 'motion/react';

export const ChatBubble = ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & React.ComponentProps<typeof motion.div>) => {
  return (
    <AnimatePresence>
        <motion.div
        {...props}
        initial={{
            opacity: 0,
            scale: 0.96
        }}
        animate={{
            opacity: 1,
            scale: 1
        }}
        exit={{
            opacity: 0,
            scale: 0.96
        }}
        transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
        }}
        className={twMerge('relative bg-white py-4 px-6 rounded-lg', className)}
        >
        <ChatArrow className="absolute bottom-full left-1/3 translate-y-1" />
        {children}
        </motion.div>
    </AnimatePresence>
  );
};
