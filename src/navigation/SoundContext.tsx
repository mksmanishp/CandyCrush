import React, { createContext, useState, useContext, ReactNode } from 'react';
import Video from 'react-native-video';

// Type for the sound path from require(...)
type SoundPath = ReturnType<typeof require>;

interface SoundItem {
  id: string;
  path: SoundPath;
  repeat: boolean;
}

interface SoundContextProps {
  playSound: (soundName: string, repeat: boolean) => void;
  stopSound: (soundName: string) => void;
}

interface SoundProviderProps {
  children: ReactNode;
}

// Create context
const SoundContext = createContext<SoundContextProps | undefined>(undefined);

// Define sound file paths
const soundPaths: { [key: string]: any } = {
  ui: require('../assets/sfx/ui.mp3'),
  candy_shuffle: require('../assets/sfx/candy_shuffle.mp3'),
  candy_clear: require('../assets/sfx/candy_clear.mp3'),
  bg: require('../assets/sfx/bg.mp3'),
  cheer: require('../assets/sfx/cheer.mp3'),
};
// SoundProvider component
const SoundProvider = ({ children }: SoundProviderProps) => {
  const [sounds, setSounds] = useState<SoundItem[]>([]);

  const playSound = (soundName: string, repeat: boolean) => {
    const soundPath = soundPaths[soundName];

    if (!soundPath) {
      console.warn('Invalid sound path for:', soundName);
      return;
    }

    setSounds(prevSounds => {
      // Remove if sound already exists
      const updatedSounds = prevSounds.filter(sound => sound.id !== soundName);

      return [
        ...updatedSounds,
        {
          id: soundName,
          path: soundPath,
          repeat,
        },
      ];
    });
  };

  const stopSound = (soundName: string) => {
    setSounds(prevSounds => prevSounds.filter(sound => sound.id !== soundName));
  };

  return (
    <SoundContext.Provider value={{ playSound, stopSound }}>
      {children}
      {sounds.map(sound => (
        <Video
          key={sound.id}
          source={sound.path}
          paused={false}
          repeat={sound.repeat}
          volume={0.9}
          muted={false}
          style={{ position: 'absolute', width: 0, height: 0 }}
          resizeMode="cover"
        />
      ))}
    </SoundContext.Provider>
  );
};

// Custom hook to consume context
const useSound = (): SoundContextProps => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};

export { SoundProvider, useSound };
