import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
// import { ImageOrVideo } from 'react-native-image-crop-picker';

import {
  ButtonComponent,
  ButtonImagePicker,
  ChoiceLocation,
  ContainerComponent,
  DateTimePicker,
  DropdownPicker,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../components'

//redux
import { useAppSelector } from '../redux/hook'
// import { authSelector } from '../redux/reducers/authReducer';
// import userAPI from '../apis/userApi';
// import eventAPI from '../apis/eventApi';
// import storage from '@react-native-firebase/storage';

//constant
import { appColor } from '../constants'

//until
import { Validate } from '../utils/validate'

const initValues = {
  title: '',
  description: '',
  locationTitle: '',
  locationAddress: '',
  position: {
    lat: '',
    long: '',
  },
  photoUrl: '',
  users: [],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
  price: '',
  category: '',
}

const AddNewScreen = () => {
  // const auth = useSelector(authSelector);

  const [eventData, setEventData] = useState<any>({
    ...initValues,
    authorId: '123',
  })
  const [usersSelects, setUsersSelects] = useState<any[]>([])
  const [fileSelected, setFileSelected] = useState<any>()
  const [errorsMess, setErrorsMess] = useState<string[]>([])

  // useEffect(() => {
  //   handleGetAllUsers();
  // }, []);

  useEffect(() => {
    const mess = Validate.EventValidation(eventData)

    setErrorsMess(mess)
  }, [eventData])

  const handleChangeValue = (key: string, value: string | Date | string[]) => {
    const items = { ...eventData }
    items[`${key}`] = value

    setEventData(items)
  }

  const handleGetAllUsers = async () => {
    // const api = `/get-all`;
    // try {
    //   const res: any = await userAPI.HandleUser(api);
    //   if (res && res.data) {
    //     const items: any[] = [];
    //     res.data.forEach(
    //       (item: any) =>
    //         item.email &&
    //         items.push({
    //           label: item.email,
    //           value: item.id,
    //         }),
    //     );
    //     setUsersSelects(items);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  const handleAddEvent = async () => {
    // if (fileSelected) {
    //   const filename = `${fileSelected.filename ?? `image-${Date.now()}`}.${fileSelected.path.split('.')[1]}`;
    //   const path = `images/${filename}`;
    //   const res = storage().ref(path).putFile(fileSelected.path);
    //   res.on(
    //     'state_changed',
    //     snap => {
    //       console.log(snap.bytesTransferred);
    //     },
    //     error => {
    //       console.log(error);
    //     },
    //     () => {
    //       storage()
    //         .ref(path)
    //         .getDownloadURL()
    //         .then(url => {
    //           eventData.photoUrl = url;
    //           handlePustEvent(eventData);
    //         });
    //     },
    //   );
    // } else {
    //   handlePustEvent(eventData);
    // }
  }

  const handlePustEvent = async (event: any) => {
    // const api = `/add-new`;
    // try {
    //   const res = await eventAPI.HandleEvent(api, event, 'post');
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  const handleFileSelected = (val: any) => {
    setFileSelected(val)
    handleChangeValue('photoUrl', val.path)
  }

  const handleLocation = (val: any) => {
    const items = { ...eventData }
    items.position = val.postion
    items.locationAddress = val.address

    setEventData(items)
  }

  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent text="Add new" title />
      </SectionComponent>
      <SectionComponent>
        {eventData.photoUrl || fileSelected ? (
          <Image
            source={{
              uri: eventData.photoUrl ? eventData.photoUrl : fileSelected.uri,
            }}
            style={{ width: '100%', height: 250, marginBottom: 12 }}
            resizeMode="cover"
          />
        ) : (
          <></>
        )}
        <ButtonImagePicker
          onSelect={(val: any) =>
            val.type === 'url' ? handleChangeValue('photoUrl', val.value as string) : handleFileSelected(val.value)
          }
        />
        <InputComponent
          placeholder="Title"
          value={eventData.title}
          allowClear
          onChange={val => handleChangeValue('title', val)}
        />
        <InputComponent
          placeholder="Description"
          multiline
          numberOfLine={3}
          allowClear
          value={eventData.description}
          onChange={val => handleChangeValue('description', val)}
        />

        <DropdownPicker
          selected={eventData.category}
          values={[
            {
              label: 'Sport',
              value: 'sport',
            },
            {
              label: 'Food',
              value: 'food',
            },
            {
              label: 'Art',
              value: 'art',
            },
            {
              label: 'Music',
              value: 'music',
            },
          ]}
          onSelect={val => handleChangeValue('category', val)}
        />

        <RowComponent>
          <DateTimePicker
            label="Start at: "
            type="time"
            onSelect={val => handleChangeValue('startAt', val)}
            selected={eventData.startAt}
          />
          <SpaceComponent width={20} />
          <DateTimePicker
            label="End at:"
            type="time"
            onSelect={val => handleChangeValue('endAt', val)}
            selected={eventData.endAt}
          />
        </RowComponent>

        <DateTimePicker
          label="Date:"
          type="date"
          onSelect={val => handleChangeValue('date', val)}
          selected={eventData.date}
        />

        <DropdownPicker
          label="Invited users"
          values={usersSelects}
          onSelect={(val: string | string[]) => handleChangeValue('users', val as string[])}
          selected={eventData.users}
          multible
        />
        <InputComponent
          placeholder="Title Address"
          allowClear
          value={eventData.locationTitle}
          onChange={val => handleChangeValue('locationTitle', val)}
        />
        <ChoiceLocation onSelect={val => handleLocation(val)} />
        <InputComponent
          placeholder="Price"
          allowClear
          type="number-pad"
          value={eventData.price}
          onChange={val => handleChangeValue('price', val)}
        />
      </SectionComponent>

      {errorsMess.length > 0 && (
        <SectionComponent>
          {errorsMess.map(mess => (
            <TextComponent text={mess} key={mess} color={appColor.danger} styles={{ marginBottom: 12 }} />
          ))}
        </SectionComponent>
      )}

      <SectionComponent>
        <ButtonComponent
          disable={errorsMess.length > 0 ? true : false}
          text="Add New"
          onPress={handleAddEvent}
          type="primary"
        />
      </SectionComponent>
    </ContainerComponent>
  )
}

export default AddNewScreen
