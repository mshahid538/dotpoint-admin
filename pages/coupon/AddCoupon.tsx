import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Add, CloseOutlined, HdrPlus, PlusOne } from "@mui/icons-material";
import { addCoupon } from "@redux/Redux/Actions";
import ErrorHandler from "@components/common/errorHandler";
import { tostify } from "@components/common/tostify";
import { useDispatch } from "react-redux";
import { Input } from "@mui/material";
import { toast } from "react-toastify";
import MUIButton from "@components/common/commonButton";
import { useTheme } from "@emotion/react";
import CommonTextField from "@components/common/commonTextField";

const style = {
  position: "absolute" as "absolute",
  borderRadius: "20px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AddCoupon({ setUpdateCouponsList }: any) {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount]: any = React.useState("");
  const [duration, setDuration]: any = React.useState("");
  const [couponCode, setCouponCode] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const theme = useTheme();

  const canSave = [amount && amount <= 100 && amount > 0, duration].every(Boolean);

  const _addCoupon = async (e: any) => {
    if (!canSave) return toast.error("incorrect values");
    e.preventDefault();
    const body = {
      code: couponCode,
      amount,
      duration,
    };
    try {
      const res = await dispatch(addCoupon(body));
      const error = ErrorHandler(res);
      if (error) {
        tostify(res?.payload?.message, "success");
      }
      setUpdateCouponsList((prev: any) => prev + 1);
      handleClose();
      setCouponCode("");
      setAmount("");
      setDuration("");
    } catch (error) {
      tostify("Something went wrong!", "error");
    }
  };

  return (
    <div>
      <MUIButton
        backgroundColor={theme.palette.action}
        hoverBgColor={theme.palette.action}
        fullWidth={false}
        height="48px"
        marginTop="20px"
        marginLeft="20px"
        marginBottom="20px"
        text="Add New Coupon"
        width="auto"
        borderRadius="50px"
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseOutlined
            sx={{ position: "absolute", top: "10px", right: "10px" }}
            onClick={handleClose}
            style={{ cursor: "pointer" }}
          />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new coupon
          </Typography>
          <br />
          <form onSubmit={_addCoupon} className="grid gap-2">
            <CommonTextField
              text="Coupon Value"
              placeholder="Please enter new Coupon Code."
              size="medium"
              type="text"
              name="postalCode"
              width="100%"
              value={couponCode}
              onChange={(e: any) => setCouponCode(e.target.value)}
            />
            <CommonTextField
              text="discount percentage"
              placeholder="Please enter a number between 1-100."
              size="medium"
              type="text"
              name="postalCode"
              width="100%"
              value={amount}
              onChange={(e: any) => {
                const isValidPostalCode = /^(100|[1-9]?[0-9])$/.test(e.target.value);
                if (isValidPostalCode || e.target.value === "") {
                  setAmount(e.target.value);
                }
              }}
            />
            <CommonTextField
              text="days till valid"
              placeholder="Please enter the number of days."
              size="medium"
              type="text"
              name="postalCode"
              width="100%"
              value={duration}
              onChange={(e: any) => {
                const isValidPostalCode = /^[0-9]+$/.test(e.target.value);
                if (isValidPostalCode || e.target.value === "") {
                  setDuration(e.target.value);
                }
              }}
            />
            <MUIButton
              disabled={!canSave}
              type="submit"
              backgroundColor={theme.palette.action}
              hoverBgColor={theme.palette.action}
              fullWidth={false}
              height="48px"
              marginTop="20px"
              text="Add Coupon"
              width="auto"
              borderRadius="50px"
            />
          </form>
        </Box>
      </Modal>
    </div>
  );
}
