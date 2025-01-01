import TrackPlayer, { Capability } from 'react-native-track-player';

export const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: 'StopPlaybackAndRemoveNotification',
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
      ],
      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
      ],
    });
    
    console.log('Track Player setup complete');
    return true;
  } catch (error) {
    console.log('Error setting up player:', error);
    return false;
  }
}; 