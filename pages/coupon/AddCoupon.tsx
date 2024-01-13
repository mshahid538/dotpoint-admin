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
            setCouponCode('')
            setAmount('')
            setDuration('')
        } catch (error) {
            tostify("Something went wrong!", "error");
        }
    };

    return (
        <div>
            <Button onClick={handleOpen}>
                <Add /> Add New Coupon
            </Button>
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
                        <label className="text-gray-500">Coupon Value</label>
                        <input
                            className="border rounded-xl p-2"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            type="text"
                        />
                        <label className="text-gray-500">discount percentage (1-100)</label>
                        <input
                            className={`${
                                (amount > 100 || amount < 1) && amount ? "border-red-500" : null
                            } border rounded-xl p-2`}
                            min={1}
                            max={100}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            type="text"
                        />
                        <label className="text-gray-500">days till valid (in number)</label>
                        <input
                            className="border rounded-xl p-2"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            type="text"
                        />
                        <div className="border rounded-xl mt-4">
                            <Button
                                disabled={!canSave}
                                type="submit"
                                style={{ whiteSpace: "nowrap", padding: "10px", width: "100%" }}
                            >
                                Add Coupon
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
