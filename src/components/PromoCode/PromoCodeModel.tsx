import { Form, Input, Modal } from "antd";
import { useEffect } from "react";
import Button from "../share/Button";
import { useCreateCouponMutation } from "@/redux/slices/admin/couponApi";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PromoCodeModel: React.FC<OfferModelProps> = ({ open, setOpen }) => {
  const handleCancel = () => {
    setOpen(false);
  };
  const [createCoupon, { isLoading, data, isSuccess, error }] =
    useCreateCouponMutation();
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        alert("Coupon add Successfully");
        setOpen(false);
      }
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        // message.error(errorData.data.message);
        alert(errorData.data.message);
      } else {
        console.error("Login error:", error);
      }
    }
  }, [data, error, isSuccess, setOpen]);
  const onFinish = async (data: any) => {
    const couponData = {
      couponCode: data?.couponCode,
      couponDiscount: Number(data?.couponDiscount),
      expireDate: data?.expireDate,
      targetPoints: Number(data?.targetPoints),
    };
    try {
      await createCoupon(couponData);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        title="Create Coupon Code"
        onCancel={handleCancel}
        footer={false}
      >
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item name="couponCode" label="Coupon Code">
            <Input placeholder="Enter coupon code" size="large" />
          </Form.Item>
          <Form.Item name={"couponDiscount"} label="Discount">
            <Input placeholder="Discount percentage" size="large" />
          </Form.Item>
          <Form.Item name={"expireDate"} label="Validity Date">
            <Input placeholder="Validity date" size="large" />
          </Form.Item>
          <Form.Item name={"targetPoints"} label="Targeted Points">
            <Input placeholder="Enter target points" size="large" />
          </Form.Item>

          <Button className="px-10 mx-auto mt-5">Save</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default PromoCodeModel;
