import { Button, Input, styled, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react";
import useDebounce from "../hooks/useDebounce";
import Autocomplete from "@mui/material/Autocomplete";
import { registerStoreApi, searchStore, StoreType } from "../utils/apis";
import emotionStyled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useRouter } from "next/router";

const Register: NextPage = () => {
  const router = useRouter();
  const [storeData, setStoreData] = useState<StoreType>({
    id: "",
    title: "",
    category: "",
    address: "",
    x: "",
    y: "",
  });
  const [location, setLocation] = useState<{ lat: number; lon: number }>({
    lat: 0,
    lon: 0,
  });
  const [autoComplete, setAutoComplete] = useState<any[]>([]);
  const { id, title, category, address, x, y } = storeData;
  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setStoreData({ ...storeData, [e.target.name]: e.target.value });
  };

  const debounceTitle = useDebounce({ value: title, delay: 300 });

  const getLocation = (callback?: (coords: GeolocationPosition) => void) => {
    navigator.geolocation.getCurrentPosition((position) => {
      callback?.(position);
    });
  };
  useEffect(() => {
    getLocation(async ({ coords }) => {
      setLocation({
        lat: coords.latitude,
        lon: coords.longitude,
      });
    });
  }, []);

  const registerStore = async () => {
    try {
      await registerStoreApi(storeData);
      router.push("/");
    } catch (e: any) {
      alert(e.message);
    }
  };
  useEffect(() => {
    if (debounceTitle.length > 0) {
      (async () => {
        const { data } = await searchStore(
          debounceTitle,
          location.lat,
          location.lon
        );
        setAutoComplete(data.place);
      })();
    }
  }, [debounceTitle, location]);

  const isAvaliableRegister = useMemo(
    () => id && title && category && address && x && y,
    [id, title, category, address, x, y]
  );
  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "15px 10px",
        gap: "10px",
      }}
    >
      <Autocomplete
        options={autoComplete}
        freeSolo
        getOptionLabel={(data) => data.title || ""}
        renderOption={(props, option) => {
          const { key, ...restProps } = props as any;
          return (
            <Li key={option.id} {...restProps}>
              <div>{option.title}</div>
              <div className="address">{option.jibunAddress}</div>
            </Li>
          );
        }}
        onChange={(_event, data) =>
          data?.id &&
          setStoreData({
            ...storeData,
            id: data.id,
            title: data.title,
            category: data.ctg,
            address: data.roadAddress,
            x: data.x,
            y: data.y,
          })
        }
        onInputChange={(_event, newInputValue) => {
          setStoreData({ ...storeData, title: newInputValue });
        }}
        renderInput={(params) => (
          <RegisterInput
            {...params}
            variant="filled"
            color="secondary"
            name="title"
            label="업소명"
            placeholder="업소명을 입력해주세요."
          />
        )}
      />
      {id && (
        <OptionBox
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <RegisterInput
            variant="filled"
            color="secondary"
            name="address"
            label="주소"
            onChange={onChangeHandler}
            value={address}
            placeholder="주소를 입력해주세요."
          />

          <RegisterInput
            variant="filled"
            color="secondary"
            name="category"
            label="카테고리"
            helperText="카테고리 구분은 ,(반점)을 통해 해주세요!"
            onChange={onChangeHandler}
            value={category}
            placeholder="업소명을 입력해주세요."
          />
        </OptionBox>
      )}
      <Gap />
      <Button
        onClick={registerStore}
        variant="contained"
        color="primary"
        disabled={!isAvaliableRegister}
      >
        등록하기
      </Button>
    </Box>
  );
};

export default Register;

const RegisterInput = styled(TextField)`
  background-color: #f3f4f7;
  border-radius: 5px;
  overflow: hidden;
  border-bottom: unset;
  & label {
    color: #bcc2db;
  }
  & input {
    color: #0f2682;
  }
  & > div::before,
  div::after {
    display: none;
  }
`;

const Animation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const OptionBox = styled(Box)`
  animation: 1s ${Animation};
`;

const Li = emotionStyled.li`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  & .address {
    font-size: 12px;
  }
`;

const Gap = emotionStyled.div`
  flex: 1
`;
