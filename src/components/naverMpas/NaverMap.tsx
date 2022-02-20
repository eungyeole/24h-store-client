import { CSSProperties, FC, useEffect, useRef } from "react";
import { StoreType } from "../../utils/apis";

interface NaverMapProps {
  style: CSSProperties;
  location: {
    lat: number;
    lon: number;
  };
  storesData: StoreType[];
}

const NaverMap: FC<NaverMapProps> = ({ style, location, storesData }) => {
  const mapRef = useRef<naver.maps.Map>();
  useEffect(() => {
    mapRef.current = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.511337, 127.012084),
      zoom: 13,
    });
  }, []);
  useEffect(() => {
    mapRef.current?.setCenter(
      new naver.maps.LatLng(location.lat, location.lon)
    );
    new naver.maps.Marker({
      map: mapRef.current,
      position: new naver.maps.LatLng(location.lat, location.lon),
    });
  }, [location]);
  useEffect(() => {
    storesData.forEach((item) => {
      console.log(item);
      new naver.maps.Marker({
        map: mapRef.current,
        position: new naver.maps.LatLng(Number(item.y), Number(item.x)),
      });
    });
  }, [storesData]);
  return <div id="map" style={style}></div>;
};

export default NaverMap;
