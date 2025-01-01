import TrackPlayer, { Event, RepeatMode } from 'react-native-track-player';

export async function setupPlayer() {
  try {
    await TrackPlayer.setupPlayer({
      // Enable this for background playback
      autoHandleInterruptions: true,
    });

    await TrackPlayer.updateOptions({
      // Media controls capabilities
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
      ],
      // Capabilities that will show up when the notification is in the compact form on Android
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
      ],
      // Icons for the notification on Android (if you don't like the defaults)
      playIcon: require('../assets/icons/play.png'),
      pauseIcon: require('../assets/icons/pause.png'),
      stopIcon: require('../assets/icons/stop.png'),
      // Notification icon
      icon: require('../assets/icons/notification-icon.png'),
    });
  } catch (error) {
    console.error('Error setting up player:', error);
  }
}

module.exports = async function() {
  try {
    // This service needs to be registered for the module to work
    // but we already register the service through the setupPlayer function
    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
    TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.stop());
  } catch (error) {
    console.error('Error setting up event listeners:', error);
  }
}; 