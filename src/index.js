import React, { useState } from "react";
import Button from "./components/Button/Button";
import Dropdown from "./components/Dropdown";
import propTypes from "prop-types";
import {
  Drawer as DrawerComponent,
  Button,
  makeStyles,
  withStyles,
  Table,
  TableBody,
  TableCell as TableCellComponent,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@material-ui/core";
import {
  updateSingleItemEnv,
  updateConstantVal,
  restoreDefault,
  changeEnvironments,
  serveConstants,
  addCustomValues,
} from "./utils/constantsUtil";
import "./EditConstantsTool.scss";

const TableCell = withStyles((theme) => ({
  head: {
    fontSize: 15,
    fontWeight: "600",
  },
  body: {
    fontSize: 15,
  },
}))(TableCellComponent);

const Drawer = withStyles((theme) => ({
  root: {
    zIndex: "2 !important",
  },
  paper: {
    background: "#fff",
    width: "100%",
  },
}))((props) => {
  const { children, onClose, ...rest } = props;

  return onClose ? (
    <DrawerComponent onClose={onClose} open={open} {...rest}>
      {children}
    </DrawerComponent>
  ) : null;
});

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
  },
  table: {
    minWidth: 650,
    background: "#fff",
  },
  paper: {},
}));

const DEFAULT_OPTIONS = [
  { value: "dev", label: "dev" },
  { value: "prod", label: "prod" },
  { value: "test", label: "test" },
];

const BOOL_OPTIONS = [
  { value: true, label: "true" },
  { value: false, label: "false" },
];

const ConstantsList = ({
  list,
  handleIndivEnvSelect,
  endpoints,
  handleCustomChange,
  handleUpdateValue,
  customField,
  saveBtnClick,
}) => {
  // ADD ITEMS THAT SHOULD STAY HIDDEN
  const BLOCK_LIST = [];

  // ADD ITEMS THAT ARE HAVE TRUE/FALSE VALUES
  const BOOL_LIST = [];

  const displaySaveBtn = (item = "", compare) => {
    if (!item || item === compare) return false;
    return true;
  };

  return React.useMemo(
    () =>
      list
        .sort((a, b) => a.localeCompare(b))
        .filter((el) => !BLOCK_LIST.includes(el))
        .map((item, idx) => {
          const displaySave = displaySaveBtn(
            customField[item],
            endpoints[item]
          );
          const showBoolOptions = BOOL_LIST.includes(item);

          return (
            <TableRow key={item}>
              <TableCell component="th" scope="row">
                {item}
              </TableCell>
              <TableCell>{endpoints[item].toString()}</TableCell>
              <TableCell>
                <Dropdown
                  handleSelectChange={
                    showBoolOptions
                      ? handleUpdateValue(item)
                      : handleIndivEnvSelect(item)
                  }
                  SelectValues={
                    showBoolOptions ? BOOL_OPTIONS : DEFAULT_OPTIONS
                  }
                  dropdownIndicator={DownChevron}
                />
              </TableCell>
              {!showBoolOptions && (
                <>
                  <TableCell>
                    <input
                      value={customField[item] || ""}
                      onChange={(e) => handleCustomChange(item, e.target.value)}
                      styleName="custom-input"
                      type="text"
                    />
                  </TableCell>
                  <TableCell>
                    <SaveButton
                      onClick={() => saveBtnClick(item, customField[item])}
                      style={{ visibility: displaySave ? "visible" : "hidden" }}
                      title="Save"
                    />
                  </TableCell>
                </>
              )}
            </TableRow>
          );
        }),
    [list]
  );
};

const EditConstantsTool = ({ openConstantsTool, setOpenConstantsTool }) => {
  const [endpoints, setEndpoints] = useState(serveConstants());
  const [customField, setCustomField] = useState({});
  const classes = useStyles();

  // HANDLERS //

  const saveBtnClick = (field, newValue) => {
    setEndpoints((prevState) => ({ ...prevState, [field]: newValue }));
    setCustomField((prevState) => {
      const newState = { ...prevState };
      delete newState[field];
      return newState;
    });
  };

  const reloadBtnClick = () => {
    addCustomValues(endpoints);
    location.reload();
  };

  // SELECT ONCHANGE HANDLERS //

  const handleIndivEnvSelect = (item) => (val) => {
    updateSingleItemEnv(item, val.value);
    setEndpoints(serveConstants());
  };

  const handleUpdateValue = (item) => (val) => {
    updateConstantVal(item, val.value);
    setEndpoints(serveConstants());
  };

  const handleEnvChangeSelect = (option) => {
    changeEnvironments(option.value);
    setEndpoints(serveConstants());
  };

  const handleCustomChange = (item, value) => {
    setCustomField((prevState) => ({ ...prevState, [item]: value }));
  };

  // HELPERS //

  const restoreDefaultValues = () => {
    restoreDefault();
    setEndpoints(serveConstants());
  };

  // JSX //

  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={openConstantsTool}
      onClose={() => setOpenConstantsTool(false)}
      transitionDuration={500}
      className={classes.paper}
    >
      <div styleName="container" className={classes.paper}>
        <h1 styleName="title">Variable Updater</h1>
        <p styleName="description">
          Must click reload to update all new changes
        </p>
        <TableContainer component={Paper}>
          <Table
            size="small"
            className={classes.table}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Change All Variables To:</TableCell>
                <TableCell align="center">
                  <Dropdown
                    SelectValues={DEFAULT_OPTIONS}
                    dropdownIndicator={DownChevron}
                    handleSelectChange={handleEnvChangeSelect}
                  />
                </TableCell>
                <TableCell />
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Current</TableCell>
                <TableCell>Set Environment</TableCell>
                <TableCell>Custom</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              <ConstantsList
                list={Object.keys(endpoints)}
                handleIndivEnvSelect={handleIndivEnvSelect}
                endpoints={endpoints}
                handleCustomChange={handleCustomChange}
                handleUpdateValue={handleUpdateValue}
                customField={customField}
                saveBtnClick={saveBtnClick}
              />
            </TableBody>
          </Table>
        </TableContainer>

        <div styleName="button-container">
          <Button variant="contained" color="primary" onClick={reloadBtnClick}>
            Reload
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              restoreDefaultValues();
              location.reload();
            }}
          >
            Return to Default
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

EditConstantsTool.propTypes = {
  openConstantsTool: propTypes.bool.isRequired,
  setOpenConstantsTool: propTypes.func.isRequired,
};

export default EditConstantsTool;
