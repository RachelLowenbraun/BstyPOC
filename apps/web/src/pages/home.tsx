import LogoClean from '../assets/logo/logo-clean.svg';
import { ChatBubble } from '../components/chat-bubble';
import { useUser } from '../providers/user-provider';
import { twMerge } from 'tailwind-merge';
import { motion } from 'motion/react';
import { lazy, Suspense } from 'react';
const EMOTIONS = [
  { Icon: lazy(() => import('../assets/emotions/anger/anger.svg')) },
  { Icon: lazy(() => import('../assets/emotions/joy/joy.svg')) },
  { Icon: lazy(() => import('../assets/emotions/disgust/disgust.svg')) },
  { Icon: lazy(() => import('../assets/emotions/sadness/sadness.svg')) },
  { Icon: lazy(() => import('../assets/emotions/fear/fear.svg')) },
] as const;

const Home = () => {
  const { user } = useUser();

  const handleVoiceMemo = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const voiceMemo = formData.get('voiceMemo') as File;
      if (!voiceMemo.type.startsWith('audio/')) {
        console.error('Unsupported file type, expected a voice memo (audio file).');
        return;
      }

      const res = await fetch(
        import.meta.env.VITE_API_URL || 'http://localhost:3000/api/voice-memo',
        {
          headers: {
            credentials: 'include',
          },
          method: 'POST',
          body: formData,
        }
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container grid min-h-screen max-w-3xl gap-4 py-8">
      <header className="flex flex-col items-center">
        <div className="text-transparent relative  h-72">
          <LogoClean
            className={twMerge(
              'absolute left-1/2 top-1/2 transition-transform -translate-x-1/2 origin-center duration-400 -translate-y-1/2 size-28'
            )}
          />
        </div>
        <ChatBubble className="max-w-sm -mt-12 font-medium">
          Your feelings don't need to be silenced – they are here to tell you
          something important. Let's understand them together.
        </ChatBubble>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.3,
          ease: 'circIn',
        }}
        animate={{ opacity: 1 }}
        className="flex flex-col text-center"
      >
        <div className="text-primary font-light text-2xl mb-4">
          {user?.name.split(' ')[0]}, how do you feel today?
        </div>
        <div className="flex bg-white/50 justify-center rounded-lg gap-2.5 max-w-lg self-center px-2">
          {EMOTIONS.map(({ Icon }, i) => (
            <button
              key={i}
              className="hover:scale-125 origin-bottom transition-[transform,shadow] hover:drop-shadow-md ease-in-out p-2.5"
            >
              <Suspense>
                <Icon className="size-full max-w-14" />
              </Suspense>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        transition={{
          delay: 0.7,
          duration: 0.3,
          ease: 'circIn',
        }}
        animate={{ opacity: 1 }}
        className="grid gap-3 mt-auto"
      >
        <form
          onChange={handleVoiceMemo}
          method="POST"
          encType="multipart/form-data"
        >
          <label
            htmlFor="voiceMemo"
            className="bg-primary text-white rounded-lg text-center p-2.5 block cursor-pointer text-lg"
          >
            Upload conversation
          </label>
          <input
            hidden
            type="file"
            id="voiceMemo"
            name="voiceMemo"
            accept="audio/*"
            required
          />
        </form>
      </motion.footer>
    </div>
  );
};

export default Home;
