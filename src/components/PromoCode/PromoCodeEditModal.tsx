import { Form, Input, Modal } from "antd";
import { useEffect } from "react";
import Button from "../share/Button";
import { useUpdateCouponMutation } from "@/redux/slices/admin/couponApi";
import toast from "react-hot-toast";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  promoData: any;
}

const PromoCodeEditModal: React.FC<OfferModelProps> = ({
  open,
  setOpen,
  promoData,
}) => {
  const [form] = Form.useForm();

  useEffect(()=>{
    if (promoData) {
      form.setFieldsValue(promoData);
    }
  }, [promoData, form]);

  const [updatePromo] = useUpdateCouponMutation();


  const onFinish = async (values:any) => {
    await updatePromo({id: promoData?._id, data: values}).then((response)=>{
      if (response?.data?.statusCode === 200) {
        toast.success("Coupon Updated successfully");
        setOpen(false)
      }else{
        toast.success(response?.data?.message);
      }
    })
  };



  return (
    <div>
      <Modal
        open={open}
        title="Edit Coupon Code"
        onCancel={()=>setOpen(false)}
        footer={false}
      >
        <Form onFinish={onFinish} form={form} layout="vertical">
          <Form.Item label="Coupon Code" name="couponCode">
            <Input
              placeholder="Enter coupon code"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Discount" 
            name="couponDiscount"
          >
            <Input
              placeholder="Discount percentage"
              size="large"
              type="number"
            />
          </Form.Item>
          <Form.Item label="Validity Date" name="expireDate">
            <Input
              placeholder="Validity date"
              size="large"
            />
          </Form.Item>
          <Form.Item 
            label="Targeted Points" 
            name="targetPoints" 
            getValueFromEvent={(event) => Number(event.target.value)}
          >
            <Input
              type="number"
              placeholder="Enter target points"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button  className="px-10 mx-auto mt-5">Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PromoCodeEditModal;
