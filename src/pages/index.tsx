import { Box, Fab, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import GpsNotFixedIcon from "@mui/icons-material/GpsNotFixed";
import type { NextPage } from "next";
import NaverMap from "../components/naverMpas/NaverMap";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { getStoreAPI, StoreType } from "../utils/apis";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [location, setLocation] = useState<{ lat?: number; lon?: number }>({
    lat: undefined,
    lon: undefined,
  });
  const [storesData, setStoresData] = useState<StoreType[]>([]);
  const router = useRouter();
  const getLocation = (callback?: (coords: GeolocationPosition) => void) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      setLocation({
        lat: coords.latitude,
        lon: coords.longitude,
      });

      callback?.(position);
    });
  };
  useEffect(() => {
    getLocation(async ({ coords }) => {
      const { latitude, longitude } = coords;
      const { data } = await getStoreAPI(latitude, longitude, 5);
      setStoresData(data);
    });
  }, []);
  return (
    <Wrapper>
      <NaverMap
        setLocation={setLocation}
        location={location}
        style={{ width: "100%", height: "100%" }}
        storesData={storesData}
      />
      <HeaderOverlayWrapper>
        <Box
          sx={{
            height: "60px",
            width: "100%",
            padding: "0px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "40px",
              height: "40px",
            }}
          />
          <Typography color="primary" fontWeight="bold">
            24h 지도
          </Typography>
          <Box
            sx={{
              width: "40px",
              height: "40px",
            }}
          />
          {/* <IconButton
            style={{
              backgroundColor: "rgb(248 248 248)",
            }}
          >
            <Select name="select" ref={selectRef} id="">
              <option value="test">test</option>
            </Select>
            <FilterListIcon color="secondary" />
          </IconButton> */}
        </Box>
      </HeaderOverlayWrapper>
      <UtilButtonBox>
        {/* <IconButton
          style={{
            backgroundColor: "rgb(248 248 248 / 80%)",
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgb(86 100 164 / 50%)",
          }}
        >
          <GpsNotFixedIcon color="secondary" />
        </IconButton>{" "} */}
        <IconButton
          onClick={() => getLocation()}
          style={{
            backgroundColor: "rgb(248 248 248 / 80%)",
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgb(86 100 164 / 50%)",
          }}
        >
          <GpsNotFixedIcon color="secondary" />
        </IconButton>
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
          onClick={() => router.push("/register")}
        >
          <EditIcon sx={{ mr: 1 }} />
          등록하기
        </Fab>
      </UtilButtonBox>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Select = styled.select``;

const HeaderOverlayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background: linear-gradient(180deg, #f3f3ed, rgba(255, 255, 255, 0));
`;

const UtilButtonBox = styled.div`
  position: fixed;
  bottom: 30px;
  right: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;
