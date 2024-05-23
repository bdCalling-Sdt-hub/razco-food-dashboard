/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import Button from "../share/Button";
import {
  useCreateCouponMutation,
  useUpdateCouponMutation,
} from "@/redux/slices/admin/couponApi";
import toast from "react-hot-toast";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  promoData: any;
}

const PromoCodeModel: React.FC<OfferModelProps> = ({
  open,
  setOpen,
  promoData,
}) => {
  const [couponData, setCouponData] = useState<any>({});

  useEffect(() => {
    if (promoData) {
      setCouponData({
        ...promoData,
      });
    } else {
      setCouponData({});
    }
  }, [promoData]);

  const handleCancel = () => {
    setOpen(false);
  };

  const [createCoupon] = useCreateCouponMutation();
  const [updatePromo] = useUpdateCouponMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const parsedValue =
      name === "couponCode"
        ? value
        : name === "expireDate"
        ? String(value)
        : parseFloat(value);
    setCouponData((prevData: any) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const onFinish = async () => {
    try {
      let res;
      if (promoData) {
        res = await updatePromo({ id: promoData?._id, data: couponData });
        if (res?.data?.success === true) {
          toast.success("Coupon updated successfully");
        }
      } else {
        res = await createCoupon(couponData);
        if (res?.data?.success === true) {
          toast.success("Coupon created successfully");
        }
      }

      if (res?.error) {
        //@ts-ignore
        toast.error(res.error.data.message);
      }
      setOpen(false);
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div>
      <Modal
        visible={open}
        title="Create Coupon Code"
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label="Coupon Code">
            <Input
              value={couponData.couponCode}
              placeholder="Enter coupon code"
              size="large"
              name="couponCode"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Discount">
            <Input
              value={couponData.couponDiscount}
              placeholder="Discount percentage"
              size="large"
              name="couponDiscount"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Validity Date">
            <Input
              value={couponData.expireDate}
              placeholder="Validity date"
              size="large"
              name="expireDate"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Targeted Points">
            <Input
              value={couponData.targetPoints}
              placeholder="Enter target points"
              size="large"
              name="targetPoints"
              onChange={handleChange}
            />
          </Form.Item>

          <Button className="px-10 mx-auto mt-5">Save</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default PromoCodeModel;
