import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Modal, TouchableOpacity, View } from 'react-native'
import axios from 'axios'

//map
import MapView from 'react-native-maps'
import GeoCoder from 'react-native-geocoding'
import { Marker } from 'react-native-svg'

//component
import { ButtonComponent } from '@/components/ButtonComponent'
import { InputComponent } from '@/components/InputComponent'
import { RowComponent } from '@/components/RowComponent'
import { SpaceComponent } from '@/components/SpaceComponent'
import { TextComponent } from '@/components/TextComponent'

//constant
import { appColor, appInfo } from '@/constants'

//icons
import { SearchNormal1 } from 'iconsax-react-native'

GeoCoder.init(process.env.MAP_API_KEY as string)

interface Props {
  visible: boolean
  onClose: () => void
  onSelect: (val: {
    address: string
    postion?: {
      lat: number
      long: number
    }
  }) => void
}

export const ModalLocation = (props: Props) => {
  const { visible, onClose, onSelect } = props
  const [searchKey, setSearchKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [locations, setLocations] = useState<any[]>([])
  const [addressSelected, setAddressSelected] = useState('')

  const [currentLocation, setCurrentLocation] = useState<{
    lat: number
    long: number
  }>()

  useEffect(() => {
    // GeoLocation.getCurrentPosition(position => {
    //   if (position.coords) {
    //     setCurrentLocation({
    //       lat: position.coords.latitude,
    //       long: position.coords.longitude,
    //     });
    //   }
    // });
  }, [])

  useEffect(() => {
    GeoCoder.from(addressSelected).then(res => {
      const position = res.results[0].geometry.location

      setCurrentLocation({
        lat: position.lat,
        long: position.lng,
      })
    })
  }, [addressSelected])

  useEffect(() => {
    if (!searchKey) {
      setLocations([])
    }
  }, [searchKey])

  const handleClose = () => {
    onClose()
  }

  const handleSearchLocation = async () => {
    const api = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searchKey}&limit=20&apiKey=EoGZAqvCk9NFBvK6Trb_9iudji1DWPy1QfnsJN0GRlo`

    try {
      setIsLoading(true)
      const res = await axios.get(api)

      if (res && res.data && res.status === 200) {
        setLocations(res.data.items)
      }

      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal animationType="slide" visible={visible} style={{ flex: 1 }}>
      <View style={{ paddingVertical: 42 }}>
        <RowComponent justify="flex-end" styles={{ marginVertical: 20, paddingHorizontal: 20 }}>
          <View style={{ flex: 1 }}>
            <InputComponent
              styles={{ marginBottom: 0 }}
              affix={<SearchNormal1 size={20} color={appColor.gray} />}
              placeholder="Search"
              value={searchKey}
              allowClear
              onChange={val => setSearchKey(val)}
              onEnd={handleSearchLocation}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              top: 56,
              right: 10,
              left: 10,
              backgroundColor: appColor.white,
              zIndex: 5,
              padding: 20,
            }}
          >
            {isLoading ? (
              <ActivityIndicator />
            ) : locations.length > 0 ? (
              <FlatList
                data={locations}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{ marginBottom: 12 }}
                    onPress={() => {
                      setAddressSelected(item.address.label)
                      setSearchKey('')
                    }}
                  >
                    <TextComponent text={item.address.label} />
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View>
                <TextComponent text={searchKey ? 'Location not found' : 'Search location'} />
              </View>
            )}
          </View>
          <SpaceComponent width={12} />
          <ButtonComponent text="Cancel" type="link" onPress={handleClose} />
        </RowComponent>
        {currentLocation && (
          <MapView
            style={{
              width: appInfo.sizes.WIDTH,
              height: appInfo.sizes.HEIGHT - 220,
              marginVertical: 40,
              zIndex: -1,
            }}
            showsMyLocationButton
            showsUserLocation
            initialRegion={{
              latitude: currentLocation.lat,
              longitude: currentLocation.long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
              latitude: currentLocation.lat,
              longitude: currentLocation.long,
              latitudeDelta: 0.001,
              longitudeDelta: 0.015,
            }}
            mapType="standard"
          />
        )}
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 0,
            right: 0,
          }}
        >
          <ButtonComponent
            styles={{ marginBottom: 40 }}
            text="Confirm"
            onPress={() => {
              onSelect({
                address: addressSelected,
                postion: currentLocation,
              })

              onClose()
            }}
            type="primary"
          />
        </View>
      </View>
    </Modal>
  )
}
