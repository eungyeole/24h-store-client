import {
  CSSProperties,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { StoreType } from "../../utils/apis";

interface NaverMapProps {
  style: CSSProperties;
  location: {
    lat?: number;
    lon?: number;
  };
  storesData: StoreType[];
  setLocation: Dispatch<
    SetStateAction<{
      lat?: number | undefined;
      lon?: number | undefined;
    }>
  >;
}

const NaverMap: FC<NaverMapProps> = ({ style, location, storesData }) => {
  const mapRef = useRef<naver.maps.Map>();
  const [markers, setMarkers] = useState<naver.maps.Marker[]>([]);
  useEffect(() => {
    mapRef.current = new naver.maps.Map("map", {
      zoom: 13,
    });
  }, []);
  useEffect(() => {
    if (location.lat && location.lon) {
      mapRef.current?.setCenter(
        new naver.maps.LatLng(location.lat, location.lon)
      );

      new naver.maps.Marker({
        map: mapRef.current,
        position: new naver.maps.LatLng(location.lat, location.lon),
      });
    }
  }, [location]);

  useEffect(() => {
    const newMarkers = storesData.map((item) => {
      const contentString = [
        "<div>",
        `<h3>${item.title}</h3>`,
        `<p>${item.category}</p>`,
      ].join("");

      const marker = new naver.maps.Marker({
        map: mapRef.current,
        position: new naver.maps.LatLng(Number(item.y), Number(item.x)),
      });
      const infowindow = new naver.maps.InfoWindow({
        content: contentString,
      });
      naver.maps.Event.addListener(marker, "click", function (e) {
        if (infowindow.getMap()) {
          infowindow.close();
        } else {
          mapRef.current && infowindow.open(mapRef.current, marker);
        }
      });
      return marker;
    });
    setMarkers(newMarkers);
  }, [storesData, location]);
  return <div id="map" style={style}></div>;
};

export default NaverMap;
