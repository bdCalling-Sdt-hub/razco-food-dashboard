import { DatePicker, Form, Input, Modal } from "antd";
import Button from "../share/Button";
import { useCreateCouponMutation} from "@/redux/slices/admin/couponApi";
import toast from "react-hot-toast";
import moment from "moment";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PromoCodeModel: React.FC<OfferModelProps> = ({open, setOpen}) => {
  const [form] = Form.useForm();
  const [createCoupon] = useCreateCouponMutation();

  const onFinish = async (values:any) => {
    const formatedDate = moment(values?.expireDate)?.format('YYYY-MM-DD');
    await createCoupon({ ...values, expireDate: formatedDate}).then((response)=>{
      if (response?.data?.statusCode  === 200) {
        toast.success("Coupon created successfully");
        setOpen(false)
        form.resetFields()
      }else{
        toast.error(response?.data?.message);
      }
    })

  };



  return (
    <div>
      <Modal
        open={open}
        title="Create Coupon Code"
        onCancel={()=>(setOpen(false), form.resetFields())}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item label="Coupon Code" name="couponCode">
            <Input
              placeholder="Enter coupon code"
              size="large"
            />
          </Form.Item>
          <Form.Item 
            label="Discount" 
            name="couponDiscount"
            getValueFromEvent={(event) => Number(event.target.value)}
          >
            <Input
              placeholder="Discount percentage"
              size="large"
              type="number"
            />
          </Form.Item>
          <Form.Item 
            label="Validity Date" 
            name="expireDate"
          >
            <DatePicker
              size="large"
              style={{
                  width: "100%",
                  background: "transparent",
                  border: "1px solid #DCDDDE",
                  borderRadius: 8,
                  cursor: "pointer"
              }}
            />
          </Form.Item>
          <Form.Item 
            label="Targeted Points" 
            name="targetPoints"
            getValueFromEvent={(event) => Number(event.target.value)}
          >
            <Input
              placeholder="Enter target points"
              size="large"
              type="number"
            />
          </Form.Item>

          <Button className="px-10 mx-auto mt-5">Save</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default PromoCodeModel;
