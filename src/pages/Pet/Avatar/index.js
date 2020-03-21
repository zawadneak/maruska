import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import ImagePicker from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '~/components/Button/index';
import { editPicture } from '~/store/modules/pets/actions';

import {
  Container,
  PictureBox,
  PictureButton,
  Label,
  PetImage,
} from './styles';

export default function Avatar({ route, navigation }) {
  let animate = null;
  const { petID } = route.params;
  const [picture, setPicture] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (animate) {
      animate.play();
    }
  }, []);

  const handleSelectImage = () => {
    const options = {
      title: 'Select your pet Avatar',
      mediaType: 'photo',
      allowsEditing: true,
      maxWidth: 500,
      maxHeight: 500,
    };

    ImagePicker.launchImageLibrary(options, response => {
      console.log(response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        setPicture(response.data);
      }
    });
  };

  const handlePictureUpload = () => {
    dispatch(editPicture(picture, petID));
    navigation.navigate('Home');
  };

  return (
    <Container>
      {!picture ? (
        <>
          <PictureButton onPress={handleSelectImage}>
            <PictureBox>
              <LottieView
                source={require('~/assets/animations/dog_walking.json')}
                ref={animation => (animate = animation)}
                loop
              />
            </PictureBox>
          </PictureButton>
        </>
      ) : (
        <>
          <PictureButton onPress={handleSelectImage}>
            <PetImage
              source={{
                uri: `data:image/*;base64,${picture}`,
              }}
            />
          </PictureButton>
        </>
      )}
      <Label>{!picture ? null : `${petID} looks great!`}</Label>
      <Button
        onPress={handlePictureUpload}
        title="Confirm picture"
        disabled={!picture}
      />
    </Container>
  );
}

Avatar.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};