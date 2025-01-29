import { GoogleLogin } from '@react-oauth/google';
import LogoClean from '../assets/logo/logo-clean.svg';
import LogoSolid from '../assets/logo/logo-solid.svg';
import { ChatBubble } from '../components/chat-bubble';
import { useEffect, useState } from 'react';
import { UserLogInStatus, useUser } from '../providers/user-provider';
import { twMerge } from 'tailwind-merge';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const Intro = () => {
  const { logIn, status } = useUser();
  const [showLogIn, setShowLogIn] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (status === UserLogInStatus.loggedIn) {
      navigate('/');
    }
  }, [navigate, status]);

  return (
    <div className="container grid grid-rows-[1fr_200px] h-full gap-4 items-center py-8">
      <header className="flex flex-col items-center">
        <div className="text-transparent relative">
          <LogoClean
            className={twMerge(
              'absolute left-1/2 top-1/2 transition-transform -translate-x-1/2 size-40 origin-center duration-400',
              showLogIn ? '-translate-y-1/2 size-28' : '-translate-y-3/4'
            )}
          />
          <LogoSolid
            className={twMerge(
              'w-full aspect-square size-72',
              showLogIn && 'opacity-0'
            )}
          />
        </div>
        {showLogIn && (
          <ChatBubble className="max-w-xs -mt-12">
            Your privacy is important to us - all data is stored securely and
            will never be shared with others.
          </ChatBubble>
        )}
        {!showLogIn && (
          <ChatBubble className="mt-6">
            <h1 className="text-primary font-medium mb-6">
              Discover how your conversations affect you emotionally.
            </h1>
            <ul className="font-light space-y-1">
              <li>
                ✔ Get insights that will help you understand yourself better.
              </li>
              <li>
                ✔ Use tools to improve your communication and boost your
                self-confidence. Ready to get started?
              </li>
            </ul>
            <br />
            <span className="font-medium">Ready to get started?</span>
          </ChatBubble>
        )}
      </header>

      <motion.footer
        initial={{ opacity: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.3,
          ease: 'circIn',
        }}
        animate={{ opacity: 1 }}
        className="grid gap-3"
      >
        {showLogIn ? (
          <>
            <GoogleLogin
              containerProps={{
                className:
                  '[&_[role="button"]]:rounded-lg [&_[role="button"]]:min-h-11 [&_[role="button"]]:text-base',
              }}
              onSuccess={logIn}
            />
            <button
              onClick={() => logIn({})}
              className="bg-primary text-white rounded-lg text-center p-2.5 block"
            >
              Let's go
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowLogIn(true)}
            className="bg-primary text-white rounded-lg text-center p-2.5 block"
          >
            Sign up
          </button>
        )}
      </motion.footer>
    </div>
  );
};

export default Intro;
