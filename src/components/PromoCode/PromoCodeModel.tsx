/* eslint-disable @typescript-eslint/ban-ts-comment */
// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import { Form, Input, Modal } from "antd";
// import { useEffect, useState } from "react";
// import Button from "../share/Button";
// import {
//   useCreateCouponMutation,
//   useUpdateCouponMutation,
// } from "@/redux/slices/admin/couponApi";

// interface OfferModelProps {
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   promoData: any;
// }

// const PromoCodeModel: React.FC<OfferModelProps> = ({
//   open,
//   setOpen,
//   promoData,
// }) => {
//   const [couponData, setCouponData] = useState<any>({});
//   // console.log(couponData);
//   useEffect(() => {
//     if (promoData) {
//       // Update state with promoData
//       setCouponData({
//         couponCode: promoData.couponCode,
//         couponDiscount: promoData.couponDiscount,
//         expireDate: promoData.expireDate,
//         targetPoints: promoData.targetPoints,
//       });
//     } else {
//       // Clear form data
//       setCouponData({});
//     }
//   }, [promoData]);

//   const handleCancel = () => {
//     setOpen(false);
//   };

//   const [createCoupon, { error: createError }] = useCreateCouponMutation();
//   const [updatePromo, { error: updateError }] = useUpdateCouponMutation();

//   const onFinish = async (formData: any) => {
//     try {
//       let res;
//       if (promoData) {
//         res = await updatePromo({ id: promoData._id, couponData: formData });
//         if (res?.data?.success === true) {
//           alert("Coupon updated successfully");
//         }
//       } else {
//         res = await createCoupon(formData);
//         if (res?.data?.success === true) {
//           alert("Coupon created successfully");
//         }
//       }

//       if (res?.error) {
//         //@ts-ignore
//         alert(res.error.data.message);
//       }
//       setOpen(false);
//     } catch (err: any) {
//       console.error(err.message);
//       alert(err.message);
//     }
//   };

//   return (
//     <div>
//       <Modal
//         open={open}
//         title="Create Coupon Code"
//         onCancel={handleCancel}
//         footer={false}
//       >
//         <Form onFinish={onFinish} layout="vertical">
//           <Form.Item label="Coupon Code">
//             <Input
//               value={couponData?.couponCode}
//               placeholder="Enter coupon code"
//               size="large"
//               name="couponCode"
//             />
//           </Form.Item>
//           <Form.Item label="Discount">
//             <Input
//               value={couponData?.couponDiscount}
//               placeholder="Discount percentage"
//               size="large"
//               name={"couponDiscount"}
//             />
//           </Form.Item>
//           <Form.Item label="Validity Date">
//             <Input
//               value={couponData?.expireDate}
//               placeholder="Validity date"
//               size="large"
//               name={"expireDate"}
//             />
//           </Form.Item>
//           <Form.Item label="Targeted Points">
//             <Input
//               value={couponData?.targetPoints}
//               placeholder="Enter target points"
//               size="large"
//               name={"targetPoints"}
//             />
//           </Form.Item>

//           <Button className="px-10 mx-auto mt-5">Save</Button>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default PromoCodeModel;
import { Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import Button from "../share/Button";
import {
  useCreateCouponMutation,
  useUpdateCouponMutation,
} from "@/redux/slices/admin/couponApi";

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

  const [createCoupon, { error: createError }] = useCreateCouponMutation();
  const [updatePromo, { error: updateError }] = useUpdateCouponMutation();

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
          alert("Coupon updated successfully");
        }
      } else {
        res = await createCoupon(couponData);
        if (res?.data?.success === true) {
          alert("Coupon created successfully");
        }
      }

      if (res?.error) {
        //@ts-ignore
        alert(res.error.data.message);
      }
      setOpen(false);
    } catch (err: any) {
      console.error(err.message);
      alert(err.message);
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
