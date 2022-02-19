import { tabUnstyledClasses } from "@mui/base";
import {
  Badge,
  Button,
  ButtonGroup,
  Chip,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { FC, SyntheticEvent, useState } from "react";

interface CategorySelectProps {}
const CategorySelect: FC<CategorySelectProps> = () => {
  const categories = [
    "🌎 전체",
    "🎤 노래방",
    "🖥 피시방",
    "🍗 치킨",
    "🍕 피자",
    "🍚 백반",
    "🍜 분식",
    "🍷 양식",
  ];
  const [tabType, setTabType] = useState(0);
  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setTabType(newValue);
  };

  return (
    <Box>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        onChange={handleChange}
        value={tabType}
        TabIndicatorProps={{
          style: {
            display: "none",
          },
        }}
      >
        {categories.map((item, idx) => (
          <MenuTab
            key={idx}
            label={
              <Chip
                variant={idx === tabType ? "filled" : "outlined"}
                style={{ background: idx === tabType ? "#007fff" : "white" }}
                color="primary"
                label={item}
              />
            }
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default CategorySelect;

const MenuTab = styled(Tab)`
  padding: 0 5px;
  min-width: unset;
`;
