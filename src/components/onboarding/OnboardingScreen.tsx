import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image, 
  ImageSourcePropType,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

interface OnboardingStepProps {
  title: string;
  body: string;
  buttonText: string;
  activeDotIndex: number; 
  totalDots?: number;     
  imageSrc: ImageSourcePropType;
  onButtonPress: () => void;
  onSkipPress?: () => void;
}

export const OnboardingStep: React.FC<OnboardingStepProps> = ({
  title,
  body,
  buttonText,
  activeDotIndex,
  totalDots = 3,
  imageSrc,
  onButtonPress,
  onSkipPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {onSkipPress && (
          <TouchableOpacity onPress={onSkipPress} accessibilityRole="button">
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.imageContainer}>
        <Image 
          source={imageSrc} 
          style={styles.image} 
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>

        <View style={styles.dotContainer}>
          {Array.from({ length: totalDots }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeDotIndex ? styles.activeDot : styles.inactiveDot
              ]}
            />
          ))}
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={onButtonPress}
          activeOpacity={0.8}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    justifyContent: 'space-between',
  },
  header: {
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginTop: 10,
  },
  skipText: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '500',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  image: {
    width: width * 0.75,
    height: width * 0.75,
  },
  contentContainer: {
    paddingHorizontal: 38,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 30,
  },
  body: {
    fontSize: 15,
    color: '#636366',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
    marginBottom: 32,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 52,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24, 
    backgroundColor: '#000000',
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#E5E5EA',
  },
  button: {
    backgroundColor: '#1C1C1E',
    width: '80%',
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});