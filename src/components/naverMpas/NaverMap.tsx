import { CSSProperties, FC, useEffect, useRef } from "react";

interface NaverMapProps {
  style: CSSProperties;
}

const NaverMap: FC<NaverMapProps> = ({ style }) => {
  const mapRef = useRef<naver.maps.Map>();
  useEffect(() => {
    mapRef.current = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.511337, 127.012084),
      zoom: 13,
    });
  }, []);
  return <div id="map" style={style}></div>;
};

export default NaverMap;
